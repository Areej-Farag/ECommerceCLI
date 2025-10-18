import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TextBarWithIcon from '../../components/atoms/TextBarWithIcon';
import Header from '../../components/Header';
import {
  CreditCard,
  Facebook,
  FacebookIcon,
  Headset,
  Instagram,
  MessageCircleCode,
  Twitter,
} from 'lucide-react-native';
import { Colors, Spacing } from '../../constants/Colors';

const HelpCenterScreen = () => {
  return (
    <View>
      <Header title="Help Center" />
      <View style={styles.container}>
        <TextBarWithIcon
          icon={<Headset size={24} color={Colors.Primary600} />}
          handleNavigation={() => {}}
          hasNavigationArrow={false}
          btnText="Help Center"
        />
        <TextBarWithIcon
          icon={<CreditCard size={24} color={Colors.Primary600} />}
          handleNavigation={() => {}}
          hasNavigationArrow={false}
          btnText="Website"
        />
        <TextBarWithIcon
          icon={<Facebook size={24} color={Colors.Primary600} />}
          handleNavigation={() => {}}
          hasNavigationArrow={false}
          btnText="Facebook"
        />
        <TextBarWithIcon
          icon={<Twitter size={24} color={Colors.Primary600} />}
          handleNavigation={() => {}}
          hasNavigationArrow={false}
          btnText="Twitter"
        />
        <TextBarWithIcon
          icon={<Instagram size={24} color={Colors.Primary600} />}
          handleNavigation={() => {}}
          hasNavigationArrow={false}
          btnText="Instagram"
        />
        <TextBarWithIcon
          icon={<MessageCircleCode size={24} color={Colors.Primary600} />}
          handleNavigation={() => {}}
          hasNavigationArrow={false}
          btnText="Whatsapp"
        />
      </View>
    </View>
  );
};

export default HelpCenterScreen;

const styles = StyleSheet.create({
  container: {
    padding: Spacing.spacing_24,
  },
});
