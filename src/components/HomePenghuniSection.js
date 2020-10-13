import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {APIUrl, myColor} from '../function/MyVar';
import {CircleAvatar} from './atoms';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const HomePenghuniSection = (props) => {
  const navigation = useNavigation();

  let content;

  if (props.data.length < 1) {
    content = (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: myColor.darkText,
            fontWeight: 'bold',
            fontSize: 18,
            paddingVertical: 15,
          }}>
          Penghuni kost masih kosong
        </Text>
      </View>
    );
  } else {
    content = (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{paddingLeft: 0.05 * screenWidth}}>
        {props.data.map((item, index) => {
          return (
            <View key={index}>
              <CircleAvatar
                data={item}
                onPress={() => {
                  // navigation.navigate('PenghuniScreen', {
                  //   screen: 'DetailPenghuni',
                  //   params: {
                  //     penghuni: item,
                  //   },
                  // });
                  console.log(
                    APIUrl + '/kostdata/pendaftar/foto/' + item.foto_diri,
                  );
                  // navigation.push('DetailPenghuni', {penghuni: item});
                  console.log(item);
                  navigation.push('DetailPenghuni', {item});
                }}
              />
            </View>
          );
        })}
      </ScrollView>
    );
  }

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: screenWidth,
          alignItems: 'center',
          paddingHorizontal: 0.05 * screenWidth,
        }}>
        <Text style={styles.sectionTitle}>Penghuni</Text>
        <Text style={styles.seeAll}>Lihat Semua</Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
        }}>
        {props.status ? (
          <ActivityIndicator size="large" color={myColor.colorTheme} />
        ) : (
          content
        )}
      </View>
    </View>
  );
};

export default HomePenghuniSection;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    color: myColor.titleHome,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 12,
    color: myColor.myblue,
    fontWeight: 'bold',
  },
  imageScrollWrapper: {height: 60, width: 60, borderRadius: 30, elevation: 5},
  avatarScroll: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 2,
    borderColor: 'white',
    // elevation: 5,
  },
  avatarName: {
    fontSize: 12,
    maxWidth: 70,
    color: myColor.darkText,
  },
  scrollWrapper: {
    alignItems: 'center',
    marginRight: 15,
    marginTop: 10,
  },
});
