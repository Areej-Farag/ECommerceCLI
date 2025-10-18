import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, FontSizes, Spacing } from '../constants/Colors';

type Props = {
  image: any;
  title: string;
  description: string;
};
const NotFoundCompnent = ({ image, title, description }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default NotFoundCompnent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 64,
    height: 64,
    marginBottom: Spacing.spacing_20 * 1.5,
  },
  title: {
    fontSize: FontSizes.size_20,
    marginBottom: Spacing.spacing_10,
    fontFamily: 'OpenSans-Bold',
    color: Colors.Primary800,
  },
  description: {
    width: '90%',
    textAlign: 'center',
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-Regular',
    color: Colors.Primary400,
  },
});
