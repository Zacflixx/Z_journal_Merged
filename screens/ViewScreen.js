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
import {View} from 'react-native';

const ViewScreen = ({route: {params}}) => {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const {postView} = params;

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

    <Card
      style={{
        backgroundColor: '#c4ae66',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%',
        height: 180,
        opacity: 0.9,
      }}>
      <View style={{flexDirection: 'row'}}>
        <PostText style={{color: '#fffdf7', fontSize: 20}}>
          Our post is {postView}
        </PostText>
      </View>
    </Card>
  );
};

export default ViewScreen;
