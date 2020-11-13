import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {myColor, screenWidth} from '../../function/MyVar';
import {ListData} from './';

const ListHari = (props) => {
  return (
    <View
      style={{
        marginTop: 10,
        width: screenWidth * 0.9,
        minHeight: 100,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 0.05 * screenWidth,
      }}>
      <View
        style={{
          paddingVertical: 5,
          borderBottomWidth: 1,
          borderBottomColor: myColor.divider,
          justifyContent: 'center',
          paddingHorizontal: 10,
          marginBottom: 5,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'OpenSans-SemiBold',
            color: myColor.fbtx,
          }}>
          {props.data.hari}-{props.bulan.nama}-{props.tahun}
        </Text>
      </View>
      {props.data.data.map((item, index) => {
        return <ListData key={index} data={item} />;
      })}
      {/* <ListData key={index} data={item} /> */}
    </View>
  );
};

export default ListHari;

const styles = StyleSheet.create({});
