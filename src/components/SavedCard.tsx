import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Product } from '../models/Models';
import { Colors, FontSizes, Spacing } from '../constants/Colors';
import { Heart } from 'lucide-react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import {
  addToFavorites,
  removeFromFavorites,
} from '../redux/slices/productSlice';
import { usePutQuery } from '../Hooks/UseMutateQuery';
type Props = {
  item: Product;
};

const SavedCard = ({ item }: Props) => {
  const { mutate } = usePutQuery('/products', 'products');
  const dispatch = useDispatch<AppDispatch>();
  const handleAddToFavorites = (item: Product) => {
    if (item.isFavorite) {
      dispatch(removeFromFavorites(item));
      mutate({ ...item, isFavorite: false });
    } else {
      dispatch(addToFavorites(item));
      mutate({ ...item, isFavorite: true });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.ImageBackgroundContainer}>
        <ImageBackground
          style={styles.ImageBackground}
          source={{ uri: item.image }}
        >
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => handleAddToFavorites(item)}
          >
            <Heart
              size={20}
              color={item.isFavorite ? Colors.BtnDanger : Colors.Primary400}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>$ {item.price} </Text>
      </View>
    </View>
  );
};

export default SavedCard;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 2 - 30,
    height: Dimensions.get('window').height / 3.6 - 20,
    margin: 10,
    borderRadius: Spacing.spacing_10,
  },
  ImageBackgroundContainer: {
    width: Dimensions.get('window').width / 1.9 - 30,
    height: Dimensions.get('window').height / 4.5 - 20,
    borderRadius: Spacing.spacing_10,
    marginBottom: Spacing.spacing_16,
  },
  ImageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginVertical: Spacing.spacing_12,
    borderRadius: Spacing.spacing_10,
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: Spacing.spacing_10,
    padding: Spacing.spacing_8,
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
