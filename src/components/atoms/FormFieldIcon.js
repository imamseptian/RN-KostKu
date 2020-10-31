import React from 'react';
import {StyleSheet, Text, View, TextInput, Dimensions} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {myColor} from '../../function/MyVar';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const FormFieldIcon = ({icon, ...rest}) => {
  return (
    <View
      style={{
        height: 40,
        // width: 0.8 * screenWidth,
        borderWidth: 0.5,
        borderRadius: 10,

        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
      }}>
      <FontAwesome5 name={icon} color={myColor.fbtx} size={15} />
      <TextInput
        placeholder="Nama Kamar"
        style={{marginLeft: 5, flex: 1}}
        {...rest}
      />
    </View>
  );
};

export default FormFieldIcon;

const styles = StyleSheet.create({});
