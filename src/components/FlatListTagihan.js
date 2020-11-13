import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {formatRupiah, myColor} from '../function/MyVar';

const screenWidth = Dimensions.get('window').width;

const FlatListTagihan = ({data}) => {
  return (
    <TouchableNativeFeedback onPress={() => alert('todo')}>
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
          <Text numberOfLines={1} style={styles.textJudul}>
            {data.judul}
          </Text>
          <Text style={styles.textHarga}>
            {formatRupiah(data.jumlah.toString(), 'Rp. ')}
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
    </TouchableNativeFeedback>
  );
};

export default FlatListTagihan;

const styles = StyleSheet.create({
  textInfo: {fontFamily: 'OpenSans-Regular', fontSize: 13},
  textJudul: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    color: myColor.myblue,
  },
  textHarga: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: myColor.darkText,
  },
});
