import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AuthNavigator, MainNavigator} from './stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {setAuthRedux} from './store';
import {Splash} from './pages';
import axios from 'axios';
import {fcmService} from './FCMService';
import {localNotificationService} from './LocalNotificationService';

const AppStack = createStackNavigator();

const AppNavigator = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const [isAuth, setAuth] = useState(false);

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
    console.log('Done.');
  };

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const topic = await AsyncStorage.getItem('topic');
      if (token != null) {
        console.log('[App] Navigator =>', topic);
        cekStatus(token, topic);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const getUser = (token) => {
    const source = axios.CancelToken.source();

    try {
      axios
        .get('https://dry-forest-53707.herokuapp.com/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cancelToken: source.token,
        })
        .then((response) => {
          // console.log(response);
          // console.log(response.data);
          // console.log(response.user);
          const dataUser = response.data;
          // console.log('GETUSER AWAL :', dataUser);
          // dataUser.token = token;
          dispatch(setAuthRedux(dataUser, token));
          setIsLoading(false);
        });
    } catch (error) {
      if (axios.isCancel(error)) {
        setIsLoading(false);
      } else {
        // handle error
        setIsLoading(false);
      }
    }

    return () => {
      source.cancel();
    };
  };

  const cekStatus = (token, topic) => {
    const source = axios.CancelToken.source();

    try {
      axios
        .get('https://dry-forest-53707.herokuapp.com/api/checkstatus', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cancelToken: source.token,
        })
        .then((response) => {
          if (response.data.status == 'logged in') {
            setAuth(true);
            getUser(token);
          } else {
            fcmService.unsubscribeToTopic(topic);
            clearAll();
            alert('Anda Sudah Logout, Silahkan Login Kembali');
            setIsLoading(false);
          }
        });
    } catch (error) {
      if (axios.isCancel(error)) {
        setIsLoading(false);
      } else {
        // handle error
        setIsLoading(false);
      }
    }

    return () => {
      source.cancel();
    };
  };

  useEffect(() => {
    getData();

    // return setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Splash />;
  }
  return (
    <AppStack.Navigator
      initialRouteName={isAuth != true ? 'AuthNavigator' : 'MainNavigator'}
      headerMode={false}>
      <AppStack.Screen name="MainNavigator" component={MainNavigator} />
      <AppStack.Screen name="AuthNavigator" component={AuthNavigator} />
    </AppStack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
