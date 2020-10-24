import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
  Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {setAuthRedux, unsetAuthRedux} from '../../store';
import {fcmService} from '../../FCMService';
import {myColor, APIUrl} from '../../function/MyVar';

const CustomDrawer = (props) => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const onAuthRedux = () => {
    dispatch(unsetAuthRedux());
  };

  const toLogin = () => {
    props.navigation.reset({
      index: 0,
      routes: [{name: 'AuthNavigator'}],
    });
  };

  const signOut = () => {
    let config = {
      headers: {Authorization: `Bearer ${dataRedux.token}`},
    };
    axios
      .get('https://dry-forest-53707.herokuapp.com/api/logout', config)
      .then((repos) => {
        let topic = 'kostku-' + dataRedux.user.kostku;
        console.log('unsub topic=' + topic);
        fcmService.unsubscribeToTopic(topic);
        clearAll();

        toLogin();
      });
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
    console.log('Done.');
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
                alignItems: 'center',
              }}>
              <Avatar.Image
                source={{
                  uri:
                    APIUrl +
                    '/kostdata/pemilik/foto/' +
                    dataRedux.user.foto_profil,
                  // 'data:image/jpeg;base64,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',
                }}
                size={50}
              />
              <View style={{marginLeft: 15}}>
                <Title style={styles.title}>
                  {dataRedux.user.nama_depan} {dataRedux.user.nama_belakang}{' '}
                  {dataRedux.user.kostku}
                </Title>
                <Caption style={styles.caption}>
                  {dataRedux.user.namakost}
                </Caption>
              </View>
            </View>

            {/* <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.section]}>
                  80
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.section]}>
                  110
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View> */}
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                // props.navigation.navigate('HomeDrawer');
                props.navigation.closeDrawer();
                // props.navigation.popToTop();
                props.navigation.push('HomeScreen');
                // props.navigation.reset({
                //   index: 0,
                //   routes: [{name: 'HomeScreen'}],
                // });
              }}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="bed" color={color} size={size} />
              )}
              label="List Kamar"
              onPress={() => {
                // props.navigation.push('ListKamar');
                // props.navigation.navigate('KamarScreen');
                props.navigation.closeDrawer();
                props.navigation.push('ListKamar');
                // props.navigation.reset({
                //   index: 0,
                //   routes: [{name: 'ListKamar'}],
                // });
              }}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <FontAwesome5
                  name="money-bill-wave"
                  color={color}
                  size={size}
                />
              )}
              label="Keuangan"
              onPress={() => {
                // props.navigation.push('ListKamar');
                // props.navigation.navigate('KamarScreen');
                props.navigation.closeDrawer();
                props.navigation.push('DetailKeuangan');
                // props.navigation.reset({
                //   index: 0,
                //   routes: [{name: 'ListKamar'}],
                // });
              }}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Ionicons name="newspaper" color={color} size={size} />
              )}
              label="Halaman Bayar"
              onPress={() => {
                // props.navigation.push('ListKamar');
                // props.navigation.navigate('KamarScreen');
                props.navigation.closeDrawer();
                props.navigation.push('HalamanBayar');
                // props.navigation.reset({
                //   index: 0,
                //   routes: [{name: 'HalamanBayar'}],
                // });
              }}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <FontAwesome5 name="users" color={color} size={size} />
              )}
              label="Penghuni"
              onPress={() => {
                // props.navigation.push('ListKamar');
                // props.navigation.navigate('PenghuniScreen', {
                //   screen: 'ListPenghuni',
                // });
                props.navigation.closeDrawer();
                props.navigation.push('ListPenghuni');
                // props.navigation.reset({
                //   index: 0,
                //   routes: [{name: 'ListPenghuni'}],
                // });
              }}
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <AntDesign name="form" color={color} size={size} />
              )}
              label="Pendaftar"
              onPress={() => {
                // props.navigation.navigate('PendaftarScreen');
                props.navigation.closeDrawer();
                props.navigation.push('ListPendaftar');
                // props.navigation.reset({
                //   index: 0,
                //   routes: [{name: 'ListPendaftar'}],
                // });
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
