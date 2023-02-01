import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AppNavigator } from './navigation/AppNavigator';

// Initializing the Query client used for the integration with React Query
const queryClient = new QueryClient();

export default function App() {
  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" />
        <AppNavigator />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
