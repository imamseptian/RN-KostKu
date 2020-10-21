import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Modal} from 'react-native';
import {myColor, screenHeight, screenWidth, APIUrl} from '../../function/MyVar';
import {FAB} from 'react-native-paper';
import {ModalAddPengeluaran} from './';
import {Picker} from '@react-native-community/picker';
import {myAxios} from '../../function/MyAxios';
import axios from 'axios';
const TabPengeluaran = (props) => {
  const [showModal, setshowModal] = useState(false);
  const [dataPengeluaran, setdataPengeluaran] = useState([]);

  const ambilpengeluaran = () => {
    const source = axios.CancelToken.source();
    myAxios.getAxios(
      APIUrl + '/api/getpengeluaran/' + props.id_kost,
      props.token,
      source.token,
      onGet,
    );
    function onGet(status, data) {
      if (status == 'success') {
        // console.log('Get data riwayat success :' + props.penghuni.nama);

        setdataPengeluaran(data.data);
        // setisLoading(false);
        // console.log(data);
      } else if (status == 'cancel') {
        console.log('caught cancel filter');
      } else {
        console.log(data);
        // setisLoading(false);
      }
    }
  };

  useEffect(() => {
    ambilpengeluaran();
    return () => {
      console.log('aaa');
    };
  }, []);

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
          <Picker style={{height: 30}}>
            <Picker.Item label="Bulan" />
            <Picker.Item key={'1'} label="Januari" value={1} />
            <Picker.Item key={'2'} label="Februari" value={2} />
            <Picker.Item key={'3'} label="Maret" value={3} />
            <Picker.Item key={'4'} label="April" value={4} />
            <Picker.Item key={'5'} label="Mei" value={5} />
            <Picker.Item key={'6'} label="Juni" value={6} />
            <Picker.Item key={'7'} label="Juli" value={7} />
            <Picker.Item key={'8'} label="Agustus" value={8} />
            <Picker.Item key={'9'} label="September" value={9} />
            <Picker.Item key={'10'} label="Oktober" value={10} />
            <Picker.Item key={'11'} label="November" value={11} />
            <Picker.Item key={'12'} label="Desember" value={12} />
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
          <Picker style={{height: 30}}>
            <Picker.Item label="Tahun" />
            <Picker.Item key={'2020'} label="2020" value={2020} />
            <Picker.Item key={'2021'} label="2021" value={2021} />
            <Picker.Item key={'2022'} label="2022" value={2022} />
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
