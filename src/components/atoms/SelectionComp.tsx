import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';
type Props = {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  onPress?: () => void;
};
const SelectionComp = ({ label, icon, placeholder, onPress }: Props) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <Text style={styles.placeholder}>{placeholder}</Text>
        <TouchableOpacity style={styles.iconHolder} onPress={onPress}>
          <View>
            {icon}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectionComp;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: Spacing.spacing_20,
    width: '100%',
  },
  label: {
    fontSize: FontSizes.size_16,
    color: Colors.Primary500,
    marginBottom: Spacing.spacing_4,
  },
  iconHolder: {
    fontSize: FontSizes.size_16,
    color: Colors.Primary500,
    padding: Spacing.spacing_10,
    // height: Spacing.spacing_20 * 2.3,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.Primary400,
    borderRadius: Spacing.spacing_10,
    padding: Spacing.spacing_10,
    height: Spacing.spacing_20 * 2.3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeholder: {
    fontSize: FontSizes.size_14,
    color: Colors.Primary400,
  },
});
