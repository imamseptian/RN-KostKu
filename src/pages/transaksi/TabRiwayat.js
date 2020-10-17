import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Button,
  TouchableNativeFeedback,
} from 'react-native';
import {APIUrl, myColor} from '../../function/MyVar';
import {
  FlatListTransaksi,
  FlatListModal,
  FlatListTransaksiBayar,
} from '../../components';
import {myAxios} from '../../function/MyAxios';

import axios from 'axios';

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
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <FlatListTransaksiBayar fungsi={props.fungsiparent} /> */}
        {props.data.map((item, index) => {
          return (
            <FlatListTransaksiBayar
              key={index}
              data={item}
              fungsi={props.fungsiparent}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TabRiwayat;

const styles = StyleSheet.create({});
