import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {myAxios} from '../function/MyAxios';
import {myColor, APIUrl} from '../function/MyVar';
import {FlatListTagihan} from '../components';
import {useSelector} from 'react-redux';

const TagihanPenghuni = (props) => {
  // useEffect(() => {
  //   const source = axios.CancelToken.source();
  //   if (tagihan.length < 1) {
  //     setIsLoading(true);
  //     myAxios.getAxios(
  //       APIUrl + '/api/gettagihan/' + props.id_penghuni,
  //       dataRedux.token,
  //       source.token,
  //       onGet,
  //     );
  //     function onGet(status, data) {
  //       if (status == 'success') {
  //         // console.log(data);
  //         setTagihan(data.tagihan);
  //         console.log(props.id_penghuni);
  //         //   setDaftarKamar(daftarKamar.concat(data.data.data));
  //         //   setmaxLimit(data.data.last_page);
  //         //   setbanyakData(data.data.total);
  //         setIsLoading(false);
  //       } else if (status == 'cancel') {
  //         console.log('caught cancel filter');
  //       } else {
  //         console.log(data);
  //         setIsLoading(false);
  //       }
  //     }
  //   }
  //   return () => {
  //     setTagihan([]);
  //     source.cancel('Component got unmounted');
  //   };
  // }, [tagihan]);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {props.data.map((item, index) => {
          return <FlatListTagihan key={index} />;
        })}
      </ScrollView>
      {/* {isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : null} */}
      {/* <ActivityIndicator
        animating={isLoading}
        size="large"
        color={myColor.myblue}
        style={styles.loading}
      /> */}
    </View>
  );
};

export default TagihanPenghuni;

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
