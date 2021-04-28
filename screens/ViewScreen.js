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
import {View, Image, ScrollView} from 'react-native';

const ViewScreen = ({route: {params}}, props) => {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const {postView, meth} = params;

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
          marginTop: 10,
          alignSelf: 'center',
        }}>
        <PostText style={{color: 'black', fontSize: 40}}>My post</PostText>
      </View>
      <View style={{flexDirection: 'row', marginTop: 40}}>
        <PostText style={{color: 'black', fontSize: 20}}>{postView}</PostText>
      </View>

      <ProgressiveImage
        source={{
          uri: meth,
        }}
        style={{width: '100%', height: 360}}
        resizeMode="cover"
      />
    </ScrollView>
  );
};

export default ViewScreen;
