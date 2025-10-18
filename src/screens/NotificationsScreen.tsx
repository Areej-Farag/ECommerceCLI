import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import { Spacing } from '../constants/Colors';
import NotificationsContainer from '../components/NotificationsContainer';
import { notificationsData } from '../constants/ConstantData';
import NotFoundCompnent from '../components/NotFoundCompnent';
const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Notifications" />
      {notificationsData.length > 0 ? (
        <ScrollView style={styles.NotificationsContainer}>
          <NotificationsContainer notifications={notificationsData} />
        </ScrollView>
      ) : (
        <NotFoundCompnent
          title="You haven’t gotten any notifications yet!"
          description="We’ll alert you when something cool happens."
          image="../assets/Images/Bell-duotone.png"
        />
      )}
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.spacing_10,
  },
  NotificationsContainer: {
    marginVertical: Spacing.spacing_10,
    padding: Spacing.spacing_16,
  },
  NoNotificationsContainer: {
    flex: 0.8,
  },
});
