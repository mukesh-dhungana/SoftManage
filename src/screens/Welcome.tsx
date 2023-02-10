import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {ENABLED_APP_LOCK, LOGGED_IN} from '../helpers/sharedPrefKeys';

function Welcome(props: any) {
  const {navigation} = props;
  useEffect(() => {
    setTimeout(() => {
      async function getAsyncStorage() {
        const appLock = await AsyncStorage.getItem(ENABLED_APP_LOCK);
        const loggedIn = await AsyncStorage.getItem(LOGGED_IN);
        if (loggedIn === '1') {
          if (appLock === '1') navigation.navigate('Login', {name: 'Login'});
          else navigation.dispatch(StackActions.replace('Home'));
        } else {
          navigation.navigate('Login', {name: 'Login'});
        }
      }
      getAsyncStorage();
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Welcome</Text>
      <Text style={styles.label}>To</Text>
      <Text style={styles.label}>SoftManage</Text>
      <Image style={styles.logo} source={require('../assets/SM-Logo.png')} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: 40,
    color: '#5064ff',
    letterSpacing: 1.5,
  },

  logo: {
    width: 150,
    height: 150,
    marginTop: 40,
  },
});

export default Welcome;
