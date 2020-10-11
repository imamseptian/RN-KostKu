import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  TextInput,
  Image,
  StatusBar,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import {Text, Title, Avatar} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import {Permission, PERMISSION_TYPE} from '../AppPermission';
import Spinner from 'react-native-loading-spinner-overlay';
import {APIUrl, myColor} from '../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const EditKelasKamar = ({navigation, route}) => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [baseFoto, setBaseFoto] = useState('');
  const [dataFoto, setDataFoto] = useState({
    isUploaded: false,
    uri: '',
    type: '',
  });

  const [kamar, setKamar] = useState({});
  const [inputList, setInputList] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isChanged, setisChanged] = useState(false);
  const [invalidFasilitas, setInvalidFasilitas] = useState(false);
  const {control, handleSubmit, errors, register, getValues, reset} = useForm({
    defaultValues: {
      nama: route.params.kamar.nama,
      harga: route.params.harga,
      kapasitas: route.params.kapasitas,
    },
  });

  useEffect(() => {
    console.log(route.params);
    setKamar(route.params.kamar);
    setInputList(route.params.kamar.fasilitas);

    return () => {
      console.log('tutup');
    };
  }, []);

  useEffect(() => {
    if (isChanged === true) {
      setKamar({...kamar, fasilitas: inputList});
    }
  }, [inputList]);

  const handleInputChange = (e, index, inputType) => {
    // const {name, value} = e.target;
    const list = [...inputList];
    // console.log(list[0][inputType]);
    list[index][inputType] = e;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    setisChanged(true);
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    reset({...getValues(), ['fasilitas' + String(index + 1)]: ''});
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, {item: ''}]);
  };

  const pickImage = async () => {
    setIsPressed(true);
    Permission.requestMultiple([PERMISSION_TYPE.photo, PERMISSION_TYPE.camera]);
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
          });
          setIsPressed(false);
          setBaseFoto(response.data);
        }
      },
    );
  };

  const onSubmit = (data) => {
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
          {text: 'Ya', onPress: () => editData()},
        ],
        {cancelable: false},
      );
    } else {
      setIsSubmit(false);
      goToTop();
    }
  };

  const onError = (errors, e) => {
    console.log(errors);

    cekFasilitas();
    goToTop();
  };

  const editData = () => {
    setIsSubmit(true);
    // console.log(kamar);
    const room = {
      nama: kamar.nama,
      harga: kamar.harga,
      fasilitas: JSON.stringify(kamar.fasilitas),
      owner: kamar.owner,
      active: kamar.active,
      foto: kamar.foto,
    };
    if (baseFoto != '') {
      room.newImg = 'data:' + dataFoto.type + ';base64,' + baseFoto;
    }

    let id = kamar.id;

    axios
      .put(`https://dry-forest-53707.herokuapp.com/api/class/${id}`, room, {
        headers: {
          Authorization: `Bearer ${dataRedux.token}`,
        },
      })
      .then((res) => {
        setIsSubmit(false);
        console.log(res.data);
        navigation.pop(2);
        // navigation.goBack(2);
      })
      .catch((error) => {
        setIsSubmit(false);
        console.log(error);
      });
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
            borderRadius: 20,
            paddingTop: 20,
          }}>
          <ScrollView
            ref={(c) => {
              scroll = c;
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 25}}>
            <Spinner
              visible={isSubmit}
              textContent={'Tunggu Sebentar'}
              textStyle={{color: '#FFF'}}
            />

            {/* UPLOAD IMAGE SECTION */}

            <View
              style={{
                alignItems: 'center',
                paddingBottom: 20,
                borderBottomWidth: 0.5,
              }}>
              <TouchableOpacity
                disabled={isPressed}
                onPress={() => pickImage()}>
                {dataFoto.isUploaded != true ? (
                  <Image
                    style={{borderRadius: 10}}
                    source={{
                      uri:
                        APIUrl +
                        '/kostdata/kelas_kamar/foto/' +
                        route.params.kamar.foto,
                    }}
                    style={{
                      height: (2 / 3) * 0.83 * screenWidth,
                      width: 0.83 * screenWidth,
                      borderRadius: 20,
                    }}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={{
                      uri: dataFoto.uri,
                    }}
                    style={{
                      height: (2 / 3) * 0.83 * screenWidth,
                      width: 0.83 * screenWidth,
                      borderRadius: 20,
                    }}
                    resizeMode="cover"
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                disabled={isPressed}
                onPress={() => pickImage()}
                style={{marginTop: 10}}>
                <View
                  style={{
                    height: 30,
                    width: 150,
                    backgroundColor: myColor.addfacility,
                    borderRadius: 300 / 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Upload Gambar
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.formWrapper}>
              <View style={{marginBottom: 15}}>
                <Controller
                  control={control}
                  render={({onChange, onBlur, value}) => (
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
                        <Fontisto name="room" color="#05375A" size={25} />
                      </View>
                      <TextInput
                        placeholder="Nama Kamar"
                        onChangeText={(v) => {
                          onChange(v);
                          setForm('nama', v);
                        }}
                        value={value}
                        style={{borderBottomWidth: 1, flex: 1, marginLeft: 10}}
                      />
                    </View>
                  )}
                  name="nama"
                  rules={{required: true, minLength: 4, maxLength: 20}}
                  defaultValue=""
                />
                {errors.nama && errors.nama.type === 'required' && (
                  <View style={styles.viewError}>
                    <Text style={styles.textError}>Nama Kost Perlu Diisi</Text>
                  </View>
                  //
                )}
                {errors.nama && errors.nama.type === 'minLength' && (
                  <View style={styles.viewError}>
                    <Text style={styles.textError}>Nama Minimal 5 Digit</Text>
                  </View>
                )}
                {errors.nama && errors.nama.type === 'maxLength' && (
                  <View style={styles.viewError}>
                    <Text style={styles.textError}>Nama Maximal 10 Digit</Text>
                  </View>
                )}
              </View>
              <View style={{marginBottom: 15}}>
                <Controller
                  control={control}
                  render={({onChange, onBlur, value}) => (
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
                        <FontAwesome5
                          name="money-bill-wave"
                          color="#05375A"
                          size={25}
                        />
                      </View>
                      <TextInput
                        placeholder="Harga Sewa / Bulan"
                        style={{borderBottomWidth: 1, flex: 1, marginLeft: 10}}
                        onChangeText={(value) => {
                          onChange(value);
                          setForm('harga', parseInt(value));
                        }}
                        value={value}
                        keyboardType="number-pad"
                      />
                    </View>
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

              <View style={{marginBottom: 15}}>
                <Controller
                  control={control}
                  render={({onChange, onBlur, value}) => (
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
                        <FontAwesome5
                          name="money-bill-wave"
                          color="#05375A"
                          size={25}
                        />
                      </View>
                      <TextInput
                        placeholder="Kapasitas"
                        style={{borderBottomWidth: 1, flex: 1, marginLeft: 10}}
                        onChangeText={(value) => {
                          onChange(value);
                          setForm('kapasitas', parseInt(value));
                        }}
                        value={value}
                        keyboardType="number-pad"
                      />
                    </View>
                  )}
                  name="kapasitas"
                  rules={{required: true}}
                  defaultValue=""
                />

                {errors.kapasitas && errors.kapasitas.type === 'required' && (
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
                      marginLeft: 30,
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
                    <TextInput
                      placeholder={'Fasilitas ' + String(i + 1)}
                      onChangeText={(e) => {
                        cekFasilitas();
                        handleInputChange(e, i, 'item');
                        setisChanged(true);
                      }}
                      onEndEditing={() => {
                        if (kamar.fasilitas[i].item == '') {
                          setInvalidFasilitas(true);
                        }
                      }}
                      value={x.item}
                      style={{borderBottomWidth: 1, flex: 1, marginLeft: 10}}
                    />
                    {inputList.length !== 1 && (
                      <TouchableOpacity onPress={() => handleRemoveClick(i)}>
                        <View
                          style={{
                            marginLeft: 10,
                            height: 70,
                            width: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          {/* <Button title="x" onPress={() => handleRemoveClick(i)} /> */}
                          <MaterialIcons
                            name="cancel"
                            color={myColor.alert}
                            size={25}
                          />
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}

              {/* <Button title="Add Fasilitas" onPress={() => handleAddClick()} /> */}
              <TouchableOpacity
                style={{marginTop: 10, marginBottom: 10, marginLeft: 60}}
                onPress={() => handleAddClick()}>
                <View
                  style={{
                    height: 30,
                    backgroundColor: myColor.addfacility,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Tambah Fasilitas
                  </Text>
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={handleSubmit(onSubmit, onError)}
                disabled={isSubmit}
                style={{marginBottom: 10}}>
                <View
                  style={{
                    height: 50,
                    backgroundColor: '#46ce7c',
                    borderRadius: 300 / 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Tambahkan Kamar
                  </Text>
                </View>
              </TouchableOpacity> */}

              {/* <Button title="Pick Image" onPress={() => pickImage()} />
          {dataFoto && (
            <Image
              source={{uri: dataFoto.uri}}
              style={{width: 200, height: 200}}
            />
          )}
          <Text style={{marginBottom: 10}}>{JSON.stringify(kamar)}</Text>
          <Text style={{marginBottom: 10}}>{JSON.stringify(dataFoto)}</Text> */}
            </View>
          </ScrollView>
          <View style={{position: 'absolute', bottom: -20, left: 100}}>
            <TouchableNativeFeedback onPress={handleSubmit(onSubmit, onError)}>
              <View
                style={{
                  backgroundColor: myColor.applynow,
                  height: 40,
                  paddingHorizontal: 10,

                  borderRadius: 10,
                  elevation: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  Tambahkan Kelas
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditKelasKamar;

// STYLE SECTION
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formWrapper: {
    flex: 1,
    paddingHorizontal: 20,
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
  textError: {color: '#d63031', fontSize: 12, fontWeight: 'bold'},
});
