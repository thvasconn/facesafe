import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useApp } from '../context/AppContext';
import { NAVY_GRADIENT, cond } from '../constants/theme';

export default function SosFab() {
  const { sosOpen, openSos } = useApp();
  if (sosOpen) return null;

  return (
    <Pressable style={styles.fab} onPress={openSos}>
      <LinearGradient colors={NAVY_GRADIENT} style={StyleSheet.absoluteFill} />
      <Text style={[cond, styles.label]}>SOS</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 18,
    bottom: 96,
    zIndex: 35,
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: NAVY_GRADIENT[1],
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  label: { color: '#fff', fontSize: 14, fontWeight: '800', letterSpacing: 1 },
});
