import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {myAxios} from '../../function/MyAxios';
import {APIUrl, myColor, screenWidth, screenHeight} from '../../function/MyVar';

const ModalAddPengeluaran = (props) => {
  const [pengeluaran, setpengeluaran] = useState({
    judul: '',
    desc: '',
    jumlah: 0,
    id_kost: props.id_kost,
  });

  const submitPengeluaran = () => {
    const source = axios.CancelToken.source();
    myAxios.postAxios(
      APIUrl + '/api/pengeluaran',
      pengeluaran,
      props.token,
      source.token,
      onPost,
    );
    function onPost(status, data) {
      if (status == 'success') {
        alert('Sukses Ditambahkan');
        props.refresh();
        props.tutupmodal();
      } else if (status == 'cancel') {
        console.log('caught cancel filter');
      } else {
        console.log(data);
        console.log(pengeluaran);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <View
        style={{
          minHeight: 0.5 * screenHeight,
          paddingHorizontal: 10,
          paddingVertical: 5,
          width: screenWidth * 0.88,
          borderRadius: 10,
          backgroundColor: 'white',
          elevation: 5,
          alignItems: 'center',
        }}>
        <View
          style={{
            width: screenWidth * 0.88,
            borderBottomWidth: 1,
            paddingVertical: 10,
            alignItems: 'center',
          }}>
          <Text>Tambah Data Pengeluaran</Text>
        </View>

        <View
          style={{
            width: screenWidth * 0.88,
            paddingVertical: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 0.7 * screenWidth,
              height: 40,
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 5,
              marginBottom: 15,
            }}>
            <TextInput
              placeholder="Judul pengeluaran"
              onChangeText={(e) => setpengeluaran({...pengeluaran, judul: e})}
            />
          </View>

          <View
            style={{
              width: 0.7 * screenWidth,
              height: 40,
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 5,
              marginBottom: 15,
            }}>
            <TextInput
              placeholder="Nominal Pengeluaran"
              keyboardType="numeric"
              onChangeText={(e) => {
                if (e.length < 1) {
                  setpengeluaran({...pengeluaran, jumlah: parseInt(0)});
                } else {
                  setpengeluaran({...pengeluaran, jumlah: parseInt(e)});
                }
              }}
            />
          </View>

          <View
            style={{
              width: 0.7 * screenWidth,
              minHeight: 80,
              maxHeight: 150,
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 5,
              marginBottom: 30,
            }}>
            <TextInput
              placeholder="Deskripsi"
              multiline={true}
              onChangeText={(e) => setpengeluaran({...pengeluaran, desc: e})}
            />
          </View>
          <TouchableOpacity onPress={() => submitPengeluaran()}>
            <View
              style={{
                width: 0.7 * screenWidth,
                height: 40,
                borderRadius: 10,
                backgroundColor: myColor.myblue,
                marginBottom: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
                Tambahkan
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={props.tutupmodal}>
            <View
              style={{
                width: 0.7 * screenWidth,
                height: 40,
                borderRadius: 10,
                backgroundColor: 'white',
                borderWidth: 1,
                marginBottom: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: myColor.fbtx,
                }}>
                Tutup
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ModalAddPengeluaran;

const styles = StyleSheet.create({});
