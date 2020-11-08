import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
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
import {HeaderPage} from '../../components';
import {FormFieldIcon} from '../../components/atoms';
import {
  APIUrl,
  myColor,
  screenWidth,
  formatRupiah,
  rupiahToInt,
} from '../../function/MyVar';

const FormKelasKamar = ({navigation}) => {
  const scrollRef = useRef();
  const refHarga = useRef();
  const refKapasitas = useRef();
  const dataRedux = useSelector((state) => state.AuthReducer);

  // const {control, handleSubmit, errors, reset, getValues, remove} = useForm();

  const [inputList, setInputList] = useState([{item: ''}]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [invalidFasilitas, setInvalidFasilitas] = useState(true);
  const [errorMsg, seterrorMsg] = useState({
    nama: '',
    harga: '',
    kapasitas: '',
    foto: '',
  });
  const [dataFoto, setDataFoto] = useState({
    isUploaded: false,
    uri: '',
    type: '',
    data: '',
  });
  const [kamar, setKamar] = useState({
    nama: '',
    harga: 0,
    kapasitas: 1,
    fasilitas: inputList,
    owner: dataRedux.user.kostku,
    foto: '',
  });
  const [formatHarga, setformatHarga] = useState(kamar.harga.toString());

  useEffect(() => {
    if (dataFoto.data != '') {
      let image = 'data:' + dataFoto.type + ';base64,' + dataFoto.data;
      setForm('foto', image);
    }
  }, [dataFoto]);

  useEffect(() => {
    setKamar({...kamar, fasilitas: JSON.stringify(inputList)});
    cekFasilitas();
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

  useEffect(() => {
    setForm('harga', rupiahToInt(formatHarga));
    // rupiahToInt(formatHarga);
  }, [formatHarga]);

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

  const cekFasilitas = () => {
    let i;
    for (i = 0; i < inputList.length; i++) {
      if (inputList[i].item == '') {
        return setInvalidFasilitas(true);
      }
    }
    return setInvalidFasilitas(false);
    // if (inputList.includes('')) {
    //   setInvalidFasilitas(true);
    // } else {
    //   setInvalidFasilitas(false);
    // }
  };

  const addData = async () => {
    setIsSubmit(true);
    if (!invalidFasilitas) {
      axios
        .post(APIUrl + '/api/class', kamar, {
          headers: {
            Authorization: `Bearer ${dataRedux.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);

          if (res.data.success) {
            navigation.pop(1);
          } else {
            seterrorMsg({
              nama: res.data.errors.nama ? res.data.errors.nama : '',
              harga: res.data.errors.harga ? res.data.errors.harga : '',
              kapasitas: res.data.errors.kapasitas
                ? res.data.errors.kapasitas
                : '',
            });
            setIsSubmit(false);
          }
          // setIsSubmit(false);
          // navigation.popToTop();
        })
        .catch((error) => {
          setIsSubmit(false);
          console.log(error);
          // console.log(kamar);
        });
    } else {
      setIsSubmit(false);
    }
  };

  const setForm = (inputType, value) => {
    setKamar({
      ...kamar,
      [inputType]: value,
    });
  };

  const goToTop = () => {
    scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
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
      <HeaderPage title="Tambah Kelas" />

      {/* Content Section  */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{paddingBottom: 25}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.buttonUpload}>
          {/* UPLOAD IMAGE SECTION */}
          <TouchableNativeFeedback
            disabled={isPressed}
            onPress={() => pickImage()}>
            {dataFoto.isUploaded != true ? (
              <View style={styles.blankImage}>
                <FontAwesome name="upload" color="#fff" size={50} />
              </View>
            ) : (
              <Image
                source={{
                  uri: dataFoto.uri,
                }}
                style={styles.imageUploaded}
                resizeMode="cover"
              />
            )}
          </TouchableNativeFeedback>
          {errorMsg.foto != '' && (
            <Text
              style={[styles.textError, {textAlign: 'center', marginTop: 5}]}>
              Foto Kamar Perlu Diupload
            </Text>
            //
          )}
        </View>
        {/* <Text>{kamar.harga}</Text> */}

        <View style={styles.formWrapper}>
          {/* Nama Kamar Section  */}
          <View style={styles.fieldWrapper}>
            <FormFieldIcon
              icon="door-closed"
              placeholder="Nama Kamar"
              onChangeText={(v) => {
                setForm('nama', v);
              }}
              onSubmitEditing={() => {
                refHarga.current.focus();
              }}
              blurOnSubmit={false}
              value={kamar.nama}
            />

            {errorMsg.nama != '' && (
              <View style={styles.viewError}>
                <Text style={styles.textError}>{errorMsg.nama}</Text>
              </View>
            )}
          </View>

          {/* Harga Kamar Section  */}
          <View style={styles.fieldWrapper}>
            <FormFieldIcon
              ref={refHarga}
              icon="money-bill-alt"
              placeholder="Harga Kamar"
              keyboardType="numeric"
              onChangeText={(v) => {
                // setForm('harga', parseInt(v));
                // console.log(v);
                if (v.length < 1) {
                  setformatHarga(formatRupiah('0'));
                } else {
                  setformatHarga(formatRupiah(v));
                }
              }}
              onSubmitEditing={() => {
                refKapasitas.current.focus();
              }}
              blurOnSubmit={false}
              // value={kamar.harga.toString()}
              value={formatHarga}
            />

            {errorMsg.harga != '' && (
              <View style={styles.viewError}>
                <Text style={styles.textError}>{errorMsg.harga}</Text>
              </View>
              //
            )}
          </View>

          {/* Kapasitas Kamar Section  */}
          <View style={styles.fieldWrapper}>
            <FormFieldIcon
              ref={refKapasitas}
              icon="users"
              placeholder="Kapasitas kamar"
              keyboardType="number-pad"
              onChangeText={(value) => {
                setForm('kapasitas', parseInt(value));
              }}
              value={kamar.kapasitas.toString()}
            />

            {errorMsg.kapasitas != '' && (
              <View style={styles.viewError}>
                <Text style={styles.textError}>{errorMsg.kapasitas}</Text>
              </View>
              //
            )}
          </View>

          <View style={styles.fasilitasTitleWrapper}>
            <MaterialIcons name="room-service" color={myColor.fbtx} size={25} />

            <Text style={styles.titleFasilitas}>Fasilitas</Text>
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
              <View style={styles.wrapperItemFasilitas} key={i}>
                <Text style={styles.normalText}>{i + 1}</Text>

                <TextInput
                  placeholder={'Fasilitas ' + String(i + 1)}
                  onChangeText={(e) => {
                    handleInputChange(e, i, 'item');
                  }}
                  style={styles.inputItem}
                  value={x.item}
                />

                {inputList.length !== 1 && (
                  <TouchableNativeFeedback onPress={() => handleRemoveClick(i)}>
                    <View style={styles.deleteItem}>
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

          <View style={styles.wrapperAddFasilitas}>
            <TouchableNativeFeedback onPress={() => handleAddClick()}>
              <View style={styles.btAddFasilitas}>
                <Text style={styles.textAddFasilitas}>Tambah Fasilitas</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <TouchableNativeFeedback
            // onPress={handleSubmit(onSubmit, onError)}
            onPress={() => {
              if (!invalidFasilitas) {
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
            }}
            // onPress={() => console.log(kamar)}
          >
            <View style={styles.wrapperBtSubmit}>
              <Text style={styles.textBtSubmit}>Submit</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    </View>
  );
};

export default FormKelasKamar;

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
  buttonUpload: {
    alignItems: 'center',
    marginBottom: 10,
  },
  blankImage: {
    width: 0.83 * screenWidth,
    height: (2 / 3) * 0.83 * screenWidth,
    backgroundColor: '#636e72',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 15,
  },
  imageUploaded: {
    height: (2 / 3) * 0.83 * screenWidth,
    width: 0.83 * screenWidth,
    borderRadius: 10,
    marginTop: 15,
  },
  fasilitasTitleWrapper: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  fasilitasIcon: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleFasilitas: {
    flex: 1,
    marginLeft: 10,
    fontWeight: 'bold',
    color: myColor.fbtx,
  },
  wrapperAddFasilitas: {marginBottom: 20, marginLeft: 30},
  btAddFasilitas: {
    height: 30,
    backgroundColor: myColor.addfacility,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAddFasilitas: {color: '#fff', fontWeight: 'bold', fontSize: 14},
  wrapperBtSubmit: {
    borderRadius: 10,
    height: 40,
    width: 0.9 * screenWidth,
    backgroundColor: myColor.myblue,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtSubmit: {fontSize: 14, fontWeight: 'bold', color: '#fff'},
  wrapperItemFasilitas: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 20,
  },
  normalText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: myColor.fbtx,
  },
  inputItem: {
    height: 40,
    borderWidth: 0.5,
    borderRadius: 10,
    flex: 1,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  deleteItem: {
    marginLeft: 5,
    height: 40,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
