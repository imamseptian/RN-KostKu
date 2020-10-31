import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import React, {useState, useRef} from 'react';
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
import {myColor, APIUrl, screenHeight, screenWidth} from '../../function/MyVar';
import {setAuthRedux} from '../../store';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [showPassword, setshowPassword] = useState(false);

  const refPassword = useRef();
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
      .post(`${APIUrl}/api/auth/login`, user)
      .then((res) => {
        // let dataUser = res.data.user;

        if (res.data.success) {
          const dataPengguna = res.data.user;
          // console.log(res.data);
          dispatch(setAuthRedux(dataPengguna, res.data.access_token));

          console.log('subs saat login :kostku- ', res.data.user.kostku);
          storeData(res.data.access_token, 'kostku-' + res.data.user.kostku);
          subscribeToKost(res.data.access_token);
        } else {
          alert('Maaf Email atau Password Salah');
          setIsLoading(false);
        }
        // console.log(res.data.success);

        // navigation.push('ListKamar');
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('ada error');
        setIsLoading(false);
        console.log(error.response);
      });
  };

  const subscribeToKost = (token) => {
    const source = axios.CancelToken.source();

    try {
      axios
        .get(APIUrl + '/api/user', {
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
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
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
          <FontAwesome
            name="user-o"
            color={myColor.fbtx}
            size={25}
            style={{marginRight: 5}}
          />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            onChangeText={(value) => setForm('email', value)}
            onSubmitEditing={() => {
              refPassword.current.focus();
            }}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.wrapperField}>
          <FontAwesome
            name="lock"
            color={myColor.fbtx}
            size={25}
            style={{marginRight: 5}}
          />
          <TextInput
            ref={refPassword}
            placeholder="Password"
            secureTextEntry={true}
            secureTextEntry={!showPassword}
            style={styles.textInput}
            onChangeText={(value) => setForm('password', value)}
          />
          <TouchableOpacity
            style={{marginLeft: 5}}
            onPress={() => setshowPassword(!showPassword)}>
            <FontAwesome
              name={showPassword ? 'eye-slash' : 'eye'}
              color={myColor.fbtx}
              size={25}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => submitLogin()}>
          <View style={styles.btLogin}>
            <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>
              Login
            </Text>
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
    alignItems: 'center',
    paddingHorizontal: 10,
    width: screenWidth * 0.9,
    borderRadius: 10,
    borderWidth: 0.5,
    height: 40,
  },
  textInput: {
    borderColor: '#E8E8E8',
    fontSize: 13,
    flex: 1,
  },
  iconField: {},
  btLogin: {
    backgroundColor: myColor.myblue,
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  textDaftar: {
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
