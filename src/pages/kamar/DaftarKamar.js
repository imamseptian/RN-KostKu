import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FAB} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {FlatListKamar} from '../../components';
import {ButtonLoad, SearchBar, SearchResult} from '../../components/atoms';
import {myAxios} from '../../function/MyAxios';
import {APIUrl, myColor} from '../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const DaftarKamar = ({navigation, route}) => {
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [daftarKamar, setDaftarKamar] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [maxLimit, setmaxLimit] = useState(0);
  const [banyakData, setbanyakData] = useState(0);
  const [isLoad, setisLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    id: route.params.id,
    namakeyword: '',
    sortname: 'nama',
    orderby: 'asc',
  });
  // let cancelToken;

  const ambilApi = async (myToken) => {
    setIsLoading(true);
    myAxios.postAxios(
      APIUrl + '/api/getdaftarkamar?page=1',
      filter,
      dataRedux.token,
      myToken,
      onPost,
    );
    function onPost(status, data) {
      if (status == 'success') {
        console.log(data.data.data);
        setDaftarKamar(data.data.data);
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
      ambilApi(source.token);
      return () => {
        setisLoad(false);
        setFilter({
          ...filter,
          namakeyword: '',
          sortname: 'nama',
          orderby: 'asc',
        });
        setDaftarKamar([]);
        setbanyakData(0);
        source.cancel('Component got unmounted');
      };
    }, []),
  );

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (isLoad) {
      ambilApi(source.token);
    }
    return () => {
      source.cancel('FIlter CANCELED');
    };
  }, [filter]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (page != 1) {
      myAxios.postAxios(
        APIUrl + '/api/getdaftarkamar?page=' + page,
        filter,
        dataRedux.token,
        source.token,
        onPost,
      );
      function onPost(status, data) {
        if (status == 'success') {
          setDaftarKamar(daftarKamar.concat(data.data.data));
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

    return () => {
      source.cancel('FIlter CANCELED');
    };
  }, [page]);

  const Item = ({item, onPress, onLongPress, style}) => (
    <FlatListKamar item={item} onPress={onPress} />
  );

  const renderItem = ({item, index, separator}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';

    return (
      <Item
        item={item}
        onPress={() => {
          // setSelectedId(item.id);
          // alert(item.id);
          // alert(item.id);
          navigation.push('DetailKamar', {kamar: item});
        }}
        // onLongPress={() => alert('ayaya')}

        style={{backgroundColor: 'yellow'}}
      />
    );
  };

  const setForm = (inputType, value) => {
    setFilter({
      ...filter,
      [inputType]: value,
    });
  };

  return (
    <View style={styles.wrapper}>
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
      <View style={styles.containerBot}>
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

        <View style={{flex: 1, marginTop: 10}}>
          <FlatList
            data={daftarKamar}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            extraData={selectedId}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 60}}
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
      </View>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        color="white"
        onPress={() =>
          navigation.push('CreateKamar', {
            id: route.params.id,
            kapasitas: route.params.kapasitas,
          })
        }
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

export default DaftarKamar;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  wrapper: {
    flex: 1,
  },
  containerTop: {
    flex: 1,
    backgroundColor: myColor.colorTheme,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBot: {
    flex: 4,
    paddingTop: 10,
  },
  searchBar: {
    width: 0.9 * screenWidth,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 0.9 * 0.25 * screenWidth,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row-reverse',
    alignItems: 'center',
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
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: '#f5f6fa',
    fontWeight: 'bold',
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
