import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {TextInput, Button, Checkbox} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  emailRegexValidaion,
  phoneNumberRegexValidation,
} from '../helpers/inputValidators';
import {PIN_KEY} from '../helpers/sharedPrefKeys';
import isEmpty from '../helpers/utils';

function SignUp(props: any) {
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [pin, setPIN] = React.useState('');
  const [inValidEmail, setInvalidEmail] = React.useState(false);
  const [inValidPhone, setInvalidPhone] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const {navigation} = props;
  const signUp = async () => {
    setIsLoading(true);
    if (validateUser(email, phone)) {
      if (!isEmpty(pin)) {
        const savedPIN = await AsyncStorage.getItem(PIN_KEY);
        if (!isEmpty(savedPIN)) await AsyncStorage.removeItem(PIN_KEY);
        await AsyncStorage.setItem(PIN_KEY, pin);
      }
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('Otp', {name: 'Otp'});
      }, 1500);
    } else {
      setIsLoading(false);
    }
  };
  const validateUser = (e: any, p: any) => {
    let isValidEmail = true;
    let isValidPhone = true;
    if (e !== null) {
      isValidEmail = emailRegexValidaion(e);
      setInvalidEmail(!isValidEmail);
    }
    if (p !== null) {
      isValidPhone = phoneNumberRegexValidation(p);
      setInvalidPhone(!isValidPhone);
    }

    return isValidEmail && isValidPhone;
  };
  const setEmailText = (val: string) => {
    setEmail(val);
    validateUser(val, null);
  };
  const setPhoneText = (val: string) => {
    setPhone(val);
    validateUser(null, val);
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.loginText}>Sign Up</Text>
          <View>
            <TextInput
              label="Email"
              left={<TextInput.Icon icon="email-outline" />}
              error={inValidEmail}
              value={email}
              onChangeText={(value: any) => setEmailText(value)}
            />
            {inValidEmail && (
              <Text style={styles.error}>Valid Email must be entered</Text>
            )}
          </View>
          <View style={styles.row}>
            <TextInput
              label="Mobile"
              left={<TextInput.Icon icon="phone" />}
              error={inValidPhone}
              value={phone}
              onChangeText={(value: any) => setPhoneText(value)}
            />
            {inValidPhone && (
              <Text style={styles.error}>Valid Phone must be entered</Text>
            )}
          </View>
          <View style={styles.row}>
            <TextInput
              label="PIN"
              keyboardType="numeric"
              left={<TextInput.Icon icon="lock" />}
              value={pin}
              onChangeText={(value: any) => setPIN(value)}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.flex}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={styles.link}>Terms & Conditions</Text>
          </View>
        </View>
        <View style={styles.btn}>
          <View style={styles.row}>
            <Button
              icon={{
                source: 'arrow-left-circle',
                direction: 'rtl',
              }}
              mode="contained"
              onPress={() => signUp()}
              contentStyle={{
                flexDirection: 'row-reverse',
                backgroundColor: '#5669ff',
                height: 50,
              }}
              style={{borderRadius: 8}}
              loading={isLoading}
              disabled={!checked}>
              Sign Up
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    paddingHorizontal: 60,
  },
  loginText: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 50,
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
    marginTop: 20,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
});
export default SignUp;
