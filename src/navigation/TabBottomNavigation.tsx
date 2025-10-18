import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import SavedScreen from '../screens/SavedScreen';
import SearchScreen from '../screens/SearchScreen';
import { House, Heart, Search, ShoppingCart, User } from 'lucide-react-native';
import { Colors } from '../constants/Colors';
import { ProfileStackParamList } from './ProfileStack';
import ProfileStack from './ProfileStack';
export type TabBottomParamList = {
  Home: undefined;
  Cart: undefined;
  ProfileStack: {
    screen: keyof ProfileStackParamList;
  };
  Saved: undefined;
  Search: undefined;
};

const Tab = createBottomTabNavigator<TabBottomParamList>();

const TabBottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingHorizontal: 10,
          height: 60,
          borderTopColor: Colors.Primary100,
          borderTopWidth: 1,
        },
        tabBarIconStyle: {
          marginTop: 7,
          fontWeight: 'bold',
        },
        headerShown: false,
        lazy: true,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <House
              color={focused ? Colors.Primary800 : Colors.Primary300}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Search
              color={focused ? Colors.Primary800 : Colors.Primary300}
              size={size}
            />
          ),
          tabBarLabel: 'Search',
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <ShoppingCart
              color={focused ? Colors.Primary800 : Colors.Primary300}
              size={size}
            />
          ),
          tabBarLabel: 'Cart',
        }}
      />

      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Heart
              color={focused ? Colors.Primary800 : Colors.Primary300}
              size={size}
            />
          ),
          tabBarLabel: 'Saved',
        }}
      />

      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <User
              color={focused ? Colors.Primary800 : Colors.Primary300}
              size={size}
            />
          ),
          tabBarLabel: 'Account',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBottomNavigation;
