import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';

type props = {
  onPress: () => void;
  title: string;
  selectedValue: string;
};
const FilterCard = ({ onPress, title, selectedValue }: props) => {
  return (
    <TouchableOpacity
      style={[styles.container, title === selectedValue && styles.selected]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.title,
          title === selectedValue && { color: Colors.Primary100 },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.spacing_6,
    paddingHorizontal: Spacing.spacing_14,
    borderRadius: Spacing.spacing_10,
    borderColor: Colors.Primary200,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Spacing.spacing_20 * 2,
  },
  title: {
    fontSize: FontSizes.size_14,
    fontFamily: 'OpenSans-SemiBold',
  },
  selected: {
    backgroundColor: Colors.Primary800,
    color: Colors.Primary100,
  },
});
