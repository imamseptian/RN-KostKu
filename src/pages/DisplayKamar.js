import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const DisplayKamar = () => {
  const [kamar, setKamar] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('kamar')
      .onSnapshot((querySnapshot) => {
        console.log('Total users: ', querySnapshot.size);
        // console.log(querySnapshot);

        let temp = [];
        querySnapshot.forEach((documentSnapshot) => {
          temp.push(documentSnapshot.data());
        });
        setKamar(temp);
      });
  }, []);

  return (
    <View>
      {kamar.map((item, index) => {
        return (
          // <Picker.Item key={index} label={item.nama} value={item.id} />
          <Text key={index}>{item.nama}</Text>
        );
      })}
    </View>
  );
};

export default DisplayKamar;

const styles = StyleSheet.create({});
