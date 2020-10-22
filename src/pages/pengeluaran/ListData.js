import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {myColor, screenWidth, formatRupiah} from '../../function/MyVar';

const ListData = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 75,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{
            uri:
              'https://liquipedia.net/commons/images/thumb/6/66/AdmiralBulldog_EPICENTER_XL.jpg/600px-AdmiralBulldog_EPICENTER_XL.jpg',
          }}
          style={{height: 50, width: 50, borderRadius: 25}}
        />
        <View style={{marginLeft: 10}}>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: myColor.fbtx}}>
            {props.data.nama_depan} {props.data.nama_belakang}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: myColor.fbtx1,
            }}>
            {props.data.waktu} WIB
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: myColor.fbtx,
          }}>
          {formatRupiah(props.data.jumlah.toString(), 'Rp. ')}
        </Text>
      </View>
    </View>
  );
};

export default ListData;

const styles = StyleSheet.create({});
