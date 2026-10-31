import React from 'react';
import { Stack } from 'expo-router';
import { useFonts, OpenSans_400Regular, OpenSans_600SemiBold, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import { OpenSansCondensed_700Bold } from '@expo-google-fonts/open-sans-condensed';
import { Fraunces_500Medium, Fraunces_500Medium_Italic } from '@expo-google-fonts/fraunces';
import { AppProvider } from '../context/AppContext';
import SosModal from '../components/SosModal';
import LockModal from '../components/LockModal';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSansCondensed_700Bold,
    Fraunces_500Medium,
    Fraunces_500Medium_Italic,
  });

  if (!fontsLoaded) return null;

  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="wizard" />
        <Stack.Screen name="conduta" />
        <Stack.Screen name="ficha" />
        <Stack.Screen name="anatomy" />
      </Stack>
      <SosModal />
      <LockModal />
    </AppProvider>
  );
}
