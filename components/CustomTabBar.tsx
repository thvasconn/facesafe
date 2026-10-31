import React from 'react';
import { BottomTabBarProps } from 'expo-router/tabs';
import { BlurView } from 'expo-blur';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NAVY, TAUPE, cond } from '../constants/theme';
import { HomeIcon, StarIcon, ProtocolosIcon, HistoryIcon, DotsIcon, IconProps } from './icons';

// Réplica da tab bar do mock: "Favoritos" navega pra tela de perfil (não existe tela de
// favoritos dedicada) e nunca acende como ativa — mesmo comportamento do protótipo original.
const TABS: { key: string; route: string; label: string; Icon: (p: IconProps) => React.JSX.Element }[] = [
  { key: 'index', route: 'index', label: 'Início', Icon: HomeIcon },
  { key: 'fav', route: 'profile', label: 'Favoritos', Icon: StarIcon },
  { key: 'prot', route: 'region', label: 'Protocolos', Icon: ProtocolosIcon },
  { key: 'hist', route: 'historico', label: 'Histórico', Icon: HistoryIcon },
  { key: 'mais', route: 'paywall', label: 'Mais', Icon: DotsIcon },
];

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const activeRoute = state.routes[state.index]?.name;

  return (
    <View style={styles.wrap}>
      <BlurView intensity={60} tint="light" blurMethod="dimezisBlurView" style={StyleSheet.absoluteFill} />
      <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        {TABS.map((tab) => {
          const active = tab.key !== 'fav' && activeRoute === tab.route;
          const color = active ? NAVY : TAUPE;
          return (
            <Pressable key={tab.key} style={styles.item} onPress={() => navigation.navigate(tab.route)}>
              <tab.Icon size={19} color={color} strokeWidth={1.6} />
              <Text style={[cond, styles.label, { color }]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(28,70,112,0.14)',
    backgroundColor: Platform.OS === 'android' ? 'rgba(255,255,255,.92)' : 'rgba(255,255,255,.55)',
  },
  bar: { flexDirection: 'row', paddingTop: 10, paddingHorizontal: 6 },
  item: { flex: 1, alignItems: 'center', gap: 5 },
  label: { fontSize: 9.5, letterSpacing: 0.6, textTransform: 'uppercase' },
});
