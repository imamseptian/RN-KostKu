import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {myColor, formatRupiah} from '../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const ModalRiwayat = (props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <View
        style={{
          minHeight: 0.5 * screenHeight,
          maxHeight: screenHeight * 0.75,
          paddingHorizontal: 10,
          paddingVertical: 5,
          width: screenWidth * 0.88,
          borderRadius: 10,

          backgroundColor: 'white',
          // position: 'absolute',
          // top: 0.5 * screenHeight - 0.5 * (0.5 * screenHeight),
          // left: 0.5 * screenWidth - 0.5 * (0.8 * screenWidth),
          elevation: 5,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: myColor.blackText,
            fontSize: 15,
            marginBottom: 20,
          }}>
          Detail Transaksi
        </Text>
        <ScrollView>
          <View style={styles.fieldWrapper}>
            <Text style={styles.subtitle}>Judul</Text>
            <Text>: </Text>
            <Text style={styles.konten}>{props.data.judul}</Text>
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.subtitle}>Deskripsi</Text>
            <Text>: </Text>
            <Text style={[styles.konten, {textAlign: 'justify'}]}>
              {props.data.desc}
            </Text>
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.subtitle}>Nominal</Text>
            <Text>: </Text>
            <Text style={styles.konten}>
              {formatRupiah(props.data.jumlah.toString(), 'Rp. ')}
            </Text>
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.subtitle}>Tanggal Transaksi</Text>
            <Text>: </Text>
            <Text style={styles.konten}>
              {props.data.hari}-{props.data.bulan}-{props.data.tahun},{' '}
              {props.data.waktu} WIB
            </Text>
          </View>
        </ScrollView>

        <TouchableNativeFeedback onPress={props.closeModal}>
          <View
            style={{
              height: 40,
              width: 100,
              borderRadius: 10,
              backgroundColor: myColor.myblue,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
              Tutup
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default ModalRiwayat;

const styles = StyleSheet.create({
  subtitle: {
    width: 0.2 * screenWidth,
    paddingRight: 5,
    color: myColor.fbtx,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
  },
  konten: {
    width: 0.58 * screenWidth,
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
  },
  fieldWrapper: {
    flexDirection: 'row',
    width: 0.8 * screenWidth,
    minHeight: 50,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    paddingVertical: 5,
  },
  judul: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    color: myColor.fbtx,
  },
});
