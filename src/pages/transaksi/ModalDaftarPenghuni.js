import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, TextInput} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FlatListTransaksi, FlatListModal} from '../../components';
import {myAxios} from '../../function/MyAxios';
import {APIUrl, myColor} from '../../function/MyVar';
import axios from 'axios';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const ModalDaftarPenghuni = (props) => {
  const [dataPenghuni, setdataPenghuni] = useState([]);
  const [filter, setFilter] = useState({
    id_kostan: props.id_kostan,
    keyword: '',
  });
  useEffect(() => {
    console.log('fetching...');
    console.log(filter);
    console.log(props.token);
    const source = axios.CancelToken.source();
    myAxios.postAxios(
      APIUrl + '/api/tagihanpenghuni',
      filter,
      props.token,
      source.token,
      onPost,
    );
    function onPost(status, data) {
      if (status == 'success') {
        console.log(data.data);
        setdataPenghuni(data.data);
      } else if (status == 'cancel') {
        console.log('caught cancel filter');
      } else {
        console.log(data);
      }
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <View
        style={{
          height: screenHeight * 0.75,
          paddingHorizontal: 10,
          paddingVertical: 5,
          width: screenWidth * 0.88,
          borderRadius: 10,
          backgroundColor: 'white',
          // position: 'absolute',
          // top: 0.5 * screenHeight - 0.5 * (0.5 * screenHeight),
          // left: 0.5 * screenWidth - 0.5 * (0.8 * screenWidth),
          elevation: 5,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            color: myColor.blackText,
            marginBottom: 5,
          }}>
          Cari Penghuni Kost
        </Text>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            width: 0.85 * screenWidth,
            alignItems: 'center',
            borderRadius: 10,
            height: 40,
            borderWidth: 0.5,
          }}>
          <FontAwesome
            name="search"
            color="#636e72"
            size={25}
            style={{marginRight: 10, marginLeft: 10}}
          />
          <TextInput style={{flex: 1, marginRight: 15}} />
        </View>
        <View>
          {dataPenghuni.map((item, index) => {
            return (
              <FlatListModal
                key={index}
                data={item}
                onPress={() => {
                  props.itemClick(item);
                  //   setpenghuni(item);
                  //   setshowModal(false);
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default ModalDaftarPenghuni;

const styles = StyleSheet.create({});
