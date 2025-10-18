import {
  StyleSheet,
  Text,
  View,
  Modal as RNModal,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import { Colors, FontSizes, Spacing } from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../models/Models';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigation';

type props = {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isSuccess: boolean;
  subText?: string;
  btnText?: string;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
};

type AuthNav = NativeStackNavigationProp<RootStackParamList, 'Auth'>;
const Modal = ({
  isVisible,
  setVisible,
  isSuccess,
  subText,
  btnText,
  setUser,
}: props) => {
  const navigation = useNavigation<AuthNav>();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      setVisible(false);
      navigation.navigate('Auth', { screen: 'SignIn' });
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };
  return (
    <>
      {isSuccess ? (
        <RNModal
          visible={isVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setVisible(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.modalBox}>
              <Image
                source={require('../assets/Images/success.png')}
                style={styles.image}
              />

              <Text style={styles.title}>Congratulations!</Text>
              <Text style={styles.subText}>{subText}</Text>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: Colors.BtnSuccess }]}
                onPress={() => setVisible(false)}
              >
                <Text style={[styles.BtnText, { color: Colors.Primary100 }]}>
                  {btnText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </RNModal>
      ) : (
        <RNModal
          visible={isVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setVisible(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.modalBox}>
              <Image
                source={require('../assets/Images/danger.png')}
                style={styles.image}
              />

              <Text style={styles.title}>Log Out?</Text>
              <Text style={styles.subText}>
                Are you sure you want to log out?
              </Text>

              <TouchableOpacity
                onPress={handleLogout}
                style={[styles.button, { backgroundColor: Colors.BtnDanger }]}
              >
                <Text style={[styles.BtnText, { color: Colors.Primary100 }]}>
                  Yes, Log Out
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={[
                  styles.button,
                  { borderWidth: 1, borderColor: Colors.Primary400 },
                ]}
              >
                <Text style={[styles.BtnText, { color: Colors.Primary400 }]}>
                  No, Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </RNModal>
      )}
    </>
  );
};

export default Modal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // خلفية شفافة
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: Colors.Primary100,
    width: Dimensions.get('window').width - 60,
    borderRadius: 20,
    padding: Spacing.spacing_20,
    alignItems: 'center',
    elevation: 5,
  },
  image: {
    // width: 80,
    // height: 80,
    marginBottom: Spacing.spacing_10,
  },
  title: {
    fontSize: FontSizes.size_28,
    fontFamily: 'OpenSans-Bold',
    marginTop: Spacing.spacing_20,
  },
  subText: {
    fontSize: FontSizes.size_16,
    marginVertical: Spacing.spacing_10,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    width: '70%',
    borderColor: Colors.Primary400,
    padding: Spacing.spacing_10,
    marginTop: Spacing.spacing_20,
    borderRadius: Spacing.spacing_10,
  },
  BtnText: {
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-SemiBold',
  },
});
