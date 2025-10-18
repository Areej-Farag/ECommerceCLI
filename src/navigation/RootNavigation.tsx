import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/splash/SplashScreen';
import AuthStack from './AuthStack';
import TabBottomNavigation from './TabBottomNavigation';
import DetailsScreen from '../screens/DetailsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import CheckoutStack from './CheckoutStack';

export type RootStackParamList = {
  Splash: undefined;
  Auth: {
    screen: 'SignIn' | 'SignUp';
  };

  BottomTaps: {
    screen: 'Home' | 'Cart' | 'ProfileStack' | 'Saved' | 'Search';
    params?: {
      screen: string;
    };
  };
  DetailsScreen: {
    id: string;
  };
  Notifications: undefined;
  CheckoutStack: {
    screen: 'checkout' | 'address' | 'newAddress' | 'payMethods' | 'newCard';
    params?: {
      OrderSummary?: {
        subTotal: number;
        deliveryFee: number;
        total: number;
        Vat: number;
      };
    };
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color="#000" />
  //     </View>
  //   );
  // }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      {/* {user ? (
      ) : (
        <>
        </>
      )} */}
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="BottomTaps" component={TabBottomNavigation} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="CheckoutStack" component={CheckoutStack} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
