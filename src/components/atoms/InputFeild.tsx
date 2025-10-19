import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';
import useDebounce from '../../Hooks/useDebounce';
type Props = {
  value: string;
  placeholder: string;
  label: string;
  keyBoardType?: KeyboardTypeOptions;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  pattern?: RegExp;
  isValidate?: boolean;
  validationMsg?: string;
};
const InputFeild = ({
  value,
  placeholder,
  label,
  onChangeText,
  isValidate = false,
  validationMsg = '',

  keyBoardType = 'default',
  secureTextEntry = false,
}: Props) => {
  
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, !isValidate && { borderColor: Colors.BtnDanger }]}
        placeholder={placeholder}
        value={value}
        keyboardType={keyBoardType}
        placeholderTextColor={Colors.Primary400}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        cursorColor={Colors.BtnPrimary}
      />
      <Text style={styles.error}>{!isValidate && validationMsg}</Text>
    </View>
  );
};

export default InputFeild;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: Spacing.spacing_4,
    width: '100%',
  },
  label: {
    fontSize: FontSizes.size_16,
    color: Colors.Primary500,
    marginBottom: Spacing.spacing_4,
    fontFamily: 'OpenSans-Regular',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.Primary400,
    borderRadius: Spacing.spacing_10,
    padding: Spacing.spacing_10,
    height: Spacing.spacing_20 * 2.3,
    fontFamily: 'OpenSans-Regular',
  },
  error: {
    color: Colors.BtnDanger,
    fontSize: FontSizes.size_12,
    fontFamily: 'OpenSans-Regular',
  },
});
