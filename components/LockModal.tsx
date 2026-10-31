import React from 'react';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { NAVY_GRADIENT, TEXT_MUTED, cond, display, body } from '../constants/theme';

export default function LockModal() {
  const { lockOpen, closeLock } = useApp();
  const router = useRouter();

  return (
    <Modal visible={lockOpen} transparent animationType="fade" onRequestClose={closeLock}>
      <View style={styles.backdrop}>
        <BlurView intensity={25} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={styles.card}>
          <Text style={[display, styles.title]}>Região exclusiva do plano Full</Text>
          <Text style={[body, styles.desc]}>
            Desbloqueie as 13 regiões, as condutas completas e o canal SOS.
          </Text>
          <View style={styles.row}>
            <Pressable style={styles.secondaryBtn} onPress={closeLock}>
              <Text style={[body, styles.secondaryBtnText]}>Agora não</Text>
            </Pressable>
            <Pressable
              style={styles.primaryBtn}
              onPress={() => {
                closeLock();
                router.push('/(tabs)/paywall');
              }}
            >
              <LinearGradient colors={NAVY_GRADIENT} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFill} />
              <Text style={[cond, styles.primaryBtnText]}>Ver planos</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 24, alignItems: 'center', width: '100%' },
  title: { fontSize: 19.5, color: '#000', textAlign: 'center', lineHeight: 24 },
  desc: { fontSize: 12.5, lineHeight: 19, color: TEXT_MUTED, textAlign: 'center', marginTop: 10, marginBottom: 18 },
  row: { flexDirection: 'row', gap: 9, width: '100%' },
  secondaryBtn: { flex: 1, backgroundColor: '#f4f3f1', borderRadius: 9, paddingVertical: 13, alignItems: 'center' },
  secondaryBtnText: { color: TEXT_MUTED, fontSize: 13 },
  primaryBtn: { flex: 1, borderRadius: 9, paddingVertical: 13, alignItems: 'center', overflow: 'hidden' },
  primaryBtnText: { color: '#fff', fontSize: 13, fontWeight: '700', letterSpacing: 0.7, textTransform: 'uppercase' },
});
