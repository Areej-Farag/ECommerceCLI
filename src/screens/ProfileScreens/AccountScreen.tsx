import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../models/Models';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';
import { ProfileStackParamList } from '../../navigation/ProfileStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootNavigation';
import {
  Bell,
  CreditCard,
  Headset,
  House,
  LogOut,
  Package,
  ShieldQuestionMark,
  UserRoundPen,
} from 'lucide-react-native';
import TextBarWithIcon from '../../components/atoms/TextBarWithIcon';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
const AccountScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isVisible, setVisible] = useState(false);
  type ProfileNav = NativeStackNavigationProp<ProfileStackParamList, 'account'>;
  type AuthNav = NativeStackNavigationProp<RootStackParamList, 'Auth'>;
  type Props = CompositeNavigationProp<ProfileNav, AuthNav>;

  const navigation = useNavigation<Props>();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log('Error fetching user from AsyncStorage:', error);
      }
    };

    fetchUser();
  }, []);

  const handleNavigation = useCallback(
    (Screen: string) => {
      navigation.navigate(Screen);
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.UserInfo}>
        {user?.profilePic && (
          <Image style={styles.PPStyle} source={{ uri: user.profilePic }} />
        )}
        <Text>{user?.fullname}</Text>
        <Text>{user?.email}</Text>
      </View> */}
      <Header title="Account" />

      <View style={styles.StackBTNs}>
        <TextBarWithIcon
          handleNavigation={() => {
            handleNavigation('orders');
          }}
          icon={<Package size={FontSizes.size_20} color={Colors.Primary400} />}
          btnText="My Orders"
          hasNavigationArrow
        />

        <View style={styles.Divider} />

        <TextBarWithIcon
          handleNavigation={() => {
            handleNavigation('myDetails');
          }}
          icon={
            <UserRoundPen size={FontSizes.size_20} color={Colors.Primary400} />
          }
          btnText="My Details"
          hasNavigationArrow
        />
        <TextBarWithIcon
          handleNavigation={() => {
            handleNavigation('addressBook');
          }}
          icon={<House size={FontSizes.size_20} color={Colors.Primary400} />}
          btnText="Address Book"
          hasNavigationArrow
        />

        <TextBarWithIcon
          handleNavigation={() => {
            handleNavigation('payMethods');
          }}
          icon={
            <CreditCard size={FontSizes.size_20} color={Colors.Primary400} />
          }
          btnText="Payment Methods"
          hasNavigationArrow
        />
        <TextBarWithIcon
          handleNavigation={() => {
            handleNavigation('notifications');
          }}
          icon={<Bell size={FontSizes.size_20} color={Colors.Primary400} />}
          btnText="Notifications"
          hasNavigationArrow
        />

        <View style={styles.Divider} />
        <TextBarWithIcon
          handleNavigation={() => {
            handleNavigation('FAQs');
          }}
          icon={
            <ShieldQuestionMark
              size={FontSizes.size_20}
              color={Colors.Primary400}
            />
          }
          btnText="FAQs"
          hasNavigationArrow
        />
        <TextBarWithIcon
          handleNavigation={() => {
            handleNavigation('helpCenter');
          }}
          icon={<Headset size={FontSizes.size_20} color={Colors.Primary400} />}
          btnText="Help Center"
          hasNavigationArrow
        />

        <TouchableOpacity
          style={styles.logOutBtn}
          onPress={() => {
            setVisible(true);
          }}
        >
          <LogOut size={FontSizes.size_20} color={Colors.BtnDanger} />
          <Text style={styles.logOutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={isVisible}
        setVisible={setVisible}
        setUser={setUser}
        isSuccess={false}
      />
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.spacing_20,
  },
  UserInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.spacing_20,
    gap: Spacing.spacing_10,
  },
  PPStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  logOutBtn: {
    width: '100%',
    gap: Spacing.spacing_14,
    borderColor: Colors.Primary200,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',

    paddingTop: Spacing.spacing_20,
  },
  StackBTN: {
    width: '90%',
    padding: Spacing.spacing_10,
    borderBottomColor: Colors.Primary400,
    // backgroundColor: Colors.Primary200,
    borderBottomWidth: 1,
  },
  logOutText: {
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-Regular',
    color: Colors.BtnDanger,
  },
  Divider: {
    width: '100%',
    height: 2,
    marginBottom: Spacing.spacing_20,
    backgroundColor: Colors.Primary200,
  },
});

// <TouchableOpacity
//   style={styles.StackBTN}
//   onPress={() => {
//     handleNavigation('YourShop');
//   }}
// >
//   <Text> Your Shop</Text>
// </TouchableOpacity>
