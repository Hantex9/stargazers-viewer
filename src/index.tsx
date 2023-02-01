import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, View } from 'native-base';
import { QueryClient, QueryClientProvider } from 'react-query';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import { AppNavigator } from './navigation/AppNavigator';

// Keep the splash screen visible while fetching resources
SplashScreen.preventAutoHideAsync();

// Initializing the Query client used for the integration with React Query
const queryClient = new QueryClient();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts
        await Font.loadAsync(AntDesign.font);
        await Font.loadAsync(MaterialIcons.font);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application that is ready and have to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <View flex={1} onLayout={onLayoutRootView}>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="light" />
          <AppNavigator />
        </QueryClientProvider>
      </View>
    </NativeBaseProvider>
  );
}
