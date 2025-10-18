import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Colors, FontSizes, Spacing } from '../constants/Colors';
import { X } from 'lucide-react-native';
import Geocoder from 'react-native-geocoding';
import { ShopData } from '../models/Models';
type Props = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (key: keyof ShopData, value: string) => void ;

};
const LocationPickerModal = ({
  modalVisible,
  setModalVisible,
  handleChange,
}: Props) => {
  const mapRef = React.useRef<MapView | null>(null);
  const [marker, setMarker] = useState();
  const [address, setAddress] = useState('');
  Geocoder.init('AIzaSyALHC-aH0nzwDV-0RPq_OEUkHjj58fWebg');
  useEffect(() => {
    if (marker !== undefined) {
      Geocoder.from(marker).then(data => {
        let resultAddress = data.results[0].formatted_address;
        setAddress(resultAddress);
        console.log(resultAddress);
      });
    }
  }, [marker]);
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={false}>
      <View style={styles.Location}>
        <View>
          <Text style={styles.LocationTitle}>Pick a location</Text>
          <Text style={styles.LocationText}>{address}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <X size={FontSizes.size_24} color={Colors.BtnDanger} />
        </TouchableOpacity>
      </View>
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
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (marker !== undefined) {
              handleChange(marker, address);
              setModalVisible(false);
            }
          }}
        >
          <Text style={styles.btnText}>Confirm Address</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default LocationPickerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    position: 'absolute',
    bottom: Spacing.spacing_20,
    backgroundColor: Colors.Primary800,
    right: Dimensions.get('screen').width / 2 - 70,
    padding: Spacing.spacing_14,
    borderRadius: Spacing.spacing_10,
  },
  btnText: {
    color: Colors.Primary100,
    fontSize: FontSizes.size_16,
    fontWeight: 'bold',
  },
});
