import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fcmService} from '../FCMService';
import {localNotificationService} from '../LocalNotificationService';
import {
  CreateKamar,
  DaftarKamar,
  DetailKamar,
  DetailKelasKamar,
  DetailPendaftar,
  DetailPenghuni,
  EditKamar,
  EditKelasKamar,
  FormKelasKamar,
  HomeScreen,
  ListKamar,
  ListPendaftar,
  ListPenghuni,
  PageTest,
  Profile,
  SettingScreen,
} from '../pages';
import CustomDrawer from '../pages/Drawer/CustomDrawer';
import FirstTimeNavigator from './FirstTimeNavigator';

// import FirstTimeNavigator from './FirstTimeNavigator';

const BundleStack = createStackNavigator();
const PendaftarStack = createStackNavigator();
const PenghuniStack = createStackNavigator();
const FirstStack = createStackNavigator();
const MainStack = createStackNavigator();
const KamarStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createMaterialBottomTabNavigator();

const DrawerScreen = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
    <Drawer.Screen name="HomeDrawer" component={HomeScreen} />
    <Drawer.Screen name="KamarScreen" component={KamarScreen} />
    <Drawer.Screen name="PenghuniScreen" component={PenghuniScreen} />
    <Drawer.Screen name="PendaftarScreen" component={PendaftarScreen} />
    {/* <Drawer.Screen name="ListKamar" component={ListKamar} />
    <Drawer.Screen name="CreateKelas" component={FormKelasKamar} />
    <Drawer.Screen name="DetailKelas" component={DetailKelasKamar} />
    <Drawer.Screen name="CreateKamar" component={CreateKamar} />
    <Drawer.Screen name="EditKelas" component={EditKelasKamar} />
    <Drawer.Screen name="DaftarKamar" component={DaftarKamar} />
    <Drawer.Screen name="FormKelasKamar" component={FormKelasKamar} />
    <Drawer.Screen name="DetailKamar" component={DetailKamar} />
    <Drawer.Screen name="EditKamar" component={EditKamar} /> */}
  </Drawer.Navigator>
);

const PenghuniScreen = () => (
  <PenghuniStack.Navigator headerMode={false}>
    <PenghuniStack.Screen name="ListPenghuni" component={ListPenghuni} />
    <PenghuniStack.Screen name="DetailPenghuni" component={DetailPenghuni} />
  </PenghuniStack.Navigator>
);

const PendaftarScreen = () => (
  <PendaftarStack.Navigator headerMode={false}>
    <PendaftarStack.Screen name="ListPendaftar" component={ListPendaftar} />
    <PendaftarStack.Screen name="DetailPendaftar" component={DetailPendaftar} />
  </PendaftarStack.Navigator>
);

const KamarScreen = () => (
  <KamarStack.Navigator headerMode={false}>
    <KamarStack.Screen name="ListKamar" component={ListKamar} />
    <KamarStack.Screen name="CreateKelas" component={FormKelasKamar} />
    <KamarStack.Screen name="DetailKelas" component={DetailKelasKamar} />
    <KamarStack.Screen name="CreateKamar" component={CreateKamar} />
    <KamarStack.Screen name="EditKelas" component={EditKelasKamar} />
    <KamarStack.Screen name="DaftarKamar" component={DaftarKamar} />
    <KamarStack.Screen name="FormKelasKamar" component={FormKelasKamar} />
    <KamarStack.Screen name="DetailKamar" component={DetailKamar} />
    <KamarStack.Screen name="EditKamar" component={EditKamar} />
    <KamarStack.Screen name="PageTest" component={PageTest} />
  </KamarStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator barStyle={{backgroundColor: '#46ce7c'}}>
    <Tabs.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tabs.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}
    />
    <Tabs.Screen
      name="Setting"
      component={SettingScreen}
      options={{
        tabBarLabel: 'Setting',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="cog" color={color} size={26} />
        ),
      }}
    />
  </Tabs.Navigator>
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