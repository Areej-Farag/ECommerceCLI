import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthStackParamList } from '../navigation/AuthStack';
import { Colors, FontSizes, Spacing } from '../constants/Colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigation';
import { SignInWithGoogle } from '../config/firebase/GoogleSignIn';
import { useFetchQuery } from '../Hooks/UseFetchQuery';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputFeild from '../components/atoms/InputFeild';
import GoogleLogo from '../assets/Images/logos_google-icon.png';
import FacebookLogo from '../assets/Images/logos_facebook.png';
type AuthScreenProps = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;
type RootStackProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;
type Props = CompositeScreenProps<AuthScreenProps, RootStackProps>;

type User = {
  email: string;
  password: string;
};

const SignIn = ({ navigation }: Props) => {
  const { data: users } = useFetchQuery('/users', 'users');
  const [user, setUser] = React.useState<User>({ email: '', password: '' });
  const EmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [isEmailValid, setIsEmailValid] = React.useState(true);

  const handleGoogle = async () => {
    try {
      const userInfo = await SignInWithGoogle();
      console.log('Signed in with Google!', userInfo);
      navigation.replace('BottomTaps', { screen: 'Home' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (key: keyof User, value: string) => {
    setUser(prev => ({ ...prev, [key]: value }));
  };

  const isFull =
    user.email.trim().length > 0 && user.password.trim().length > 0;

  const handleSubmit = async () => {
    if (user.email.length > 0 && EmailPattern.test(user.email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
    if (user.password.length > 6) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
    const foundUser = users?.find((u: any) => u.email === user.email);
    if (foundUser) {
      if (foundUser.password === user.password) {
        await AsyncStorage.setItem('user', JSON.stringify(foundUser));
        setUser({ email: '', password: '' });
        navigation.navigate('BottomTaps', { screen: 'Home' });
      } else {
        Alert.alert('Incorrect password');
      }
    } else {
      Alert.alert('User not found');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Log In to your account</Text>
        <Text style={styles.subHeaderText}>It's great to see you again</Text>
      </View>

      <InputFeild
        value={user.email}
        placeholder="Enter your Email"
        label="Email"
        keyBoardType="email-address"
        onChangeText={text => handleChange('email', text)}
        pattern={EmailPattern}
        isValidate={isEmailValid}
        validationMsg="Please enter a valid email address"
      />

      <InputFeild
        value={user.password}
        placeholder="Enter your Password"
        label="Password"
        secureTextEntry={true}
        isValidate={isPasswordValid}
        validationMsg="Password must be longer than 6 characters"
        onChangeText={text => handleChange('password', text)}
      />

      <Text
        style={[
          styles.subHeaderText,
          { marginTop: Spacing.spacing_10, textAlign: 'center' },
        ]}
      >
        Forget Password?{'  '}
        <Text
          style={styles.Hyperlink}
          onPress={() => navigation.navigate('SignUp')}
        >
          Reset Password
        </Text>
      </Text>

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={!isFull}
        style={{ marginBottom: Spacing.spacing_10 }}
      >
        <Text style={isFull ? styles.Btn : styles.BtnDisabled}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <Text style={styles.orText}>Or continue with</Text>
      </View>

      <View>
        <TouchableOpacity
          onPress={handleGoogle}
          style={[styles.Btn, styles.btnGoogle]}
        >
          <Image style={styles.logo} source={GoogleLogo} />
          <Text style={styles.btnText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnGoogle, styles.Btn]}>
          <Image style={styles.logo} source={FacebookLogo} />
          <Text style={[styles.btnText, { color: Colors.Primary100 }]}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <Text
          style={[
            styles.subHeaderText,
            { marginTop: Spacing.spacing_20, textAlign: 'center' },
          ]}
        >
          Don't have an account?{'  '}
          <Text
            style={styles.Hyperlink}
            onPress={() => navigation.navigate('SignUp')}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary100,
    flex: 1,
    padding: Spacing.spacing_20,
  },
  headerText: {
    fontSize: FontSizes.size_28,
    fontFamily: 'OpenSans-SemiBold',
    color: Colors.Primary800,
    marginBottom: Spacing.spacing_10,
  },
  headerContainer: {
    marginBottom: Spacing.spacing_20,
  },
  subHeaderText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: FontSizes.size_16,
    color: Colors.Primary300,
  },
  Hyperlink: {
    color: Colors.Primary800,
    textDecorationLine: 'underline',
    fontFamily: 'OpenSans-Bold',
  },

  Btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.spacing_10,
    backgroundColor: Colors.BtnPrimary,
    padding: Spacing.spacing_14,
    borderRadius: Spacing.spacing_10,
    textAlign: 'center',
    color: Colors.Primary100,
    marginTop: Spacing.spacing_10,
  },
  BtnDisabled: {
    backgroundColor: Colors.Primary400,
    padding: Spacing.spacing_14,
    borderRadius: Spacing.spacing_10,
    textAlign: 'center',
    color: Colors.Primary100,
    marginTop: Spacing.spacing_20,
  },

  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.spacing_28,
    width: '100%',
    backgroundColor: Colors.Primary200,
    height: Spacing.spacing_2,
    position: 'relative',
  },
  orText: {
    fontFamily: 'OpenSans-SemiBold',
    position: 'absolute',
    fontSize: FontSizes.size_16,
    color: Colors.Primary500,
    top: -10,
    backgroundColor: Colors.Primary100,
  },
  btnGoogle: {
    backgroundColor: Colors.Primary100,
    color: Colors.Primary800,
    borderColor: Colors.Primary400,
    borderWidth: 1,
  },
  btnText: {
    fontFamily: 'OpenSans-SemiBold',
  },
  btnApple: {
    backgroundColor: Colors.Primary800,
    color: Colors.Primary100,
  },
  GoogleBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 30,
    height: 30,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: Spacing.spacing_20,
  },
});
