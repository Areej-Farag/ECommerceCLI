import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Colors, FontSizes, Spacing } from '../constants/Colors';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { usePostQuery } from '../Hooks/UseMutateQuery';
import { useFetchQuery } from '../Hooks/UseFetchQuery';
import InputFeild from '../components/atoms/InputFeild';
import GoogleLogo from '../assets/Images/logos_google-icon.png';
import FacebookLogo from '../assets/Images/logos_facebook.png';
import { SignInWithGoogle } from '../config/firebase/GoogleSignIn';
import { RootStackParamList } from '../navigation/RootNavigation';
type AuthScreenProps = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;
type RootStackProps = NativeStackScreenProps<RootStackParamList>;

type Props = CompositeScreenProps<AuthScreenProps, RootStackProps>;
const SignUp = () => {
  const [password, setPassword] = React.useState('');
  const [fullname, setFullname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const navigation = useNavigation<Props>();
  const EmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isFullNameValid, setIsFullNameValid] = React.useState(true);
  const { data: users } = useFetchQuery('/users', 'users');
  const { mutate: addUser } = usePostQuery('/users', 'users');
  const isFull = fullname.length > 0 && password.length > 0 && email.length > 0;
  const handleGoogle = async () => {
    try {
      const userInfo = await SignInWithGoogle();
      console.log('Signed in with Google!', userInfo);
      navigation.navigation.replace('BottomTaps', { screen: 'Home' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (password.length <= 6) {
      setIsPasswordValid(false);
      // Alert.alert('Password must be longer than 6 characters');
      return;
    } else {
      setIsPasswordValid(true);
    }

    if (!EmailPattern.test(email)) {
      setIsEmailValid(false);
      // Alert.alert('Please enter a valid email address');
      return;
    } else {
      setIsEmailValid(true);
    }

    if (fullname.length <= 0) {
      setIsFullNameValid(false);
      // Alert.alert('Please enter your fullname');
      return;
    } else {
      setIsFullNameValid(true);
    }

    const foundUser = users?.find((user: any) => user.email === email);
    if (foundUser) {
      Alert.alert('User already exists');
      return;
    }

    addUser(
      { fullname, email, password },
      {
        onSuccess: () => {
          Alert.alert('Account created successfully');
          navigation.navigate('SignIn');
          setEmail('');
          setPassword('');
          setFullname('');
        },
        onError: (err: any) => {
          Alert.alert('Error creating user', err.message);
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Create an account</Text>
        <Text style={styles.subHeaderText}>Let's create your account</Text>
      </View>

      <InputFeild
        placeholder="Enter your fullname"
        value={fullname}
        onChangeText={setFullname}
        label="FullName"
        isValidate={isFullNameValid}
        validationMsg="Please enter your fullname"
      />

      <InputFeild
        placeholder="Enter your Email"
        keyBoardType="email-address"
        label="Email"
        isValidate={isEmailValid}
        validationMsg="Please enter a valid email address"
        value={email}
        onChangeText={setEmail}
      />

      <InputFeild
        label="Password"
        secureTextEntry
        placeholder="Enter your Password"
        isValidate={isPasswordValid}
        validationMsg="Password must be longer than 6 characters"
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.subHeaderText}>
        By signing up you agree to our{' '}
        <Text style={styles.Hyperlink}>Terms</Text>,{' '}
        <Text style={styles.Hyperlink}>Privacy Policy</Text>, and{' '}
        <Text style={styles.Hyperlink}>Cookie Use</Text>
      </Text>

      <TouchableOpacity onPress={handleSubmit} disabled={!isFull}>
        <Text
          style={[styles.btnText, isFull ? styles.Btn : styles.BtnDisabled]}
        >
          Create an account
        </Text>
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

      <View>
        <Text
          style={[
            styles.subHeaderText,
            { marginTop: Spacing.spacing_20, textAlign: 'center' },
          ]}
        >
          Already have an account?{' '}
          <Text
            style={styles.Hyperlink}
            onPress={() => navigation.navigate('SignIn')}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;

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
    marginBottom: Spacing.spacing_8,
  },
  headerContainer: {
    marginBottom: Spacing.spacing_16,
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
    marginVertical: Spacing.spacing_20,
    width: '100%',
    backgroundColor: Colors.Primary200,
    height: Spacing.spacing_2,
    position: 'relative',
  },
  orText: {
    fontFamily: 'OpenSans-Bold',
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
  btnText: {
    fontFamily: 'OpenSans-SemiBold',
  },
});
