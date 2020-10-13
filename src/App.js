import React, {useState, useEffect} from 'react';
import {View, Button, Text, Easing} from 'react-native';

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
import {
  MarketSlider,
  List,
  Detail,
  DetailPenyewa,
  Home,
} from './pages/Example/SharedElement';
import {FlatListKamar, FlatListTagihan} from './components';
import {enableScreens} from 'react-native-screens';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {NavigationContainer} from '@react-navigation/native';
const navigationRef = React.createRef();
const SettingStack = createStackNavigator();
import {CobaAnim} from './pages/Example/Animation';
const Stack = createSharedElementStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      {/* <NavigationContainer>
        <Stack.Navigator headerMode={false}>
          <Stack.Screen name="List" component={List} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Detail"
            component={DetailPenyewa}
            options={() => ({
              gestureEnabled: false,
              transitionSpec: {
                open: {
                  animation: 'timing',
                  config: {duration: 500, easing: Easing.inOut(Easing.ease)},
                },
                close: {
                  animation: 'timing',
                  config: {duration: 500, easing: Easing.inOut(Easing.ease)},
                },
              },
              cardStyleInterpolator: ({current: {progress}}) => {
                return {
                  cardStyle: {
                    opacity: progress,
                  },
                };
              },
            })}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={() => ({
              gestureEnabled: false,
              transitionSpec: {
                open: {
                  animation: 'timing',
                  config: {duration: 500, easing: Easing.inOut(Easing.ease)},
                },
                close: {
                  animation: 'timing',
                  config: {duration: 500, easing: Easing.inOut(Easing.ease)},
                },
              },
              cardStyleInterpolator: ({current: {progress}}) => {
                return {
                  cardStyle: {
                    opacity: progress,
                  },
                };
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer> */}

      {/* <MarketSlider /> */}
      {/* <List /> */}
      {/* <Detail /> */}
      {/* <FlatListTagihan /> */}
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
