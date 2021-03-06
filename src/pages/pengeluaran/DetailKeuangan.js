import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {myColor, screenWidth} from '../../function/MyVar';
import {TabPemasukan, TabPengeluaran} from './';
const DetailKeuangan = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const dataRedux = useSelector((state) => state.AuthReducer);
  const mountedAnimated = useRef(new Animated.Value(0)).current;

  const [currentPage, setcurrentPage] = useState(0);
  let page = route.params.page;
  const ref = useRef();
  const datapage = [
    {
      id: 'page0',
      page: (
        <TabPengeluaran
          token={dataRedux.token}
          id_kost={dataRedux.user.kostku}
        />
      ),
    },
    {
      id: 'page1',
      page: (
        <TabPemasukan token={dataRedux.token} id_kost={dataRedux.user.kostku} />
      ),
    },
  ];

  useEffect(() => {
    ref.current.scrollToIndex({
      index: currentPage,
      animated: true,
    });
    // const wait = new Promise((resolve) => setTimeout(resolve, 500));
    // wait.then(() => {
    //   ref.current.scrollToIndex({
    //     index: currentPage,
    //     animated: true,
    //   });
    // });
  }, [currentPage]);
  // useFocusEffect(() => {
  //   console.log('#######');
  //   console.log(route.params.page);
  //   console.log('#######');
  //   const wait = new Promise((resolve) => setTimeout(resolve, 100));
  //   wait.then(() => {
  //     setcurrentPage(route.params.page);
  //   });
  //   // ambilApi(source.token);
  //   return () => {
  //     console.log('unmounted detail keuangan');
  //     // console.log('unmounted');
  //   };
  //   // console.log('ayaya');
  // }, []);
  useEffect(() => {
    const wait = new Promise((resolve) => setTimeout(resolve, 100));
    wait.then(() => {
      setcurrentPage(route.params.page);
    });
  }, [isFocused]);

  const animation = (toValue, delay) =>
    Animated.timing(mountedAnimated, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true,
    }).start();

  useEffect(() => {
    console.log('wololo');
    animation(1, 500);
  }, []);

  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          backgroundColor: myColor.colorTheme,
          alignItems: 'center',
          justifyContent: 'center',
          width: screenWidth,
          paddingTop: StatusBar.currentHeight + 10,
          paddingBottom: 10,
          position: 'relative',
        }}>
        <Text
          style={{fontSize: 14, fontFamily: 'OpenSans-Bold', color: '#fff'}}>
          Pemasukan dan Pengeluaran Kost
        </Text>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{position: 'absolute', left: 5, bottom: 10}}>
          <MaterialIcons name="menu" color="#ffffff" size={25} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: screenWidth,
          paddingBottom: 10,
          borderBottomWidth: 2,
          borderBottomColor: myColor.darkText,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            minHeight: 30,
            borderRadius: 10,
            marginHorizontal: 0.1 * screenWidth,
            elevation: 5,
            backgroundColor: 'white',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              setcurrentPage(0);
              // ref.current.scrollToIndex({
              //   index: 0,
              //   animated: true,
              // });
            }}>
            <View
              style={{
                backgroundColor: currentPage == 0 ? myColor.myblue : 'white',
                width: 0.4 * screenWidth,
                minHeight: 30,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: currentPage == 0 ? '#fff' : myColor.fbtx,
                  fontSize: 12,
                  fontFamily: 'OpenSans-Bold',
                }}>
                Pengeluaran
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setcurrentPage(1);
              // ref.current.scrollToIndex({
              //   index: 1,
              //   animated: true,
              // });
            }}>
            <View
              style={{
                backgroundColor: currentPage == 1 ? myColor.myblue : 'white',
                width: 0.4 * screenWidth,
                minHeight: 30,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: currentPage == 1 ? '#fff' : myColor.fbtx,
                  fontSize: 12,
                  fontFamily: 'OpenSans-Bold',
                }}>
                Pemasukan
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Animated.FlatList
        style={{opacity: mountedAnimated, transform: [{translateY}]}}
        ref={ref}
        data={datapage}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        initialScrollIndex={0}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(ev) => {
          const newIndex = Math.floor(
            ev.nativeEvent.contentOffset.x / (0.9 * screenWidth),
          );
          console.log(newIndex);
          setcurrentPage(newIndex);
        }}
        renderItem={({item, index, separator}) => {
          return item.page;
        }}
      />
    </View>
  );
};

export default DetailKeuangan;

const styles = StyleSheet.create({});
