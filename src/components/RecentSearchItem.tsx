import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { X } from 'lucide-react-native';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

const RecentSearchItem = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>RecentSearchItem</Text>
      <X size={20} color="black" />
    </View>
  );
};

export default RecentSearchItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.spacing_10,
    paddingVertical: Spacing.spacing_16,
    marginBottom: Spacing.spacing_10,
    borderBottomColor: Colors.Primary200,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-Regular',
  },
});
