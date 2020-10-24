import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableNativeFeedback,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {SharedElement} from 'react-navigation-shared-element';
import {PenghuniBerkas, PenghuniInfo, PenghuniTagihan} from './';
import ImageViewer from 'react-native-image-zoom-viewer';
import StepIndicator from 'react-native-step-indicator';
import {myColor, APIUrl, screenWidth, screenHeight} from '../../function/MyVar';
import {KelasInfo} from './component';

const DetailKelasKamar = ({navigation, route}) => {
  const [showImg, setshowImg] = useState(false);
  const [imageIndex, setimageIndex] = useState(0);
  const {item} = route.params;
  const datapage = [
    {id: 'page0', page: <KelasInfo data={item} />},
    {id: 'page1', page: <KelasInfo data={item} />},
  ];

  const labels = ['Info', 'Fasilitas'];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#aaaaaa',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#aaaaaa',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#ffffff',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#aaaaaa',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
  };

  const ref = useRef();
  const [currentPage, setcurrentPage] = useState(0);
  const images = [
    {
      url: APIUrl + '/kostdata/kelas_kamar/foto/' + item.foto,

      props: {
        // headers: ...
      },
    },
  ];

  const mountedAnimated = useRef(new Animated.Value(0)).current;
  const activeIndex = useRef(new Animated.Value(0)).current;

  const animation = (toValue, delay) =>
    Animated.timing(mountedAnimated, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true,
    }).start();

  useEffect(() => {
    animation(1, 500);
  });

  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* {showImg ? null : <StatusBar hidden translucent backgroundColor="transparent" />} */}
      <StatusBar hidden={!showImg} translucent backgroundColor="transparent" />
      <Modal
        visible={showImg}
        transparent={true}
        onRequestClose={() => setshowImg(false)}>
        <ImageViewer
          imageUrls={images}
          enableSwipeDown={true}
          index={imageIndex}
          onSwipeDown={() => setshowImg(false)}
        />
      </Modal>
      <View>
        <TouchableNativeFeedback
          onPress={() => {
            setimageIndex(0);
            setshowImg(true);
          }}>
          <SharedElement id={`item.${item.id}.foto_kamar`}>
            <Image
              source={{
                uri: APIUrl + '/kostdata/kelas_kamar/foto/' + item.foto,
              }}
              style={{
                width: screenWidth,
                height: (2 / 3) * screenWidth,
              }}
              resizeMode="cover"
            />
          </SharedElement>
        </TouchableNativeFeedback>
      </View>
      <View style={{flex: 1, paddingTop: 15}}>
        <Text style={{textAlign: 'center', fontSize: 20}}>{item.nama}</Text>
        <Animated.View
          style={{
            flex: 1,
            opacity: mountedAnimated,
            transform: [{translateY}],
          }}>
          <KelasInfo
            data={item}
            onPress={() =>
              navigation.push('DaftarKamar', {
                id: item.id,
                kapasitas: item.kapasitas,
              })
            }
          />
        </Animated.View>
        {/* <Animated.FlatList
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
            console.log(activeIndex);
            activeIndex.setValue(newIndex);
            setcurrentPage(newIndex);
          }}
          renderItem={({item, index, separator}) => {
            return item.page;
          }}
        /> */}
      </View>
      <TouchableNativeFeedback
        onPress={() =>
          navigation.push('EditKelas', {
            kamar: item,
            harga: String(item.harga),
            kapasitas: String(item.kapasitas),
          })
        }>
        <View
          style={{
            position: 'absolute',
            top: (2 / 3) * screenWidth - 25,
            right: 0.08 * screenWidth,
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: myColor.alert,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome name="pencil" size={20} color="#fff" />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

DetailKelasKamar.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;
  // return DATA_ICON.map((item) => `item.${item.id}.icon`);

  return [`item.${item.id}.foto_kamar`];
};

export default DetailKelasKamar;

const styles = StyleSheet.create({});
