import React, {useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import * as Progress from 'react-native-progress';

const FormKost = () => {
  const [progress, setProgress] = useState(0);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{marginHorizontal: 20}}>Form Kost</Text>
      <View style={{height: 15, marginBottom: 10}}>
        <Text style={{textAlign: 'right'}}>Progress</Text>
        <Progress.Bar progress={progress} width={200} height={8} />
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          width: 200,
          justifyContent: 'space-between',
        }}>
        <Button
          title="Prev"
          onPress={() => {
            if (progress <= 0) {
              alert('Mentok Bawah');
            } else {
              setProgress(progress - 0.2);
            }
          }}
        />
        <Button
          title="Next"
          onPress={() => {
            if (progress >= 1) {
              alert('Mentok atas');
            } else {
              setProgress(progress + 0.2);
            }
          }}
        />
      </View>
    </View>
  );
};

export default FormKost;

const styles = StyleSheet.create({});
