import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {Text} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {Permission, PERMISSION_TYPE} from '../../AppPermission';
import {FormFieldIcon} from '../../components/atoms';
import {APIUrl, myColor} from '../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const FormKelasKamar = ({navigation}) => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  const {control, handleSubmit, errors, reset, getValues, remove} = useForm();
  const [inputList, setInputList] = useState([{item: ''}]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [invalidFasilitas, setInvalidFasilitas] = useState(false);
  const [dataFoto, setDataFoto] = useState({
    isUploaded: false,
    uri: '',
    type: '',
    data: '',
  });
  const [kamar, setKamar] = useState({
    nama: '',
    harga: 0,
    kapasitas: 0,
    fasilitas: inputList,
    owner: dataRedux.user.kostku,
    foto: '',
  });

  useEffect(() => {
    if (dataFoto.data != '') {
      let image = 'data:' + dataFoto.type + ';base64,' + dataFoto.data;
      setForm('foto', image);
    }
  }, [dataFoto]);

  useEffect(() => {
    setKamar({...kamar, fasilitas: JSON.stringify(inputList)});
  }, [inputList]);

  const pickImage = async () => {
    setIsPressed(true);
    await Permission.requestMultiple([
      PERMISSION_TYPE.photo,
      PERMISSION_TYPE.camera,
    ]);
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', base64: true},
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
          setDataFoto({
            ...dataFoto,
            isUploaded: true,
            uri: response.uri,
            type: response.type,
            data: response.data,
          });
          setIsPressed(false);
        }
      },
    );
  };

  const handleInputChange = (e, index, inputType) => {
    const list = [...inputList];
    list[index][inputType] = e;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, {item: ''}]);
  };

  const onSubmit = (data) => {
    // setIsSubmit(true);
    if (invalidFasilitas != true) {
      let i;
      for (i = 0; i < inputList.length; i++) {
        if (inputList[i].item == '') {
          setIsSubmit(false);
          goToTop();
          return setInvalidFasilitas(true);
        }
      }
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
    } else {
      setIsSubmit(false);
      goToTop();
    }
  };

  const onError = (errors, e) => {
    cekFasilitas();
    goToTop();
  };

  const cekFasilitas = () => {
    let i;
    for (i = 0; i < inputList.length; i++) {
      if (inputList[i].item == '') {
        return setInvalidFasilitas(true);
      }
    }
    return setInvalidFasilitas(false);
  };

  const addData = async () => {
    setIsSubmit(true);
    axios
      .post(APIUrl + '/api/class', kamar, {
        headers: {
          Authorization: `Bearer ${dataRedux.token}`,
        },
      })
      .then((res) => {
        setIsSubmit(false);
        // console.log(kamar);
        navigation.pop(1);
      })
      .catch((error) => {
        setIsSubmit(false);
        console.log(error);
        // console.log(kamar);
      });
  };

  const setForm = (inputType, value) => {
    setKamar({
      ...kamar,
      [inputType]: value,
    });
  };

  const goToTop = () => {
    scroll.scrollTo({x: 0, y: 0, animated: true});
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <View
        style={{
          paddingTop: StatusBar.currentHeight + 20,
          flex: 1,
          backgroundColor: myColor.colorTheme,
        }}></View>
      <View style={{flex: 4}}></View>
      <View
        style={{
          position: 'absolute',
          top: StatusBar.currentHeight + 5,
          left: 0.05 * screenWidth,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Form Tambah Kelas Kamar
        </Text>
        <View
          style={{
            height: 0.88 * screenHeight,
            width: 0.9 * screenWidth,
            backgroundColor: 'white',
            position: 'relative',

            elevation: 5,
            borderRadius: 10,
          }}>
          <Spinner
            visible={isSubmit}
            textContent={'Tunggu Sebentar'}
            textStyle={{color: '#FFF'}}
          />
          {/* UPLOAD IMAGE SECTION */}
          <ScrollView
            ref={(c) => {
              scroll = c;
            }}
            contentContainerStyle={{paddingBottom: 25}}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                alignItems: 'center',
                borderBottomColor: myColor.darkText,
                borderBottomWidth: 0.5,
                paddingBottom: 10,
                marginBottom: 10,
              }}>
              <TouchableNativeFeedback
                disabled={isPressed}
                onPress={() => pickImage()}>
                {dataFoto.isUploaded != true ? (
                  <View
                    style={{
                      width: 0.83 * screenWidth,
                      height: (2 / 3) * 0.83 * screenWidth,
                      backgroundColor: '#636e72',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      marginTop: 15,
                    }}>
                    <FontAwesome name="upload" color="#fff" size={50} />
                  </View>
                ) : (
                  <Image
                    source={{
                      uri: dataFoto.uri,
                    }}
                    style={{
                      height: (2 / 3) * 0.83 * screenWidth,
                      width: 0.83 * screenWidth,
                      borderRadius: 10,
                      marginTop: 15,
                    }}
                    resizeMode="cover"
                  />
                )}
              </TouchableNativeFeedback>

              <View style={{marginTop: 10, margin: 3}}>
                <TouchableNativeFeedback
                  disabled={isPressed}
                  onPress={() => pickImage()}>
                  <View
                    style={{
                      height: 30,
                      width: 150,
                      backgroundColor: myColor.addfacility,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      elevation: 5,
                    }}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      Upload Gambar
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>

            <View style={styles.formWrapper}>
              <View style={styles.fieldWrapper}>
                <Controller
                  control={control}
                  render={({onChange, onBlur, value}) => (
                    <FormFieldIcon
                      icon="door-closed"
                      placeholder="Nama Kamar"
                      onChangeText={(v) => {
                        onChange(v);
                        setForm('nama', v);
                      }}
                      value={value}
                    />
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

              <View style={styles.fieldWrapper}>
                <Controller
                  control={control}
                  render={({onChange, onBlur, value}) => (
                    <FormFieldIcon
                      icon="money-bill-alt"
                      placeholder="Harga Kamar"
                      keyboardType="numeric"
                      onChangeText={(v) => {
                        onChange(v);
                        setForm('harga', parseInt(v));
                        console.log(value);
                      }}
                      value={value}
                    />
                  )}
                  name="harga"
                  rules={{required: true}}
                  defaultValue=""
                />

                {errors.harga && errors.harga.type === 'required' && (
                  <View style={styles.viewError}>
                    <Text style={styles.textError}>Harga Perlu Diisi</Text>
                  </View>
                  //
                )}
              </View>

              <View style={styles.fieldWrapper}>
                <Controller
                  control={control}
                  render={({onChange, onBlur, value}) => (
                    <FormFieldIcon
                      icon="users"
                      placeholder="Kapasitas kamar"
                      keyboardType="number-pad"
                      onChangeText={(value) => {
                        onChange(value);
                        setForm('kapasitas', parseInt(value));
                      }}
                      value={value}
                    />
                  )}
                  name="kapasitas"
                  rules={{required: true}}
                  defaultValue=""
                />

                {errors.harga && errors.harga.type === 'required' && (
                  <View style={styles.viewError}>
                    <Text style={styles.textError}>Kapasitas Perlu Diisi</Text>
                  </View>
                  //
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    name="room-service"
                    color="#05375A"
                    size={25}
                  />
                </View>

                <Text
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    fontWeight: 'bold',
                    color: '#636e72',
                  }}>
                  Fasilitas
                </Text>
              </View>
              {invalidFasilitas && (
                <View style={[styles.viewError, {marginBottom: 10}]}>
                  <Text style={styles.textError}>
                    Pastikan Semua kolom fasilitas sudah terisi
                  </Text>
                </View>
              )}

              {inputList.map((x, i) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      alignItems: 'center',
                      marginBottom: 10,
                    }}
                    key={i}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 30,
                      }}>
                      <Text>{i + 1}</Text>
                    </View>

                    <View
                      style={{
                        height: 40,
                        borderWidth: 0.5,
                        borderRadius: 10,
                        flex: 1,

                        paddingHorizontal: 5,
                      }}>
                      <TextInput
                        placeholder={'Fasilitas ' + String(i + 1)}
                        onChangeText={(e) => {
                          cekFasilitas();
                          handleInputChange(e, i, 'item');
                        }}
                        style={{
                          marginLeft: 10,
                          flex: 1,
                        }}
                        onEndEditing={() => {
                          if (kamar.fasilitas[i].item == '') {
                            setInvalidFasilitas(true);
                          }
                        }}
                        value={x.item}
                      />
                    </View>
                    {inputList.length !== 1 && (
                      <TouchableNativeFeedback
                        onPress={() => handleRemoveClick(i)}>
                        <View
                          style={{
                            marginLeft: 5,
                            height: 40,
                            width: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <MaterialIcons
                            name="cancel"
                            color={myColor.alert}
                            size={25}
                          />
                        </View>
                      </TouchableNativeFeedback>
                    )}
                  </View>
                );
              })}

              <View style={{marginBottom: 10, marginLeft: 30}}>
                <TouchableNativeFeedback onPress={() => handleAddClick()}>
                  <View
                    style={{
                      height: 40,
                      backgroundColor: myColor.addfacility,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      Tambah Fasilitas
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <TouchableNativeFeedback
                onPress={handleSubmit(onSubmit, onError)}
                // onPress={() => console.log(kamar)}
              >
                <View
                  style={{
                    borderRadius: 10,
                    height: 40,
                    width: 0.7 * screenWidth,
                    backgroundColor: myColor.myblue,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
                    Submit
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default FormKelasKamar;

// STYLE SECTION
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formWrapper: {
    flex: 1,
    paddingHorizontal: 0.05 * screenWidth,
  },
  textInput: {
    fontSize: 14,
    backgroundColor: 'white',
    marginBottom: 20,
    flex: 1,
    height: 50,
  },
  viewError: {
    marginLeft: 40,
  },
  textError: {color: myColor.alert, fontSize: 12, fontWeight: 'bold'},
  fieldWrapper: {marginBottom: 15},
});