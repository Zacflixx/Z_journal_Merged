import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  StatusBar,
  numColumns,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import auth from '@react-native-firebase/auth';

import Ionicons from 'react-native-vector-icons/Ionicons';

import PostCard from '../components/PostCard';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import {Container} from '../styles/FeedStyles';
import {AuthContext} from '../navigation/AuthProvider.android';
import {user, logout, ProfileScreen} from './ProfileScreen';

// const data1 = [{key: '1'}, {key: '2'}, {key: '3'}, {key: '4'}, {key: '5'}];
// renderItem = ({item, index}) => {
//   return;
//   <View>
//     <Text>{item.key}</Text>
//   </View>;
// };

const HomeScreen = ({navigation, route}) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const numColumns = 2;

  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')

        // user.uid ==
        //   item.userId
        // .where('userId', '==', userId)
        // .where('userId', '==', route.params ? route.params.userId : user.uid)
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              userId,
              post,
              postImg,
              postTime,
              likes,
              comments,
            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'Test Name',
              userImg:
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
              postTime: postTime,
              post,
              postImg,
              liked: false,
              likes,
              comments,
            });
          });
        });

      setPosts(list);

      if (loading) {
        setLoading(false);
      }

      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);

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

  const ListHeader = () => {
    return null;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}>
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 60, height: 60, borderRadius: 50}} />
              <View style={{marginLeft: 20}}>
                <View style={{width: 120, height: 20, borderRadius: 4}} />
                <View
                  style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
                />
              </View>
            </View>
            <View style={{marginTop: 10, marginBottom: 30}}>
              <View
                style={{width: 300, height: 20, borderRadius: 4, color: 'red'}}
              />
              <View
                style={{
                  marginTop: 6,
                  width: 250,
                  height: 20,
                  borderRadius: 4,
                  color: 'white',
                }}
              />
              <View
                style={{marginTop: 6, width: 350, height: 200, borderRadius: 4}}
              />
            </View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 60, height: 60, borderRadius: 50}} />
              <View style={{marginLeft: 20}}>
                <View style={{width: 120, height: 20, borderRadius: 4}} />
                <View
                  style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
                />
              </View>
            </View>
            <View style={{marginTop: 10, marginBottom: 30}}>
              <View style={{width: 300, height: 20, borderRadius: 4}} />
              <View
                style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
              />
              <View
                style={{marginTop: 6, width: 350, height: 200, borderRadius: 4}}
              />
            </View>
          </SkeletonPlaceholder>
        </ScrollView>
      ) : (
        <Container
          style={{
            backgroundColor: '#fff',
            borderColor: '#fff',
            borderWidth: 33,
            borderRadius: 43,
            flex: 14,

            // flexDirection: 'row',
          }}>
          <StatusBar backgroundColor="black" barStyle="light-content" />
          <FlatList
            data={posts}
            renderItem={({item}) => (
              <PostCard
                item={item}
                onDelete={handleDelete}
                onPress={() =>
                  navigation.navigate('HomeProfile', {userId: item.userId})
                }
              />
            )}
            numColumns={numColumns}
            style={{flex: 1, height: '20%', marginTop: 30}}
            keyExtractor={(item) => item.id}
            // ListHeaderComponent={ListHeader}
            // ListFooterComponent={ListHeader}
            showsVerticalScrollIndicator={false}
          />

          {/* <FlatList
            data={data1}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          /> */}
        </Container>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
