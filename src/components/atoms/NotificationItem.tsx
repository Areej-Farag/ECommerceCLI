import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';

type Props = {
  icon: string | React.ReactNode;
  title: string;
  text: string;
  multible: boolean;
  lastMessage?: boolean;
};
const NotificationItem = ({
  icon,
  title,
  text,
  multible = false,
  lastMessage = false,
}: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>{icon}</Text>
      </View>
      <View
        style={[
          styles.textContainer,
          multible && !lastMessage && { borderBottomWidth: 1 },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.spacing_10,
    gap: Spacing.spacing_10,
  },
  textContainer: {
    marginLeft: Spacing.spacing_10,
    borderBottomColor: Colors.Primary200,
  },
  title: {
    marginBottom: Spacing.spacing_8,
    fontSize: FontSizes.size_16,
    fontFamily: 'OpenSans-Bold',
  },
  text: {
    fontSize: FontSizes.size_14,
    color: Colors.Primary400,
    fontFamily: 'OpenSans-Regular',
    marginBottom: Spacing.spacing_8,
  },
});
