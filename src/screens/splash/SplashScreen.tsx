import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SplashScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Splash'>>();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log('Error reading user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        navigation.navigate('BottomTaps', { screen: 'Home' });
      } else {
        navigation.navigate('Auth', { screen: 'SignIn' });
      }
    }, 1500);
  }, [user, navigation]);

  return (
    <ImageBackground
      source={require('../../assets/Images/Element.png')}
      style={[styles.ImageBackground, { backgroundColor: '#fff' }]}
      resizeMode="cover"
    >
      <ImageBackground
        source={require('../../assets/Images/imageSplash.png')}
        style={[styles.ImageBackground, { marginTop: 100 }]}
      ></ImageBackground>
      <View style={styles.floatingView}>
        <Text style={styles.title}>Descover Your </Text>
        <Text style={[styles.title, { marginHorizontal: 100 }]}>Own Style</Text>
      </View>

      <TouchableOpacity style={styles.floatingBTN}>
        <Text style={[styles.btntitle]}>Shop Now</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
  },
  title: {
    fontSize: FontSizes.size_30,
    fontWeight: 'bold',
    color: Colors.Primary800,
    width: '100%',
    textShadowColor: '#00000074',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  floatingView: {
    position: 'absolute',
    top: 0,
    padding: Spacing.spacing_20,
    backgroundColor: 'transparent',
  },
  floatingBTN: {
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    padding: Spacing.spacing_20,
    width: '90%',
    backgroundColor: Colors.Primary800,
    borderRadius: 20,
    marginVertical: Spacing.spacing_20,
    marginHorizontal: Spacing.spacing_20,
  },
  btntitle: {
    fontSize: FontSizes.size_18,
    fontWeight: 'bold',
    color: Colors.Primary100,
    textAlign: 'center',
  },
});
