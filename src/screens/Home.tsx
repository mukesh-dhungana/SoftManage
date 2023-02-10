import React from 'react';
import {Switch, Button} from 'react-native-paper';
import {Text, View, Image, StyleSheet} from 'react-native';
import {ENABLED_APP_LOCK, LOGGED_IN, PIN_KEY} from '../helpers/sharedPrefKeys';
import isEmpty from '../helpers/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';

function Home(props: any) {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = async () => {
    await AsyncStorage.setItem(ENABLED_APP_LOCK, !isSwitchOn ? '1' : '0');
    setIsSwitchOn(!isSwitchOn);
  };
  const [isResetMode, setResetMode] = React.useState(false);
  const {navigation} = props;
  React.useEffect(() => {
    async function getPIN() {
      const pin = await AsyncStorage.getItem(PIN_KEY);
      if (!isEmpty(pin)) setResetMode(true);
      const appLock = await AsyncStorage.getItem(ENABLED_APP_LOCK);
      setIsSwitchOn(appLock === '1');
    }
    getPIN();
  }, []);

  const logOut = async () => {
    await AsyncStorage.removeItem(LOGGED_IN);
    await AsyncStorage.removeItem(ENABLED_APP_LOCK);
    await AsyncStorage.removeItem(PIN_KEY);
    navigation.dispatch(StackActions.replace('Login'));
  };
  return (
    <View style={styles.container}>
      <View style={styles.enableLock}>
        <Text style={{marginRight: 12}}>Enable App lock</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>
      <View style={styles.btn}>
        <View style={styles.row}>
          <Button
            icon={{
              source: 'arrow-left-circle',
              direction: 'rtl',
            }}
            mode="contained"
            onPress={() => navigation.navigate('Unlock', {name: 'Unlock'})}
            contentStyle={{
              flexDirection: 'row-reverse',
              backgroundColor: '#5669ff',
              height: 50,
            }}
            style={{borderRadius: 8}}
            disabled={!isSwitchOn}>
            {isResetMode ? 'Reset PIN' : ' Set PIN'}
          </Button>
        </View>
        <View style={styles.row}>
          <Button
            icon={{
              source: 'arrow-left-circle',
              direction: 'rtl',
            }}
            mode="contained"
            onPress={() => logOut()}
            contentStyle={{
              flexDirection: 'row-reverse',
              backgroundColor: '#bf2358',
              height: 50,
            }}
            style={{borderRadius: 8}}>
            Logout
          </Button>
        </View>
      </View>
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
  loginText: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 0,
    fontWeight: 'bold',
  },
  row: {
    marginTop: 20,
  },
  enableLock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btn: {
    marginTop: 20,
  },
});
export default Home;
