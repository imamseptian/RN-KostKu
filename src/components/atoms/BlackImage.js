import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {myColor, APIUrl} from '../../function/MyVar';

const BlackImage = ({urlImg}) => {
  const [img, setimg] = useState(
    APIUrl + '/kostdata/kelas_kamar/foto/' + urlImg,
  );
  return (
    <View>
      <Image
        source={{
          // uri: APIUrl + '/image_kelas/' + item.foto,
          uri: img,
        }}
        style={{height: '100%', width: '100%', borderRadius: 10}}
        onError={(e) =>
          setimg(
            'https://liquipedia.net/commons/images/thumb/6/66/AdmiralBulldog_EPICENTER_XL.jpg/600px-AdmiralBulldog_EPICENTER_XL.jpg',
          )
        }
      />
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          position: 'absolute',
          opacity: 0.4,
          borderRadius: 10,
        }}></View>
    </View>
  );
};

export default BlackImage;

const styles = StyleSheet.create({});
