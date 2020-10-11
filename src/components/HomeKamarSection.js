import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {myColor, APIUrl} from '../function/MyVar';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeKamarSection = ({data}) => {
  const navigation = useNavigation();
  return (
    <View style={{marginTop: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 0.05 * screenWidth,
        }}>
        <Text style={styles.sectionTitle}>Kamar</Text>
        <Text style={styles.seeAll}>Lihat Semua</Text>
      </View>
      <View style={{marginTop: 10}}>
        {data.length < 1 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: myColor.darkText,
                fontWeight: 'bold',
                fontSize: 18,
                paddingVertical: 15,
              }}>
              Kamar kost masih kosong
            </Text>
          </View>
        ) : (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingLeft: 0.05 * screenWidth}}>
            {data.map((item, index) => {
              return (
                <TouchableNativeFeedback
                  key={index}
                  onPress={() =>
                    navigation.navigate('MainScreen', {
                      screen: 'KamarScreen',
                      params: {
                        screen: 'DetailKelas',
                        params: item,
                      },
                    })
                  }>
                  <View style={styles.kamarCard}>
                    <Image
                      source={{
                        // uri: APIUrl + '/image_kelas/' + item.foto,
                        uri: APIUrl + '/kostdata/kelas_kamar/foto/' + item.foto,
                      }}
                      style={{height: 180, width: '100%', borderRadius: 10}}
                    />
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'black',
                        position: 'absolute',
                        opacity: 0.3,
                        borderRadius: 10,
                      }}></View>
                    <View style={styles.kamarContent}>
                      <Text style={styles.titleKamar}>{item.nama}</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 5,
                        }}>
                        <Ionicons name="pricetags" color="#ffffff" size={15} />
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 12,
                            fontWeight: 'bold',
                            marginLeft: 3,
                          }}>
                          Rp {item.harga}/Bulan
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 5,
                        }}>
                        <FontAwesome5
                          name="door-open"
                          color="#ffffff"
                          size={15}
                        />
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 12,
                            fontWeight: 'bold',
                            marginLeft: 3,
                          }}>
                          {item.banyak} Kamar
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableNativeFeedback>
              );
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default HomeKamarSection;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    color: myColor.titleHome,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 12,
    color: myColor.myblue,
    fontWeight: 'bold',
  },
  titleKamar: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  kamarCard: {
    width: 150,
    height: 180,
    borderRadius: 10,
    position: 'relative',
    marginRight: 15,
    elevation: 10,
  },
  kamarContent: {
    position: 'absolute',
    bottom: 10,
    left: 5,
  },
});
