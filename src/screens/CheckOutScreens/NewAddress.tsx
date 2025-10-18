import {
  Dimensions,
  Modal as RNModal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';
import { X } from 'lucide-react-native';
import Geocoder from 'react-native-geocoding';

import InputFeild from '../../components/atoms/InputFeild';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';

const AddressBookScreen = () => {
  const navigation = useNavigation();
  const mapRef = React.useRef<MapView | null>(null);
  const [mapVisible, setMapVisible] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [marker, setMarker] = useState();
  const [address, setAddress] = useState('');
  const [addressNickname, setAddressNickname] = useState('');
  Geocoder.init('AIzaSyALHC-aH0nzwDV-0RPq_OEUkHjj58fWebg');
  useEffect(() => {
    if (marker !== undefined) {
      Geocoder.from(marker).then(data => {
        let resultAddress = data.results[0].formatted_address;
        setAddress(resultAddress);
        console.log(resultAddress);
        refRBSheet.current?.open();
      });
    }
  }, [marker]);
  const disabled = address.length < 1 || addressNickname.length < 1;
  return (
    <View>
      <Header title="New Address" />
      <RNModal visible={mapVisible} animationType="slide" transparent={false}>
        <View style={styles.container}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            onPress={event => {
              setMarker(event.nativeEvent.coordinate);
            }}
          >
            {marker && <Marker coordinate={marker} />}
          </MapView>
        </View>
        <View style={styles.Lowercontainer}>
          <View
            style={{
              height: 3,
              width: 48,
              backgroundColor: Colors.Primary300,
              alignSelf: 'center',
            }}
          />
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Address</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <X size={FontSizes.size_24} color={Colors.Primary300} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <InputFeild
                value={addressNickname}
                placeholder="Address Nickname"
                label="Address Nickname"
                onChangeText={setAddressNickname}
              />
              <InputFeild
                value={address}
                placeholder="Full Address"
                label="Full Address"
                onChangeText={setAddress}
              />
            </View>
            <TouchableOpacity
              style={[styles.btn, { opacity: disabled ? 0.5 : 1 }]}
              disabled={disabled}
              onPress={() => {
                setSuccessModal(true);
              }}
            >
              <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RNModal>
      <Modal
        setVisible={setSuccessModal}
        isVisible={successModal}
        isSuccess
        btnText="Thanks"
        subText="Location Added SuccessfYour new address has been added."
      />
    </View>
  );
};

export default AddressBookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Lowercontainer: {
    height: Dimensions.get('screen').height / 2.3,
    justifyContent: 'flex-start',
    paddingVertical: Spacing.spacing_10,

    paddingHorizontal: Spacing.spacing_20,
    borderTopLeftRadius: Spacing.spacing_28,
    borderTopRightRadius: Spacing.spacing_28,
    backgroundColor: '#f0f0f0ff',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  Location: {
    padding: Spacing.spacing_14,
    position: 'absolute',
    top: Spacing.spacing_20,
    zIndex: 1,
    backgroundColor: Colors.Primary100,
    width: '90%',
    right: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Spacing.spacing_20,

    // marginHorizontal: Spacing.spacing_20,
  },
  LocationTitle: {
    fontSize: FontSizes.size_18,
    // fontWeight: 'bold',
  },
  LocationText: {
    fontSize: FontSizes.size_14,
    color: Colors.Primary300,
    // fontWeight: 'bold',
  },
  btn: {
    backgroundColor: Colors.Primary800,
    padding: Spacing.spacing_14,
    borderRadius: Spacing.spacing_10,
  },
  btnText: {
    color: Colors.Primary100,
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
  },
  modalContainer: {
    marginTop: Spacing.spacing_10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.spacing_10,
    borderBottomColor: Colors.Primary300,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: FontSizes.size_20,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: Spacing.spacing_16,
    gap: Spacing.spacing_4,
  },
});
