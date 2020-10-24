import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {Provider} from 'react-redux';
import AppNavigator from './AppNavigator';
import {store} from './store';
import {DetailKeuangan, ListPemasukan} from './pages/pengeluaran';
import {Shimmer, CobaView} from './pages/shimmer';

export default function App() {
  return (
    <Provider store={store}>
      {/* <Shimmer /> */}
      {/* <ListPemasukan /> */}
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
