import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {myColor} from '../function/MyVar';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const FlatListTransaksi = (props) => {
  return (
    <View
      style={{
        width: 0.9 * screenWidth,
        height: 100,
        flexDirection: 'row',
      }}>
      <View
        style={{
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
          borderRightWidth: 1,
          borderRightColor: myColor.myblue,
          width: 150,
          position: 'relative',
        }}>
        <Text style={styles.text}>{props.data.judul}</Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 25,
            justifyContent: 'center',
            position: 'absolute',
            right: -(12 / 2),
          }}>
          <View
            style={{
              width: 12,
              height: 12,
              backgroundColor: myColor.myblue,
              borderRadius: 12 / 2,
            }}></View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginLeft: 20,
          flexDirection: 'row',
        }}>
        <FontAwesome5
          name="money-bill-wave"
          color={myColor.blackText}
          size={15}
          style={{
            marginRight: 5,
          }}
        />
        <View style={{marginLeft: 5}}>
          <Text style={styles.text}>Tagihan Kost</Text>
          <Text style={styles.price}>Rp {props.data.jumlah}</Text>
        </View>
      </View>
    </View>
  );
};

export default FlatListTransaksi;

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 13,
    color: myColor.blackText,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 12,
    color: myColor.fbtx1,
  },
});
