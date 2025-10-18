import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { Colors, Spacing } from '../../constants/Colors';
import { useSelector } from 'react-redux';
import OrderCard from '../../components/OrderCard';
import { cartItem, historyItem } from '../../models/Models';
import NotFoundCompnent from '../../components/NotFoundCompnent';

const OrdersScreen = () => {
  const history = useSelector((state: any) => state.products.history);
  const activity = ['OnGoing', 'Completed'];
  const statues = ['Packed', 'Shipped', 'Cancelled', 'Completed'];
  const [active, setActive] = React.useState(activity[0]);

  const Orders: cartItem[] = history.flatMap((item: historyItem) => item.cart);

  // نحتفظ بنسخة أصلية
  const [allOrders, setAllOrders] = React.useState<cartItem[]>([]);
  const [OrdersState, setOrdersState] = React.useState<cartItem[]>([]);

  useEffect(() => {
    // توليد الحالات العشوائية أول مرة
    const generated = Orders.map(item => ({
      ...item,
      state: statues[Math.floor(Math.random() * statues.length)],
    }));
    setAllOrders(generated);
    setOrdersState(generated.filter(order => order.state !== 'Completed')); // نعرض OnGoing افتراضيًا
  }, [history]);

  const filterhistory = (value: string) => {
    if (value === 'Completed') {
      const filtered = allOrders.filter(item => item.state === 'Completed');
      setOrdersState(filtered);
    } else {
      const filtered = allOrders.filter(item => item.state !== 'Completed');
      setOrdersState(filtered);
    }
  };

  return (
    <View>
      <Header title="Orders" />
      <View style={styles.Container}>
        {history?.length > 0 ? (
          <View>
            <View style={styles.BtnContainer}>
              {activity.map((item, index) => (
                <TouchableOpacity
                  style={[
                    styles.btn,
                    active === item && { backgroundColor: '#f0f0f0' },
                  ]}
                  key={index}
                  onPress={() => {
                    setActive(item);
                    filterhistory(item);
                  }}
                >
                  <Text
                    style={[
                      styles.btnText,
                      active === item && { color: Colors.Primary600 },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {OrdersState.length > 0 ? (
              <FlatList
                data={OrdersState}
                renderItem={({ item }) => <OrderCard item={item} />}
              />
            ) : (
              <View style={{ alignItems: 'center', marginTop: 30 }}>
                <Text style={{ color: Colors.Primary600 }}>
                  No {active} orders yet 😅
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '90%',
            }}
          >
            <View style={styles.BtnContainer}>
              {activity.map((item, index) => (
                <TouchableOpacity
                  style={[
                    styles.btn,
                    active === item && { backgroundColor: '#f0f0f0' },
                  ]}
                  key={index}
                  onPress={() => {
                    setActive(item);
                    filterhistory(item);
                  }}
                >
                  <Text
                    style={[
                      styles.btnText,
                      active === item && { color: Colors.Primary600 },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {active === 'OnGoing' && (
              <NotFoundCompnent
                image={require('../../assets/Images/Box-duotone.png')}
                title="No Ongoing Orders"
                description="You don't have any Ongoing Orders"
              />
            )}
            {active === 'Completed' && (
              <NotFoundCompnent
                image={require('../../assets/Images/Box-duotone.png')}
                title="No Completed Orders"
                description="You don't have any Completed Orders"
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  Container: {
    padding: Spacing.spacing_14,
  },
  BtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.spacing_10,
    backgroundColor: Colors.Primary200,
    borderRadius: Spacing.spacing_10,
  },
  btn: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: Spacing.spacing_10,
    borderRadius: Spacing.spacing_10,
  },
  btnText: {
    color: Colors.Primary600,
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
  },
});
