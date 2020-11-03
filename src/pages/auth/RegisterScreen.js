import axios from 'axios';
import React, {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {Permission, PERMISSION_TYPE} from '../../AppPermission';
import RegisterSVG from '../../asset/image/register2.svg';
import {APIUrl, myColor, screenHeight, screenWidth} from '../../function/MyVar';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const refNamaBelakang = useRef();
  const refEmail = useRef();
  const refPassword = useRef();
  const refPassword_Confirmation = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isStatus, setIsStatus] = useState({
    pass: true,
    confirm: true,
  });
  const [errorMsg, seterrorMsg] = useState({
    nama_depan: '',
    nama_belakang: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [isPressed, setIsPressed] = useState(false);

  const [user, setUser] = useState({
    nama_depan: '',
    nama_belakang: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [dataFoto, setDataFoto] = useState({
    isUploaded: false,
    uri: '',
    type: '',
    data: '',
    base64: '',
  });

  // useEffect(() => {
  //   if (dataFoto.data != '') {
  //     let image = 'data:' + dataFoto.type + ';base64,' + dataFoto.data;
  //     setForm('foto', image);
  //   }
  // }, [dataFoto]);

  const setStatus = (inputType, value) => {
    setIsStatus({
      ...isStatus,
      [inputType]: value,
    });
  };

  const setForm = (inputType, value) => {
    setUser({
      ...user,
      [inputType]: value,
    });
  };

  useEffect(() => {
    console.log('halo');

    return console.log('Tutup Register');
  }, []);

  const cleanError = () => {
    seterrorMsg({
      nama_depan: '',
      nama_belakang: '',
      email: '',
      password: '',
      password_confirmation: '',
    });
  };

  const submitRegister = () => {
    setIsLoading(true);

    axios
      .post(
        `https://dry-forest-53707.herokuapp.com/api/auth/signup`,
        dataFoto.isUploaded ? {...user, foto_profil: dataFoto.base64} : user,
      )
      .then((res) => {
        //   console.log(res);
        console.log(res.data);

        if (res.data.success) {
          navigation.pop(1);
        } else {
          console.log('proses error');
          let passwordError = '';
          let konfirmasiError = '';
          let arrPass = [];
          if (res.data.errors.password) {
            arrPass = res.data.errors.password;
          }
          if (arrPass.length > 0) {
            if (arrPass.includes('Password perlu diisi')) {
              passwordError = 'Password perlu diisi';
            } else if (arrPass.includes('Panjang password minimal 8 digit')) {
              passwordError = 'Panjang password minimal 8 digit';
            }
            if (arrPass.includes('Konfirmasi Password tidak cocok')) {
              konfirmasiError = 'Konfirmasi Password tidak cocok';
            }
          }

          console.log('bruuhhh');
          seterrorMsg({
            nama_depan: res.data.errors.nama_depan
              ? res.data.errors.nama_depan
              : '',
            nama_belakang: res.data.errors.nama_belakang
              ? res.data.errors.nama_belakang
              : '',
            email: res.data.errors.email ? res.data.errors.email : '',
            password: passwordError,
            password_confirmation: konfirmasiError,
          });
          console.log('=============>', res.data.errors.nama_depan);
          console.log('AYAYA');
          setIsLoading(false);
        }

        // console.log(res.data);
        // console.log(
        //   APIUrl + '/kostdata/kost/foto/' + res.data.user.foto_profil,
        // );
        // navigation.pop(1);
      })
      .catch((error) => {
        console.log(dataFoto.base64);
        // console.log(error.response);
        setIsLoading(false);
      });
  };

  const pickImage = async () => {
    setIsPressed(true);
    await Permission.requestMultiple([
      PERMISSION_TYPE.photo,
      PERMISSION_TYPE.camera,
    ]);
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', base64: true, maxWidth: 720, maxHeight: 480},
      (response) => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
          setIsPressed(false);
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          setIsPressed(false);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          setIsPressed(false);
        } else {
          let image = 'data:' + response.type + ';base64,' + response.data;
          setDataFoto({
            ...dataFoto,
            isUploaded: true,
            uri: response.uri,
            type: response.type,
            data: response.data,
            base64: image,
          });
          setIsPressed(false);
        }
      },
    );
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
          <RegisterSVG width={200} height={160} />
          <Text style={styles.fontSVG}>Register</Text>
        </View>
      </Animatable.View>

      <Animatable.View animation="fadeInUpBig" style={styles.animForm}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: 0.9 * screenWidth,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <TouchableNativeFeedback onPress={() => pickImage()}>
              <View
                style={{
                  height: 105,
                  width: 105,
                  borderRadius: 50,
                  borderWidth: 3,
                  borderColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 5,
                  marginBottom: 10,
                }}>
                {!dataFoto.isUploaded ? (
                  <Text
                    style={{
                      textAlign: 'center',
                      color: myColor.blackText,
                      fontWeight: 'bold',
                      fontSize: 12,
                    }}>
                    Tekan untuk upload foto profil *opsional
                  </Text>
                ) : (
                  <Image
                    source={{
                      uri: dataFoto.uri,
                    }}
                    style={{height: 100, width: 100, borderRadius: 50}}
                  />
                )}
              </View>
            </TouchableNativeFeedback>
          </View>

          <View style={styles.wrapperNama}>
            <View>
              <View style={styles.fieldNama}>
                <TextInput
                  value={user.nama_depan}
                  placeholder="Nama Depan"
                  style={styles.inputNama}
                  onSubmitEditing={() => {
                    refNamaBelakang.current.focus();
                  }}
                  blurOnSubmit={false}
                  onChangeText={(value) => setForm('nama_depan', value)}
                />
                {/* <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: myColor.alert,
                }}>
                Nama Depan Harus Diisi
              </Text> */}
              </View>
              <Text
                style={[
                  styles.textError,
                  {maxWidth: 0.43 * screenWidth, textAlign: 'center'},
                ]}>
                {errorMsg.nama_depan}
              </Text>
            </View>
            <View>
              <View style={styles.fieldNama}>
                <TextInput
                  ref={refNamaBelakang}
                  value={user.nama_belakang}
                  placeholder="Nama Belakang"
                  style={styles.inputNama}
                  onSubmitEditing={() => {
                    refEmail.current.focus();
                  }}
                  blurOnSubmit={false}
                  onChangeText={(value) => setForm('nama_belakang', value)}
                />
              </View>
              <Text
                style={[
                  styles.textError,
                  {maxWidth: 0.43 * screenWidth, textAlign: 'center'},
                ]}>
                {errorMsg.nama_belakang}
              </Text>
            </View>
          </View>

          {/*           
          <View>
            <View style={styles.wrapperField}>
              <TextInput
                placeholder="Email"
                style={styles.textInput}
                onChangeText={(value) => setForm('email', value)}
              />
              <MaterialCommunityIcons
                name="email"
                color="#05375A"
                size={25}
                style={styles.iconField}
              />
            </View>
            <Text style={[styles.textError, {marginLeft: 25}]}>
              Email Harus Diisi
            </Text>
          </View> */}

          <View style={styles.wrapperLine}>
            <View style={styles.wrapperField}>
              <MaterialCommunityIcons
                name="email"
                color={myColor.fbtx}
                size={25}
                style={{marginRight: 5}}
              />
              <TextInput
                placeholder="Email"
                ref={refEmail}
                value={user.email}
                style={styles.textInput}
                onChangeText={(value) => setForm('email', value)}
                onSubmitEditing={() => {
                  refPassword.current.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <Text style={[styles.textError, {marginLeft: 40}]}>
              {errorMsg.email}
            </Text>
          </View>

          <View style={styles.wrapperLine}>
            <View style={styles.wrapperField}>
              <MaterialCommunityIcons
                name="lock"
                color={myColor.fbtx}
                size={25}
                style={{marginRight: 5}}
              />

              <TextInput
                placeholder="Password"
                ref={refPassword}
                value={user.password}
                secureTextEntry={isStatus.pass}
                style={styles.textInput}
                onSubmitEditing={() => {
                  refPassword_Confirmation.current.focus();
                }}
                onChangeText={(value) => setForm('password', value)}
                blurOnSubmit={false}
              />

              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => setStatus('pass', !isStatus.pass)}>
                <FontAwesome
                  name={isStatus.pass != true ? 'eye-slash' : 'eye'}
                  color={myColor.fbtx}
                  size={25}
                />
              </TouchableOpacity>
            </View>
            <Text style={[styles.textError, {marginLeft: 40}]}>
              {errorMsg.password}
            </Text>
          </View>

          <View style={styles.wrapperLine}>
            <View style={styles.wrapperField}>
              <MaterialCommunityIcons
                name="lock-alert"
                color={myColor.fbtx}
                size={25}
                style={{marginRight: 5}}
              />

              <TextInput
                ref={refPassword_Confirmation}
                placeholder="Konfirmasi Password"
                value={user.password_confirmation}
                secureTextEntry={isStatus.confirm}
                style={styles.textInput}
                onChangeText={(value) =>
                  setForm('password_confirmation', value)
                }
              />

              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => setStatus('confirm', !isStatus.confirm)}>
                <FontAwesome
                  name={isStatus.confirm != true ? 'eye-slash' : 'eye'}
                  color={myColor.fbtx}
                  size={25}
                />
              </TouchableOpacity>
            </View>
            <Text style={[styles.textError, {marginLeft: 40}]}>
              {errorMsg.password_confirmation}
            </Text>
          </View>

          {/* <View style={styles.wrapperField}>
            <View>
              <MaterialCommunityIcons
                name="lock"
                color="#05375A"
                size={25}
                style={styles.iconField}
              />
            </View>

            <TextInput
              placeholder="Password"
              secureTextEntry={isStatus.pass}
              style={styles.textInput}
              onChangeText={(value) => setForm('password', value)}
            />

            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 7,
                right: 12,
                opacity: 0.5,
              }}
              onPress={() => setStatus('pass', !isStatus.pass)}>
              <FontAwesome
                name={isStatus.pass != true ? 'eye-slash' : 'eye'}
                color="#05375A"
                size={25}
              />
            </TouchableOpacity>
          </View> */}

          {/* <View style={styles.wrapperField}>
            <TextInput
              placeholder="Konfirmasi Password"
              secureTextEntry={isStatus.confirm}
              style={styles.textInput}
              onChangeText={(value) => setForm('password_confirmation', value)}
            />
            <MaterialCommunityIcons
              name="lock-alert"
              color="#05375A"
              size={25}
              style={styles.iconField}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 7,
                right: 12,
                opacity: 0.5,
              }}
              onPress={() => setStatus('confirm', !isStatus.confirm)}>
              <FontAwesome
                name={isStatus.confirm != true ? 'eye-slash' : 'eye'}
                color="#05375A"
                size={25}
              />
            </TouchableOpacity>
          </View> */}
          <TouchableOpacity
            onPress={() => {
              submitRegister();
            }}>
            <View style={styles.btLogin}>
              <Text style={{color: 'white'}}>Register</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
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
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  wrapperSVG: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontSVG: {fontSize: 26, color: 'white'},
  animForm: {
    maxHeight: 0.65 * screenHeight,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 5,
    paddingBottom: 10,
    alignItems: 'center',
  },
  text1: {textAlign: 'center', fontWeight: 'bold', fontSize: 20},
  text2: {textAlign: 'center', fontSize: 14, fontWeight: 'bold'},
  wrapperField: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: myColor.divider,
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    width: 0.9 * screenWidth,
    paddingHorizontal: 10,
  },
  wrapperNama: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    width: 0.9 * screenWidth,
    justifyContent: 'space-between',
  },
  fieldNama: {
    borderWidth: 1,
    borderColor: myColor.divider,
    borderRadius: 10,
    height: 40,
    width: 0.43 * screenWidth,
    alignItems: 'center',
  },
  inputNama: {},
  textInput: {
    fontSize: 12,
    flex: 1,
  },

  btLogin: {
    backgroundColor: myColor.myblue,
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  textDaftar: {
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  textError: {
    fontSize: 12,
    fontWeight: 'bold',
    color: myColor.alert,
    maxWidth: 0.9 * screenWidth - 50,
  },
  wrapperLine: {
    marginBottom: 5,
  },
});
