import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, FontSizes, Spacing } from '../constants/Colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthStack';
import { useNavigation } from '@react-navigation/native';
import { usePostQuery } from '../Hooks/UseMutateQuery';
import { useFetchQuery } from '../Hooks/UseFetchQuery';

const SignUp = () => {
  const [password, setPassword] = React.useState('');
  const [fullname, setFullname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList, 'SignUp'>>();

  const { data: users } = useFetchQuery('/users', 'users');

  const { mutate: addUser } = usePostQuery('/users', 'users');

  const isFull = fullname.length > 0 && password.length > 0 && email.length > 0;

  const handleSubmit = () => {
    if (password.length <= 6) {
      Alert.alert('Password must be longer than 6 characters');
      return;
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
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Create an account</Text>
        <Text style={styles.subHeaderText}>Let's create your account</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>FullName</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your fullname"
          placeholderTextColor={Colors.Primary400}
          value={fullname}
          onChangeText={setFullname}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          keyboardType="email-address"
          placeholderTextColor={Colors.Primary400}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Enter your Password"
          placeholderTextColor={Colors.Primary400}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Text style={styles.subHeaderText}>
        By signing up you agree to our <Text style={styles.Hyperlink}>Terms</Text>,{' '}
        <Text style={styles.Hyperlink}>Privacy Policy</Text>, and{' '}
        <Text style={styles.Hyperlink}>Cookie Use</Text>
      </Text>

      <TouchableOpacity onPress={handleSubmit} disabled={!isFull}>
        <Text style={isFull ? styles.Btn : styles.BtnDisabled}>Create an account</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <Text style={styles.orText}>Or continue with</Text>
      </View>

      <View>
        <TouchableOpacity>
          <Text style={[styles.Btn, styles.btnGoogle]}>Continue with Google</Text>
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
        padding: Spacing.spacing_20
    },
    headerText:{
        fontSize:FontSizes.size_30,
        fontWeight: 'bold',
        color: Colors.Primary800,
        marginBottom: Spacing.spacing_10
    },
    headerContainer:{
        marginBottom: Spacing.spacing_20
    },
    subHeaderText:{
        fontSize: FontSizes.size_16,
        color: Colors.Primary300
    },
    inputContainer:{
        marginBottom: Spacing.spacing_20
    },
    label:{
        fontSize: FontSizes.size_16,
        color: Colors.Primary500, 
        marginBottom: Spacing.spacing_4
    },
    Hyperlink:{
        color: Colors.Primary800,
        textDecorationLine: 'underline',
        fontWeight: 'bold'

    },
    input:{
        borderWidth: 1,
        borderColor: Colors.Primary400,
        borderRadius: Spacing.spacing_10,
        padding: Spacing.spacing_10,
        height: Spacing.spacing_20*2.3
    },
    Btn:{
        backgroundColor: Colors.BtnPrimary,
        padding: Spacing.spacing_14,
        borderRadius: Spacing.spacing_10,
        textAlign: 'center',
        color: Colors.Primary100,
        marginTop: Spacing.spacing_20
    },
    BtnDisabled:{
        backgroundColor: Colors.Primary400,
       padding: Spacing.spacing_14,
        borderRadius: Spacing.spacing_10,
        textAlign: 'center',
        color: Colors.Primary100,
        marginTop: Spacing.spacing_20
    },
   
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Spacing.spacing_20,
        width: '100%',
        backgroundColor: Colors.Primary200,
        height: Spacing.spacing_2,
        position: 'relative'
    },
    orText: {
        position: 'absolute',
        // paddingHorizontal: Spacing.spacing_10,
        fontSize: FontSizes.size_16,
        color: Colors.Primary500,
        top: -10,
        // right: '50%',
        // left: '50%',
        backgroundColor: Colors.Primary100
    },
    btnGoogle: {
        backgroundColor: Colors.Primary100,
        color: Colors.Primary800,
        borderColor: Colors.Primary400,
        borderWidth: 1, 
    }, btnApple:{
        backgroundColor: Colors.Primary800,
        color: Colors.Primary100,

    }
  
})