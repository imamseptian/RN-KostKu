import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {myColor, screenHeight, screenWidth, APIUrl} from '../function/MyVar';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const BoxInfoKost = (props) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: 20,
        width: 0.9 * screenWidth,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: myColor.blackText,
        }}>
        Info Kost
      </Text>

      <Image
        source={{
          uri: APIUrl + '/kostdata/kost/foto/' + props.data.foto_kost,
        }}
        style={{
          height: (0.8 * screenWidth * 2) / 3,
          width: 0.8 * screenWidth,
          borderRadius: 10,
        }}
      />

      <View
        style={{
          width: 0.8 * screenWidth,
          marginTop: 10,
          backgroundColor: myColor.grayprofile,
          alignItems: 'center',
          borderRadius: 10,
          paddingVertical: 10,
        }}>
        <View style={styles.wrapperFieldInfo}>
          <Text style={styles.namaInfo}>Nama Kost</Text>
          <Text style={styles.contentInfo}>{props.data.nama}</Text>
        </View>

        <View style={styles.wrapperFieldInfo}>
          <Text style={styles.namaInfo}>Provinsi</Text>
          <Text style={styles.contentInfo}>{props.daerah.provinsi}</Text>
        </View>
        <View style={styles.wrapperFieldInfo}>
          <Text style={styles.namaInfo}>Kabupaten/Kota</Text>
          <Text style={styles.contentInfo}>{props.daerah.kota}</Text>
        </View>
        <View style={styles.wrapperFieldInfo}>
          <Text style={styles.namaInfo}>Alamat</Text>
          <Text style={styles.contentInfo}>{props.data.alamat}</Text>
        </View>
        <View style={styles.wrapperFieldInfo}>
          <Text style={styles.namaInfo}>No Telepon Kost</Text>
          <Text style={styles.contentInfo}>{props.data.notelp}</Text>
        </View>
        <View style={styles.wrapperFieldInfo}>
          <Text style={styles.namaInfo}>Deskripsi Kost</Text>
          <Text style={styles.contentInfo}>{props.data.desc}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => navigation.push('EditKost', props.data)}>
        <View
          style={{
            backgroundColor: '#5374FF',
            borderRadius: 10,
            height: 50,
            width: 0.8 * screenWidth,
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
            Edit Kost
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BoxInfoKost;

const styles = StyleSheet.create({
  wrapperFieldInfo: {
    width: 0.7 * screenWidth,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    marginBottom: 5,
  },
  namaInfo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: myColor.graytextprof,
  },
  contentInfo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: myColor.fbtx,
    textAlign: 'justify',
  },
});
