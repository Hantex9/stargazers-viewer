import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, View } from 'native-base';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import { AppNavigator } from './navigation/AppNavigator';

// Keep the splash screen visible while fetching resources
SplashScreen.preventAutoHideAsync();

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
        <StatusBar style="light" />
        <AppNavigator />
      </View>
    </NativeBaseProvider>
  );
}
