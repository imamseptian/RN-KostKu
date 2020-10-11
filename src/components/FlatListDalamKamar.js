import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import {myColor, APIUrl} from '../function/MyVar';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const FlatListDalamKamar = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View
        style={{
          height: 100,
          marginTop: 10,
          width: 0.9 * screenWidth,
          backgroundColor: 'white',
          elevation: 5,
          marginHorizontal: 0.05 * screenWidth,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 76,
            width: 76,
            borderRadius: 38,
            backgroundColor: 'red',
            marginLeft: 10,
            borderWidth: 2,
            borderColor: '#fff',
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: APIUrl + '/kostdata/pendaftar/foto/' + props.data.foto_diri,
            }}
            style={{height: 74, width: 74, borderRadius: 74 / 2}}
          />
        </View>

        <View style={{marginLeft: 10}}>
          <Text
            style={{
              color: myColor.darkText,
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            {props.data.nama_depan} {props.data.nama_belakang}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Status Tagihan</Text>

            {props.data.tagihan >= 0 ? (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    backgroundColor: myColor.success,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 10,
                    paddingHorizontal: 5,
                    borderRadius: 10,
                    minWidth: 80,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: myColor.darkText,
                      fontSize: 12,
                    }}>
                    Lunas
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: myColor.success,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 5,
                    paddingHorizontal: 5,
                    borderRadius: 10,
                    minWidth: 30,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: myColor.darkText,
                      fontSize: 12,
                    }}>
                    {props.data.tagihan}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    backgroundColor: myColor.alert,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 10,
                    paddingHorizontal: 5,
                    borderRadius: 10,
                    minWidth: 80,
                  }}>
                  <Text
                    style={{fontWeight: 'bold', color: 'white', fontSize: 12}}>
                    Belum Lunas
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: myColor.alert,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 5,
                    paddingHorizontal: 5,
                    borderRadius: 10,
                    minWidth: 30,
                  }}>
                  <Text
                    style={{fontWeight: 'bold', color: 'white', fontSize: 12}}>
                    -1
                  </Text>
                </View>
              </View>
            )}

            {/* <View
              style={{
                backgroundColor: myColor.alert,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
                paddingHorizontal: 5,
                borderRadius: 10,
                minWidth: 80,
              }}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 12}}>
                Belum Lunas
              </Text>
            </View>

            <View
              style={{
                backgroundColor: myColor.alert,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 5,
                paddingHorizontal: 5,
                borderRadius: 10,
                minWidth: 30,
              }}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 12}}>
                -1
              </Text>
            </View> */}
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default FlatListDalamKamar;

const styles = StyleSheet.create({});
