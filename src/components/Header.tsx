import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { ArrowLeft, Bell } from 'lucide-react-native';
import { Colors, FontSizes, Spacing } from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigation';

type Props = {
  title?: string;
  isHome?: boolean;
};
type AuthNav = NativeStackNavigationProp<RootStackParamList, 'BottomTaps'>;
const Header = ({ title = '', isHome = false }: Props) => {
  const navigation = useNavigation<AuthNav>();
  return (
    <>
      {isHome ? (
        <View style={styles.headerContainer}>
          <Text style={styles.titleHome}>{title}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notifications');
            }}
          >
            <Bell size={24} color={Colors.Primary800} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.headerContainer}>
          <ArrowLeft
            size={24}
            color={Colors.Primary800}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.title}>{title}</Text>
          <Bell size={24} color={Colors.Primary800} />
        </View>
      )}
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.spacing_20,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: FontSizes.size_20,
    color: Colors.Primary800,
  },
  titleHome: {
    fontFamily: 'OpenSans-Bold',
    fontSize: FontSizes.size_28,
    color: Colors.Primary800,
  },
});
