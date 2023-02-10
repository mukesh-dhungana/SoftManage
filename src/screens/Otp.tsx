import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {TextInput, Button, Checkbox} from 'react-native-paper';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGGED_IN} from '../helpers/sharedPrefKeys';

function Otp(props: any) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [inValidCode, setInvalidCode] = React.useState(false);
  const {navigation} = props;
  const verifyOTP = async () => {
    setInvalidCode(otp !== otpText);
    if (otp === otpText) {
      await AsyncStorage.setItem(LOGGED_IN, '1');
      navigation.dispatch(StackActions.replace('Home'));
    }
  };
  12;

  const [otp, setOTP] = React.useState('');
  const [otpText, setOTPText] = React.useState('');
  React.useEffect(() => {
    const code = Math.floor(1000 + Math.random() * 9000);
    setOTPText(code.toString());
  }, []);
  return (
    <View>
      <View style={styles.goBack} onTouchEnd={() => navigation.goBack()}>
        <Icon name="arrow-circle-left" size={30} />
      </View>

      <View style={styles.container}>
        <Text style={styles.loginText}>OTP Verification</Text>
        <View style={styles.row}>
          <OTPInputView
            style={{width: '100%', height: 200, backgroundColor: '#ffffff00'}}
            pinCount={4}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            onCodeChanged={code => {
              setOTP(code);
              setInvalidCode(false);
            }}
            autoFocusOnLoad
            codeInputFieldStyle={
              inValidCode ? styles.error : styles.underlineStyleBase
            }
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            //   onCodeFilled={code => {
            //     setOTP(code);

            //   }}
          />
        </View>
        <View style={styles.btn}>
          <View style={styles.row}>
            <Button
              icon={{
                source: 'arrow-left-circle',
                direction: 'rtl',
              }}
              mode="contained"
              onPress={() => verifyOTP()}
              contentStyle={{
                flexDirection: 'row-reverse',
                backgroundColor: '#5669ff',
                height: 50,
              }}
              style={{borderRadius: 8}}
              loading={isLoading}>
              Verify
            </Button>
          </View>
        </View>
        <View style={styles.row}>
          <Text>Your OTP code is : {otpText}</Text>
        </View>
      </View>
    </View>
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
    marginBottom: 0,
    fontWeight: 'bold',
  },
  row: {
    marginTop: 20,
  },
  error: {
    width: 45,
    height: 45,
    borderWidth: 2,
    borderColor: '#bf2358',
    borderRadius: 5,
    color: '#282826',
    fontSize: 18,
    fontWeight: 'bold',
  },
  btn: {
    marginTop: 0,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
  otpInput: {
    backgroundColor: 'red',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
    borderColor: 'red',
  },

  borderStyleHighLighted: {
    borderColor: '#7bd57b',
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 2,
    borderColor: '#dddddd',
    borderRadius: 5,
    color: '#282826',
    fontSize: 18,
    fontWeight: 'bold',
  },

  underlineStyleHighLighted: {
    borderColor: '#a5a5a5',
  },
  goBack: {
    marginTop: 50,
    marginLeft: 30,
  },
});

export default Otp;
