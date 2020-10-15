import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  Dimensions,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import {TabBayar, SearchBar} from '../../components/atoms';
import {FlatListTransaksi, FlatListModal} from '../../components';
import {TabTransaksi, TabRiwayat} from './';
import StepIndicator from 'react-native-step-indicator';
import {myAxios} from '../../function/MyAxios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {APIUrl, myColor} from '../../function/MyVar';
import {useSelector} from 'react-redux';
import axios from 'axios';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const HalamanBayar = () => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [showModal, setshowModal] = useState(false);
  const [showModalBayar, setshowModalBayar] = useState(false);
  const [penghuni, setpenghuni] = useState(undefined);
  const [dataPenghuni, setdataPenghuni] = useState([]);
  const [dataTagihan, setDataTagihan] = useState([]);
  const [currentPage, setcurrentPage] = useState(0);
  const [nominalBayar, setnominalBayar] = useState(0);
  const [keyword, setkeyword] = useState('');
  // const [selectedTab, setselectedTab] = useState(0);
  const mountedAnimated = useRef(new Animated.Value(0)).current;
  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });
  const ref = useRef();

  const datapage = [
    {
      id: 'page0',
      page: (
        <TabTransaksi
          data={dataTagihan}
          penghuni={penghuni}
          onPress={() => setshowModalBayar(true)}
        />
      ),
    },
    {id: 'page1', page: <TabRiwayat />},
  ];

  const bayarTagihan = () => {
    const source = axios.CancelToken.source();
    if (penghuni !== undefined) {
      myAxios.postAxios(
        APIUrl + '/api/bayartagihan',
        {
          bayar: nominalBayar,
          id_penghuni: penghuni.id,
          perbulan: penghuni.harga_kamar,
          id_kost: dataRedux.user.kostku,
        },
        dataRedux.token,
        source.token,
        onPost,
      );
      function onPost(status, data) {
        if (status == 'success') {
          alert('Pembayaran Sukses');
          setshowModalBayar(false);
          ambilPenghuni();
          // setdataPenghuni(data.data);
        } else if (status == 'cancel') {
          console.log('caught cancel filter');
        } else {
          console.log(data);
          console.log(nominalBayar);
          console.log(penghuni.id);
        }
      }
    }
  };

  const animation = (toValue, delay) =>
    Animated.timing(mountedAnimated, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true,
    }).start();
  const [filter, setFilter] = useState({
    id_kostan: dataRedux.user.kostku,
    keyword: '',
  });

  const ambilApi = async (myToken) => {
    // const source = axios.CancelToken.source();
    myAxios.postAxios(
      APIUrl + '/api/tagihanpenghuni',
      filter,
      dataRedux.token,
      myToken,
      onPost,
    );
    function onPost(status, data) {
      if (status == 'success') {
        console.log(data.data);
        setdataPenghuni(data.data);
      } else if (status == 'cancel') {
        console.log('caught cancel filter');
      } else {
        console.log(data);
      }
    }
  };

  useEffect(() => {
    animation(1, 500);
    // Animated.parallel([
    //   Animated.timing(activeIndexAnimation, {
    //     toValue: 0,
    //     duration: 300,
    //     useNativeDriver: true,
    //   }),
    //   animation(1, 500),
    // ]).start();
    // console.log('a');
  }, []);

  // useEffect(() => {
  //   // console.log(dataRedux);
  //   console.log('masuk');
  //   const source = axios.CancelToken.source();
  //   ambilApi(source.token);

  //   return () => {
  //     source.cancel('Component got unmounted');
  //     console.log('Tagihan unmounted');
  //   };
  // }, []);

  const ambilPenghuni = () => {
    const source = axios.CancelToken.source();
    if (penghuni !== undefined) {
      myAxios.getAxios(
        APIUrl + '/api/gettagihanbyid/' + penghuni.id,
        dataRedux.token,
        source.token,
        onGet,
      );
      function onGet(status, data) {
        if (status == 'success') {
          console.log('Get data kost success');
          // console.log(data);
          // console.log(data);
          // setdataHomescreen({
          setpenghuni(data.data);
          console.log(data);
          //   ...dataHomescreen,
          //   penghuni: data.data_penghuni,
          //   kamar: data.data_kamar,
          // });
          // setIsLoading(false);
        } else if (status == 'cancel') {
          console.log('caught cancel filter');
          // setIsLoading(false);
        } else {
          console.log(data);
          // setIsLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (penghuni !== undefined) {
      myAxios.getAxios(
        APIUrl + '/api/gettagihan/' + penghuni.id,
        dataRedux.token,
        source.token,
        onGet,
      );
      function onGet(status, data) {
        if (status == 'success') {
          console.log('Get data kost success');
          // console.log(data);
          // console.log(data);
          // setdataHomescreen({
          setDataTagihan(data.tagihan);
          console.log(data);
          //   ...dataHomescreen,
          //   penghuni: data.data_penghuni,
          //   kamar: data.data_kamar,
          // });
          // setIsLoading(false);
        } else if (status == 'cancel') {
          console.log('caught cancel filter');
          // setIsLoading(false);
        } else {
          console.log(data);
          // setIsLoading(false);
        }
      }
    }
    return () => {
      source.cancel('Component got unmounted');
      console.log('Tagihan unmounted');
    };
  }, [penghuni]);

  return (
    <View style={{flex: 1, backgroundColor: myColor.colorTheme}}>
      <StatusBar hidden={showModal} translucent backgroundColor="transparent" />
      <Modal
        visible={showModal}
        transparent={true}
        onRequestClose={() => setshowModal(false)}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              height: screenHeight * 0.75,
              paddingHorizontal: 10,
              paddingVertical: 5,
              width: screenWidth * 0.88,
              borderRadius: 10,
              backgroundColor: 'white',
              // position: 'absolute',
              // top: 0.5 * screenHeight - 0.5 * (0.5 * screenHeight),
              // left: 0.5 * screenWidth - 0.5 * (0.8 * screenWidth),
              elevation: 5,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                color: myColor.blackText,
                marginBottom: 5,
              }}>
              Cari Penghuni Kost
            </Text>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                width: 0.85 * screenWidth,
                alignItems: 'center',
                borderRadius: 10,
                height: 40,
                borderWidth: 0.5,
              }}>
              <FontAwesome
                name="search"
                color="#636e72"
                size={25}
                style={{marginRight: 10, marginLeft: 10}}
              />
              <TextInput style={{flex: 1, marginRight: 15}} />
            </View>
            <View>
              {dataPenghuni.map((item, index) => {
                return (
                  <FlatListModal
                    key={index}
                    data={item}
                    onPress={() => {
                      setpenghuni(item);
                      setshowModal(false);
                    }}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL BAYAR  */}

      <Modal
        visible={showModalBayar}
        transparent={true}
        onRequestClose={() => {
          setnominalBayar(parseInt(0));
          setshowModalBayar(false);
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              maxHeight: screenHeight * 0.75,
              paddingHorizontal: 10,
              paddingVertical: 5,
              width: screenWidth * 0.88,
              borderRadius: 10,

              backgroundColor: 'white',
              // position: 'absolute',
              // top: 0.5 * screenHeight - 0.5 * (0.5 * screenHeight),
              // left: 0.5 * screenWidth - 0.5 * (0.8 * screenWidth),
              elevation: 5,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: myColor.blackText,
              }}>
              Bayar
            </Text>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                width: 0.85 * screenWidth,
                alignItems: 'center',
                borderRadius: 10,
                height: 40,
                borderWidth: 0.5,
              }}>
              <TextInput
                keyboardType="number-pad"
                value={nominalBayar.toString()}
                placeholder="Masukan nominal bayar"
                onChangeText={(value) => {
                  if (value.length == 0) {
                    setnominalBayar(parseInt(0));
                  } else {
                    setnominalBayar(parseInt(value));
                  }
                }}
                style={{flex: 1, marginRight: 15}}
              />
            </View>
            {/* <Button title="BAYAR" onPress={() => bayarTagihan()} /> */}
            <View>
              <Text style={styles.textinfo}>
                *Masukan total nominal pembayaran , sistem akan mengakumulasi
                secara otomatis.
              </Text>
              <Text style={styles.textinfo}>
                *Misal penghuni yang dipilih memiliki tagihan Rp 1.5 juta untuk
                tagihan sewa selama 3 bulan, cukup masukan Rp 1.5 juta kedalam
                kolom diatas dan sistem akan otomatis akan mencatat tagihan
                selama 3 bulan sudah lunas. Dapat digunakan juga untuk cicil
                tagihan, misal penghuni punya tagihan senilai 1 juta namun
                pembayaran yang diterima baru 500 ribu maka sistem akan memotong
                tagihan sesuai urutan tanggal.
              </Text>
              <Text style={styles.textinfo}>
                *Semua kegiatan pembayaran tagihan dan transaksi akan masuk ke
                riwayat aktivitas sistem dan pengguna dapat melihatnya.
              </Text>
              <Text style={[styles.textinfo, {color: myColor.alert}]}>
                *Apabila penghuni tidak memiliki tagihan namun pengguna
                memasukan pembayaran akan dianggap sebagai pelunasan tagihan
                sewa yang akan datang atau bulan depan (Tindakan ini juga akan
                masuk ke riwayat aktivitas sistem)
              </Text>
            </View>

            <TouchableOpacity
              disabled={nominalBayar == 0 ? true : false}
              onPress={() => {
                Alert.alert(
                  'Konfirmasi',
                  'Apakah anda sudah memahami semua informasi dibawah kolom nominal bayar dan sudah yakin dengan nominal yang dimasukan?',
                  [
                    {
                      text: 'Batal',
                      onPress: () => console.log('ayaya'),
                      style: 'cancel',
                    },
                    {text: 'Ya', onPress: () => bayarTagihan()},
                  ],
                  {cancelable: false},
                );
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  width: 100,
                  height: 50,
                  borderRadius: 10,
                  alignItems: 'center',
                  backgroundColor:
                    nominalBayar == 0 ? myColor.bgfb : myColor.myblue,
                }}>
                <Text
                  style={{
                    color: nominalBayar == 0 ? myColor.blackText : '#fff',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  Bayar
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* END MODAL BAYAR  */}
      <TouchableNativeFeedback
        onPress={() => {
          const source = axios.CancelToken.source();
          ambilApi(source.token);
          setshowModal(true);
        }}>
        <View
          style={{
            marginTop: StatusBar.currentHeight + 40,
            width: screenWidth * 0.9,
            backgroundColor: 'white',
            minHeight: 60,
            marginHorizontal: 0.05 * screenWidth,
            elevation: 5,
            borderRadius: 10,
            paddingHorizontal: 10,
          }}>
          {penghuni === undefined ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: myColor.darkText,
                }}>
                {'>>'} Klik Disini untuk memilih penghuni {'<<'}
              </Text>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  marginVertical: 10,
                  height: 54,
                  width: 54,
                  borderRadius: 27,
                  borderWidth: 2,
                  borderColor: myColor.myWhite,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 5,
                }}>
                <Image
                  source={{
                    uri:
                      'https://wpq0221c4a-flywheel.netdna-ssl.com/wp-content/uploads/2018/12/AdmiralBulldog-150x150.jpg',
                  }}
                  style={{height: 50, width: 50, borderRadius: 25}}
                />
                {/* <View
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 35,
                  backgroundColor: myColor.etcbuble,
                }}></View> */}
              </View>

              <View
                style={{
                  marginLeft: 15,
                  marginVertical: 10,
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text numberOfLines={1} style={styles.nama}>
                      {penghuni.nama_depan} {penghuni.nama_belakang}
                    </Text>
                    <View
                      style={{
                        marginLeft: 10,
                        height: 20,
                        minWidth: 30,
                        backgroundColor:
                          penghuni.tagihan > 0
                            ? myColor.alert
                            : myColor.success,
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 'bold',
                          color:
                            penghuni.tagihan > 0 ? myColor.blackText : '#fff',
                        }}>
                        {0 - penghuni.tagihan}
                      </Text>
                    </View>
                  </View>
                  <AntDesign
                    name="caretdown"
                    color={myColor.blackText}
                    size={15}
                    style={{
                      marginRight: 5,
                    }}
                  />
                </View>

                <View style={{marginTop: 5}}>
                  <Text style={[styles.nama, {fontSize: 12}]}>
                    {penghuni.nama_kamar} (Rp {penghuni.harga_kamar} / Bulan){' '}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </TouchableNativeFeedback>

      <View
        style={{
          flex: 1,
          width: 0.9 * screenWidth,
          marginHorizontal: 0.05 * screenWidth,
          backgroundColor: 'white',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          marginTop: 10,
        }}>
        {/* section tab select  */}
        <View style={{flexDirection: 'row'}}>
          <TabBayar
            title="Tagihan"
            id={0}
            selectedTab={currentPage}
            onPress={() => {
              setcurrentPage(0);
              ref.current.scrollToIndex({
                index: 0,
                animated: true,
              });
            }}
          />
          <TabBayar
            title="Riwayat"
            id={1}
            selectedTab={currentPage}
            onPress={() => {
              setcurrentPage(1);
              ref.current.scrollToIndex({
                index: 1,
                animated: true,
              });
            }}
          />
          {/* <TouchableWithoutFeedback onPress={() => setselectedTab(0)}>
            <View style={styles.tabWrapper}>
              <View
                style={{
                  width: 0.35 * screenWidth,
                  backgroundColor: myColor.bgfb,
                  marginTop: 5,
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: myColor.fbtx,
                    fontWeight: 'bold',
                    fontSize: 14,
                    marginVertical: 2,
                  }}>
                  Tagihan
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback> */}
          {/* <TouchableWithoutFeedback onPress={() => setselectedTab(1)}>
            <View style={styles.tabWrapper}>
              <View
                style={{
                  width: 0.35 * screenWidth,

                  marginTop: 5,
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#a5a5a5',
                    fontWeight: 'bold',
                    fontSize: 14,
                    marginVertical: 2,
                  }}>
                  Riwayat
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback> */}
        </View>

        {/* content */}
        <Animated.FlatList
          style={{opacity: mountedAnimated, transform: [{translateY}]}}
          ref={ref}
          data={datapage}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          initialScrollIndex={0}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(ev) => {
            const newIndex = Math.floor(
              ev.nativeEvent.contentOffset.x / (0.9 * screenWidth),
            );
            console.log(newIndex);
            setcurrentPage(newIndex);
          }}
          renderItem={({item, index, separator}) => {
            return item.page;
          }}
        />

        {/* <View style={{flex: 1, marginTop: 10, alignItems: 'center'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatListTransaksi />
            <FlatListTransaksi />
            <FlatListTransaksi />
            <FlatListTransaksi />
            <FlatListTransaksi />
            <FlatListTransaksi />
            <FlatListTransaksi />
          </ScrollView>
          <View
            style={{
              height: 50,
              borderRadius: 10,
              backgroundColor: myColor.myblue,
              width: screenWidth * 0.7,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 5,
            }}>
            <Text style={{fontSize: 14, color: '#fff', fontWeight: 'bold'}}>
              Bayar
            </Text>
          </View>
        </View> */}
      </View>
    </View>
  );
};

export default HalamanBayar;

const styles = StyleSheet.create({
  nama: {
    fontSize: 14,
    fontWeight: 'bold',
    color: myColor.darkText,
    maxWidth: 0.5 * screenWidth,
  },
  tabWrapper: {
    width: 0.45 * screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinfo: {
    fontSize: 12,
    color: myColor.fbtx,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
