import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
const screenWidth = Dimensions.get('window').width;
import {myColor} from '../function/MyVar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FlatListTagihan = ({data}) => {
  function formatRupiah(angka, prefix) {
    let potong = angka.substring(0, angka.length - 2);
    let number_string = potong.replace(/[^,\d]/g, '').toString(),
      split = number_string.split(','),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
  }

  return (
    <TouchableNativeFeedback onPress={() => alert('todo')}>
      <View
        style={{
          width: 0.9 * screenWidth,
          height: 80,
          marginTop: 10,
          elevation: 5,
          marginHorizontal: 0.05 * screenWidth,
          backgroundColor: 'white',
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <MaterialIcons
          name="attach-money"
          color={myColor.success}
          size={30}
          style={{
            marginRight: 5,
          }}
        />
        <View
          style={{
            flex: 1,
            height: 70,
            marginLeft: 5,
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={{fontWeight: 'bold', color: myColor.myblue, fontSize: 16}}>
            {data.judul}
          </Text>
          <Text
            style={{fontWeight: 'bold', color: myColor.darkText, fontSize: 12}}>
            {formatRupiah(data.jumlah.toString(), 'Rp.')}
          </Text>
        </View>
        <MaterialIcons
          name="attach-money"
          color={myColor.success}
          size={30}
          style={{
            marginRight: 5,
          }}
        />
      </View>
    </TouchableNativeFeedback>
  );
};

export default FlatListTagihan;

const styles = StyleSheet.create({});
