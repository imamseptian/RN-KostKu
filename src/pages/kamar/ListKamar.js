import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FAB} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {
  ButtonLoad,
  SearchBar,
  SearchResult,
  TagSearch,
} from '../../components/atoms';
import {myAxios} from '../../function/MyAxios';
import {APIUrl, myColor} from '../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const ListKamar = ({navigation}) => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [kamar, setKamar] = useState([]);
  const [pengguna, setpengguna] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState(1);
  const [maxLimit, setmaxLimit] = useState(0);
  const [banyakData, setbanyakData] = useState(0);
  const [isLoad, setisLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    id_kostan: dataRedux.user.kostku,
    namakeyword: '',
    sortname: 'nama',
    orderby: 'asc',
  });

  const setForm = (inputType, value) => {
    setFilter({
      ...filter,
      [inputType]: value,
    });
  };

  const ambilApi = async (myToken) => {
    // const source = axios.CancelToken.source();
    setIsLoading(true);
    myAxios.postAxios(
      APIUrl + '/api/classes?page=1',
      filter,
      dataRedux.token,
      myToken,
      onPost,
    );
    function onPost(status, data) {
      if (status == 'success') {
        console.log(data.data.data);
        setKamar(data.data.data);
        setmaxLimit(data.data.last_page);
        setbanyakData(data.data.total);
        setisLoad(true);
        setIsLoading(false);
      } else if (status == 'cancel') {
        console.log('caught cancel filter');
      } else {
        console.log(data);
        setIsLoading(false);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const source = axios.CancelToken.source();
      console.log('focus', filter);
      ambilApi(source.token);
      return () => {
        setisLoad(false);
        setFilter({
          ...filter,
          namakeyword: '',
          sortname: 'nama',
          orderby: 'asc',
        });
        setSelectedTag(1);
        setKamar([]);
        setbanyakData(0);
        source.cancel('Component got unmounted');
        // console.log('unmounted');
      };
      // console.log('ayaya');
    }, []),
  );

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (isLoad) {
      goToTop();
      ambilApi(source.token);
    }

    return () => {
      source.cancel('FIlter CANCELED');
      // console.log('filter asu');
    };
  }, [filter]);

  const goToTop = () => {
    if (kamar.length > 0) {
      scroll.scrollToIndex({animated: true, index: 0});
    }
  };

  useEffect(() => {
    if (page != 1) {
      const source = axios.CancelToken.source();
      setIsLoading(true);
      myAxios.postAxios(
        APIUrl + '/api/classes?page=' + page,
        filter,
        dataRedux.token,
        source.token,
        onPost,
      );
      function onPost(status, data) {
        if (status == 'success') {
          setKamar(kamar.concat(data.data.data));
          setmaxLimit(data.data.last_page);
          setbanyakData(data.data.total);
          setIsLoading(false);
        } else if (status == 'cancel') {
          console.log('caught cancel filter');
        } else {
          console.log(data);
          setIsLoading(false);
        }
      }
    }
  }, [page]);

  const deleteData = (id) => {
    setIsLoading(true);
    axios
      .delete(`https://dry-forest-53707.herokuapp.com/api/class/${id}`, {
        headers: {
          Authorization: `Bearer ${dataRedux.token}`,
        },
        cancelToken: source.token,
      })
      .then((repos) => {
        loadData();
      });
  };

  const Item = ({item, onPress, style}) => (
    <TouchableOpacity
      onPress={() => {
        // console.log(APIUrl + '/kostdata/kelas_kamar/foto/' + item.foto);
        // APIUrl + '/kostdata/kelas_kamar/foto/' + item.foto
        navigation.navigate('DetailKelas', item);
      }}>
      <View style={[styles.item, style]}>
        <View style={{flexDirection: 'row', height: 115}}>
          <View style={{}}>
            <Image
              style={{borderRadius: 10}}
              source={{
                uri: APIUrl + '/kostdata/kelas_kamar/foto/' + item.foto,
              }}
              height={150}
              width={115}
            />
          </View>
          <View
            style={{
              marginLeft: 20,
              marginRight: 10,
              flex: 1,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 20,
                color: '#2d3436',
              }}>
              {item.nama}
            </Text>

            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 12,
                marginTop: 10,
                color: '#2d3436',
              }}>
              Harga Sewa / Bulan :
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 12,
                marginTop: 10,
                color: '#2d3436',
              }}>
              Rp {item.harga}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: 2,
            right: 2,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{width: 20}}>
              <FontAwesome5 name="door-closed" color="#05375A" size={15} />
            </View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                marginLeft: 3,
              }}>
              {item.banyak}{' '}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 20,
            }}>
            <View style={{width: 20}}>
              <FontAwesome5 name="user-alt" color="#05375A" size={15} />
            </View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
              }}>
              10{' '}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item, index, separator}) => {
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          console.log(APIUrl + '/kostdata/kelas_kamar/foto/' + item.foto);
          // navigation.push('DetailKelas', item);
        }}
        style={{}}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          backgroundColor: myColor.colorTheme,
          paddingTop: StatusBar.currentHeight,
          paddingHorizontal: 0.05 * screenWidth,
        }}>
        <View style={{}}>
          <Text style={styles.title}>Daftar Kamar Kost</Text>
        </View>
        <View style={{marginBottom: 20}}>
          <SearchBar
            value={filter.namakeyword}
            placeholder={'Cari Jenis Kamar'}
            onChangeText={(value) => setForm('namakeyword', value)}
          />
        </View>
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
            marginBottom: 10,
            width: screenWidth,
            paddingLeft: 0.05 * screenWidth,
          }}>
          <Text
            style={{
              marginRight: 10,
              fontSize: 14,
              fontWeight: 'bold',
              color: myColor.darkText,
            }}>
            Urutkan
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TagSearch
              tagColor={selectedTag == 1 ? myColor.myblue : 'white'}
              textColor={selectedTag == 1 ? 'white' : myColor.darkText}
              onPress={() => {
                setSelectedTag(1);
                setForm('sortname', 'nama');
              }}
              tagName="Nama"
            />
            <TagSearch
              tagColor={selectedTag == 2 ? myColor.myblue : 'white'}
              textColor={selectedTag == 2 ? 'white' : myColor.darkText}
              onPress={() => {
                setSelectedTag(2);
                setForm('sortname', 'harga');
              }}
              tagName="Harga"
            />
          </ScrollView>
        </View>

        <SearchResult
          sortCondition={filter.orderby}
          banyak={banyakData}
          onPress={() => {
            if (filter.orderby == 'asc') {
              setForm('orderby', 'desc');
            } else {
              setForm('orderby', 'asc');
            }
          }}
        />
        <FlatList
          ref={(c) => {
            scroll = c;
          }}
          style={{marginTop: 10}}
          data={kamar}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={selectedId}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            page < maxLimit && !isLoading ? (
              <ButtonLoad
                onPress={() => {
                  setPage((prevState) => prevState + 1);
                }}
              />
            ) : null
          }
        />
      </View>

      <FAB
        style={styles.fab}
        small
        icon="plus"
        color="white"
        onPress={() => navigation.push('CreateKelas')}
      />
      <ActivityIndicator
        animating={isLoading}
        size="large"
        color={myColor.myblue}
        style={styles.loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth * 0.9,
    marginBottom: 15,
    marginHorizontal: 0.05 * screenWidth,
    borderRadius: 10,
    borderWidth: 0.5,
    backgroundColor: '#ecf0f1',
    height: 150,
    position: 'relative',
  },
  itemTitle: {
    fontSize: 28,
  },
  title: {
    fontSize: 30,
    color: '#f5f6fa',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffaa91',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  searchWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: 'white',
    width: 0.9 * screenWidth,
    alignItems: 'center',
    borderRadius: 25,
    height: 40,
  },
  searchTextInput: {
    flex: 1,
    marginRight: 15,
  },
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

export default ListKamar;
