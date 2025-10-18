import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import TextBarWithRadio from '../../components/TextBarWithRadio';
import Header from '../../components/Header';
import { MapPin, Plus } from 'lucide-react-native';
import { Colors, Spacing } from '../../constants/Colors';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/ProfileStack';
import { RootStackParamList } from '../../navigation/RootNavigation';

type ProfileProps = NativeStackNavigationProp<
  ProfileStackParamList,
  'addressBook'
>;
type RootProps = NativeStackNavigationProp<RootStackParamList, 'CheckoutStack'>;

type Props = CompositeNavigationProp<ProfileProps, RootProps>;

const AddressBookScreen = () => {
  const navigation = useNavigation<Props>();
  const values = ['Home', 'Office', 'Apartment', 'Parents Home'];
  const [selectedValue, setSelectedValue] = React.useState(values[0]);
  return (
    <View>
      <Header title="Address" />
      <View style={styles.container}>
        {values.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedValue(item)}>
            <TextBarWithRadio
              key={index}
              item={item}
              subTitle="123 Main Street, New York, NY"
              title={item}
              icon={<MapPin size={24} color={Colors.Primary600} />}
              selectedValue={selectedValue}
              index={index}
            />
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.addCard}
          onPress={() =>
            navigation.navigate('CheckoutStack', { screen: 'newAddress' })
          }
        >
          <Plus size={24} color={Colors.Primary600} />
          <Text>Add New Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressBookScreen;

const styles = StyleSheet.create({
  container: {
    padding: Spacing.spacing_20,
  },
  addCard: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: Spacing.spacing_8,
    justifyContent: 'center',
    paddingVertical: Spacing.spacing_14,
    paddingHorizontal: Spacing.spacing_20,
    borderWidth: 1,
    borderColor: Colors.Primary300,
    borderRadius: Spacing.spacing_10,
    marginTop: Spacing.spacing_20,
  },
});
