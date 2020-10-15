import React from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import {APIUrl, myColor} from '../../function/MyVar';
import {FlatListTransaksi, FlatListModal} from '../../components';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const TabRiwayat = (props) => {
  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
        width: 0.9 * screenWidth,
        alignItems: 'center',
      }}></View>
  );
};

export default TabRiwayat;

const styles = StyleSheet.create({});
