import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../styles/AddPost';

import {AuthContext} from '../navigation/AuthProvider';

const AddPostScreen = () => {
  const {user, logout} = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const submitPost = async () => {
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    console.log('Post: ', post);

    firestore()
      .collection('posts')
      .add({
        userId: user.uid,
        post: post,
        postImg: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
        likes: null,
        comments: null,
      })
      .then(() => {
        console.log('Post Added!');
        Alert.alert(
          'Post published!',
          'Your post has been published Successfully!',
        );
        setPost(null);
      })
      .catch((error) => {
        console.log(
          'Something went wrong with added post to firestore.',
          error,
        );
      });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <InputWrapper>
        <InputField
          placeholder="What's on your mind?"
          placeholderTextColor="#635935"
          multiline
          numberOfLines={8}
          value={post}
          onChangeText={(content) => setPost(content)}
          style={{
            borderColor: '#c4ae66',
            borderWidth: 3,
            borderRadius: 15,
            color: '#c4ae66',
          }}
        />
        {image != null ? (
          <AddImage style={styles.imgg} source={{uri: image}} />
        ) : null}
      </InputWrapper>
      <ActionButton
        style={{
          // backgroundColor: 'red',
          height: 220,
          width: '30%',
          alignSelf: 'center',
          marginTop: 280,
          marginLeft: 250,
        }}
        buttonColor="#c4ae66">
        <ActionButton.Item
          buttonColor="#c4ae66"
          title="Take Photo"
          onPress={takePhotoFromCamera}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#c4ae66"
          title="Choose Photo"
          onPress={choosePhotoFromLibrary}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
      <View
        style={{
          color: 'red',
          flexDirection: 'column',
          marginBottom: 100,
          // justifyContent: 'space-evenly',
        }}>
        {/* <Text
          style={{
            color: '#c4ae66',
            fontSize: 15,
            borderRadius: 30,
            marginLeft: 200,
          }}>
          Add Image
        </Text> */}
        {uploading ? (
          <StatusWrapper>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#c4ae66" />
          </StatusWrapper>
        ) : (
          <TouchableOpacity
            style={{
              color: 'red',
              backgroundColor: '#c4ae66',
              height: 20,
              width: 145,
              marginRight: 100,
            }}
            onPress={submitPost}>
            <Text
              style={{
                color: 'black',
                backgroundColor: '#c4ae66',
                fontSize: 25,
                borderRadius: 30,
              }}>
              ~Post Now~
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AddPostScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  actionButtonIcon: {
    fontSize: 28,
    height: 22,
    color: 'white',
  },
  imgg: {
    height: 80,
    width: 150,
    marginLeft: 200,
  },
});
