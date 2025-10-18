import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthStackParamList } from '../navigation/AuthStack';
import { Colors, FontSizes, Spacing } from '../constants/Colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigation';
import { SignInWithGoogle } from '../config/firebase/GoogleSignIn';
import { useFetchQuery } from '../Hooks/UseFetchQuery';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputFeild from '../components/atoms/InputFeild';

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
    if (user.password.length > 6 && user.email.length > 0) {
      const foundUser = users?.find((u: any) => u.email === user.email);

      if (foundUser) {
        if (foundUser.password === user.password) {
          await AsyncStorage.setItem('user', JSON.stringify(foundUser));
          setUser({ email: '', password: '' });
          navigation.navigate('BottomTaps', { screen: 'Home' });
        } else {
          Alert.alert('Wrong Password');
        }
      } else {
        Alert.alert('User not found');
      }
    } else {
      Alert.alert('Please fill all the fields');
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
      />

      <InputFeild
        value={user.password}
        placeholder="Enter your Password"
        label="Password"
        secureTextEntry={true}
        onChangeText={text => handleChange('password', text)}
      />

      <Text
        style={[
          styles.subHeaderText,
          { marginTop: Spacing.spacing_20, textAlign: 'center' },
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

      <TouchableOpacity onPress={handleSubmit} disabled={!isFull}>
        <Text style={isFull ? styles.Btn : styles.BtnDisabled}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <Text style={styles.orText}>Or continue with</Text>
      </View>

      <View>
        <TouchableOpacity onPress={handleGoogle}>
          <Text style={[styles.Btn, styles.btnGoogle]}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={[styles.Btn, styles.btnApple]}>Continue with Apple</Text>
        </TouchableOpacity>
      </View>

      <View>
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
    fontSize: FontSizes.size_30,
    fontWeight: 'bold',
    color: Colors.Primary800,
    marginBottom: Spacing.spacing_10,
  },
  headerContainer: {
    marginBottom: Spacing.spacing_20,
  },
  subHeaderText: {
    fontSize: FontSizes.size_16,
    color: Colors.Primary300,
  },
  Hyperlink: {
    color: Colors.Primary800,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },

  Btn: {
    backgroundColor: Colors.BtnPrimary,
    padding: Spacing.spacing_14,
    borderRadius: Spacing.spacing_10,
    textAlign: 'center',
    color: Colors.Primary100,
    marginTop: Spacing.spacing_20,
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
    marginVertical: Spacing.spacing_20,
    width: '100%',
    backgroundColor: Colors.Primary200,
    height: Spacing.spacing_2,
    position: 'relative',
  },
  orText: {
    position: 'absolute',
    // paddingHorizontal: Spacing.spacing_10,
    fontSize: FontSizes.size_16,
    color: Colors.Primary500,
    top: -10,
    // right: '50%',
    // left: '50%',
    backgroundColor: Colors.Primary100,
  },
  btnGoogle: {
    backgroundColor: Colors.Primary100,
    color: Colors.Primary800,
    borderColor: Colors.Primary400,
    borderWidth: 1,
  },
  btnApple: {
    backgroundColor: Colors.Primary800,
    color: Colors.Primary100,
  },
});
