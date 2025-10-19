import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Alert, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Colors } from './src/constants/Colors';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import messaging from '@react-native-firebase/messaging';
function App() {
  const queryClient = new QueryClient();
  useEffect(() => {
    PushNotification();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  async function PushNotification() {
    let fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('fcmToken', fcmToken);
    }
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.Primary100}
        />
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
