import AppNavigator from '@navigation/AppNavigator';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FlashMessage from 'react-native-flash-message';
const queryClient = new QueryClient();
const App = () => (
  <>
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
      </GestureHandlerRootView>
    </QueryClientProvider>
    <FlashMessage position="top" />
  </>
);

export default App;
