import React, {useEffect} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PIN_KEY} from '../helpers/sharedPrefKeys';
import isEmpty from '../helpers/utils';
import {StackActions} from '@react-navigation/native';

function UnLockPIN(props: any) {
  const [text, setText] = React.useState('');
  const [invalidPIN, setInvalidPIN] = React.useState(false);
  const [invalidPINMsg, setInvalidPINMsg] = React.useState('');
  const [isResetMode, setResetMode] = React.useState(false);
  const {navigation} = props;
  React.useEffect(() => {
    async function getPIN() {
      const pin = await AsyncStorage.getItem(PIN_KEY);
      if (!isEmpty(pin)) setResetMode(true);
    }
    getPIN();
  }, []);
  const setPIN = async () => {
    if (validatePIN(text)) {
      setInvalidPIN(false);
      if (isResetMode) {
        await AsyncStorage.removeItem(PIN_KEY);
      }
      await AsyncStorage.setItem(PIN_KEY, text);
      navigation.dispatch(StackActions.replace('Home'));
    }
  };
  const validatePIN = (pin: string) => {
    let isValid = true;
    if (pin === '') {
      setInvalidPIN(true);
      setInvalidPINMsg('PIN cannot be empty');
      isValid = false;
    } else if (pin.length < 4) {
      setInvalidPIN(true);
      setInvalidPINMsg('PIN must be at least 4 characters');
      isValid = false;
    } else {
      setInvalidPIN(false);
      setInvalidPINMsg('');
    }
    return isValid;
  };

  const removePIN = async () => {
    await AsyncStorage.removeItem(PIN_KEY);
    navigation.dispatch(StackActions.replace('Home'));
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/SM-Logo.png')} />
      <View style={styles.row}>
        <Text style={styles.loginText}>Unlock App</Text>
        <View style={styles.row}>
          <TextInput
            label="PIN"
            keyboardType="numeric"
            value={text}
            left={<TextInput.Icon icon="lock" />}
            onChangeText={text => {
              setText(text);
              validatePIN(text);
            }}
            style={{width: 300}}
            error={invalidPIN}
          />
          {invalidPIN && <Text style={styles.error}>{invalidPINMsg}</Text>}
        </View>
        <View style={styles.btn}>
          <View style={styles.row}>
            <Button
              icon={{
                source: 'arrow-left-circle',
                direction: 'rtl',
              }}
              mode="contained"
              onPress={() => setPIN()}
              contentStyle={{
                flexDirection: 'row-reverse',
                backgroundColor: '#5669ff',
                height: 50,
              }}
              style={{borderRadius: 8}}>
              {isResetMode ? 'Reset PIN' : ' Set PIN'}
            </Button>
          </View>
          {/* <View style={styles.row}>
            <Button
              icon={{
                source: 'arrow-left-circle',
                direction: 'rtl',
              }}
              mode="contained"
              onPress={() => removePIN()}
              contentStyle={{
                flexDirection: 'row-reverse',
                backgroundColor: '#5669ff',
                height: 50,
              }}
              style={{borderRadius: 8}}>
              Remove PIN
            </Button>
          </View> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    marginTop: 80,
  },
  label: {
    fontSize: 40,
    color: '#5064ff',
    letterSpacing: 1.5,
  },

  logo: {
    width: 100,
    height: 100,
    marginTop: 40,
  },
  loginText: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 0,
    fontWeight: 'bold',
  },
  row: {
    marginTop: 40,
  },
  btn: {
    marginTop: 0,
    //width: 120,
    //alignSelf:'center'
  },
  error: {
    color: '#bf2358',
    marginTop: 5,
  },
});
export default UnLockPIN;
