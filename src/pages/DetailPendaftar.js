import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Button,
  Dimensions,
  LayoutAnimation,
  NativeModules,
  Image,
  ScrollView,
  Alert,
  StatusBar,
  TouchableNativeFeedback,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {DetailInfo, BerkasInfo} from './';

import {myColor, APIUrl} from '../function/MyVar';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import {GetBackButton} from '../components/atoms';
import {ButtonConfirmReject} from '../components';
import axios from 'axios';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

const {UIManager} = NativeModules;
const Tab = createMaterialTopTabNavigator();

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const DetailPendaftar = ({navigation, route}) => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [ukuran, setUkuran] = useState({
    tinggi: 200,
    lebar: 200,
    flex: 4,
  });
  const [isPressed, setisPressed] = useState(false);
  const opaAvatar = useRef(new Animated.Value(1)).current;
  const transView = useRef(new Animated.Value(0)).current;
  const [isHide, setisHide] = useState(false);
  const [showImg, setshowImg] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const [imageIndex, setimageIndex] = useState(0);
  const [pendaftar, setPendaftar] = useState({
    ...route.params.pendaftar,
  });
  const [asalDaerah, setasalDaerah] = useState({
    kota: '',
    provinsi: '',
  });
  let cancelToken;

  // useEffect(() => {
  //   console.log(route.params.pendaftar);
  // }, []);

  useEffect(() => {
    console.log(route.params.pendaftar);
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel('Operation canceled due to new request.');
    }

    const source = axios.CancelToken.source();
    // const ayaya = CancelToken.

    let one =
      'https://dev.farizdotid.com/api/daerahindonesia/kota/' +
      route.params.pendaftar.kota;
    let two =
      'https://dev.farizdotid.com/api/daerahindonesia/provinsi/' +
      route.params.pendaftar.provinsi;

    let three =
      'https://dry-forest-53707.herokuapp.com/api/pendaftar/' +
      route.params.pendaftar.id;

    const requestOne = axios.get(one, {
      cancelToken: source.token,
    });
    const requestTwo = axios.get(two, {
      cancelToken: source.token,
    });
    const requestThree = axios.put(
      three,
      {isread: true},
      {
        headers: {
          Authorization: `Bearer ${dataRedux.token}`,
        },
        cancelToken: source.token,
      },
    );

    if (route.params.pendaftar.isread) {
      axios
        .all([requestOne, requestTwo])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];

            setasalDaerah({
              ...asalDaerah,
              kota: responseOne.data.nama,
              provinsi: responseTwo.data.nama,
            });
            // use/access the results
          }),
        )
        .catch((errors) => {
          // react on errors.
        });
    } else {
      axios
        .all([requestOne, requestTwo, requestThree])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            const responseThree = responses[2];
            console.log(responseThree);

            setasalDaerah({
              ...asalDaerah,
              kota: responseOne.data.nama,
              provinsi: responseTwo.data.nama,
            });
            // use/access the results
          }),
        )
        .catch((errors) => {
          if (axios.isCancel(errors)) {
            // setIsLoading(false);
            console.log('caught cancel on ambil api pendaftar');
          } else {
            // setIsLoading(false);
            throw errors;
          }
        });
    }

    // const ambilAsal = async () => {
    //   await ambilProvinsi();
    //   await ambilKota;
    // };
    // ambilAsal();

    return () => {
      source.cancel('Api Canceled');
      console.log('asu');
    };
  }, []);

  const decidePenghuni = (statTerima) => {
    // const ayaya = CancelToken.
    console.log('decide penghuni');
    axios
      .post(
        'https://dry-forest-53707.herokuapp.com/api/tambah_penghuni',
        {...pendaftar, terima: statTerima},
        {
          headers: {
            Authorization: `Bearer ${dataRedux.token}`,
          },
        },
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.code == 200) {
          navigation.pop(1);
        } else {
          alert(
            'Maaf kamar yang didaftarkan penuh, silahkan hubungi pendaftar untuk mendaftar ke kamar lain',
          );
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('kantal');
      });
  };

  const animAvatar = (myavatar) => {
    Animated.timing(opaAvatar, {
      toValue: myavatar,
      duration: 100,
      // useNativeDriver: true,
      useNativeDriver: true,
    }).start();
  };

  const animateNow = (myavatar, myflex) => {
    // setisPressed(true);
    animAvatar(myavatar);
    LayoutAnimation.configureNext(
      {
        duration: 100,
        create: {
          property: LayoutAnimation.Properties.opacity,
          type: LayoutAnimation.Types.linear,
        },
        update: {
          property: LayoutAnimation.Properties.opacity,
          type: LayoutAnimation.Types.linear,
        },
        delete: {
          property: LayoutAnimation.Properties.opacity,
          type: LayoutAnimation.Types.linear,
        },
      },
      endingAnimate,
    );
    setUkuran({
      ...ukuran,
      flex: myflex,
    });
  };

  const Infoku = () => (
    <DetailInfo
      kelamin={route.params.pendaftar.kelamin == 1 ? 'Laki-Laki' : 'Perempuan'}
      umur={route.params.pendaftar.umur}
      provinsi={asalDaerah.provinsi}
      kota={asalDaerah.kota}
      alamat={route.params.pendaftar.alamat}
      status={route.params.pendaftar.status}
      tempat={
        route.params.pendaftar.status == 1
          ? route.params.pendaftar.tempat_pendidikan
          : route.params.pendaftar.tempat_kerja
      }
      pesan={route.params.pendaftar.pesan}
    />
  );

  const BerkasKu = () => (
    <BerkasInfo
      foto={
        APIUrl + '/kostdata/pendaftar/foto/' + route.params.pendaftar.foto_ktp
      }
      noktp={route.params.pendaftar.noktp}
      notelp={route.params.pendaftar.notelp}
      email={route.params.pendaftar.email}
      onPress={() => {
        setimageIndex(1);
        setshowImg(true);
      }}
    />
  );

  const endingAnimate = () => {
    // setisPressed(false);
    setisHide(!isHide);
  };

  const images = [
    {
      url:
        APIUrl + '/kostdata/pendaftar/foto/' + route.params.pendaftar.foto_diri,

      props: {
        // headers: ...
      },
    },
    {
      url:
        APIUrl + '/kostdata/pendaftar/foto/' + route.params.pendaftar.foto_ktp,

      props: {
        // headers: ...
      },
    },
  ];

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />

      <Modal
        visible={showImg}
        transparent={true}
        onRequestClose={() => setshowImg(false)}>
        <ImageViewer
          imageUrls={images}
          enableSwipeDown={true}
          index={imageIndex}
          onSwipeDown={() => setshowImg(false)}
        />
      </Modal>
      <View style={[styles.containerAtas, {flex: ukuran.flex}]}>
        <GetBackButton onPress={() => navigation.pop(1)} />
        <Animated.View style={{alignItems: 'center', opacity: opaAvatar}}>
          <TouchableNativeFeedback
            onPress={() => {
              setimageIndex(0);
              setshowImg(true);
            }}>
            <Image
              source={{
                uri:
                  APIUrl +
                  '/kostdata/pendaftar/foto/' +
                  route.params.pendaftar.foto_diri,
              }}
              style={{
                width: 150,
                borderRadius: 50,
                height: 150,
                // opacity: opaAvatar,
              }}
            />
          </TouchableNativeFeedback>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 5,
            }}>
            {route.params.pendaftar.nama_depan}{' '}
            {route.params.pendaftar.nama_belakang}
          </Text>
          <ButtonConfirmReject
            terima={() => {
              setPendaftar({...pendaftar, terima: true});
              Alert.alert(
                'Konfirmasi',
                'Apakah anda yakin menerima orang berikut menjadi penghuni kost anda ?',
                [
                  {
                    text: 'Batal',
                    onPress: () => alert('cancel'),
                    style: 'cancel',
                  },
                  {text: 'Ya', onPress: () => decidePenghuni(true)},
                ],
                {cancelable: false},
              );
            }}
            tolak={() => {
              setPendaftar({...pendaftar, terima: false});
              Alert.alert(
                'Konfirmasi',
                'Apakah anda yakin menolak orang berikut menjadi penghuni kost anda ?',
                [
                  {
                    text: 'Batal',
                    onPress: () => alert('cancel'),
                    style: 'cancel',
                  },
                  {text: 'Ya', onPress: () => decidePenghuni(false)},
                ],
                {cancelable: false},
              );
            }}
            submit={() => decidePenghuni()}
          />
        </Animated.View>
      </View>
      <View style={styles.containerBawah}>
        <Tab.Navigator swipeEnabled={false}>
          <Tab.Screen
            name="Info"
            component={Infoku}
            listeners={() => ({
              tabPress: (e) => {
                animateNow(1, 4);
              },
            })}
          />
          <Tab.Screen
            name="Berkas & Kontak"
            component={BerkasKu}
            listeners={() => ({
              tabPress: (e) => {
                animateNow(0, 1);
              },
            })}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default DetailPendaftar;

const styles = StyleSheet.create({
  containerAtas: {
    backgroundColor: myColor.colorTheme,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  containerBawah: {flex: 6, backgroundColor: 'white'},
  subtitle: {
    color: '#676767',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInfo: {
    color: '#676767',
    fontSize: 14,

    marginTop: 10,
  },
  wrapperInfo: {
    marginBottom: 20,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
});
