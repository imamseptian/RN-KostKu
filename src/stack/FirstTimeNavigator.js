import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {FormAwal, KostForm} from '../pages';

const FirstStack = createStackNavigator();

const FirstTimeNavigator = () => {
  return (
    <FirstStack.Navigator headerMode={false}>
      <FirstStack.Screen name="FirstDisplay" component={FormAwal} />
      <FirstStack.Screen name="FirstForm" component={KostForm} />
    </FirstStack.Navigator>
  );
};

export default FirstTimeNavigator;

const styles = StyleSheet.create({});
