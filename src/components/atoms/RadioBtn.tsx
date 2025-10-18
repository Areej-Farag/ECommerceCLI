import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, Spacing } from '../../constants/Colors';
import Visa from '../../assets/Images/bxl_visa.png';
type Props = {
  values: string[];
};
const RadioBtn = ({ values }: Props) => {
  const [selectedValue, setSelectedValue] = React.useState(values[0]);
  return (
    <>
      {values.map((item, index) => (
        <TouchableOpacity
          style={styles.OuterContainer}
          key={index}
          onPress={() => {
            setSelectedValue(item);
          }}
        >
          <View style={styles.innerContainer}>
            <Image resizeMode="contain" style={styles.image} source={Visa} />
            <Text>**** **** **** {Math.floor(Math.random() * 10000)}</Text>
          </View>
          <View style={styles.container}>
            <View key={index} style={item === selectedValue && styles.radio} />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default RadioBtn;

const styles = StyleSheet.create({
  OuterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: Spacing.spacing_10,
    paddingHorizontal: Spacing.spacing_10,
    paddingVertical: Spacing.spacing_10,
    borderRadius: Spacing.spacing_10,
    borderWidth: 1,
    borderColor: Colors.Primary400,
  },
  image: {
    width: 30,
    height: 30,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.spacing_10,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.Primary300,
  },
  radio: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.Primary800,
  },
});
