import React from 'react';
import { Tabs } from 'expo-router/tabs';
import CustomTabBar from '../../components/CustomTabBar';

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="region" />
      <Tabs.Screen name="historico" />
      <Tabs.Screen name="paywall" />
    </Tabs>
  );
}
