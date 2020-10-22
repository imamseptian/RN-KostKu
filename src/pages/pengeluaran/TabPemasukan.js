import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  myColor,
  screenHeight,
  screenWidth,
  APIUrl,
  startingYear,
  dataBulan,
  dataTahun,
} from '../../function/MyVar';
import {FAB} from 'react-native-paper';
import {ModalAddPengeluaran} from './';
import {Picker} from '@react-native-community/picker';
import {myAxios} from '../../function/MyAxios';
import {ListHari} from './';
import axios from 'axios';
const TabPemasukan = (props) => {
  const [dataPemasukan, setdataPemasukan] = useState([]);
  const [myTahun, setmyTahun] = useState(dataTahun());
  const [selectedBulan, setselectedBulan] = useState(new Date().getMonth() + 1);
  const [selectedTahun, setselectedTahun] = useState(new Date().getFullYear());

  const ambilPemasukan = () => {
    const source = axios.CancelToken.source();
    myAxios.postAxios(
      APIUrl + '/api/filterpemasukan',
      {
        id_kost: props.id_kost,
        bulan: selectedBulan.toString(),
        tahun: selectedTahun.toString(),
        jenis: 1,
      },
      props.token,
      source.token,
      onPost,
    );
    function onPost(status, data) {
      if (status == 'success') {
        setdataPemasukan(data.data);
      } else if (status == 'cancel') {
        console.log('caught cancel filter');
      } else {
        console.log(data);
      }
    }
  };

  useEffect(() => {
    console.log('triggered');
    ambilPemasukan();
    return () => {
      console.log('aaa');
    };
  }, [selectedBulan, selectedTahun]);

  return (
    <View style={{flex: 1, width: screenWidth}}>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          width: screenWidth,
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 30,
            width: 150,
            elevation: 5,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <Picker
            selectedValue={selectedBulan}
            style={{height: 30}}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue != null) {
                setselectedBulan(itemValue);
              }
            }}>
            <Picker.Item label="Pilih Provinsi" />
            {dataBulan.map((item, index) => {
              return (
                <Picker.Item key={index} label={item.nama} value={item.id} />
              );
            })}
          </Picker>
        </View>
        <View
          style={{
            marginLeft: 10,
            height: 30,
            width: 110,
            elevation: 5,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <Picker
            selectedValue={selectedTahun}
            style={{height: 30}}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue != null) {
                setselectedTahun(itemValue);
              }
            }}>
            <Picker.Item label="Pilih Provinsi" />
            {myTahun.map((item, index) => {
              return (
                <Picker.Item
                  key={index}
                  label={item.id.toString()}
                  value={item.id}
                />
              );
            })}
          </Picker>
        </View>
      </View>

      <View style={{marginTop: 10, width: screenWidth, flex: 1}}>
        <FlatList
          data={dataPemasukan}
          keyExtractor={(item) => item.hari.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 60}}
          renderItem={({item, index, separator}) => {
            return (
              <ListHari
                key={index}
                data={item}
                bulan={dataBulan[selectedBulan - 1]}
                tahun={selectedTahun}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default TabPemasukan;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffaa91',
  },
});
