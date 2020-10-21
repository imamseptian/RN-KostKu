import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {myColor, screenHeight, screenWidth, APIUrl} from '../function/MyVar';
import {useNavigation} from '@react-navigation/native';

const BoxProfile = (props) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: 0.2 * screenHeight - 125 / 2,
        width: 0.9 * screenWidth,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 10,
        padding: 10,
      }}>
      <View style={{height: 100, flexDirection: 'row'}}>
        <Image
          source={{
            uri: APIUrl + '/kostdata/pemilik/foto/' + props.data.foto_profil,
          }}
          style={{height: 100, width: 100, borderRadius: 10}}
        />
        <View style={{marginLeft: 15, width: screenWidth * 0.9 - 135}}>
          <Text style={styles.namaprofil}>
            {props.data.nama_depan} {props.data.nama_belakang}
          </Text>
          <Text style={styles.email}>{props.data.email}</Text>

          <View
            style={{
              backgroundColor: myColor.grayprofile,
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
              borderRadius: 10,
            }}>
            <View>
              <Text style={styles.subTitle}>Kelas</Text>
              <Text style={styles.subContent}>{props.attribut.kelas}</Text>
            </View>
            <View>
              <Text style={styles.subTitle}>Kamar</Text>
              <Text style={styles.subContent}>{props.attribut.kamar}</Text>
            </View>
            <View>
              <Text style={styles.subTitle}>Penghuni</Text>
              <Text style={styles.subContent}>{props.attribut.penghuni}</Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.push('EditProfil', props.data)}>
        <View
          style={{
            backgroundColor: '#5374FF',
            borderRadius: 10,
            height: 50,
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
            Edit Profil
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BoxProfile;

const styles = StyleSheet.create({
  namaprofil: {
    fontSize: 16,
    fontWeight: 'bold',
    color: myColor.fbtx,
    marginBottom: 3,
  },
  email: {
    fontSize: 11,
    fontWeight: 'bold',
    color: myColor.fbtx1,
    marginBottom: 7,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: myColor.blackText,
  },
  subContent: {
    fontSize: 12,
  },
});
