import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {
  HomeKamarSection,
  HomePenghuniSection,
  HomeTitleDrawer,
  HomeTopMenu,
} from '../../components';
import {TransaksiSection} from './component';
import {HomeClipper} from '../../components/atoms';
import {myAxios} from '../../function/MyAxios';
import {APIUrl, myColor} from '../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const HomeScreen = ({navigation, route}) => {
  // Variabel Homescreen
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [dataHomescreen, setdataHomescreen] = useState({
    penghuni: [],
    kamar: [],
    transaksi: [],
    uang: 0,
  });

  // Fungsi on app mount
  useEffect(() => {
    // checkFirstTime();
    const source = axios.CancelToken.source();
    setIsLoading(true);
    myAxios.getAxios(
      APIUrl + '/api/firsttime',
      dataRedux.token,
      source.token,
      onGet,
    );
    function onGet(status, data) {
      if (status == 'success') {
        console.log('first time sukses');
        setIsLoading(false);
        if (data.data < 1) {
          navigation.reset({
            index: 0,
            routes: [{name: 'FirstScreen'}],
          });
        }
      } else if (status == 'cancel') {
        console.log('cancel API');
        setIsLoading(false);
      } else {
        console.log(data);
        setIsLoading(false);
      }
    }

    return () => {
      source.cancel('Component got unmounted');
      console.log('HomeScreen unmounted');
    };
  }, []);

  // Fungsi saat app focus homescreen
  useFocusEffect(
    React.useCallback(() => {
      const source = axios.CancelToken.source();
      if (dataRedux.user.kostku != 0) {
        console.log(dataHomescreen.penghuni.length);
        setIsLoading(true);
        myAxios.getAxios(
          APIUrl + '/api/homescreen/' + dataRedux.user.kostku,
          dataRedux.token,
          source.token,
          onGet,
        );
        function onGet(status, data) {
          if (status == 'success') {
            console.log('Get data kost success');
            // console.log(data);
            setdataHomescreen({
              ...dataHomescreen,
              penghuni: data.data_penghuni,
              kamar: data.data_kamar,
              transaksi: data.transaksi,
              uang: data.uang,
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

        // setTimeout(() => {

        // }, 1500);
      }

      return () => {
        source.cancel('Component got unmounted');
        console.log('HomeScreen unmounted');
      };
    }, []),
  );

  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
      }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

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
        <HomeTopMenu uang={dataHomescreen.uang} />
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* PENGHUNI SECTION */}
          <HomePenghuniSection
            status={isLoading}
            data={dataHomescreen.penghuni}
          />
          {/* Kamar Section */}
          <HomeKamarSection status={isLoading} data={dataHomescreen.kamar} />

          {/* TRANSAKSI SECTION */}
          <TransaksiSection
            status={isLoading}
            data={dataHomescreen.transaksi}
          />
        </ScrollView>
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
