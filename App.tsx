import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Colors } from './src/constants/Colors';
import { Provider } from 'react-redux';
import store from './src/redux/store';
// import { StatusBar } from 'react-native/types_generated/index';
function App() {
  const queryClient = new QueryClient();

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
