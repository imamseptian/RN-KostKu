import {Picker} from '@react-native-community/picker';
import axios from 'axios';
import React, {useEffect, useState, useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
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
import ImagePicker from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Permission, PERMISSION_TYPE} from '../../AppPermission';
import {fcmService} from '../../FCMService';
import {myColor} from '../../function/MyVar';
import {setUserRedux} from '../../store';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const KostForm = ({navigation}) => {
  const dispatch = useDispatch();
  const dataRedux = useSelector((state) => state.AuthReducer);
  const {control, handleSubmit, errors} = useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [user, setUser] = useState({
    nama: '',
    provinsi: 0,
    kota: 0,
    alamat: '',
    jenis: 1,
    notelp: '',
    desc: '',
    owner: dataRedux.user.id,
    active: true,
  });

  const refNoTelp = useRef();
  const refDeskripsi = useRef();

  const hasUnsavedChanges = Boolean(user);
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges || setIsSubmit) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Yakin ingin meninggalkan halaman ini?',
          'Data yang sudah anda isi akan hilang jika anda meninggalkan halaman ini',
          [
            {text: 'Batal', style: 'cancel', onPress: () => {}},
            {
              text: 'Pergi',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ],
        );
      }),
    [navigation, hasUnsavedChanges],
  );

  const ProvURL = `https://dev.farizdotid.com/api/daerahindonesia/provinsi`;
  // const ProvURL = `https://x.rajaapi.com/MeP7c5neqPkLFsmfECbpnjiY69MQPqkEzRDEEsho6flCgp9kNdVa4BBFVG/m/wilayah/provinsi`;
  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);

  const [invalidProv, setinvalidProv] = useState(false);
  const [invalidKota, setinvalidKota] = useState(false);
  const [invalidJenis, setinvalidJenis] = useState(false);
  const [dataFoto, setDataFoto] = useState({
    isUploaded: false,
    uri: '',
    type: '',
    data: '',
    base64: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  let URLkota = `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${user.provinsi}`;

  useEffect(() => {
    axios
      .get(ProvURL)
      .then((response) => {
        setProvinsi(response.data.provinsi);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (user.provinsi != 0) {
      axios
        .get(URLkota)
        .then((response) => {
          setKota(response.data.kota_kabupaten);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user.provinsi]);

  const setForm = (inputType, value) => {
    setUser({
      ...user,
      [inputType]: value,
    });
  };

  const goToTop = () => {
    scroll.scrollTo({x: 0, y: 0, animated: true});
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

  const onSubmit = (data) => {
    if (user.provinsi == 0 || user.kota == 0 || user.jenis == 0) {
      if (user.provinsi == 0) {
        setinvalidProv(true);
      }
      if (user.kota == 0) {
        setinvalidKota(true);
      }
    } else {
      setIsSubmit(true);
      Alert.alert(
        'Konfirmasi',
        'Apakah anda yakin data yang diisi telah sesuai ?',
        [
          {
            text: 'Batal',
            onPress: () => setIsSubmit(false),
            style: 'cancel',
          },
          {text: 'Ya', onPress: () => addData()},
        ],
        {cancelable: false},
      );
    }
  };
  // const scrollRef = useRef(ScrollView);

  const onError = (errors, e) => {
    if (user.provinsi == 0) {
      setinvalidProv(true);
    }
    if (user.kota == 0) {
      setinvalidKota(true);
    }

    goToTop();
  };

  const goToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'MainScreen'}],
    });
  };

  const addData = () => {
    if (dataFoto.isUploaded) {
      axios
        .post(
          `https://dry-forest-53707.herokuapp.com/api/kost`,
          {...user, foto_kost: dataFoto.base64},
          {
            headers: {
              Authorization: `Bearer ${dataRedux.token}`,
            },
          },
        )
        .then((res) => {
          // console.log('sukses');
          const dataPengguna = res.data.user;
          console.log('sukses matamu ', res.data);
          let topic = 'kostku-' + res.data.data.id;

          fcmService.subscribeToTopic(topic);
          dispatch(setUserRedux(dataPengguna));

          // console.log(res.data);
          goToHome();
        })
        .catch((error) => {
          setIsSubmit(false);
        });
    } else {
      axios
        .post(`https://dry-forest-53707.herokuapp.com/api/kost`, user, {
          headers: {
            Authorization: `Bearer ${dataRedux.token}`,
          },
        })
        .then((res) => {
          const dataPengguna = res.data.user;
          console.log('sukses matamu ', res.data);
          let topic = 'kostku-' + res.data.data.id;
          console.log('Sukses dan Subs to ', topic);

          fcmService.subscribeToTopic(topic);
          dispatch(setUserRedux(dataPengguna));

          setIsSubmit(false);
          // console.log(res.data);
          goToHome();
        })
        .catch((error) => {
          console.log('gagal');
          setIsSubmit(false);
          console.log(user);
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={styles.flyView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={(c) => {
            scroll = c;
          }}
          contentContainerStyle={{paddingBottom: 20}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            Formulir Kost
          </Text>

          <TouchableNativeFeedback onPress={() => pickImage()}>
            {!dataFoto.isUploaded ? (
              <View
                style={{
                  width: 0.8 * screenWidth,
                  maxWidth: 300,
                  height: (2 / 3) * 0.8 * screenWidth,
                  maxHeight: 200,
                  borderRadius: 10,
                  backgroundColor: myColor.darkText,
                  marginLeft: 0.05 * screenWidth,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>
                  Tekan disini untuk upload Foto Kost
                </Text>
                <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>
                  *Opsional
                </Text>
              </View>
            ) : (
              <Image
                source={{
                  uri: dataFoto.uri,
                }}
                style={{
                  width: 0.8 * screenWidth,
                  maxWidth: 300,
                  height: (2 / 3) * 0.8 * screenWidth,
                  maxHeight: 200,
                  borderRadius: 10,
                  marginLeft: 0.05 * screenWidth,
                }}
                resizeMode="cover"
              />
            )}
          </TouchableNativeFeedback>

          <View style={styles.formWrapper}>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <View style={styles.fieldForm}>
                  <FontAwesome name="home" size={25} style={{opacity: 0.5}} />
                  <TextInput
                    placeholder="Nama Kost"
                    style={{marginLeft: 5, flex: 1}}
                    onChangeText={(value) => {
                      onChange(value);
                      setForm('nama', value);
                    }}
                    value={value}
                  />
                </View>
              )}
              name="nama"
              rules={{required: true}}
              defaultValue=""
            />

            {errors.nama && errors.nama.type === 'required' && (
              <View style={styles.viewError}>
                <Text style={styles.textError}>Nama Kost Perlu Diisi</Text>
              </View>
              //
            )}
          </View>

          <View style={styles.formWrapper}>
            <View>
              <View style={styles.fieldForm}>
                <FontAwesome5 name="city" size={25} style={{opacity: 0.5}} />
                <Picker
                  selectedValue={user.provinsi}
                  style={{height: 40, flex: 1}}
                  onValueChange={(itemValue, itemIndex) => {
                    if (itemValue != null) {
                      setinvalidProv(false);
                      setForm('provinsi', itemValue);
                      console.log(URLkota);
                    }
                  }}>
                  <Picker.Item label="Pilih Provinsi" />
                  {provinsi.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={item.nama}
                        value={item.id}
                      />
                    );
                  })}
                </Picker>
              </View>
              {invalidProv && (
                <View style={styles.viewError}>
                  <Text style={styles.textError}>Provinsi Perlu Dipilih</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.formWrapper}>
            <View>
              <View style={styles.fieldForm}>
                <MaterialCommunityIcons
                  name="home-city"
                  size={25}
                  style={{opacity: 0.5}}
                />
                <Picker
                  selectedValue={user.kota}
                  style={{height: 50, flex: 1, fontSize: 3}}
                  textStyle={{fontSize: 12}}
                  onValueChange={(itemValue, itemIndex) => {
                    if (itemValue != null) {
                      setinvalidKota(false);
                      setForm('kota', itemValue);
                    }
                  }}>
                  <Picker.Item label="Pilih Kota" />
                  {kota.map((item, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={item.nama}
                        value={item.id}
                      />
                    );
                  })}
                </Picker>
              </View>
              {invalidKota && (
                <View style={styles.viewError}>
                  <Text style={styles.textError}>Kota Perlu Dipilih</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.formWrapper}>
            <View>
              <View style={styles.fieldForm}>
                <MaterialCommunityIcons
                  name="home-city"
                  size={25}
                  style={{opacity: 0.5}}
                />
                <Picker
                  selectedValue={user.jenis}
                  style={{height: 50, flex: 1, fontSize: 3}}
                  textStyle={{fontSize: 12}}
                  onValueChange={(itemValue, itemIndex) => {
                    if (itemValue != null) {
                      setinvalidKota(false);
                      setForm('jenis', itemValue);
                    }
                  }}>
                  <Picker.Item label="Pilih Jenis" />
                  <Picker.Item key={'1'} label="Kost Campuran" value={1} />
                  <Picker.Item key={'2'} label="Kost Pria" value={2} />
                  <Picker.Item key={'3'} label="Kost Wanita" value={3} />
                </Picker>
              </View>
              {invalidJenis && (
                <View style={styles.viewError}>
                  <Text style={styles.textError}>Jenis Kost Perlu Dipilih</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.formWrapper}>
            <View>
              <View style={styles.fieldForm}>
                <Entypo name="address" size={25} style={{opacity: 0.5}} />

                <Controller
                  control={control}
                  render={({onChange, onBlur, value}) => (
                    <TextInput
                      placeholder="Alamat Kost"
                      style={{marginLeft: 5, flex: 1}}
                      onChangeText={(value) => {
                        onChange(value);
                        setForm('alamat', value);
                      }}
                      onSubmitEditing={() => {
                        refNoTelp.current.focus();
                      }}
                      blurOnSubmit={false}
                      value={value}
                    />
                  )}
                  name="alamat"
                  rules={{required: true}}
                  defaultValue=""
                />
              </View>
              {errors.alamat && errors.alamat.type === 'required' && (
                <View style={styles.viewError}>
                  <Text style={styles.textError}>Alamat Kost Perlu Diisi</Text>
                </View>
                //
              )}
            </View>
          </View>

          <View style={styles.formWrapper}>
            <View>
              <View style={styles.fieldForm}>
                <FontAwesome name="phone" size={25} style={{opacity: 0.5}} />
                <Controller
                  control={control}
                  render={({onChange, onBlur, value}) => (
                    <TextInput
                      ref={refNoTelp}
                      placeholder="No Telepon"
                      style={{marginLeft: 5, flex: 1}}
                      onChangeText={(value) => {
                        onChange(value);
                        setForm('notelp', value);
                      }}
                      value={value}
                      keyboardType="numeric"
                      onSubmitEditing={() => {
                        refDeskripsi.current.focus();
                      }}
                      blurOnSubmit={false}
                    />
                  )}
                  name="notelp"
                  rules={{required: true}}
                  defaultValue=""
                />
              </View>
              {errors.notelp && errors.notelp.type === 'required' && (
                <View style={styles.viewError}>
                  <Text style={styles.textError}>
                    Nomor Telepon Kost Perlu Diisi
                  </Text>
                </View>
                //
              )}
            </View>
          </View>

          <View style={styles.formWrapper}>
            <View>
              <View style={[styles.fieldForm, {height: 80}]}>
                <Controller
                  control={control}
                  render={({onChange, onBlur, value}) => (
                    <TextInput
                      ref={refDeskripsi}
                      placeholder="Deskripsi"
                      style={{
                        marginLeft: 5,
                      }}
                      placeholder="Deskripsi Tambahan"
                      multiline={true}
                      onChangeText={(value) => {
                        onChange(value);
                        setForm('desc', value);
                      }}
                      value={value}
                    />
                  )}
                  name="desc"
                  rules={{required: true}}
                  defaultValue=""
                />
              </View>
              {errors.desc && errors.desc.type === 'required' && (
                <View style={styles.viewError}>
                  <Text style={styles.textError}>
                    Deskripsi Kost Perlu Diisi
                  </Text>
                </View>
                //
              )}
            </View>
          </View>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit, onError)}
            disabled={isSubmit}>
            <View
              style={{
                height: 40,
                backgroundColor: myColor.myblue,
                marginHorizontal: 20,
                borderRadius: 10,
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                Submit
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* <View style={{flex: 1}}></View> */}

        {/* <View
          style={{
            height: 0.5 * screenHeight,
            backgroundColor: 'red',
          }}>
          
        </View> */}
      </View>
    </View>
  );
};

export default KostForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: myColor.colorTheme,
  },
  containerTop: {
    flex: 2,
    backgroundColor: myColor.colorTheme,
  },
  containerBot: {
    flex: 5,
  },
  flyView: {
    width: 0.9 * screenWidth,
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // elevation: 5,
  },
  formWrapper: {
    marginTop: 15,
    marginHorizontal: 20,
  },
  fieldForm: {
    height: 40,
    borderWidth: 0.5,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  viewError: {width: 250, paddingTop: 3},
  textError: {
    color: '#d63031',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 40,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
