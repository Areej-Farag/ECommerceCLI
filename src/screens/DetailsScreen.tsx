import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useFetchByIdQuery } from '../Hooks/UseFetchQuery';
import Header from '../components/Header';
import { Colors, FontSizes, Spacing } from '../constants/Colors';
import { Heart, ShoppingBag, Star } from 'lucide-react-native';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  addToFavorites,
  removeFromFavorites,
} from '../redux/slices/productSlice';
import { AppDispatch } from '../redux/store';
import { usePutQuery } from '../Hooks/UseMutateQuery';
import { Product } from '../models/Models';
const DetailsScreen = ({ route }) => {
  const { mutate } = usePutQuery('/products', 'products');

  const dispatch = useDispatch<AppDispatch>();
  const { id } = route.params;
  const [fullDescription, setFullDescription] = React.useState(false);
  const [selectedSize, setSelectedSize] = React.useState('S');
  const sizes = ['S', 'M', 'L', 'XL'];
  const { data, isLoading, error, isError } = useFetchByIdQuery(
    '/products',
    'products',
    id,
  );
  if (isLoading) {
    return (
      <View>
        <Header title="Details" />
        <ActivityIndicator size="large" color={Colors.Primary600} />
      </View>
    );
  }
  if (isError) {
    return (
      <View>
        <Header title="Details" />
        <Text>{error.message}</Text>
      </View>
    );
  }
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
      <Header title="Details" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.image}>
          <ImageBackground
            source={{ uri: data.image }}
            style={styles.imageBackground}
          >
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                handleAddToFavorites(data);
              }}
            >
              <Heart
                size={20}
                color={data.isFavorite ? Colors.BtnDanger : Colors.Primary900}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View>
          <Text style={styles.productName}>{data.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={20} color={Colors.Rating} />
            <Text style={styles.ratingText}>
              4.5/5 <Text style={styles.ratingCount}> (45 Reviews)</Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setFullDescription(!fullDescription)}>
          {fullDescription ? (
            <Text style={styles.description}>{data.description}</Text>
          ) : (
            <Text style={styles.description} numberOfLines={3}>
              {data.description}
            </Text>
          )}
        </TouchableOpacity>

        <Text style={styles.productName}>Choose Size</Text>
        <View style={styles.sizeContainer}>
          {sizes.map(size => (
            <TouchableOpacity
              key={size}
              style={
                selectedSize === size ? styles.selectedSize : styles.sizeButton
              }
              onPress={() => {
                setSelectedSize(size);
              }}
            >
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && { color: Colors.Primary100 },
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>Price</Text>
          <Text style={styles.productName}>${data.price}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch(
              addToCart({
                ...data,
                orderDetails: [{ size: selectedSize, quantity: 1 }],
              }),
            );
          }}
        >
          <ShoppingBag size={FontSizes.size_24} color={Colors.Primary100} />
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    resizeMode: 'cover',
    alignSelf: 'center',
    width: '93%',
    height: Dimensions.get('window').height / 2.2,
    marginBottom: Spacing.spacing_10,
    borderRadius: Spacing.spacing_10,
  },
  imageBackground: {
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
    backgroundColor: Colors.Primary100,
    borderRadius: Spacing.spacing_10,
    padding: Spacing.spacing_10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.spacing_4,
  },
  sizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.spacing_4,
    marginVertical: Spacing.spacing_10,
  },
  sizeButton: {
    borderColor: Colors.Primary300,
    borderWidth: 1,
    padding: Spacing.spacing_14,
    borderRadius: Spacing.spacing_10,
  },
  selectedSize: {
    backgroundColor: Colors.Primary800,
    padding: Spacing.spacing_14,
    borderRadius: Spacing.spacing_10,
  },
  sizeText: {
    color: Colors.Primary800,
    fontFamily: 'OpenSans-Bold',
    fontSize: FontSizes.size_16,
    paddingHorizontal: Spacing.spacing_6,
  },
  productName: {
    fontSize: FontSizes.size_20,
    fontFamily: 'OpenSans-Bold',
    color: Colors.Primary800,
    marginVertical: Spacing.spacing_10,
  },
  description: {
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-Regular',
    color: Colors.Primary400,
    marginVertical: Spacing.spacing_10,
  },
  ratingText: {
    fontSize: FontSizes.size_12,
    fontFamily: 'OpenSans-SemiBold',
    color: Colors.Primary900,
    marginLeft: Spacing.spacing_4,
  },
  ratingCount: {
    fontSize: FontSizes.size_12,
    fontFamily: 'OpenSans-Regular',
    color: Colors.Primary600,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.spacing_10,
    paddingHorizontal: Spacing.spacing_12,
  },
  priceContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: Spacing.spacing_4,
  },
  priceText: {
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-Bold',
    color: Colors.Primary800,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.spacing_16,
    backgroundColor: Colors.Primary800,
    paddingVertical: Spacing.spacing_14,
    paddingHorizontal: Spacing.spacing_28,
    borderRadius: Spacing.spacing_10,
  },
  buttonText: {
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-Bold',
    color: Colors.Primary100,
  },
});
