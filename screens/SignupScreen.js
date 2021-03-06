import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../navigation/AuthProvider.android';

const SignupScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    //   username: '',
    //   password: '',
    //   confirm_password: '',
    //   check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  // const textInputChange = (val) => {
  //   if (val.length !== 0) {
  //     setData({
  //       ...data,
  //       username: val,
  //       check_textInputChange: true,
  //     });
  //   } else {
  //     setData({
  //       ...data,
  //       username: val,
  //       check_textInputChange: false,
  //     });
  //   }
  // };

  // const handlePasswordChange = (val) => {
  //   setData({
  //     ...data,
  //     password: val,
  //   });
  // };

  // const handleConfirmPasswordChange = (val) => {
  //   setData({
  //     ...data,
  //     confirm_password: val,
  //   });
  // };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const {register} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#c4ae66" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Sign Up!</Text>
      </View>
      <View>
        <Text style={styles.text_header2}>
          Create a Z~Journal account here{' '}
        </Text>
      </View>
      <Animatable.View animation="fadeInDownBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>User_Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#fff2cc" size={20} />
            <TextInput
              placeholder="Your User_Email"
              placeholderTextColor="#36362e"
              style={styles.textInput}
              autoCapitalize="none"
              labelValue={email}
              onChangeText={(userEmail) => setEmail(userEmail)}
              autoCorrect={false}
            />
            {/* {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="#fff2cc" size={20} />
              </Animatable.View>
            ) : null} */}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#fff2cc" size={20} />
            <TextInput
              placeholder="Your Password"
              placeholderTextColor="#36362e"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              labelValue={password}
              onChangeText={(userPassword) => setPassword(userPassword)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="#fff2cc" size={20} />
              ) : (
                <Feather name="eye" color="#fff2cc" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#fff2cc" size={20} />
            <TextInput
              placeholder="Confirm Your Password"
              placeholderTextColor="#36362e"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              labelValue={confirmPassword}
              onChangeText={(userPassword) => setConfirmPassword(userPassword)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="#fff2cc" size={20} />
              ) : (
                <Feather name="eye" color="#fff2cc" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {' '}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => register(email, password)}>
              <LinearGradient
                colors={['black', '#c4ae66']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: 'black',
                    },
                  ]}>
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: '#c4ae66',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#c4ae66',
                  },
                ]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4ae66',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#0d0d05',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 40,
    // textAlign: 'center',
  },
  text_header2: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    // marginLeft: 40,
    marginBottom: 4,
  },
  text_footer: {
    color: '#fff2cc',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#fff2cc',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
