import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {myColor} from '../../function/MyVar';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const PenghuniInfo = ({data}) => {
  return (
    <View>
      <Text style={{textAlign: 'center', fontSize: 20}}>
        {data.nama_depan} {data.nama_belakang}
      </Text>
      <View
        style={{
          marginTop: 20,
          width: 0.9 * screenWidth,
          marginHorizontal: 0.05 * screenWidth,
        }}>
        {data.kelamin === 1 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <MaterialCommunityIcons
              name="gender-male"
              size={25}
              color={myColor.darkText}
            />
            <Text style={{marginLeft: 10}}>Laki-Laki</Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <MaterialCommunityIcons
              name="gender-female"
              size={25}
              color={myColor.darkText}
            />
            <Text style={{marginLeft: 10}}>Perempuan</Text>
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <Fontisto name="date" size={25} color={myColor.darkText} />
          <Text style={{marginLeft: 10}}>
            {data.hari}-{data.bulan}-{data.tahun}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <MaterialIcons
            name="local-phone"
            size={25}
            color={myColor.darkText}
          />
          <Text style={{marginLeft: 10}}>{data.notelp}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <MaterialIcons name="email" size={25} color={myColor.darkText} />
          <Text style={{marginLeft: 10}}>{data.email}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <MaterialIcons
            name="location-on"
            size={25}
            color={myColor.darkText}
          />
          <Text style={{marginLeft: 10}}>
            Jl Cempaka Putih no 6, Kota Semarang, Jawa Tengah
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <MaterialIcons name="info" size={25} color={myColor.darkText} />
          <Text style={{marginLeft: 10}}>Pelajar</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <MaterialIcons name="web" size={25} color={myColor.darkText} />
          <Text style={{marginLeft: 10}}>UDINUS</Text>
        </View>
      </View>
    </View>
  );
};

export default PenghuniInfo;

const styles = StyleSheet.create({});
