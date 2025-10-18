import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TextBarWithIcon from '../../components/atoms/TextBarWithIcon';
import Header from '../../components/Header';

const NotificationsSettings = () => {
  return (
    <View>
      <Header title="Notifications" />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TextBarWithIcon hasSwitch btnText=" General Notifications" />
        <TextBarWithIcon hasSwitch btnText=" Sounds" />
        <TextBarWithIcon hasSwitch btnText=" Vibration" />
        <TextBarWithIcon hasSwitch btnText=" Payment " />
        <TextBarWithIcon hasSwitch btnText=" Special Offers" />
        <TextBarWithIcon hasSwitch btnText=" Promo & Discount" />
        <TextBarWithIcon hasSwitch btnText=" Cashback" />
        <TextBarWithIcon hasSwitch btnText=" App Updates" />
        <TextBarWithIcon hasSwitch btnText="New Services Available" />
        <TextBarWithIcon hasSwitch btnText="New Tips Available" />
      </ScrollView>
    </View>
  );
};

export default NotificationsSettings;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 20,
  },
});
