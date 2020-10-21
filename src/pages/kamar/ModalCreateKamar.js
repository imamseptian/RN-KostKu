import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {myColor, APIUrl} from '../../function/MyVar';
import {myAxios} from '../../function/MyAxios';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const ModalCreateKamar = (props) => {
  const [kamar, setKamar] = useState({
    nama: '',
    kelas: props.id,
    kapasitas: props.kapasitas,
    active: true,
    qty: 1,
  });
  // const [listKamar, setListKamar] = useState([]);
  const [banyak, setBanyak] = useState(1);

  useEffect(() => {
    setKamar({...kamar, qty: banyak});
  }, [banyak]);

  const setForm = (inputType, value) => {
    setKamar({...kamar, [inputType]: value});
  };
  useEffect(() => {
    return () => {
      setKamar({...kamar, qty: 1, nama: ''});
    };
  }, []);

  const addData = () => {
    const source = axios.CancelToken.source();
    myAxios.postAxios(
      APIUrl + '/api/kamar',
      kamar,
      props.token,
      source.token,
      onPost,
    );
    function onPost(status, data) {
      if (status == 'success') {
        alert('Tambah Kamar Sukses');
        props.refresh(source.token);
        props.tutup();
        // refreshPenghuni();
      } else if (status == 'cancel') {
        console.log('caught cancel filter');
      } else {
        console.log(data);
      }
    }
  };

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
          paddingHorizontal: 10,
          paddingBottom: 20,
          width: screenWidth * 0.88,
          borderRadius: 10,
          backgroundColor: 'white',
          elevation: 5,
          alignItems: 'center',
        }}>
        <View
          style={{
            borderBottomWidth: 1,
            paddingVertical: 10,
            borderColor: myColor.darkText,
            width: screenWidth * 0.88,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: myColor.blackText,
              fontSize: 15,
            }}>
            Tambah Kamar
          </Text>
        </View>

        <View
          style={{
            height: 40,
            borderWidth: 0.5,
            borderRadius: 5,
            width: 0.6 * screenWidth,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}>
          <TextInput
            placeholder="Masukan Nama Kamar"
            value={kamar.nama}
            onChangeText={(value) => {
              setForm('nama', value);
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (banyak > 1) {
                setBanyak(banyak - 1);
              }
            }}>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: myColor.myblue,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold'}}>
                -
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              minWidth: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 0.5,
              marginHorizontal: 10,
              borderRadius: 10,
            }}>
            <TextInput
              value={banyak.toString()}
              keyboardType="numeric"
              value={kamar.qty.toString()}
              onChangeText={(e) => {
                if (parseInt(e) < 1) {
                  setBanyak(parseInt(0));
                } else if (e.length < 1) {
                  setBanyak(parseInt(0));
                } else {
                  setBanyak(parseInt(e));
                }
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setBanyak(banyak + 1);
            }}>
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: myColor.myblue,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
                +
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableNativeFeedback onPress={() => addData()}>
          <View
            style={{
              height: 35,
              width: 0.7 * screenWidth,
              borderRadius: 5,
              backgroundColor: myColor.myblue,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
              Tambahkan
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={props.tutup}>
          <View
            style={{
              height: 35,
              width: 0.7 * screenWidth,
              borderRadius: 5,
              backgroundColor: myColor.bgfb,
              borderWidth: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{fontSize: 14, fontWeight: 'bold', color: myColor.fbtx}}>
              Tutup
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default ModalCreateKamar;

const styles = StyleSheet.create({
  subtitle: {
    width: 0.25 * screenWidth,
    paddingRight: 5,
    fontSize: 12,
    color: myColor.blackText,
    fontWeight: 'bold',
  },
  konten: {
    width: 0.53 * screenWidth,
    fontSize: 12,
    fontWeight: 'bold',
    color: myColor.darkText,
  },
  fieldWrapper: {
    flexDirection: 'row',
    width: 0.8 * screenWidth,
    minHeight: 50,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    paddingVertical: 5,
  },
});
