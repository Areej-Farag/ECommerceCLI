import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import { cartItem } from '../models/Models';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { Minus, Plus } from 'lucide-react-native';
import { Colors, FontSizes, Spacing } from '../constants/Colors';
import { removeFromCart, addToCart } from '../redux/slices/productSlice';
type Props = {
  item: cartItem;
};
const CartCard = ({ item }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  // const handleRemoveFromCart = (item: cartItem) => {
  //   if(item.orderDetails.length === 1){
  //     dispatch(removeFromCart(item));
  //   }
  //   else {
  //     item.orderDetails.map(detail => {
  //       if(detail.quantity === 1){
  //         dispatch(removeFromCart(item));
  //       }
  //       else {
  //         detail.quantity -= 1;
  //       }

  //     })

  //   }

  // }
  return (
    <View style={styles.CardContainer}>
      {item.orderDetails.length > 1 ? (
        item.orderDetails.map((detail, index) => {
          return (
            <View style={styles.Card} key={index}>
              <Image
                source={{
                  uri: `${item.image}`,
                }}
                style={styles.image}
              />

              <View style={styles.Container}>
                <View style={styles.UpperContainer}>
                  <View style={styles.TextUpperContainer}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productSize}>{detail.size} size</Text>
                  </View>
                </View>

                <View style={styles.BottomContainer}>
                  <Text style={styles.productPrice}>
                    {item.price * detail.quantity} $
                  </Text>
                  <View style={styles.ButtonContainer}>
                    <TouchableOpacity
                      style={styles.Button}
                      onPress={() => {
                        dispatch(
                          addToCart({
                            ...item,
                            orderDetails: [
                              {
                                size: detail.size,
                                quantity: detail.quantity + 1,
                              },
                            ],
                          }),
                        );
                      }}
                    >
                      <Plus
                        size={FontSizes.size_24}
                        color={Colors.Primary800}
                      />
                    </TouchableOpacity>
                    <Text>{detail.quantity}</Text>
                    <TouchableOpacity style={styles.Button}>
                      <Minus
                        onPress={() => {
                          dispatch(
                            removeFromCart({
                              ...item,
                              orderDetails: [
                                {
                                  size: detail.size,
                                  quantity: detail.quantity,
                                },
                              ],
                            }),
                          );
                        }}
                        size={FontSizes.size_24}
                        color={Colors.Primary800}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        })
      ) : (
        <View style={styles.Card}>
          <Image
            source={{
              uri: `${item.image}`,
            }}
            style={styles.image}
          />

          <View style={styles.Container}>
            <View style={styles.UpperContainer}>
              <View style={styles.TextUpperContainer}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productSize}>
                  {item.orderDetails[0].size} size
                </Text>
              </View>
            </View>

            <View style={styles.BottomContainer}>
              <Text style={styles.productPrice}>{item.price} $</Text>
              <View style={styles.ButtonContainer}>
                <TouchableOpacity
                  style={styles.Button}
                  onPress={() =>
                    dispatch(
                      addToCart({
                        ...item,
                        orderDetails: [
                          {
                            size: item.orderDetails[0].size,
                            quantity: 1,
                          },
                        ],
                      }),
                    )
                  }
                >
                  <Plus size={FontSizes.size_24} color={Colors.Primary800} />
                </TouchableOpacity>
                <Text>{item.orderDetails[0].quantity}</Text>
                <TouchableOpacity
                  style={styles.Button}
                  onPress={() => dispatch(removeFromCart(item))}
                >
                  <Minus size={FontSizes.size_24} color={Colors.Primary800} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  CardContainer: {
    padding: Spacing.spacing_10,
    marginBottom: Spacing.spacing_10,
  },
  Card: {
    height: 108,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.spacing_20,
    // justifyContent: 'space-between',
    padding: Spacing.spacing_10,
    borderColor: Colors.Primary200,
    borderWidth: 1,
    borderRadius: Spacing.spacing_10,
  },
  image: {
    width: 80,
    height: 80,
  },
  Container: {
    width: Dimensions.get('window').width - 100,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: Spacing.spacing_10,
  },
  UpperContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.spacing_20,
    justifyContent: 'space-between',
  },
  TextUpperContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: Spacing.spacing_6,
  },
  productName: {
    fontSize: FontSizes.size_14,
    fontFamily: 'OpenSans-Bold',
    color: Colors.Primary800,
  },
  productSize: {
    fontSize: FontSizes.size_14,
    fontFamily: 'OpenSans-Regular',
    color: Colors.Primary400,
  },
  BottomContainer: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productPrice: {
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-SemiBold',
    color: Colors.Primary800,
  },
  ButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.spacing_10,
    justifyContent: 'space-between',
  },
  Button: {
    borderColor: Colors.Primary800,
    borderWidth: 1,
    padding: 2,
    borderRadius: 10,
  },
  iconHolder: {
    fontSize: FontSizes.size_16,
    color: Colors.Primary500,
    padding: Spacing.spacing_10,
    // height: Spacing.spacing_20 * 2.3,
  },
});
