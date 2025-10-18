import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  View,
  Dimensions,
} from 'react-native';
import { DateFormatter } from '../../config/date/index.js';
import { Categories } from '../../constants/ConstantData.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShopData, User } from '../../models/Models';
import InputFeild from '../../components/atoms/InputFeild.tsx';
import SelectionComp from '../../components/atoms/SelectionComp.tsx';
import {
  Image,
  Clock7,
  ChevronDown,
  LocateIcon,
  LocateFixedIcon,
} from 'lucide-react-native';
import { Colors, FontSizes, Spacing } from '../../constants/Colors.ts';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

import RBSheet from 'react-native-raw-bottom-sheet';
import SelectList from '../../components/atoms/SelectList.tsx';
import LocationPickerModal from '../../modals/LocationPickerModal.tsx';
import DatePicker from 'react-native-date-picker';

const YourShop = () => {
  const [user, setUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const refRBSheet = useRef<typeof RBSheet>(null);
  const [shopData, setShopData] = useState<Partial<ShopData>>({
    name: '',
    description: '',
    email: '',
    apiToken: '',
    phone: '',
    latitude: 0,
    longitude: 0,
    address: { marker: '', address: '' },
    category: '',
    timeOpen: '',
    timeClose: '',
    shopImage: '',
    shopKeeperImage: '',
    id: '',
    ownerId: '',
  });

  useEffect(() => {
    const getUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        if (parsedUser.shopData && parsedUser.shopData.length > 0) {
          setShopData(parsedUser.shopData[0]);
        }
      }
    };

    getUser();
  }, []);

  const handleAddressChange = (marker: string, address: string) => {
    setShopData(prev => ({
      ...prev,
      address: { marker, address },
    }));
  };
  const PickImageFromGallary = async (key: keyof ShopData) => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 0.8,
    };
    const result = await launchImageLibrary(options);
    if (result.didCancel) {
      console.log('User cancelled image picker');
      return;
    }
    if (result.errorCode) {
      console.log('ImagePicker Error: ', result.errorMessage);
      Alert.alert('Error picking image');
      return;
    }
    if (result.assets && result.assets.length > 0) {
      console.log('Selected image:', result.assets[0].uri);
      setShopData(prev => ({ ...prev, [key]: result.assets[0].uri || '' }));
    }
  };

  const handleChange = (key: keyof ShopData, value: string) => {
    setShopData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!shopData.name || !shopData.description) {
      Alert.alert('Please fill in required fields');
      return;
    }

    console.log('Submitting shop data:', shopData);
    await AsyncStorage.setItem('shopData', JSON.stringify(shopData));
    Alert.alert('Shop data saved!');
  };

  const handleSelectList = (key: keyof ShopData, value: string) => {
    setShopData(prev => ({ ...prev, [key]: value }));
    setSelectedCategory(value);
    refRBSheet.current?.close();
    console.log('Selected value:', value);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user && user.shopData && user.shopData.length > 0 ? (
        <View style={styles.form}>
          <Text style={styles.title}>{shopData.name}</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginVertical: 10 }}>
            <Text>Time Open: {shopData.timeOpen}</Text>
            <Text>Time Close: {shopData.timeClose}</Text>
          </View>
          <Text style={styles.title}>{shopData.address}</Text>
          <Text style={styles.title}>{shopData.phone}</Text>
          <Text>{shopData.description}</Text>
        </View>
      ) : (
        <View style={styles.form}>
          <Text style={styles.title}>Create Your Shop</Text>
          <InputFeild
            value={shopData.name || ''}
            placeholder="Shop Name"
            label="Shop Name"
            onChangeText={text => handleChange('name', text)}
          />
          <InputFeild
            value={shopData.description || ''}
            placeholder="Description"
            label="Description"
            onChangeText={text => handleChange('description', text)}
          />
          <InputFeild
            value={shopData.phone || ''}
            placeholder="Phone"
            label="Phone"
            onChangeText={text => handleChange('phone', text)}
          />
          <InputFeild
            value={shopData.email || ''}
            placeholder="Email"
            label="Email"
            onChangeText={text => handleChange('email', text)}
          />
          <SelectionComp
            label="Location"
            icon={
              <LocateFixedIcon
                color={Colors.Primary400}
                size={FontSizes.size_20}
              />
            }
            placeholder="Select Location"
            onPress={() => {
              setModalVisible(true);
            }}
          />
          <SelectionComp
            label="Category"
            icon={
              <ChevronDown color={Colors.Primary400} size={FontSizes.size_20} />
            }
            placeholder="Category"
            onPress={() => refRBSheet.current?.open()}
          />
          ?
          <SelectionComp
            label="Time Open"
            icon={<Clock7 color={Colors.Primary400} size={FontSizes.size_20} />}
            placeholder={shopData.timeOpen? `Open Time : ${shopData.timeOpen}` : 'Open Time'}
            onPress={() => {
              setCurrentTime('Time Open');
              setOpenDate(true);
            }}
          />
          <SelectionComp
            label="Time Close"
            icon={<Clock7 color={Colors.Primary400} size={FontSizes.size_20} />}
            placeholder={shopData.timeClose? `Close Time : ${shopData.timeClose}` : 'Close Time'}
            onPress={() => {
              setOpenDate(true);
              setCurrentTime('Time Close');
            }}
          />
          <SelectionComp
            label="Shop Image"
            icon={
              <Image
                color={
                  shopData.shopImage === ''
                    ? Colors.Primary400
                    : Colors.BtnSuccess
                }
                size={FontSizes.size_20}
              />
            }
            placeholder="Select Shop Image"
            onPress={() => {
              PickImageFromGallary('shopImage');
            }}
          />
          <SelectionComp
            label="Shop Keeper Image"
            icon={
              <Image
                color={
                  shopData.shopKeeperImage === ''
                    ? Colors.Primary400
                    : Colors.BtnSuccess
                }
                size={FontSizes.size_20}
              />
            }
            placeholder="Update Shop Keeper Image"
            onPress={() => {
              PickImageFromGallary('shopKeeperImage');
            }}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Save Shop</Text>
          </TouchableOpacity>
        </View>
      )}
      <View>
        <RBSheet
          ref={refRBSheet}
          closeOnPressBack={true}
          closeOnPressMask={true}
          height={Dimensions.get('window').height / 2}
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
              list={Categories}
              onPress={(value: string | number) =>
                handleSelectList('category', value.toString())
              }
              selectedValue={selectedCategory}
            />
          </View>
        </RBSheet>
        <LocationPickerModal
          handleChange={(marker: string, address: string) =>
            handleAddressChange(marker, address)
          }
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <DatePicker
          modal
          mode="time"
          open={openDate}
          date={date}
          onConfirm={date => {
            setOpenDate(false);
            if (currentTime === 'Time Open') {
              handleChange(
                'timeOpen',
                DateFormatter(date.getHours() + ':' + date.getMinutes()),
              );
            } else {
              handleChange(
                'timeClose',
                DateFormatter(date.getHours() + ':' + date.getMinutes()),
              );
            }
          }}
          onCancel={() => {
            setOpenDate(false);
          }}
        />
      </View>
    </ScrollView>
  );
};

export default YourShop;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
