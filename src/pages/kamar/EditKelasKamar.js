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
import {HeaderPage} from '../../components';

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

  const [kamar, setKamar] = useState(route.params.kamar);
  const [inputList, setInputList] = useState(route.params.kamar.fasilitas);
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
    // setKamar(route.params.kamar);
    // setInputList(route.params.kamar.fasilitas);

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
        // navigation.pop(2);
        navigation.popToTop();
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
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Spinner
        visible={isSubmit}
        textContent={'Tunggu Sebentar'}
        textStyle={{color: '#FFF'}}
      />
      <HeaderPage title="Edit Kelas" />
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
            paddingBottom: 10,
            marginBottom: 5,
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
              <MaterialIcons name="room-service" color="#05375A" size={25} />
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
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: myColor.fbtx,
                    }}>
                    {i + 1}
                  </Text>
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
                  <TouchableNativeFeedback onPress={() => handleRemoveClick(i)}>
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

          <View style={{marginBottom: 20, marginLeft: 30}}>
            <TouchableNativeFeedback onPress={() => handleAddClick()}>
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
                width: 0.9 * screenWidth,
                backgroundColor: myColor.myblue,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
                Submit
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditKelasKamar;

// STYLE SECTION
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    marginLeft: 30,
  },
  textError: {color: myColor.alert, fontSize: 12, fontWeight: 'bold'},
  fieldWrapper: {marginBottom: 15},
});
