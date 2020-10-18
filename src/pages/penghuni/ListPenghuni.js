import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {FlatListPenghuni} from '../../components';
import {
  ButtonLoad,
  SearchBar,
  SearchResult,
  TagSearch,
} from '../../components/atoms';
import {myAxios} from '../../function/MyAxios';
import {APIUrl, myColor} from '../../function/MyVar';

const screenWidth = Math.round(Dimensions.get('window').width);

const ListPenghuni = ({navigation}) => {
  const [selectedTag, setSelectedTag] = useState(1);
  const dataRedux = useSelector((state) => state.AuthReducer);
  const [penghuni, setPenghuni] = useState([]);
  const [banyakData, setbanyakData] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setisLoad] = useState(false);
  const [filter, setFilter] = useState({
    namakeyword: '',
    sortname: 'nama_depan',
    orderby: 'asc',
    id_kostan: dataRedux.user.kostku,
  });
  const [maxLimit, setmaxLimit] = useState(0);

  // let cancelToken;

  const setForm = (inputType, value) => {
    setFilter({
      ...filter,
      [inputType]: value,
    });
  };

  const ambilApi = async (myToken) => {
    setIsLoading(true);
    myAxios.postAxios(
      APIUrl + '/api/daftarpenghuni?page=1',
      filter,
      dataRedux.token,
      myToken,
      onPost,
    );
    function onPost(status, data) {
      if (status == 'success') {
        setisLoad(true);
        setPenghuni(data.data.data);
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
        setSelectedTag(1);
        // setPenghuni([]);
        setbanyakData(0);
        source.cancel('Penghuni Screen got unmounted');
      };
    }, []),
  );

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (page != 1) {
      setIsLoading(true);
      myAxios.postAxios(
        APIUrl + '/api/daftarpenghuni?page=' + page,
        filter,
        dataRedux.user.token,
        source.token,
        onPost,
      );
      function onPost(status, data) {
        if (status == 'success') {
          setPenghuni(penghuni.concat(data.data.data));
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
      source.cancel('Penghuni Screen got unmounted');
    };
  }, [page]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (isLoad) {
      goToTop();
      ambilApi(source.token);
    }
    return () => {
      source.cancel('FIlter CANCELED');
    };
  }, [filter]);

  const renderItem = ({item, index, separator}) => {
    return (
      <Item
        item={item}
        onPress={() => {
          // navigation.push('DetailPenghuni', {penghuni: item});
          navigation.push('DetailPenghuni', {item});
        }}
      />
    );
  };

  const Item = ({item, onPress, style}) => (
    <FlatListPenghuni item={item} onPress={onPress} />
  );

  const goToTop = () => {
    if (penghuni.length > 0) {
      scroll.scrollToIndex({animated: true, index: 0});
    }
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={styles.containerUp}>
        <View style={{marginLeft: 0.05 * screenWidth}}>
          <Text style={{fontSize: 30, color: 'white', fontWeight: 'bold'}}>
            Cari Penghuni
          </Text>
        </View>
        <View
          style={{
            width: screenWidth,
            paddingLeft: 0.05 * screenWidth,
            marginBottom: 20,
          }}>
          <SearchBar
            value={filter.namakeyword}
            placeholder={'Cari Penghuni'}
            onChangeText={(value) => setForm('namakeyword', value)}
          />
        </View>
      </View>
      <View style={styles.containerBot}>
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
                setForm('sortname', 'tanggal_masuk');
              }}
              tagName="Tanggal Masuk"
            />
            <TagSearch
              tagColor={selectedTag == 3 ? myColor.myblue : 'white'}
              textColor={selectedTag == 3 ? 'white' : myColor.darkText}
              onPress={() => {
                setSelectedTag(3);
                setForm('sortname', 'umur');
              }}
              tagName="Umur"
            />
            <TagSearch
              tagColor={selectedTag == 4 ? myColor.myblue : 'white'}
              textColor={selectedTag == 4 ? 'white' : myColor.darkText}
              onPress={() => {
                setSelectedTag(4);
                setForm('sortname', 'kelamin');
              }}
              tagName="Kelamin"
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
        <View style={{paddingBottom: 50}}>
          {/* <FlatListPendaftar /> */}
          <FlatList
            ref={(c) => {
              scroll = c;
            }}
            data={penghuni}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            // extraData={selectedId}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 40}}
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
      <ActivityIndicator
        animating={isLoading}
        size="large"
        color={myColor.myblue}
        style={styles.loading}
      />
    </View>
  );
};

export default ListPenghuni;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  containerUp: {
    backgroundColor: myColor.colorTheme,
    paddingTop: StatusBar.currentHeight,
  },
  containerBot: {
    flex: 1,
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
