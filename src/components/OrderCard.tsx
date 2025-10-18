import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { Colors, FontSizes, Spacing } from '../constants/Colors';
type Props = {
  item: {
    name: string;
    image: string;
    price: number;
    orderDetails: {
      size: string;
      quantity: number;
    }[];
    state: string;
  };
};
const CartCard = ({ item }: Props) => {
  return (
    <View style={styles.CardContainer}>
      {item.orderDetails?.length > 1 ? (
        item.orderDetails?.map((detail, index) => {
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
                    <Text style={styles.productPrice}>
                      {item.price * detail.quantity} $
                    </Text>
                  </View>
                  <View style={styles.ButtonContainer}>
                    <TouchableOpacity
                      style={[
                        styles.Button,
                        {
                          backgroundColor:
                            item.state === 'Completed'
                              ? Colors.BtnSuccess
                              : Colors.Primary500,
                        },
                      ]}
                    >
                      <Text
                        style={
                          item.state === 'Completed'
                            ? { color: '#fff' }
                            : { color: Colors.Primary900 }
                        }
                      >
                        {item.state}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TrackButton}>
                      <Text style={styles.ButtonText}>Track Order</Text>
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
                  {item.orderDetails ? item.orderDetails[0]?.size : 'M'} size
                </Text>
                <Text style={styles.productPrice}>{item.price} $</Text>
              </View>
              <View style={styles.ButtonContainer}>
                <TouchableOpacity
                  style={[
                    styles.Button,
                    {
                      backgroundColor:
                        item.state === 'Completed'
                          ? Colors.BtnSuccess
                          : Colors.Primary500,
                    },
                  ]}
                >
                  <Text
                    style={
                      item.state === 'Completed'
                        ? { color: '#fff' }
                        : { color: Colors.Primary900 }
                    }
                  >
                    {item.state}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.TrackButton}>
                  <Text style={styles.ButtonText}>Track Order</Text>
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
    gap: Spacing.spacing_24,
    justifyContent: 'space-between',
  },
  TextUpperContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: Spacing.spacing_6,
  },
  productName: {
    fontSize: FontSizes.size_14,
    fontFamily: 'OpenSans-SemiBold',
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
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: Spacing.spacing_6,
  },
  Button: {
    opacity: 0.8,
    padding: 6,
    borderRadius: 4,
  },
  iconHolder: {
    fontSize: FontSizes.size_16,
    color: Colors.Primary500,
    padding: Spacing.spacing_10,
    // height: Spacing.spacing_20 * 2.3,
  },
  TrackButton: {
    backgroundColor: Colors.Primary900,
    padding: Spacing.spacing_8,
    borderRadius: Spacing.spacing_6,
  },
  ButtonText: {
    color: '#fff',
    fontSize: FontSizes.size_10,
    fontFamily: 'OpenSans-Regular',
  },
});
