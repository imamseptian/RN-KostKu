import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {Provider} from 'react-redux';
import AppNavigator from './AppNavigator';
import {store} from './store';
import {DetailKeuangan, ListPemasukan} from './pages/pengeluaran';
import {Shimmer, CobaView} from './pages/shimmer';
import {PageDL} from './pages/download';
import {PageOne, PageTwo, PageThree} from './pages/header';

const LaporanStack = createSharedElementStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      {/* <PageDL /> */}
      {/* <Shimmer /> */}
      {/* <ListPemasukan /> */}
      <NavigationContainer>
        {/* <LaporanStack.Navigator>
          <LaporanStack.Screen name="PageOne" component={PageOne} />
          <LaporanStack.Screen name="PageTwo" component={PageTwo} />
          <LaporanStack.Screen
            name="PageThree"
            component={PageThree}
            options={{headerShown: false}}
          />
        </LaporanStack.Navigator> */}
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
