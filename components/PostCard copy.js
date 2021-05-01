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

import ProgressiveImage from './ProgressiveImage';

import {AuthContext} from '../navigation/AuthProvider';

import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import {View} from 'react-native';
import ViewScreen from '../screens/ViewScreen';

const PostCard = ({navigation, item, onDelete, onView, onPress}) => {
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

  return (
    //start of the card editing code

    <Card
      key={item.id}
      style={{
        backgroundColor: '#c4ae66',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 20,
        width: '50%',
        height: 170,
        opacity: 0.9,
      }}>
      <TouchableOpacity
        item={item}
        onPress={() => onView({immg: userData.userImg})}>
        <UserInfo style={{}}>
          <UserImg
            source={{
              uri: userData
                ? userData.userImg ||
                  'https://png.pngitem.com/pimgs/s/168-1689599_male-user-filled-icon-user-icon-100-x.png'
                : 'https://png.pngitem.com/pimgs/s/168-1689599_male-user-filled-icon-user-icon-100-x.png',
            }}
          />
          <UserInfoText style={{color: 'black'}}>
            <TouchableOpacity onPress={onPress}>
              <UserName style={{color: 'black'}}>
                {userData ? userData.fname || 'Z-Journal' : 'Z-Journal'}{' '}
                {userData ? userData.lname || 'User' : 'User'}
              </UserName>
            </TouchableOpacity>
            <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
          </UserInfoText>
        </UserInfo>
        <View style={{flexDirection: 'row'}}>
          <PostText style={{color: '#fffdf7', height: 42, width: 120}}>
            {item.post}
          </PostText>
          <InteractionWrapper style={{flexDirection: 'row'}}>
            {/* <Interaction active={item.liked}>
              <Ionicons name={likeIcon} size={25} color={likeIconColor} />
              <InteractionText active={item.liked}>{likeText}</InteractionText>
            </Interaction> */}
            {/* <Interaction>
              <Ionicons name="md-chatbubble-outline" size={25} />
            </Interaction> */}
            {user.uid == item.userId ? (
              <Interaction onPress={() => onDelete(item.id)}>
                <Ionicons name="md-trash-bin" size={25} color="#383426" />
              </Interaction>
            ) : null}
          </InteractionWrapper>
        </View>
        {/* {item.postImg != null ? <PostImg source={{uri: item.postImg}} /> : */}
        <Divider />
        {item.postImg != null ? (
          <ProgressiveImage
            defaultImageSource={require('../assets/default-img.jpg')}
            source={{uri: item.postImg}}
            style={{width: '100%', height: 60}}
            resizeMode="contain"
          />
        ) : (
          <Divider />
        )}
      </TouchableOpacity>
    </Card>
  );
};

export default PostCard;
