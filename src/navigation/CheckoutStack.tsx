import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckoutScreen from '../screens/CheckOutScreens/CheckoutScreen';
import AddressScreen from '../screens/ProfileScreens/AddressBookScreen';
import NewAddress from '../screens/CheckOutScreens/NewAddress';
import PayMentMethods from '../screens/ProfileScreens/PayMentMethods';
import NewCard from '../screens/CheckOutScreens/NewCard';

export type CheckoutStackParamList = {
  checkout: undefined;
  address: undefined;
  newAddress: undefined;
  payMethods: undefined;
  newCard: undefined;
};

const Stack = createNativeStackNavigator<CheckoutStackParamList>();

const CheckoutStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="checkout" component={CheckoutScreen} />
      <Stack.Screen name="address" component={AddressScreen} />
      <Stack.Screen name="newAddress" component={NewAddress} />
      <Stack.Screen name="payMethods" component={PayMentMethods} />
      <Stack.Screen name="newCard" component={NewCard} />
    </Stack.Navigator>
  );
};

export default CheckoutStack;
