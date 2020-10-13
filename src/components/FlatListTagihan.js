import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
import {myColor} from '../function/MyVar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FlatListTagihan = () => {
  return (
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
          Februari, 2020
        </Text>
        <Text
          style={{fontWeight: 'bold', color: myColor.darkText, fontSize: 12}}>
          Rp 500.000,00
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
  );
};

export default FlatListTagihan;

const styles = StyleSheet.create({});
