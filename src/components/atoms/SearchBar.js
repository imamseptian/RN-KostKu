import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const SearchBar = (props) => {
  return (
    <View style={styles.searchWrapper}>
      <FontAwesome
        name="search"
        color="#636e72"
        size={25}
        style={{marginRight: 10, marginLeft: 10}}
      />
      <TextInput {...props} style={styles.searchTextInput} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: 'white',
    width: 0.9 * screenWidth,
    alignItems: 'center',
    borderRadius: 10,
    height: 40,
  },
  searchTextInput: {
    flex: 1,
    marginRight: 15,
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
  },
});
