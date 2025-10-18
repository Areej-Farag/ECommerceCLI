import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ArrowRight } from 'lucide-react-native';
import { Colors, FontSizes, Spacing } from '../../constants/Colors';

type Props = {
  handleNavigation?: (screen: string) => void;
  hasNavigationArrow?: boolean;
  icon?: React.ReactNode;
  btnText: string;
  hasSwitch?: boolean;
  hasDoubleText?: boolean;
  BoldText?: string;
};
const TextBarWithIcon = ({
  handleNavigation,
  icon,
  btnText,
  hasNavigationArrow,
  hasSwitch,
  hasDoubleText,
  BoldText,
}: Props) => {
  const [switchValue, setSwitchValue] = React.useState(false);
  return (
    <View>
      <TouchableOpacity
        style={styles.StackBTN}
        onPress={() => {
          handleNavigation && handleNavigation('order');
        }}
      >
        <View style={styles.leftSide}>
          {icon}
          <View style={{ gap: Spacing.spacing_4 }}>
            {hasDoubleText && <Text style={styles.title}>{BoldText}</Text>}
            <Text>{btnText}</Text>
          </View>
        </View>

        {hasNavigationArrow && (
          <ArrowRight size={24} color={Colors.Primary600} />
        )}

        {hasSwitch && (
          <Switch
            value={switchValue}
            onValueChange={() => {
              setSwitchValue(prev => !prev);
            }}
            thumbColor={Colors.Primary100}
            trackColor={{ false: Colors.Primary200, true: Colors.Primary800 }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TextBarWithIcon;

const styles = StyleSheet.create({
  StackBTN: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.spacing_10,
    justifyContent: 'space-between',
    paddingVertical: Spacing.spacing_20,
    borderBottomColor: Colors.Primary400,
    // backgroundColor: Colors.Primary200,
    borderBottomWidth: 1,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.spacing_10,
  },
  title: {
    fontSize: FontSizes.size_14,
    fontFamily: 'OpenSans-SemiBold',
  },
});
