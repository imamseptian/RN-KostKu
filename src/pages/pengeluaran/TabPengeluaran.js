import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Modal} from 'react-native';
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
import axios from 'axios';
const TabPengeluaran = (props) => {
  const [showModal, setshowModal] = useState(false);
  const [dataPengeluaran, setdataPengeluaran] = useState([]);
  const [myTahun, setmyTahun] = useState(dataTahun());
  const [selectedBulan, setselectedBulan] = useState(new Date().getMonth() + 1);
  const [selectedTahun, setselectedTahun] = useState(new Date().getFullYear());

  const ambilpengeluaran = () => {
    const source = axios.CancelToken.source();
    myAxios.postAxios(
      APIUrl + '/api/filterdatakeuangan',
      {
        id_kost: props.id_kost,
        bulan: selectedBulan.toString(),
        tahun: selectedTahun.toString(),
        jenis: 2,
      },
      props.token,
      source.token,
      onPost,
    );
    function onPost(status, data) {
      if (status == 'success') {
        setdataPengeluaran(data.data);
      } else if (status == 'cancel') {
        console.log('caught cancel filter');
      } else {
        console.log(data);
        console.log(pengeluaran);
      }
    }
  };

  useEffect(() => {
    console.log('triggered');
    ambilpengeluaran();
    return () => {
      console.log('aaa');
    };
  }, [selectedBulan, selectedTahun]);

  return (
    <View style={{flex: 1, width: screenWidth}}>
      <Modal
        visible={showModal}
        transparent={true}
        onRequestClose={() => setshowModal(false)}>
        <ModalAddPengeluaran
          id_kost={props.id_kost}
          token={props.token}
          tutupmodal={() => setshowModal(false)}
          refresh={() => ambilpengeluaran()}
        />
      </Modal>
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
        <ScrollView>
          {dataPengeluaran.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  width: screenWidth,
                  borderBottomColor: myColor.darkText,
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: myColor.fbtx,
                  }}>
                  {item.judul}
                </Text>

                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: myColor.darkText,
                      textAlign: 'right',
                    }}>
                    {item.jumlah}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: myColor.fbtx,
                      textAlign: 'right',
                    }}>
                    12-Oktober-2020
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          color="white"
          onPress={() => setshowModal(true)}
        />
      </View>
    </View>
  );
};

export default TabPengeluaran;

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
