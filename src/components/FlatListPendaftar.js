// import React from 'react';
import React, {PureComponent} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import {myColor, APIUrl} from '../function/MyVar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class FlatListPendaftar extends React.PureComponent {
  render() {
    const {item, ...rest} = this.props;

    return (
      <TouchableNativeFeedback {...rest}>
        <View
          style={{
            height: 100,
            marginHorizontal: 20,
            marginTop: 15,
            borderRadius: 15,
            elevation: 5,
            backgroundColor: 'white',
            flexDirection: 'row',
            position: 'relative',
          }}>
          <View
            style={{
              height: 20,
              width: 120,
              backgroundColor: 'white',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              right: 5,
              borderRadius: 5,
              bottom: -5,
              elevation: 2,
            }}>
            <Text style={styles.textCard}>
              {item.hari}-{item.bulan}-{item.tahun}
            </Text>
          </View>

          {item.isread ? null : (
            <MaterialIcons
              name="new-releases"
              color={myColor.alert}
              size={30}
              style={{
                position: 'absolute',
                right: -5,
                top: -10,
              }}
            />
          )}
          <SharedElement id={`item.${item.id}.foto_pendaftar`}>
            <Image
              source={{
                uri: APIUrl + '/kostdata/pendaftar/foto/' + item.foto_diri,
              }}
              style={{
                width: 70,
                height: 70,
                marginVertical: 15,
                marginLeft: 10,
                borderRadius: 15,
              }}
            />
          </SharedElement>

          <View
            style={{
              flex: 1,
              height: 20,
              marginHorizontal: 10,
              marginVertical: 15,
              flexDirection: 'row',
            }}>
            <View style={{marginRight: 10}}>
              <Text style={[styles.textCard, {fontSize: 16}]}>
                {item.nama_depan} {item.nama_belakang}
              </Text>

              <Text style={styles.textCard}>
                {item.kelamin == 2 ? 'Wanita' : 'Pria'} | {item.umur} Tahun
              </Text>
              <Text style={styles.textCard}>
                {item.status == 1 ? 'Pelajar' : 'Pekerja'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

// const FlatListPendaftar = ({item, ...rest}) => {
//   const navigation = useNavigation();
//   return (
//     <TouchableNativeFeedback {...rest}>
//       <View
//         style={{
//           height: 100,
//           marginHorizontal: 20,
//           marginTop: 15,
//           borderRadius: 15,
//           elevation: 5,
//           backgroundColor: 'white',
//           flexDirection: 'row',
//           position: 'relative',
//         }}>
//         <View
//           style={{
//             height: 20,
//             width: 120,
//             backgroundColor: 'white',
//             position: 'absolute',
//             justifyContent: 'center',
//             alignItems: 'center',
//             right: 5,
//             borderRadius: 5,
//             bottom: -5,
//             elevation: 2,
//           }}>
//           <Text style={styles.textCard}>
//             {item.hari}-{item.bulan}-{item.tahun}
//           </Text>
//         </View>

//         <MaterialIcons
//           name="new-releases"
//           color={myColor.alert}
//           size={30}
//           style={{
//             position: 'absolute',
//             right: -5,
//             top: -10,
//           }}
//         />

//         <Image
//           source={{
//             uri:
//               'https://dry-forest-53707.herokuapp.com/image_kelas/' +
//               item.foto_diri,
//           }}
//           style={{
//             width: 70,
//             height: 70,
//             marginVertical: 15,
//             marginLeft: 10,
//             borderRadius: 15,
//           }}
//         />

//         <View
//           style={{
//             flex: 1,
//             height: 20,
//             marginHorizontal: 10,
//             marginVertical: 15,
//             flexDirection: 'row',
//           }}>
//           <View style={{marginRight: 10}}>
//             <Text style={[styles.textCard, {fontSize: 16}]}>{item.nama}</Text>

//             <Text style={styles.textCard}>
//               {item.kelamin == 2 ? 'Wanita' : 'Pria'} | {item.umur} Tahun
//             </Text>
//             <Text style={styles.textCard}>
//               {item.kelamin == 1 ? 'Pelajar' : 'Pekerja'}
//             </Text>
//           </View>
//         </View>
//       </View>
//     </TouchableNativeFeedback>
//   );
// };

export default FlatListPendaftar;

const styles = StyleSheet.create({
  textCard: {
    color: myColor.darkText,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 12,
  },
});
