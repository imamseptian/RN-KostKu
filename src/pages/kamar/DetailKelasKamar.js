import {useFocusEffect, useNavigationState} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {Paragraph} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {APIUrl, myColor} from '../../function/MyVar';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const DetailKelasKamar = ({navigation, route}) => {
  useEffect(() => {
    console.log(screenWidth + 'x' + screenHeight);
  }, []);

  useNavigationState((state) => console.log(state));

  useFocusEffect(
    React.useCallback(() => {
      console.log('My Params :', route.params.nama);
      // setPenghuni(route.params.penghuni);
      return () => {
        // source.cancel('Api Canceled');
        console.log('tutup detail penghuni');
      };
    }, []),
  );

  return (
    <View style={{flex: 1}}>
      <View style={{backgroundColor: myColor.colorTheme, flex: 1}}></View>
      <View style={{backgroundColor: 'white', flex: 4}}></View>
      <View
        style={{
          backgroundColor: 'white',
          width: 0.8 * screenWidth,
          height: 0.8 * screenHeight,
          position: 'absolute',
          top: 0.05 * screenHeight,
          left: 0.1 * screenWidth,
          borderRadius: 20,
          elevation: 5,
        }}>
        <View style={{position: 'relative'}}>
          <Image
            source={{
              uri: APIUrl + '/kostdata/kelas_kamar/foto/' + route.params.foto,
            }}
            style={{
              width: '100%',
              height: (2 / 3) * 0.8 * screenWidth,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
              position: 'absolute',
              opacity: 0.2,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}></View>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              position: 'absolute',
              bottom: 5,
              left: 10,
              fontSize: 20,
            }}>
            {route.params.nama}
          </Text>
          <View style={{position: 'absolute', bottom: 5, right: 5}}>
            <TouchableNativeFeedback
              onPress={() =>
                navigation.push('EditKelas', {
                  kamar: route.params,
                  harga: String(route.params.harga),
                  kapasitas: String(route.params.kapasitas),
                })
              }>
              <View
                style={{
                  height: 30,
                  width: 75,
                  backgroundColor: myColor.addfacility,

                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  opacity: 0.9,
                }}>
                <Text
                  style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>
                  Edit
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 20,
            height: 0.8 * screenHeight - (2 / 3) * 0.8 * screenWidth,
            paddingBottom: 50,
            position: 'relative',
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons name="pricetag" color="#05375A" size={25} />
              <Text
                style={{
                  marginLeft: 10,
                  color: '#636e72',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Rp {route.params.harga} / Bulan
              </Text>
            </View>

            <Paragraph style={{textAlign: 'justify', color: '#05375A'}}>
              {route.params.kapasitas}
            </Paragraph>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <MaterialIcons name="room-service" color="#05375A" size={25} />
              <Text
                style={{
                  marginLeft: 10,
                  color: '#636e72',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Fasilitas Kamar
              </Text>
            </View>

            {route.params.fasilitas.map((item, index) => {
              return (
                // <Picker.Item key={index} label={item.nama} value={item.id} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                    marginLeft: 25,
                  }}
                  key={index}>
                  <Text
                    style={{
                      color: '#636e72',
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}>
                    {index + 1}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      color: '#636e72',
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}>
                    {item.item}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            width: '90%',
            height: 50,
            alignSelf: 'center',
            position: 'absolute',
            bottom: -25,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TouchableNativeFeedback onPress={() => navigation.goBack()}>
            <View
              style={{
                height: 40,
                width: 110,
                backgroundColor: myColor.applynow,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                Kembali
              </Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            onPress={() =>
              navigation.push('DaftarKamar', {
                id: route.params.id,
                kapasitas: route.params.kapasitas,
              })
            }>
            <View
              style={{
                height: 40,
                width: 110,
                backgroundColor: myColor.applynow,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                Daftar Kamar
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </View>
  );
};

export default DetailKelasKamar;

const styles = StyleSheet.create({});
