import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {myColor, screenHeight, screenWidth, APIUrl} from '../../function/MyVar';
import {ModalEditProfil} from './';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
const EditProfil = ({navigation, route}) => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [user, setuser] = useState({
    nama_depan: route.params.nama_depan,
    nama_belakang: route.params.nama_belakang,
    foto_profil: route.params.foto_profil,
  });
  const [showModal, setshowModal] = useState(false);
  const [propModal, setpropModal] = useState({
    title: 'Edit Nama ',
    edit: 'nama',
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <StatusBar translucent backgroundColor="transparent" />
      <Modal
        visible={showModal}
        transparent={true}
        onRequestClose={() => setshowModal(false)}>
        <ModalEditProfil
          user={user}
          token={dataRedux.token}
          styling={propModal}
          fungsiubah={(item) => setuser(item)}
          tutup={() => setshowModal(false)}
        />
      </Modal>
      <View
        style={{
          height: StatusBar.currentHeight + 50,
          backgroundColor: 'white',
          borderBottomWidth: 1,
          paddingTop: StatusBar.currentHeight,
          alignItems: 'center',
          paddingHorizontal: 10,
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" color={myColor.fbtx} size={25} />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 20,
            fontWeight: 'bold',
            color: myColor.fbtx,
          }}>
          Edit Profil
        </Text>
      </View>

      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          marginHorizontal: 0.1 * screenWidth,
          width: 0.8 * screenWidth,
          height: 70,
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 10,
            backgroundColor: myColor.myblue,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Octicons name="settings" color={myColor.myWhite} size={25} />
        </View>
        <View style={{marginLeft: 10}}>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: myColor.fbtx}}>
            Profil
          </Text>
          <Text
            style={{fontSize: 12, fontWeight: 'bold', color: myColor.fbtx1}}>
            Edit dan kelola data profil anda
          </Text>
        </View>
      </View>

      <View
        style={{
          width: 0.8 * screenWidth,
          marginHorizontal: 0.1 * screenWidth,

          backgroundColor: myColor.grayprofile,
          alignItems: 'center',
          borderRadius: 10,
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            setshowModal(true);
            setpropModal({
              ...propModal,
              title: 'Edit Foto Profil',
              edit: 'foto_profil',
            });
          }}>
          <View style={styles.wrapperFieldInfo}>
            <View>
              <Text style={styles.namaInfo}>Foto Profil</Text>
              <Image
                source={{
                  uri: APIUrl + '/kostdata/pemilik/foto/' + user.foto_profil,
                }}
                style={{height: 50, width: 50, borderRadius: 10}}
              />
            </View>

            <SimpleLineIcons
              name="arrow-right"
              color={myColor.graytextprof}
              size={25}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setshowModal(true);
            setpropModal({
              ...propModal,
              title: 'Edit Nama Depan',
              edit: 'nama_depan',
            });
          }}>
          <View style={styles.wrapperFieldInfo}>
            <View>
              <Text style={styles.namaInfo}>Nama Depan</Text>
              <Text style={styles.contentInfo}>{user.nama_depan}</Text>
            </View>
            <SimpleLineIcons
              name="arrow-right"
              color={myColor.graytextprof}
              size={25}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setshowModal(true);
            setpropModal({
              ...propModal,
              title: 'Edit Nama Belakang',
              edit: 'nama_belakang',
            });
          }}>
          <View style={styles.wrapperFieldInfo}>
            <View>
              <Text style={styles.namaInfo}>Nama Belakang</Text>
              <Text style={styles.contentInfo}>{user.nama_belakang}</Text>
            </View>
            <SimpleLineIcons
              name="arrow-right"
              color={myColor.graytextprof}
              size={25}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfil;

const styles = StyleSheet.create({
  wrapperFieldInfo: {
    width: 0.7 * screenWidth,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  namaInfo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: myColor.graytextprof,
  },
  contentInfo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: myColor.fbtx,
    textAlign: 'justify',
  },
});
