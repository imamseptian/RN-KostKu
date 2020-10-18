import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useEffect} from 'react';
import {Easing, StyleSheet} from 'react-native';
// import FirstTimeNavigator from './FirstTimeNavigator';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {fcmService} from '../FCMService';
import {localNotificationService} from '../LocalNotificationService';
import CustomDrawer from '../pages/Drawer/CustomDrawer';
import {HomeScreen} from '../pages/home';
import {
  CreateKamar,
  DaftarKamar,
  DetailKamar,
  DetailKelasKamar,
  EditKamar,
  EditKelasKamar,
  FormKelasKamar,
  ListKamar,
} from '../pages/kamar';
import {DetailPendaftar, ListPendaftar} from '../pages/pendaftar';
import {DetailPenghuni, ListPenghuni} from '../pages/penghuni';
import {HalamanBayar} from '../pages/transaksi';
import FirstTimeNavigator from './FirstTimeNavigator';

const BundleStack = createSharedElementStackNavigator();

const MainStack = createSharedElementStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerScreen = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
    <Drawer.Screen name="MainStack" component={MainStackScreen} />
  </Drawer.Navigator>
);

const MainStackScreen = () => (
  <MainStack.Navigator headerMode={false}>
    <MainStack.Screen name="HomeScreen" component={HomeScreen} />

    <MainStack.Screen name="ListPenghuni" component={ListPenghuni} />

    <MainStack.Screen
      name="DetailPenghuni"
      component={DetailPenghuni}
      options={() => ({
        gestureEnabled: false,
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {duration: 500, easing: Easing.inOut(Easing.ease)},
          },
          close: {
            animation: 'spring',
            config: {duration: 500, easing: Easing.inOut(Easing.linear)},
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

    <MainStack.Screen name="ListPendaftar" component={ListPendaftar} />
    <MainStack.Screen name="DetailPendaftar" component={DetailPendaftar} />

    <MainStack.Screen name="ListKamar" component={ListKamar} />
    <MainStack.Screen name="CreateKelas" component={FormKelasKamar} />
    <MainStack.Screen name="DetailKelas" component={DetailKelasKamar} />
    <MainStack.Screen name="CreateKamar" component={CreateKamar} />
    <MainStack.Screen name="EditKelas" component={EditKelasKamar} />
    <MainStack.Screen name="DaftarKamar" component={DaftarKamar} />
    <MainStack.Screen name="FormKelasKamar" component={FormKelasKamar} />
    <MainStack.Screen name="DetailKamar" component={DetailKamar} />
    <MainStack.Screen name="EditKamar" component={EditKamar} />

    <MainStack.Screen name="HalamanBayar" component={HalamanBayar} />
  </MainStack.Navigator>
);

const MainNavigator = ({navigation}) => {
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[App] onRegister:', token);
    }

    function onNotification(notify) {
      console.log('[App] onNotification :', notify);
      const options = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(
        0,
        notify.notification.title,
        notify.notification.body,
        notify.data,
        options,
      );
    }

    function onOpenNotification(notify) {
      if (Object.keys(notify).length != 0) {
        if (notify.data.stack != null) {
          console.log('----------------');
          console.log(notify.data.stack);
          console.log(notify.data.screen);
          console.log('----------------');

          navigation.navigate('MainScreen', {
            screen: 'PendaftarScreen',
          });
        }
        // else {
        //   console.log('bruh');
        // }
      }

      // console.log('[App] ON APP ONOPENNOTIFY', notify);
    }

    return () => {
      console.log('[App] unRegister');
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);
  return (
    <BundleStack.Navigator headerMode={false}>
      <BundleStack.Screen name="MainScreen" component={DrawerScreen} />
      <BundleStack.Screen name="FirstScreen" component={FirstTimeNavigator} />
    </BundleStack.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
