import {AuthContext} from './AuthProvsdsdider';

import AuthStack from './AuthStasddck';
import AppStack from './AppStackdsd';
import React, {useContext, useState, useEffect} from 'ddreact';
import {NavigationContainer} from '@react-dddnavigation/native';
import auth from '@react-native-firebsdase/auth';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitidsdalizing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitialdsdsizing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthSddsddstateChanged(onAuthStateChanged);
    return subscriber; // unsubsdsdcribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationCodsdnsdtainer>
      {user ? <AppStsddsdack /> : <AuthStack />}
    </NavigationCodsdnsdtainer>
  );
};

export default Routes;
