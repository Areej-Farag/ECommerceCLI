import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import NotificationItem from './atoms/NotificationItem';
import { Notifications } from '../models/Models';
import { Colors, FontSizes, Spacing } from '../constants/Colors';
type Props = {
  notifications: Notifications[];
};

const NotificationsContainer = ({ notifications }: Props) => {
  console.log(new Date().toDateString());
  return (
    <View>
      {notifications.map(notification => (
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {notification.date === new Date().toDateString()
              ? 'Today'
              : notification.date}
          </Text>

          {notification.notifications.map(notificationItem => (
            <NotificationItem
              icon={notificationItem.icon}
              title={notificationItem.title}
              text={notificationItem.text}
              multible={notification.notifications.length > 1}
              lastMessage={
                notification.notifications.indexOf(notificationItem) ===
                notification.notifications.length - 1
              }
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default NotificationsContainer;

const styles = StyleSheet.create({
  date: {
    fontSize: FontSizes.size_18,
    fontFamily: 'OpenSans-Bold',
    marginBottom: Spacing.spacing_8,
  },
  dateContainer: {
    paddingVertical: Spacing.spacing_16,
    borderBottomColor: Colors.Primary200,
    borderBottomWidth: 1,
  },
});
