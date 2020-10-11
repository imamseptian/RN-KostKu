import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {myColor} from '../function/MyVar';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const HomeTitleDrawer = (props) => {
  return (
    <View
      style={{
        width: screenWidth,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <TouchableOpacity onPress={props.bukaDrawer}>
        <MaterialIcons name="menu" color="#ffffff" size={25} />
      </TouchableOpacity>
      <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
        KostKu
      </Text>
      <View style={{height: 25, width: 25}}></View>
    </View>
  );
};

export default HomeTitleDrawer;

const styles = StyleSheet.create({});
