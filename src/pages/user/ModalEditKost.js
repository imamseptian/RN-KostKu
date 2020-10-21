import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {myColor, screenHeight, screenWidth, APIUrl} from '../../function/MyVar';
import {myAxios} from '../../function/MyAxios';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {Permission, PERMISSION_TYPE} from '../../AppPermission';
import {setUserRedux} from '../../store';

const ModalEditKost = (props) => {
  const dispatch = useDispatch();
  const [kost, setkost] = useState(props.kost);
  const [isPressed, setIsPressed] = useState(false);
  const [dataFoto, setDataFoto] = useState({
    isUploaded: false,
    uri: '',
    type: '',
    data: '',
    base64: '',
  });
  useEffect(() => {
    return () => {
      console.log('tutup modal');
      setkost({});
      setDataFoto({
        isUploaded: false,
        uri: '',
        type: '',
        data: '',
        base64: '',
      });
    };
  }, []);

  const pickImage = async () => {
    setIsPressed(true);
    await Permission.requestMultiple([
      PERMISSION_TYPE.photo,
      PERMISSION_TYPE.camera,
    ]);
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', base64: true, maxWidth: 720, maxHeight: 480},
      (response) => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
          setIsPressed(false);
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          setIsPressed(false);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          setIsPressed(false);
        } else {
          let image = 'data:' + response.type + ';base64,' + response.data;
          setDataFoto({
            ...dataFoto,
            isUploaded: true,
            uri: response.uri,
            type: response.type,
            data: response.data,
            base64: image,
          });
          setIsPressed(false);
        }
      },
    );
  };

  const submitEdit = () => {
    // console.log(kost);
    axios
      .put(
        APIUrl + '/api/editkost',
        dataFoto.isUploaded ? {...kost, newImg: dataFoto.base64} : kost,
        {
          headers: {
            Authorization: `Bearer ${props.token}`,
          },
        },
      )
      .then((res) => {
        // setIsSubmit(false);
        console.log(res.data);
        dispatch(setUserRedux(res.data.user));
        // console.log(res.data.user);
        props.fungsiubah({...kost, foto_kost: res.data.foto_baru});
        props.tutup();
        // navigation.pop(2);
        // navigation.goBack(2);
      })
      .catch((error) => {
        // setIsSubmit(false);
        console.log(error);
      });
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
          minHeight: 100,
          width: screenWidth * 0.88,
          borderRadius: 10,
          backgroundColor: 'white',
          elevation: 5,
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 30,
            width: screenWidth * 0.88,
            borderBottomWidth: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text>{props.styling.title}</Text>
        </View>

        {props.styling.edit == 'foto_kost' ? (
          <View style={{alignItems: 'center'}}>
            <Image
              source={{
                uri: dataFoto.isUploaded
                  ? dataFoto.uri
                  : APIUrl + '/kostdata/kost/foto/' + kost.foto_kost,
              }}
              onError={() => {
                console.log(
                  APIUrl + '/kostdata/pemilik/foto/' + kost.foto_kost,
                );
              }}
              style={{height: 80, width: 80, borderRadius: 10}}
              resizeMode="cover"
            />
            <Text>{kost.foto_kost}</Text>

            <TouchableOpacity onPress={() => pickImage()}>
              <View
                style={{
                  marginTop: 10,
                  height: 30,
                  borderRadius: 10,
                  backgroundColor: myColor.myblue,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 12, color: '#fff'}}>
                  Ubah Foto Kost
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              width: 0.7 * screenWidth,
              height: props.styling.edit == 'desc' ? 80 : 40,
              borderWidth: 0.5,
              borderRadius: 10,
              paddingHorizontal: 10,
            }}>
            <TextInput
              multiline={props.styling.edit == 'desc' ? true : false}
              value={kost[props.styling.edit]}
              //   value={kost.foto_kost}
              onChangeText={(e) => {
                setkost({...kost, [props.styling.edit]: e});
              }}
            />
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            {
              submitEdit();
              // props.fungsiubah(pengguna);
              // props.tutup();
            }
          }}>
          <View
            style={{
              width: screenWidth * 0.7,
              height: 30,
              marginTop: 25,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: myColor.myblue,
            }}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
              Submit
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            {
              props.tutup();
            }
          }}>
          <View
            style={{
              width: screenWidth * 0.7,
              height: 30,
              marginTop: 10,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 0.5,
              backgroundColor: 'white',
            }}>
            <Text
              style={{fontSize: 14, fontWeight: 'bold', color: myColor.fbtx}}>
              Tutup
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalEditKost;

const styles = StyleSheet.create({});
