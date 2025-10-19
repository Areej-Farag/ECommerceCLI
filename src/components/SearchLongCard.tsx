import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ArrowUpRight } from 'lucide-react-native';
import { Colors, FontSizes, Spacing } from '../constants/Colors';
type Props = {
  name: string;
  Price: number;
  image: string;
};
const SearchLongCard = ({ name, Price, image }: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.productPrice}>{Price} $</Text>
        </View>
      </View>
      <ArrowUpRight size={FontSizes.size_24} color={Colors.Primary800} />
    </View>
  );
};

export default SearchLongCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.spacing_10,
    paddingVertical: Spacing.spacing_28,
    marginBottom: Spacing.spacing_10,
    borderBottomColor: Colors.Primary200,
    borderBottomWidth: 1,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.spacing_10,
  },
  image: {
    width: 50,
    height: 60,
    borderRadius: 10,
  },
  productDetails: {
    justifyContent: 'flex-start',
  },
  productName: {
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-Bold',
    color: Colors.Primary800,
  },
  productPrice: {
    fontSize: FontSizes.size_14,
    fontFamily: 'OpenSans-Regular',
    color: Colors.Primary500,
  },
});
