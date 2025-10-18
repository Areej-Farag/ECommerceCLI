import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Mic, Search } from 'lucide-react-native';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

const SearchBar = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.SearchContainer}>
      <View style={styles.inputContainer}>
        <Search size={FontSizes.size_24} color={Colors.Primary300} />
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.input}
          placeholder="Search For Clothes"
          placeholderTextColor={Colors.Primary400}
        />
      </View>
      <Mic size={FontSizes.size_24} color={Colors.Primary300} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  SearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Colors.Primary200,
    borderWidth: 1,
    borderRadius: Spacing.spacing_10,
    paddingVertical: Spacing.spacing_6,
    paddingHorizontal: Spacing.spacing_14,
    width: '100%',
  },
  input: {
    marginLeft: Spacing.spacing_10,
    marginRight: Spacing.spacing_10,
    color: Colors.Primary800,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
});
