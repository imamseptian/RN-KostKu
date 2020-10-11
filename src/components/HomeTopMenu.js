import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {myColor} from '../function/MyVar';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const HomeTopMenu = () => {
  return (
    <View
      style={{
        marginTop: 10,
        flex: 1,
        width: screenWidth,
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 0.85 * screenWidth,
          height: 90,
          backgroundColor: 'white',
          borderRadius: 10,
          elevation: 5,
        }}>
        <View
          style={{
            width: 0.85 * screenWidth,
            height: 25,
            borderBottomWidth: 0.5,
            borderBottomColor: myColor.blackText,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5,
            flexDirection: 'row',
          }}>
          <Text style={styles.textPendapatan}>Pemasukan Bulan ini :</Text>
          <Text style={styles.textPendapatan}>Rp 500.000 </Text>
        </View>
        <View
          style={{
            width: 0.85 * screenWidth,
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity onPress={() => alert('todo')}>
            <View style={styles.featureBox}>
              <FontAwesome5
                name="user-circle"
                color={myColor.blackText}
                size={30}
              />
              <Text style={styles.textFeature}>Profil</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => alert('todo')}>
            <View style={styles.featureBox}>
              <FontAwesome5
                name="house-user"
                color={myColor.blackText}
                size={30}
              />
              <Text style={styles.textFeature}>Kost Saya</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => alert('todo')}>
            <View style={styles.featureBox}>
              <Foundation
                name="clipboard-notes"
                color={myColor.blackText}
                size={30}
              />
              <Text style={styles.textFeature}>Tagihan</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => alert('todo')}>
            <View style={styles.featureBox}>
              <FontAwesome5
                name="history"
                color={myColor.blackText}
                size={30}
              />
              <Text style={styles.textFeature}>Riwayat</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeTopMenu;

const styles = StyleSheet.create({
  textPendapatan: {
    fontSize: 12,
    fontWeight: 'bold',
    color: myColor.darkText,
  },
  featureBox: {
    width: 0.17 * screenWidth,
    height: 55,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFeature: {
    fontSize: 12,
    fontWeight: 'bold',
    color: myColor.darkText,
  },
});
