import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import InputFeild from '../../components/atoms/InputFeild';
import { Colors, FontSizes } from '../../constants/Colors';
import Modal from '../../components/Modal';

const NewCard = () => {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [cvv, setCVV] = React.useState('');

  const disabled =
    cardNumber.length < 16 || expiryDate.length < 4 || cvv.length < 3;
  return (
    <View>
      <Header title="New Card" />

      <View style={styles.container}>
        <Text style={styles.title}> Add Debit or Credit Card</Text>
        <InputFeild
          label="Card Number"
          placeholder="Enter Your Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        <View style={styles.smallInputContainer}>
          <View style={styles.inputContainer}>
            <InputFeild
              label="Expiry Date"
              placeholder="MM/YY"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
          </View>
          <View style={styles.inputContainer}>
            <InputFeild
              label="Security Code"
              placeholder="CVV"
              value={cvv}
              onChangeText={setCVV}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        disabled={disabled}
        style={[styles.btn, disabled && { backgroundColor: Colors.Primary600 }]}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.btnText}>Add Card</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        setVisible={() => {
          setModalVisible(false);
        }}
        isSuccess
        subText="Card Added Successfully"
        btnText="Thanks"
      />
    </View>
  );
};

export default NewCard;

const styles = StyleSheet.create({
  container: {
    padding: 20,

    // alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 20,
  },
  smallInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '48%',
  },
  btn: {
    borderRadius: 10,
    width: '90%',
    backgroundColor: Colors.Primary900,
    padding: 20,
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop: 20,
  },
  btnText: {
    color: Colors.Primary100,
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-Bold',
  },
});
