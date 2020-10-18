import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import LoginSVG from '../../asset/image/login2.svg';
import {fcmService} from '../../FCMService';
import {myColor} from '../../function/MyVar';
import {setAuthRedux} from '../../store';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const setForm = (inputType, value) => {
    setUser({
      ...user,
      [inputType]: value,
    });
  };

  const storeData = async (value, topic) => {
    console.log('Store Topic ====> ', topic);
    try {
      await AsyncStorage.setItem('token', value);
      await AsyncStorage.setItem('topic', topic);
    } catch (e) {
      // saving error
    }
  };

  const submitLogin = () => {
    setIsLoading(true);
    console.log('SUbmit Login');
    axios
      .post(`https://dry-forest-53707.herokuapp.com/api/auth/login`, user)
      .then((res) => {
        // let dataUser = res.data.user;
        const dataPengguna = res.data.user;

        dispatch(setAuthRedux(dataPengguna, res.data.access_token));

        console.log('subs saat login :kostku- ', res.data.user.kostku);
        storeData(res.data.access_token, 'kostku-' + res.data.user.kostku);
        subscribeToKost(res.data.access_token);

        // navigation.push('ListKamar');
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.response);
      });
  };

  const subscribeToKost = (token) => {
    const source = axios.CancelToken.source();

    try {
      axios
        .get('https://dry-forest-53707.herokuapp.com/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cancelToken: source.token,
        })
        .then((response) => {
          if (response.data.kostku != 0) {
            let topic = 'kostku-' + response.data.kostku;
            console.log('sub topic=' + topic);
            fcmService.subscribeToTopic(topic);
          }
          // console.log('topic ===>', response.data);
          setIsLoading(false);
          toHome();
        });
    } catch (error) {
      if (axios.isCancel(error)) {
        setIsLoading(false);
      } else {
        // handle error
        setIsLoading(false);
      }
    }

    return () => {
      source.cancel();
    };
  };

  const toHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'MainNavigator'}],
    });
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar translucent backgroundColor="transparent" />
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />

      <Animatable.View animation="bounceIn" style={styles.animSVG}>
        <View style={styles.wrapperSVG}>
          <LoginSVG width={200} height={200} />
          <Text style={styles.fontSVG}>Login</Text>
        </View>
      </Animatable.View>
      <Animatable.View animation="fadeInUpBig" style={styles.animForm}>
        <Text style={styles.text1}>Selamat Datang</Text>
        <Text style={styles.text2}>Silahkan Login dengan Akun Anda</Text>
        <View style={styles.wrapperField}>
          <View style={{position: 'relative', flex: 1}}>
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              onChangeText={(value) => setForm('email', value)}
            />
            <FontAwesome
              name="user-o"
              color="#05375A"
              size={25}
              style={styles.iconField}
            />
          </View>
        </View>
        <View style={styles.wrapperField}>
          <View style={{position: 'relative', flex: 1}}>
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={(value) => setForm('password', value)}
            />
            <FontAwesome
              name="lock"
              color="#05375A"
              size={25}
              style={styles.iconField}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => submitLogin()}>
          <View style={styles.btLogin}>
            <Text style={{color: 'white'}}>Login</Text>
          </View>
        </TouchableOpacity>
        <Text style={{textAlign: 'center', marginTop: 10}}>Atau</Text>

        <TouchableOpacity onPress={() => navigation.push('RegisterScreen')}>
          <Text style={styles.textDaftar}>
            Belum punya akun ? Silahkan Daftar
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: myColor.colorTheme,
    paddingTop: StatusBar.currentHeight,
  },
  animSVG: {
    flex: 4,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  wrapperSVG: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontSVG: {fontSize: 26, color: 'white'},
  animForm: {
    flex: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text1: {textAlign: 'center', fontWeight: 'bold', fontSize: 20},
  text2: {textAlign: 'center', fontSize: 14},
  wrapperField: {
    flexDirection: 'row',
    marginTop: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 25,
    height: 40,
    fontSize: 13,
    paddingLeft: 45,
    paddingRight: 20,
  },
  iconField: {
    position: 'absolute',
    top: 7,
    left: 12,
  },
  btLogin: {
    backgroundColor: myColor.myblue,
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
  },
  textDaftar: {
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
