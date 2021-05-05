import React, {useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../styles/FeedStyles';

import ProgressiveImage from '../components/ProgressiveImage';

import {AuthContext} from '../navigation/AuthProvider';

import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import {View, Image, ScrollView, Alert} from 'react-native';

const ViewScreen = ({route: {params}}, props, item) => {
  const {postView, meth, immg, wan, wann, jac} = params;
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);
  const handleDelete = (postId) => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };
  const deletePost = (postId) => {
    console.log('Current Post Id: ', postId);

    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
              })
              .catch((e) => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = (postId) => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'Your post has been deleted successfully!',
        );
        setDeleted(true);
      })
      .catch((e) => console.log('Error deleting posst.', e));
  };
  return (
    //start of the card editing code

    <ScrollView
      style={{
        backgroundColor: '#c4ae66',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 20,
        marginLeft: 40,
        marginTop: 40,
        width: '80%',
        height: 600,
        opacity: 0.9,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: 10,
          marginLeft: 190,

          borderStyle: 'dashed',
          borderRadius: 9,
          borderWidth: 0.6,
          borderColor: 'black',
          borderTopColor: 'white',
        }}>
        <PostText
          style={{
            color: 'black',
            fontSize: 22,
            opacity: 0.8,
          }}>
          Z~Journal
        </PostText>
      </View>

      <View style={{flexDirection: 'row', marginTop: 9}}>
        <PostText style={{color: 'black', fontSize: 23}}>{postView}</PostText>
      </View>

      <ProgressiveImage
        source={{
          uri: meth,
        }}
        style={{width: '100%', height: 360}}
        resizeMode="cover"
      />
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          marginLeft: 90,
        }}>
        <PostTime style={{color: 'black', fontSize: 21, opacity: 0.7}}>
          {moment(jac.toDate()).fromNow()}
        </PostTime>
        <UserInfo style={{}}>
          <InteractionWrapper>
            {/* <Interaction active={item.liked}>
              <Ionicons name={likeIcon} size={25} color={likeIconColor} />
              <InteractionText active={item.liked}>{likeText}</InteractionText>
            </Interaction> */}
            {/* <Interaction>
              <Ionicons name="md-chatbubble-outline" size={25} />
            </Interaction> */}
            {user.uid == wan ? (
              <Interaction
                style={{marginBottom: 0}}
                onPress={() => handleDelete(wann)}>
                <Ionicons name="md-trash-bin" size={27} color="#383426" />
              </Interaction>
            ) : null}
          </InteractionWrapper>
          {/* <UserInfoText style={{color: 'black'}}>
            <TouchableOpacity onPress={onPress}>
              <UserName style={{color: 'black'}}>
                {userData ? userData.fname || 'Z-Journal' : 'Z-Journal'}{' '}
                {userData ? userData.lname || 'User' : 'User'}
              </UserName>
            </TouchableOpacity>
            <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
          </UserInfoText> */}
        </UserInfo>
      </View>
    </ScrollView>
  );
};

export default ViewScreen;
