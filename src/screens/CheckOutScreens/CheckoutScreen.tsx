import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';
import { ArrowRight, LocationEdit } from 'lucide-react-native';
import Modal from '../../components/Modal';
import TextBarWithIcon from '../../components/atoms/TextBarWithIcon';
import FilterCard from '../../components/atoms/FilterCard';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { CompositeNavigationProp } from '@react-navigation/native';
import { CheckoutStackParamList } from '../../navigation/CheckoutStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/ProfileStack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabBottomParamList } from '../../navigation/TabBottomNavigation';

type TabBottomProps = BottomTabNavigationProp<TabBottomParamList>;
type RootProps = NativeStackNavigationProp<RootStackParamList>;
type Props = CompositeNavigationProp<TabBottomProps, RootProps>;
const CheckoutScreen = ({ route }) => {
  const paymentMethods = ['Visa', 'Pay', 'Cash'];
  const navigaton = useNavigation<Props>();
  const [selectedMethod, setSelectedMethod] = React.useState(paymentMethods[0]);
  const { OrderSummary } = route.params;
  const [isModalVisible, setModalVisible] = React.useState(false);

  return (
    <View>
      <Header title="Checkout" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.AddressContainer}>
          <View style={styles.addressUpperContainer}>
            <Text style={styles.title}>Delivery Address</Text>
            <TouchableOpacity
              onPress={() => {
                navigaton.navigate('BottomTaps', {
                  screen: 'ProfileStack',
                  params: { screen: 'addressBook' },
                });
              }}
            >
              <Text style={styles.address}>Change </Text>
            </TouchableOpacity>
          </View>
          <TextBarWithIcon
            btnText=" 123 Main Street, New York, NY"
            hasNavigationArrow={false}
            hasDoubleText
            BoldText="Home"
            icon={<LocationEdit size={24} color={Colors.Primary600} />}
          />
        </View>

        <View style={styles.PaymentMethod}>
          <Text style={styles.title}>Payment Method</Text>
          <View style={styles.PaymentMethodContainer}>
            {paymentMethods.map((method, index) => (
              <View
                key={index}
                style={{ width: Dimensions.get('screen').width / 3 - 15 }}
              >
                <FilterCard
                  title={method}
                  selectedValue={selectedMethod}
                  onPress={() => setSelectedMethod(method)}
                />
              </View>
            ))}
          </View>
          <TextBarWithIcon
            btnText="**** **** **** 1234"
            hasNavigationArrow={false}
            hasDoubleText
            icon={
              <Image
                source={require('../../assets/Images/bxl_visa.png')}
                style={{ marginRight: Spacing.spacing_4 }}
              />
            }
          />
        </View>
        <View style={styles.PaymentContainer}>
          <Text style={styles.title}>Order Summary</Text>
          <View style={styles.totalContainer}>
            <Text style={styles.total}>Sub Total:</Text>
            <Text style={styles.amount}>${OrderSummary.subTotal}</Text>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.total}>VAT (%):</Text>
            <Text style={styles.amount}>${OrderSummary.Vat}</Text>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.total}>Shipping Fee:</Text>
            <Text style={styles.amount}>${OrderSummary.deliveryFee}</Text>
          </View>

          <View style={styles.line} />

          <View style={styles.totalContainer}>
            <Text style={styles.total}>Total:</Text>
            <Text style={styles.amount}>${OrderSummary.total}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkout}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.checkoutText}>Place Order</Text>
            <ArrowRight size={FontSizes.size_20} color={Colors.Primary100} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        setVisible={setModalVisible}
        isSuccess={true}
        btnText="Track Your Order"
        subText="Your Order Has Been Placed"
      />
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    padding: Spacing.spacing_14,
  },
  total: {
    fontSize: FontSizes.size_14,
    fontFamily: 'OpenSans-Regular',
    color: Colors.Primary500,
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
  title: {
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-SemiBold',
    marginBottom: Spacing.spacing_14,
    alignSelf: 'flex-start',
  },
  AddressContainer: {
    padding: Spacing.spacing_10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Primary200,
  },
  addressUpperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  address: {
    color: Colors.Primary600,
    textDecorationLine: 'underline',
    fontSize: FontSizes.size_14,
    fontFamily: 'OpenSans-Regular',
  },
  PaymentMethodContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: Spacing.spacing_10,
    marginTop: Spacing.spacing_10,
  },
  PaymentMethod: {
    padding: Spacing.spacing_10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Primary200,
  },
});
