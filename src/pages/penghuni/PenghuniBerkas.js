import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const PenghuniBerkas = ({data}) => {
  return (
    <View>
      {/* <Text style={{textAlign: 'center', fontSize: 20}}>
        {data.nama_depan} {data.nama_belakang}
      </Text> */}
      <View
        style={{
          marginTop: 20,
          width: 0.9 * screenWidth,
          marginHorizontal: 0.05 * screenWidth,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <Text>Nomor KTP :</Text>
          <Text style={{marginLeft: 10}}>{data.noktp}</Text>
        </View>
        <View
          style={{
            marginBottom: 15,
          }}>
          <Text>Foto KTP :</Text>
          <Image
            source={{
              uri:
                'https://dry-forest-53707.herokuapp.com/kostdata/pendaftar/foto/' +
                data.foto_ktp,
            }}
            style={{
              width: 0.7 * screenWidth,
              height: (2 / 3) * (0.7 * screenWidth),
              borderRadius: 10,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default PenghuniBerkas;

const styles = StyleSheet.create({});
