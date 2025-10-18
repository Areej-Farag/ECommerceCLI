import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Spacing } from '../constants/Colors';

type Props = {
  item: string;
  title: string;
  subTitle: string;
  index: number;
  icon: React.ReactNode;
  selectedValue: string;
};

const TextBarWithRadio = ({
  item,
  title,
  subTitle,
  icon,
  index,
  selectedValue,
}: Props) => {
  return (
    <View style={styles.OuterContainer}>
      <View style={styles.leftSide}>
        {icon}
        <View style={{ gap: Spacing.spacing_4 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View key={index} style={item === selectedValue && styles.radio} />
      </View>
    </View>
  );
};

export default TextBarWithRadio;

const styles = StyleSheet.create({
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
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.spacing_10,
  },
  title: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
  },
  subTitle: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
  },
  OuterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.spacing_10,
    paddingHorizontal: Spacing.spacing_10,
    paddingVertical: Spacing.spacing_10,
    borderRadius: Spacing.spacing_10,
    borderWidth: 1,
    borderColor: Colors.Primary400,
  },
});
