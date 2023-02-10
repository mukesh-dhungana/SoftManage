import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  emailRegexValidaion,
  phoneNumberRegexValidation,
} from '../helpers/inputValidators';
import {ENABLED_APP_LOCK, LOGGED_IN, PIN_KEY} from '../helpers/sharedPrefKeys';
import isEmpty from '../helpers/utils';

function Login(props: any) {
  const [text, setText] = React.useState('');
  const [inValidEmail, setInvalidEmail] = React.useState(false);
  const [inValidPhone, setInvalidPhone] = React.useState(false);
  const [inValidPIN, setInvalidPIN] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [pin, setPIN] = React.useState('');
  const [appLockEnabled, setAppLockEnabled] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    async function getAsyncStorage() {
      const appLock = await AsyncStorage.getItem(ENABLED_APP_LOCK);
      const loggedIn = await AsyncStorage.getItem(LOGGED_IN);
      setAppLockEnabled(appLock === '1');
      setIsLoggedIn(loggedIn === '1');
    }
    getAsyncStorage();
  }, []);
  const {navigation} = props;
  const login = async () => {
    setIsLoading(true);
    const savedPIN = await AsyncStorage.getItem(PIN_KEY);
    const isValidPIN = !appLockEnabled || savedPIN === pin;
    if (!isValidPIN) {
      setInvalidPIN(true);
    } else {
      setInvalidPIN(false);
    }
    if ((isLoggedIn && isValidPIN) || (!isLoggedIn && validateUser(text)))
      setTimeout(() => {
        setIsLoading(false);
        if (isLoggedIn) navigation.dispatch(StackActions.replace('Home'));
        else navigation.navigate('Otp', {name: 'Otp'});
      }, 1500);
    else {
      setIsLoading(false);
    }
  };
  const validateUser = (val: string) => {
    let isValid = emailRegexValidaion(val);
    if (!isValid) isValid = phoneNumberRegexValidation(val);
    if (!isValid) setInvalidEmail(true);
    else {
      setInvalidEmail(false);
      setInvalidPhone(false);
    }
    return isValid;
  };
  const setUser = (val: string) => {
    setText(val);
    validateUser(val);
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.row}>
          {!isLoggedIn && <Text style={styles.loginText}>Login</Text>}
          {isLoggedIn && appLockEnabled && (
            <Text style={styles.loginText}>Unlock App</Text>
          )}
          {!isLoggedIn && (
            <TextInput
              label="User Id"
              left={<TextInput.Icon icon="account" />}
              error={inValidEmail || inValidPhone}
              value={text}
              onChangeText={(value: any) => setUser(value)}
            />
          )}
          {inValidEmail && (
            <Text style={styles.error}>Valid Email must be entered</Text>
          )}
          {inValidPhone && (
            <Text style={styles.error}>Valid Phone must be entered</Text>
          )}
        </View>
        {appLockEnabled && (
          <View style={styles.row}>
            {!isLoggedIn && (
              <Text
                style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16}}>
                Or
              </Text>
            )}
            <View style={styles.row}>
              <TextInput
                label="PIN"
                keyboardType="numeric"
                left={<TextInput.Icon icon="lock-open" />}
                value={pin}
                onChangeText={(value: any) => {
                  setPIN(value);
                  setInvalidPIN(false);
                }}
                error={inValidPIN}
              />
              {inValidPIN && <Text style={styles.error}>Incorrect PIN</Text>}
            </View>
          </View>
        )}
        <View style={styles.btn}>
          <View style={styles.row}>
            <Button
              icon={{source: 'arrow-left-circle', direction: 'rtl'}}
              mode="contained"
              onPress={() => login()}
              contentStyle={{
                flexDirection: 'row-reverse',
                backgroundColor: '#8c33e4',
                height: 50,
              }}
              style={{borderRadius: 8}}
              loading={isLoading}>
              Login
            </Button>
          </View>
          {!isLoggedIn && (
            <View style={styles.row}>
              <Button
                icon={{source: 'arrow-left-circle', direction: 'rtl'}}
                mode="contained"
                onPress={() => navigation.navigate('SignUp', {name: 'SignUp'})}
                contentStyle={{
                  flexDirection: 'row-reverse',
                  backgroundColor: '#5b8582',
                  height: 50,
                }}
                style={{borderRadius: 8}}>
                Sign Up
              </Button>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingHorizontal: 60,
  },
  loginText: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  row: {
    marginTop: 20,
  },
  error: {
    color: '#bf2358',
    marginTop: 5,
  },
  btn: {
    marginTop: 50,
  },
});
export default Login;
