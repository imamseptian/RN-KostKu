import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import {APIUrl, myColor} from '../../function/MyVar';
import {FlatListTransaksi, FlatListModal} from '../../components';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const TabTransaksi = (props) => {
  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
        width: 0.9 * screenWidth,
        alignItems: 'center',
      }}>
      {props.data.length < 1 ? (
        <View
          style={{
            flex: 1,
            marginTop: 10,
            width: 0.9 * screenWidth,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Tagihan tidak ditemukan</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {props.data.map((item, index) => {
            return <FlatListTransaksi key={index} data={item} />;
          })}
        </ScrollView>
      )}

      <TouchableNativeFeedback
        onPress={props.onPress}
        disabled={props.penghuni === undefined ? true : false}>
        <View
          style={{
            height: 50,
            borderRadius: 10,
            backgroundColor:
              props.penghuni === undefined ? myColor.bgfb : myColor.myblue,
            width: screenWidth * 0.7,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 5,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: props.penghuni === undefined ? myColor.blackText : '#fff',
              fontWeight: 'bold',
            }}>
            Bayar
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default TabTransaksi;

const styles = StyleSheet.create({});
