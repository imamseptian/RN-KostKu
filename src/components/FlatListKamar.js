import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import {myColor} from '../function/MyVar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;

const FlatListKamar = (props) => {
  const [status, setstatus] = useState(0);
  const [kamar, setKamar] = useState(props.item);

  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View
        style={{
          width: 0.9 * screenWidth,
          marginHorizontal: 0.05 * screenWidth,
          marginBottom: 20,
          minHeight: 150,
          backgroundColor: 'white',
          elevation: 5,
          borderRadius: 10,
        }}>
        <View
          style={{
            minHeight: 100,
            flexDirection: 'row',
          }}>
          <Image
            style={{
              height: 100,
              width: 100,

              borderTopLeftRadius: 10,
            }}
            source={{
              uri:
                'https://www.harapanrakyat.com/wp-content/uploads/2020/04/Desain-Kamar-Tidur-Nyaman-Hangat-696x464.jpg',
            }}
          />
          <View
            style={{
              flex: 1,
              padding: 10,
              position: 'relative',
              justifyContent: 'center',
            }}>
            <View>
              <Text
                numberOfLines={1}
                style={{
                  maxWidth: 0.9 * screenWidth - 130,
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: myColor.darkText,
                }}>
                {kamar.nama}
              </Text>

              <Text
                numberOfLines={1}
                style={{
                  maxWidth: 0.9 * screenWidth - 130,
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: myColor.darkText,
                }}>
                Kapasitas : {kamar.penghuni.length}/{kamar.kapasitas}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                bottom: 5,
                right: 0,
              }}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 'bold',
                  color: myColor.darkText,
                }}>
                Detail
              </Text>
              <MaterialIcons
                name="navigate-next"
                style={{marginRight: -13}}
                color="#636e72"
                size={20}
              />
              <MaterialIcons
                name="navigate-next"
                style={{marginRight: -13}}
                color="#636e72"
                size={20}
              />
              <MaterialIcons name="navigate-next" color="#636e72" size={20} />
            </View>
          </View>
        </View>
        <View
          style={{
            height: 50,
            borderTopWidth: 1.5,
            borderTopColor: myColor.darkText,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {kamar.penghuni.length >= kamar.kapasitas ? (
            <View
              style={{
                height: 30,
                minWidth: 70,
                borderRadius: 10,
                backgroundColor: myColor.alert,
                paddingHorizontal: 5,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 5,
                elevation: 3,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                Penuh
              </Text>
            </View>
          ) : (
            // <View
            //   style={{
            //     height: 30,
            //     borderRadius: 10,
            //     minWidth: 70,
            //     backgroundColor: myColor.success,
            //     paddingHorizontal: 5,
            //     alignItems: 'center',
            //     justifyContent: 'center',
            //     marginLeft: 5,
            //     elevation: 3,
            //   }}>
            //   <Text
            //     style={{
            //       color: myColor.darkText,
            //       fontSize: 12,
            //       fontWeight: 'bold',
            //     }}>
            //     Tersedia
            //   </Text>
            // </View>
            <View
              style={{
                height: 30,
                borderRadius: 10,
                minWidth: 70,
                backgroundColor: myColor.success,
                paddingHorizontal: 5,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 5,
                elevation: 3,
              }}>
              <Text
                style={{
                  color: myColor.darkText,
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                Tersedia
              </Text>
            </View>

            // <View
            //   style={{
            //     height: 30,
            //     minWidth: 70,
            //     borderRadius: 10,
            //     backgroundColor: myColor.alert,
            //     paddingHorizontal: 5,
            //     alignItems: 'center',
            //     justifyContent: 'center',
            //     marginLeft: 5,
            //     elevation: 3,
            //   }}>
            //   <Text
            //     style={{
            //       color: 'white',
            //       fontSize: 12,
            //       fontWeight: 'bold',
            //     }}>
            //     Penuh
            //   </Text>
            // </View>
          )}

          <View
            style={{
              marginLeft: 10,
              flexDirection: 'row-reverse',
            }}>
            {kamar.penghuni.length > 2 ? (
              <View
                style={{
                  backgroundColor: myColor.etcbuble,
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: 'white',
                  borderWidth: 1,
                  elevation: 3,
                  marginLeft: -10,
                }}>
                <Text style={{fontSize: 12, fontWeight: 'bold'}}>...</Text>
              </View>
            ) : null}

            {kamar.penghuni.map((item, index) => {
              if (index > 1) {
                return null;
              } else {
                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor: 'red',
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: 'white',
                      borderWidth: 1,
                      elevation: 3,
                      marginLeft: -10,
                    }}>
                    {/* <Text>{index}</Text> */}
                    <Image
                      style={{height: 30, width: 30, borderRadius: 15}}
                      source={{
                        uri:
                          'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Henrik_Ahnberg.jpg/220px-Henrik_Ahnberg.jpg',
                      }}
                    />
                  </View>
                );
              }
            })}

            {/* <View
              style={{
                backgroundColor: 'red',
                width: 32,
                height: 32,
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'white',
                borderWidth: 1,
                elevation: 3,
                marginLeft: -10,
              }}>
              <Image
                style={{height: 30, width: 30, borderRadius: 15}}
                source={{
                  uri:
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Henrik_Ahnberg.jpg/220px-Henrik_Ahnberg.jpg',
                }}
              />
            </View>

            <View
              style={{
                backgroundColor: 'red',
                width: 32,
                height: 32,
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'white',
                borderWidth: 1,
                elevation: 3,
                marginLeft: -10,
              }}>
              <Image
                style={{height: 30, width: 30, borderRadius: 15}}
                source={{
                  uri:
                    'https://wpq0221c4a-flywheel.netdna-ssl.com/wp-content/uploads/2018/12/AdmiralBulldog-150x150.jpg',
                }}
              />
            </View> */}
            {/* <View
              style={{
                backgroundColor: 'red',
                width: 32,
                height: 32,
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'white',
                borderWidth: 1,
                elevation: 3,
              }}>
              <Image
                style={{height: 30, width: 30, borderRadius: 15}}
                source={{
                  uri:
                    'https://wpq0221c4a-flywheel.netdna-ssl.com/wp-content/uploads/2018/12/AdmiralBulldog-150x150.jpg',
                }}
              />
            </View>
             */}
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default FlatListKamar;

const styles = StyleSheet.create({});
