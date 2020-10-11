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
import {useFocusEffect} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {DetailInfoPenghuni, BerkasInfo} from './';

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

const DetailPenghuni = ({navigation, route}) => {
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
  const [penghuni, setPenghuni] = useState(route.params.penghuni);
  const [asalDaerah, setasalDaerah] = useState({
    kota: '',
    provinsi: '',
  });
  let cancelToken;

  // useEffect(() => {
  //   console.log(route.params.pendaftar);
  // }, []);

  useEffect(() => {
    // console.log('PENGHUNI HOME BOSS', penghuni);
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel('Operation canceled due to new request.');
    }

    const source = axios.CancelToken.source();
    // const ayaya = CancelToken.

    let one =
      'https://dev.farizdotid.com/api/daerahindonesia/kota/' +
      route.params.penghuni.kota;
    let two =
      'https://dev.farizdotid.com/api/daerahindonesia/provinsi/' +
      route.params.penghuni.provinsi;

    const requestOne = axios.get(one, {
      cancelToken: source.token,
    });
    const requestTwo = axios.get(two, {
      cancelToken: source.token,
    });

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
    return () => {
      source.cancel('Api Canceled');
      console.log('tutup detail penghuni');
    };
  }, [penghuni]);

  useFocusEffect(() => {
    console.log('Data Penghuni :', route.params.penghuni);

    setPenghuni(route.params.penghuni);
    return () => {
      // source.cancel('Api Canceled');
      console.log('tutup detail penghuni');
    };
  }, []);

  // useEffect(() => {
  //   console.log('Data Penghuni :', route.params.penghuni);
  //   setPenghuni(route.params.penghuni);
  //   return () => {
  //     // source.cancel('Api Canceled');
  //     console.log('tutup detail penghuni');
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log('PENGHUNI HOME BOSS', route.params.penghuni);
  //   if (typeof cancelToken != typeof undefined) {
  //     cancelToken.cancel('Operation canceled due to new request.');
  //   }

  //   const source = axios.CancelToken.source();
  //   // const ayaya = CancelToken.

  //   let one =
  //     'https://dev.farizdotid.com/api/daerahindonesia/kota/' +
  //     route.params.penghuni.kota;
  //   let two =
  //     'https://dev.farizdotid.com/api/daerahindonesia/provinsi/' +
  //     route.params.penghuni.provinsi;

  //   const requestOne = axios.get(one, {
  //     cancelToken: source.token,
  //   });
  //   const requestTwo = axios.get(two, {
  //     cancelToken: source.token,
  //   });

  //   axios
  //     .all([requestOne, requestTwo])
  //     .then(
  //       axios.spread((...responses) => {
  //         const responseOne = responses[0];
  //         const responseTwo = responses[1];

  //         setasalDaerah({
  //           ...asalDaerah,
  //           kota: responseOne.data.nama,
  //           provinsi: responseTwo.data.nama,
  //         });
  //         // use/access the results
  //       }),
  //     )
  //     .catch((errors) => {
  //       // react on errors.
  //     });

  //   // const ambilAsal = async () => {
  //   //   await ambilProvinsi();
  //   //   await ambilKota;
  //   // };
  //   // ambilAsal();

  //   return () => {
  //     source.cancel('Api Canceled');
  //     console.log('asu');
  //   };
  // }, []);

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
    <DetailInfoPenghuni
      kelamin={route.params.penghuni.kelamin == 1 ? 'Laki-Laki' : 'Perempuan'}
      umur={route.params.penghuni.umur}
      provinsi={asalDaerah.provinsi}
      kota={asalDaerah.kota}
      alamat={route.params.penghuni.alamat}
      status={route.params.penghuni.status}
      tempat={
        route.params.penghuni.status == 1
          ? route.params.penghuni.tempat_pendidikan
          : route.params.penghuni.tempat_kerja
      }
      pesan={route.params.penghuni.pesan}
    />
  );

  const BerkasKu = () => (
    <BerkasInfo
      foto={
        APIUrl + '/kostdata/pendaftar/foto/' + route.params.penghuni.foto_ktp
      }
      noktp={route.params.penghuni.noktp}
      notelp={route.params.penghuni.notelp}
      email={route.params.penghuni.email}
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
        APIUrl + '/kostdata/pendaftar/foto/' + route.params.penghuni.foto_diri,

      props: {
        // headers: ...
      },
    },
    {
      url:
        APIUrl + '/kostdata/pendaftar/foto/' + route.params.penghuni.foto_ktp,

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
        <GetBackButton onPress={() => navigation.goBack()} />
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
                  route.params.penghuni.foto_diri,
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
            {route.params.penghuni.nama_depan}{' '}
            {route.params.penghuni.nama_belakang} kamar
            {route.params.penghuni.kamar}
          </Text>

          <Text
            style={{
              color: 'white',
              fontSize: 12,
              fontWeight: 'bold',
              marginTop: 5,
            }}>
            Tanggal Masuk : {route.params.penghuni.hari}-
            {route.params.penghuni.bulan}- {route.params.penghuni.tahun}
          </Text>
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

export default DetailPenghuni;

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
