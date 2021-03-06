import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FlatListDalamKamar} from '../../components';
import {myColor} from '../../function/MyVar';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const DetailKamar = ({navigation, route}) => {
  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <View>
        <Image
          source={{
            uri:
              'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg',
          }}
          style={{height: (2 / 3) * screenWidth, width: screenWidth}}
        />
      </View>
      <View
        style={{
          flex: 1,
          paddingTop: 10,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 30,
            color: myColor.blackText,
          }}>
          {route.params.kamar.nama}
        </Text>

        <ScrollView>
          {route.params.kamar.penghuni.map((item, index) => {
            return (
              <FlatListDalamKamar
                key={index}
                data={item}
                onPress={() => {
                  navigation.navigate('PenghuniScreen', {
                    screen: 'DetailPenghuni',
                    params: {
                      penghuni: item,
                    },
                  });
                }}
              />
            );
          })}
          {/* <FlatListDalamKamar />
          <FlatListDalamKamar />
          <FlatListDalamKamar />
          <FlatListDalamKamar />
          <FlatListDalamKamar /> */}
        </ScrollView>
      </View>

      <TouchableNativeFeedback>
        <View
          style={{
            backgroundColor: myColor.alert,
            height: 50,
            width: 50,
            borderRadius: 25,
            position: 'absolute',
            top: (2 / 3) * screenWidth - 25,
            right: 0.08 * screenWidth,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
          }}>
          <FontAwesome name="pencil" color="#fff" size={20} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default DetailKamar;

const styles = StyleSheet.create({});
