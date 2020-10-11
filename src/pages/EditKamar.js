import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

const EditKamar = ({navigation, route}) => {
  const [kamar, setKamar] = useState(route.params.kamar);
  return (
    <View>
      <TextInput value={kamar.nama} />
    </View>
  );
};

export default EditKamar;

const styles = StyleSheet.create({});
