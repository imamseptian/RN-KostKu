import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import {myColor, screenHeight, screenWidth} from '../../function/MyVar';
import Feather from 'react-native-vector-icons/Feather';
import {TabPemasukan, TabPengeluaran} from './';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const DetailKeuangan = ({navigation, route}) => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  const mountedAnimated = useRef(new Animated.Value(0)).current;

  const [currentPage, setcurrentPage] = useState(0);
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
      page: <TabPemasukan />,
    },
  ];

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
        <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
          Pemasukan dan Pengeluaran Kost
        </Text>
        <TouchableOpacity
          onPress={() => alert('aa')}
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
              ref.current.scrollToIndex({
                index: 0,
                animated: true,
              });
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
                  fontSize: 13,
                  fontWeight: 'bold',
                }}>
                Pengeluaran
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setcurrentPage(1);
              ref.current.scrollToIndex({
                index: 1,
                animated: true,
              });
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
                  fontSize: 13,
                  fontWeight: 'bold',
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
