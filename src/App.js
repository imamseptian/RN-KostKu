import React, {useState, useEffect} from 'react';
import {View, Button, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {fcmService} from './FCMService';
import {localNotificationService} from './LocalNotificationService';
// import Halaman1 from './Halaman1';
// import Halaman2 from './Halaman2';
// import LogScreen from './LogScreen';
import AppNavigator from './AppNavigator';
import {Provider} from 'react-redux';
import {store} from './store';

import {
  FormKelas,
  FormKu,
  TestGradient,
  ListPendaftar,
  DetailScreen,
  DetailScreen2,
  MyHome,
  Kamarque,
} from './pages/Example';
import {DetailPendaftar, Splash, DetailKamar} from './pages';

import {FlatListKamar} from './components';

const navigationRef = React.createRef();
const SettingStack = createStackNavigator();
import {CobaAnim} from './pages/Example/Animation';

export default function App() {
  return (
    <Provider store={store}>
      {/* <DetailKamar /> */}
      {/* <Kamarque /> */}
      {/* <FlatListKamar /> */}
      {/* <Splash /> */}
      {/* <MyHome /> */}
      {/* <Imperative /> */}
      {/* <NavigationContainer>
      
       
        <DetailPendaftar />
      </NavigationContainer> */}
      {/* <CobaAnim /> */}
      {/* <ListPendaftar /> */}
      {/* <FormKu /> */}
      {/* <TestGradient /> */}
      {/* <FormKelas /> */}
      {/* <NavigationContainer ref={navigationRef}> */}
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
