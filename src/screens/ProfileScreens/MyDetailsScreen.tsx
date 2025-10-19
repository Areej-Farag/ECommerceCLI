import {
  Dimensions,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import InputFeild from '../../components/atoms/InputFeild';
import Header from '../../components/Header';
import DatePicker from 'react-native-date-picker';
import SelectionComp from '../../components/atoms/SelectionComp';
import { Calendar, ChevronDown } from 'lucide-react-native';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';
import SelectList from '../../components/atoms/SelectList';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../models/Models';

const MyDetailsScreen = ({ navigation }) => {
  const [user, setUser] = React.useState<User | null>({});
  const refRBSheet = React.useRef<typeof RBSheet>(null);
  const [fullName, setFullName] = React.useState(user?.fullname || '');
  const [email, setEmail] = React.useState(user?.email || '');
  const [date, setDate] = React.useState(new Date());
  const [openDate, setOpenDate] = React.useState(false);
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [isPhoneValid, setIsPhoneValid] = React.useState(true);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isNameValid, setIsNameValid] = React.useState(true);

  const handleSelectList = value => {
    setGender(value);
    refRBSheet.current?.close();
  };
  useEffect(() => {
    const getUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    getUser();
  }, []);
  const handleSave = () => {
    if (fullName.length === 0) {
      setIsNameValid(false);
    }
    if (email.length === 0) {
      setIsEmailValid(false);
    }
    if (phone.length === 0) {
      setIsPhoneValid(false);
    }
    if (
      fullName.length > 0 &&
      email.length > 0 &&
      phone.length > 0 &&
      isNameValid &&
      isEmailValid &&
      isPhoneValid
    ) {
      navigation.goBack();
    }
  };

  return (
    <View>
      <Header title="My Details" />
      <View style={styles.container}>
        <InputFeild
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name"
          label="Full Name"
          isValidate={isNameValid}
          validationMsg="Full Name is required"
        />

        <InputFeild
          value={email}
          onChangeText={setEmail}
          placeholder="Email Address"
          label="Email Address"
          isValidate={isEmailValid}
          validationMsg="Email is required"
        />
        <SelectionComp
          label="Date of Birth"
          placeholder={dateOfBirth ? dateOfBirth : 'Select Date'}
          onPress={() => setOpenDate(true)}
          icon={<Calendar size={24} color={Colors.Primary600} />}
        />
        <SelectionComp
          label="Gender"
          placeholder={gender ? gender : 'Select Gender'}
          onPress={() => {
            refRBSheet.current?.open();
          }}
          icon={<ChevronDown size={24} color={Colors.Primary700} />}
        />
        <InputFeild
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone Number"
          label="Phone Number"
          isValidate={isPhoneValid}
          validationMsg="Phone Number is required"
        />

        <TouchableOpacity onPress={handleSave}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>

      <DatePicker
        modal
        mode="date"
        open={openDate}
        date={date}
        onConfirm={(date: any) => {
          setOpenDate(false);
          setDate(date);
          setDateOfBirth(date.toTimeString());
        }}
        onCancel={() => {
          setOpenDate(false);
        }}
      />

      <RBSheet
        ref={refRBSheet}
        closeOnPressBack={true}
        closeOnPressMask={true}
        height={Dimensions.get('window').height / 3}
        customStyles={{
          container: {
            paddingVertical: Spacing.spacing_20,
            paddingHorizontal: Spacing.spacing_20,
            borderTopLeftRadius: Spacing.spacing_28,
            borderTopRightRadius: Spacing.spacing_28,
            backgroundColor: Colors.Primary100,
          },
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
      >
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <SelectList
            title="Select Gender"
            list={['Male ', 'Female', 'Other']}
            onPress={item => {
              handleSelectList(item);
            }}
            selectedValue={gender}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default MyDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  buttonText: {
    color: Colors.Primary100,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: FontSizes.size_16,
  },
  button: {
    backgroundColor: Colors.Primary900,
    padding: Spacing.spacing_10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
});
