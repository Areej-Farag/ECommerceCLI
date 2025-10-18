import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notifications from '../screens/ProfileScreens/NotificationsSettings';
import Orders from '../screens/ProfileScreens/Orders';
import YourShop from '../screens/ProfileScreens/YourShop';
import AccountScreen from '../screens/ProfileScreens/AccountScreen';
import MyDetailsScreen from '../screens/ProfileScreens/MyDetailsScreen';
import FAQsScreen from '../screens/ProfileScreens/FAQsScreen';
import HelpCenterScreen from '../screens/ProfileScreens/HelpCenterScreen';
import PayMentMethods from '../screens/ProfileScreens/PayMentMethods';
import AddressBookScreen from '../screens/ProfileScreens/AddressBookScreen';
export type ProfileStackParamList = {
  notifications: undefined;
  myDetails: undefined;
  orders: undefined;
  FAQs: undefined;
  helpCenter: undefined;
  payMethods: undefined;
  addressBook: undefined;
  account: undefined;
  // settings: undefined;

  YourShop: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="account" component={AccountScreen} />
      <Stack.Screen name="notifications" component={Notifications} />
      <Stack.Screen name="orders" component={Orders} />
      <Stack.Screen name="FAQs" component={FAQsScreen} />
      <Stack.Screen name="addressBook" component={AddressBookScreen} />
      <Stack.Screen name="helpCenter" component={HelpCenterScreen} />
      <Stack.Screen name="myDetails" component={MyDetailsScreen} />
      <Stack.Screen name="payMethods" component={PayMentMethods} />
      <Stack.Screen name="YourShop" component={YourShop} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
