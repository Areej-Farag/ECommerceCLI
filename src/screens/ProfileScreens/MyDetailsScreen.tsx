import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import InputFeild from '../../components/atoms/InputFeild';
import Header from '../../components/Header';
import DatePicker from 'react-native-date-picker';
import SelectionComp from '../../components/atoms/SelectionComp';
import { ArrowDown, Calendar, ChevronDown } from 'lucide-react-native';
import { Colors, Spacing } from '../../constants/Colors';
import SelectList from '../../components/atoms/SelectList';
import RBSheet from 'react-native-raw-bottom-sheet';

const MyDetailsScreen = () => {
  const refRBSheet = React.useRef<typeof RBSheet>(null);
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [openDate, setOpenDate] = React.useState(false);
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const handleSelectList = value => {
    setGender(value);
    refRBSheet.current?.close();
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
        />

        <InputFeild
          value={email}
          onChangeText={setEmail}
          placeholder="Email Address"
          label="Email Address"
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
        />
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
});
