import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {myColor, formatRupiah} from '../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const FlatListTransaksiBayar = (props) => {
  return (
    <TouchableNativeFeedback onPress={() => props.fungsi(props.data)}>
      <View
        style={{
          flexDirection: 'row',
          width: screenWidth * 0.8,
          minHeight: 50,
          backgroundColor: 'white',
          marginBottom: 20,
          elevation: 5,
          borderRadius: 10,
          margin: 3,
          alignItems: 'center',
          paddingVertical: 10,
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <Text numberOfLines={2} style={styles.judul}>
          {props.data.hari}-{props.data.bulan}-{props.data.tahun}
        </Text>

        <Text numberOfLines={2} style={styles.harga}>
          {formatRupiah(props.data.jumlah.toString(), 'Rp. ')}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default FlatListTransaksiBayar;

const styles = StyleSheet.create({
  judul: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    maxWidth: 0.5 * screenWidth,
    color: myColor.fbtx,
  },
  harga: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    maxWidth: 0.4 * screenWidth,
    color: myColor.darkText,
    textAlign: 'right',
  },
});
