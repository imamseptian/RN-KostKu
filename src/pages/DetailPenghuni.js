import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {PenghuniInfo} from './penghuni';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const DetailPenghuni = ({navigation, route}) => {
  const {item} = route.params;
  const datapage = [
    {id: 'page0', page: <PenghuniInfo data={item} />},
    {id: 'page1', page: <PenghuniInfo data={item} />},
  ];
  const ref = useRef();

  const mountedAnimated = useRef(new Animated.Value(0)).current;
  //   const activeIndex = useRef(new Animated.Value(0)).current;

  const animation = (toValue, delay) =>
    Animated.timing(mountedAnimated, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true,
    }).start();

  useEffect(() => {
    animation(1, 500);
    // Animated.parallel([
    //   Animated.timing(activeIndexAnimation, {
    //     toValue: 0,
    //     duration: 300,
    //     useNativeDriver: true,
    //   }),
    //   animation(1, 500),
    // ]).start();
    // console.log('a');
  });

  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <View>
        <SharedElement id={`item.${item.id}.icon`}>
          <Image
            source={{
              uri:
                'https://dry-forest-53707.herokuapp.com/kostdata/pendaftar/foto/' +
                item.foto_diri,
            }}
            style={{
              width: screenWidth,
              height: (2 / 3) * screenWidth,
            }}
            resizeMode="cover"
          />
        </SharedElement>
      </View>
      <View style={{flex: 1, paddingTop: 15}}>
        <Animated.FlatList
          style={{opacity: mountedAnimated, transform: [{translateY}]}}
          ref={ref}
          data={datapage}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          initialScrollIndex={0}
          getItemLayout={(data, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(ev) => {
            const newIndex = Math.floor(
              ev.nativeEvent.contentOffset.x / screenWidth,
            );
            console.log('index om', newIndex);

            // activeIndex.setValue(newIndex);
          }}
          renderItem={({item, index, separator}) => {
            return item.page;
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          top: (2 / 3) * screenWidth - 25,
          right: 0.08 * screenWidth,
          height: 50,
          width: 50,
          borderRadius: 25,
          backgroundColor: 'red',
        }}></View>
    </View>
  );
};

DetailPenghuni.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;
  // return DATA_ICON.map((item) => `item.${item.id}.icon`);

  return [`item.${item.id}.icon`];
};

export default DetailPenghuni;

const styles = StyleSheet.create({});
