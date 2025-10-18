import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import { Plus } from 'lucide-react-native';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';
import RadioBtn from '../../components/atoms/RadioBtn';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { CheckoutStackParamList } from '../../navigation/CheckoutStack';
import { RootStackParamList } from '../../navigation/RootNavigation';
import { CompositeNavigationProp } from '@react-navigation/native';

type Props = CompositeNavigationProp<
  NativeStackNavigationProp<CheckoutStackParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

const PayMentMethods = () => {
  const navigation = useNavigation<Props>();

  return (
    <View>
      <Header title="Payment Methods" />
      <View style={styles.container}>
        <Text style={styles.title}> Saved Cards</Text>
        <View>
          <RadioBtn values={['Visa', 'Master Card']} />
        </View>
        <TouchableOpacity
          style={styles.addCard}
          onPress={() => {
            navigation.navigate('CheckoutStack', {
              screen: 'newCard',
            });
          }}
        >
          <Plus size={24} color={Colors.Primary600} />
          <Text style={styles.addText}> Add New Card Method</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PayMentMethods;

const styles = StyleSheet.create({
  container: {
    padding: Spacing.spacing_20,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.size_20,
    fontFamily: 'OpenSans-Bold',
    marginBottom: Spacing.spacing_20,
    alignSelf: 'flex-start',
  },
  addCard: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.spacing_8,
    justifyContent: 'center',
    paddingVertical: Spacing.spacing_10,
    paddingHorizontal: Spacing.spacing_20,
    borderWidth: 1,
    borderColor: Colors.Primary200,
    borderRadius: Spacing.spacing_10,
    marginTop: Spacing.spacing_20,
  },
  addText: {
    fontSize: FontSizes.size_16,
    color: Colors.Primary600,
    fontFamily: 'OpenSans-SemiBold',
  },
});
