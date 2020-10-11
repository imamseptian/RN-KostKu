import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import {myColor, APIUrl} from '../../function/MyVar';

const CircleAvatar = (props) => {
  const [img, setimg] = useState(
    APIUrl + '/kostdata/pendaftar/foto/' + props.data.foto_diri,
  );

  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View style={styles.scrollWrapper}>
        <View style={styles.imageScrollWrapper}>
          <Image
            source={{
              uri: img,
            }}
            onError={(e) =>
              setimg(
                'https://liquipedia.net/commons/images/thumb/6/66/AdmiralBulldog_EPICENTER_XL.jpg/600px-AdmiralBulldog_EPICENTER_XL.jpg',
              )
            }
            // source={require('../asset/imgdefault/avatar.jpeg')}
            // defaultSource={require('../asset/imgdefault/avatar.jpeg')}
            style={styles.avatarScroll}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.avatarName} numberOfLines={1}>
          {/* {item.nama_depan} */}
          {props.data.nama_depan}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default CircleAvatar;

const styles = StyleSheet.create({
  imageScrollWrapper: {height: 60, width: 60, borderRadius: 30, elevation: 5},
  avatarScroll: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 2,
    borderColor: 'white',
    // elevation: 5,
  },
  avatarName: {
    fontSize: 12,
    maxWidth: 70,
    color: myColor.darkText,
  },
  scrollWrapper: {
    alignItems: 'center',
    marginRight: 15,
    marginTop: 10,
  },
});
