import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {FlatListTransaksi} from '../../components';
import {myAxios} from '../../function/MyAxios';
import {APIUrl, myColor} from '../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const TabTransaksi = (props) => {
  const [dataTagihan, setDataTagihan] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    const source = axios.CancelToken.source();
    console.log('useeffect transaksi');
    console.log(props.penghuni);

    if (props.penghuni !== undefined) {
      setisLoading(true);
      myAxios.getAxios(
        APIUrl + '/api/gettagihan/' + props.penghuni.id,
        props.token,
        source.token,
        onGet,
      );
      function onGet(status, data) {
        if (status == 'success') {
          console.log('Get data transaksi success :' + props.penghuni.nama);
          setDataTagihan(data.tagihan);
          setisLoading(false);
          // console.log(data);
          // ambilRiwayat();
        } else if (status == 'cancel') {
          console.log('caught cancel filter');
          setisLoading(false);
        } else {
          console.log(data);
          setisLoading(false);
        }
      }
    }
    return () => {
      source.cancel('Component got unmounted');
      console.log('Tagihan unmounted');
    };
  }, [props.penghuni]);

  let content;

  if (isLoading) {
    content = <View></View>;
  } else {
    if (dataTagihan.length < 1) {
      content = (
        <View
          style={{
            flex: 1,
            marginTop: 10,
            width: 0.9 * screenWidth,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: myColor.darkText,
              fontFamily: 'OpenSans-SemiBold',
            }}>
            Tagihan tidak ditemukan
          </Text>
        </View>
      );
    } else {
      content = (
        <ScrollView showsVerticalScrollIndicator={false}>
          {dataTagihan.map((item, index) => {
            return <FlatListTransaksi key={index} data={item} />;
          })}
        </ScrollView>
      );
    }
  }

  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
        width: 0.9 * screenWidth,
        alignItems: 'center',
      }}>
      {/* {props.penghuni === undefined ? null : <Text>{props.penghuni.nama}</Text>} */}
      <View
        style={{
          flex: 1,
          width: 0.9 * screenWidth,
          alignItems: 'center',
        }}>
        {content}
      </View>

      <TouchableNativeFeedback
        onPress={props.onPress}
        disabled={props.penghuni === undefined ? true : false}>
        <View
          style={{
            height: 50,
            borderRadius: 10,
            backgroundColor:
              props.penghuni === undefined ? myColor.bgfb : myColor.myblue,
            width: screenWidth * 0.7,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 5,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: props.penghuni === undefined ? myColor.blackText : '#fff',
              fontFamily: 'OpenSans-Bold',
            }}>
            Bayar
          </Text>
        </View>
      </TouchableNativeFeedback>
      <ActivityIndicator
        animating={isLoading}
        size="large"
        color={myColor.myblue}
        style={styles.loading}
      />
    </View>
  );
};

export default TabTransaksi;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
