import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import {FlatListTagihan} from '../../components';
import {myAxios} from '../../function/MyAxios';
import {APIUrl, myColor} from '../../function/MyVar';
import {useSelector} from 'react-redux';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;
const PenghuniTagihan = ({data}) => {
  const [dataTagihan, setdataTagihan] = useState([]);
  const dataRedux = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    const source = axios.CancelToken.source();
    myAxios.getAxios(
      APIUrl + '/api/gettagihan/' + data.id,
      dataRedux.token,
      source.token,
      onGet,
    );
    function onGet(status, data) {
      if (status == 'success') {
        console.log('Get data kost success');
        // console.log(data);
        // console.log(data);
        setdataTagihan(data.tagihan);
        // setdataHomescreen({
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

    return () => {
      source.cancel('Component got unmounted');
      console.log('Tagihan unmounted');
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 20}}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 0.9 * screenWidth,
          marginHorizontal: 0.05 * screenWidth,
        }}>
        <Text>Tagihan Aktif : {dataTagihan.length}</Text>
        <Text>Lihat Semua</Text>
      </View>

      <View style={{flex: 1}}>
        {dataTagihan.map((item, index) => {
          return <FlatListTagihan key={index} data={item} />;
        })}
      </View>
    </ScrollView>
  );
};

export default PenghuniTagihan;

const styles = StyleSheet.create({});
