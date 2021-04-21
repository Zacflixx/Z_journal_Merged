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

const ViewScreen = ({navigation, item, onDelete, onPress, props}) => {
  // const {user, logout} = useContext(AuthContext);
  // const [userData, setUserData] = useState(null);

  // const getUser = async () => {
  //   await firestore()
  //     .collection('users')
  //     .doc(item.userId)
  //     .get()
  //     .then((documentSnapshot) => {
  //       if (documentSnapshot.exists) {
  //         console.log('User Data', documentSnapshot.data());
  //         setUserData(documentSnapshot.data());
  //       }
  //     });
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    //start of the card editing code

    // <Card
    //   style={
    //     {
    //       // backgroundColor: '#c4ae66',
    //       // borderWidth: 3,
    //       // borderColor: 'black',
    //       // borderRadius: 20,
    //       // width: '50%',
    //       // height: 180,
    //       // opacity: 0.9,
    //     }
    //   }>
    //   <UserInfo style={{}}>
    //     <UserImg
    //       source={{
    //         uri: userData
    //           ? userData.userImg ||
    //             'https://png.pngitem.com/pimgs/s/168-1689599_male-user-filled-icon-user-icon-100-x.png'
    //           : 'https://png.pngitem.com/pimgs/s/168-1689599_male-user-filled-icon-user-icon-100-x.png',
    //       }}
    //     />
    //     <UserInfoText style={{color: 'black'}}>
    //       <TouchableOpacity onPress={onPress}>
    //         <UserName style={{color: 'black'}}>
    //           {userData ? userData.fname || 'Z-Journal' : 'Z-Journal'}{' '}
    //           {userData ? userData.lname || 'User' : 'User'}
    //         </UserName>
    //       </TouchableOpacity>
    //       <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
    //     </UserInfoText>
    //   </UserInfo>
    <View style={{flexDirection: 'row'}}>
      <PostText style={{color: '#fffdf7', height: 42, width: 120}}>
        {this.props.dataFromParent}
      </PostText>
    </View>

    //     <Divider />
    //     {item.postImg != null ? (
    //       <ProgressiveImage
    //         defaultImageSource={require('../assets/default-img.jpg')}
    //         source={{uri: item.postImg}}
    //         style={{width: '100%', height: 60}}
    //         resizeMode="contain"
    //       />
    //     ) : (
    //       <Divider />
    //     )}
    //   </Card>
  );
};

export default ViewScreen;
