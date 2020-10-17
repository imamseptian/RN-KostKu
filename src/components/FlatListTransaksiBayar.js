import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const FlatListTransaksiBayar = (props) => {
  return (
    <TouchableNativeFeedback onPress={() => props.fungsi(props.data)}>
      <View
        style={{
          flexDirection: 'row',
          width: screenWidth * 0.8,
          minHeight: 50,
          backgroundColor: 'white',
          marginBottom: 20,
          elevation: 5,
          borderRadius: 10,
          margin: 3,
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <View style={{width: 0.5 * screenWidth, paddingHorizontal: 5}}>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: 'black',
              maxWidth: 0.5 * screenWidth,
            }}>
            {props.data.judul}
          </Text>
        </View>
        <View
          style={{
            width: 0.3 * screenWidth,
            paddingHorizontal: 5,
          }}>
          <Text
            numberOfLines={2}
            style={{
              textAlign: 'right',
              fontSize: 12,
              fontWeight: 'bold',
              color: 'black',
              maxWidth: 0.3 * screenWidth,
            }}>
            Rp {props.data.jumlah}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default FlatListTransaksiBayar;

const styles = StyleSheet.create({});
