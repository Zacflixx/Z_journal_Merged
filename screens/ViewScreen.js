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
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';

import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import {View, Image, ScrollView, Alert} from 'react-native';

const ViewScreen = ({route: {params}}, navigation, props, item) => {
  const {postView, meth, pimg, wan, delItem, jac, NewId} = params;
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(wan)
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

  const handleDelete = (delItem) => {
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
          onPress: () => deletePost(delItem),
        },
      ],
      {cancelable: false},
    );
  };
  const deletePost = (delItem) => {
    console.log('Current Post Id: ', delItem);

    firestore()
      .collection('posts')
      .doc(delItem)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const {pimg} = documentSnapshot.data();

          if (pimg != null) {
            const storageRef = storage().refFromURL(pimg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${pimg} has been deleted successfully.`);
                deleteFirestoreData(NewId);
              })
              .catch((e) => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(delItem);
          }
        }
      });
  };

  const deleteFirestoreData = (delItem) => {
    firestore()
      .collection('posts')
      .doc(delItem)
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
                onPress={() => handleDelete(delItem)}>
                <Ionicons name="md-trash-bin" size={27} color="#383426" />
              </Interaction>
            ) : null}
          </InteractionWrapper>
          {/* <InteractionWrapper>
             <Interaction active={item.liked}>
              <Ionicons name={likeIcon} size={25} color={likeIconColor} />
              <InteractionText active={item.liked}>{likeText}</InteractionText>
            </Interaction> 
           <Interaction>
              <Ionicons name="md-chatbubble-outline" size={25} />
            </Interaction> 
            {user.uid == wan ? (
              <Interaction
                style={{marginBottom: 0}}
                onPress={() => navigation.navigate('HomeScreen')}>
                <Ionicons name="md-trash-bin" size={47} color="blue" />
              </Interaction>
            ) : null}
          </InteractionWrapper>
          */}
        </UserInfo>
      </View>
    </ScrollView>
  );
};

export default ViewScreen;
