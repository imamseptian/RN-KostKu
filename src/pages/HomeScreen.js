import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  HomeKamarSection,
  HomePenghuniSection,
  HomeTitleDrawer,
  HomeTopMenu,
} from '../components';
import {HomeClipper} from '../components/atoms';
import {myAxios} from '../function/MyAxios';
import {APIUrl, myColor} from '../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const HomeScreen = ({navigation, route}) => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [dataHomescreen, setdataHomescreen] = useState({
    penghuni: [],
    kamar: [],
  });
  const dispatch = useDispatch();

  const checkFirstTime = () => {
    setIsLoading(true);
    // console.log('CHECKFIRST TIME:', dataRedux.user);
    // if (dataRedux.user.kostku === 0) {
    //   setIsLoading(false);
    //   goToFirstTime();
    // } else {
    //   setIsLoading(false);
    // }
    // console.log(dataRedux);
    console.log('checkfirsttime', dataRedux.user.id);
    axios
      .get('https://dry-forest-53707.herokuapp.com/api/firsttime', {
        headers: {
          Authorization: `Bearer ${dataRedux.token}`,
        },
      })
      .then((res) => {
        // setIsSubmit(false);
        console.log('first time sukses');
        setIsLoading(false);
        if (res.data.data < 1) {
          goToFirstTime();
        }
        // goToHome();
      })
      .catch((error) => {
        // setIsSubmit(false);
        setIsLoading(false);
        console.log('first time error');
        console.log(error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      const source = axios.CancelToken.source();
      if (dataRedux.user.kostku != 0) {
        setIsLoading(true);
        myAxios.getAxios(
          APIUrl + '/api/homescreen/' + dataRedux.user.kostku,
          dataRedux.token,
          source.token,
          onGet,
        );
        function onGet(status, data) {
          if (status == 'success') {
            console.log('success');
            // console.log(data);
            setdataHomescreen({
              ...dataHomescreen,
              penghuni: data.data_penghuni,
              kamar: data.data_kamar,
            });
            setIsLoading(false);
          } else if (status == 'cancel') {
            console.log('caught cancel filter');
            setIsLoading(false);
          } else {
            console.log(data);
            setIsLoading(false);
          }
        }
      }

      return () => {
        source.cancel('Component got unmounted');
        // console.log('unmounted');
      };
      // console.log('ayaya');
    }, []),
  );

  useEffect(() => {
    // console.log('AYAYA : ' + dataRedux.user.id);
    checkFirstTime();
  }, []);

  const goToFirstTime = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'FirstScreen'}],
    });
  };

  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
      }}>
      <StatusBar translucent backgroundColor="transparent" />

      <HomeClipper />

      {/* WRAPPER ATAS SAMPAI CLIPPER  */}
      <View
        style={{
          paddingTop: StatusBar.currentHeight,
          alignItems: 'center',
          width: screenWidth,
          height: 0.5 * screenWidth,
        }}>
        <HomeTitleDrawer bukaDrawer={() => navigation.toggleDrawer()} />
        <HomeTopMenu />
      </View>
      <View
        style={{
          marginTop: 10,
          flex: 1,
        }}>
        {/* PENGHUNI SECTION */}
        <HomePenghuniSection
          status={isLoading}
          data={dataHomescreen.penghuni}
        />
        {/* Kamar Section */}
        <HomeKamarSection data={dataHomescreen.kamar} />

        {/* TRANSAKSI SECTION */}

        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 0.05 * screenWidth,
            }}>
            <Text style={styles.sectionTitle}>Transaksi Terakhir</Text>
            <Text style={styles.seeAll}>Lihat Semua</Text>
          </View>
          <View style={{marginTop: 10}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{paddingLeft: 0.05 * screenWidth}}></ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    color: myColor.titleHome,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 12,
    color: myColor.myblue,
    fontWeight: 'bold',
  },
});
