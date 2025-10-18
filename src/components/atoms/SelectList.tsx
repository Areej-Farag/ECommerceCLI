import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import { Colors, FontSizes, Spacing } from '../../constants/Colors';
type Props = {
  list: string[] | number[];
  onPress: (value: string | number) => void;
  selectedValue: string | number;
  title: string;
};

const SelectList = ({ list, onPress, selectedValue, title = '' }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={styles.ScrollView}
      >
        {list.map((item, index) => (
          <TouchableOpacity
            style={[
              styles.itemContainer,
              item === selectedValue && { backgroundColor: Colors.Primary800 },
            ]}
            key={index}
            onPress={() => onPress(item)}
          >
            <Text
              style={[
                styles.item,
                item === selectedValue && { color: Colors.Primary100 },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default SelectList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.spacing_20,
    // justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: FontSizes.size_20,
    fontWeight: 'bold',
    marginBottom: Spacing.spacing_10,
  },
  list: {
    width: '100%',
    marginBottom: Spacing.spacing_20,
  },
  ScrollView: {
    gap: Spacing.spacing_8,
  },
  item: {
    fontSize: FontSizes.size_16,
    marginBottom: Spacing.spacing_4,
    color: Colors.Primary800,
  },
  itemContainer: {
    width: '100%',
    padding: Spacing.spacing_10,
    backgroundColor: '#f0f0f0',
    borderRadius: Spacing.spacing_14,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
