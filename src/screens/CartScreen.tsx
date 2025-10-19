import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import NotFoundCompnent from '../components/NotFoundCompnent';
import cartImage from '../assets/Images/Cart-duotone.png';
import CartCard from '../components/CartCard';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Colors, FontSizes, Spacing } from '../constants/Colors';
import { ArrowRight } from 'lucide-react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { addToHistory, clearCart } from '../redux/slices/productSlice';
import { CheckoutStackParamList } from '../navigation/CheckoutStack';
import { RootStackParamList } from '../navigation/RootNavigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';

type Props = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'BottomTaps'>,
  NativeStackNavigationProp<CheckoutStackParamList>
>;

const CartScreen = () => {
  const navigation = useNavigation<Props>();
  const { cart, sum } = useSelector((state: RootState) => state.products);
  let discount = cart.reduce(
    (total, item) => total + Number(item.discount),
    0,
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleCheckOut = () => {
    dispatch(addToHistory(cart));
    dispatch(clearCart());
    navigation.navigate('CheckoutStack', {
      screen: 'checkout',
      params: {
        OrderSummary: {
          subTotal: sum,
          deliveryFee: 60,
          total: sum + 60,
          Vat: discount,
        },
      },
    });
  };
  return (
    <View style={styles.container}>
      <Header title="My Cart" />

      {cart.length > 0 ? (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={cart}
            renderItem={({ item }) => <CartCard item={item} />}
          />
          <View style={styles.PaymentContainer}>
            <View style={styles.totalContainer}>
              <Text style={styles.total}>Sub Total:</Text>
              <Text style={styles.amount}>{sum}</Text>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.total}>VAT (%):</Text>
              <Text style={styles.amount}>{discount}</Text>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.total}>Shipping Fee:</Text>
              <Text style={styles.amount}>60$</Text>
            </View>

            <View style={styles.line} />

            <View style={styles.totalContainer}>
              <Text style={styles.total}>Total:</Text>
              <Text style={styles.amount}>{sum + 60 - discount}</Text>
            </View>
            <TouchableOpacity style={styles.checkout} onPress={handleCheckOut}>
              <Text style={styles.checkoutText}>Go To Checkout</Text>
              <ArrowRight size={FontSizes.size_20} color={Colors.Primary100} />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <NotFoundCompnent
          title="No Cart Items!"
          description="You don’t have any items in your cart. Go to home and add some."
          image={cartImage}
        />
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.spacing_10,
  },
  total: {
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-Bold',
    marginBottom: Spacing.spacing_10,
  },
  amount: {
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-Bold',
    marginBottom: Spacing.spacing_10,
  },
  PaymentContainer: {
    marginTop: Spacing.spacing_10,
    padding: Spacing.spacing_10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.Primary200,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  checkout: {
    backgroundColor: '#000',
    color: '#fff',
    padding: Spacing.spacing_20,
    borderRadius: Spacing.spacing_10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: Spacing.spacing_10,
    marginTop: Spacing.spacing_10,
  },
  checkoutText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: FontSizes.size_16,
    textAlign: 'center',
    color: Colors.Primary100,
  },
});
