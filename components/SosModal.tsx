import React from 'react';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { NAVY_GRADIENT, TAUPE, TEXT_MUTED, cond, display, body } from '../constants/theme';

// TODO: trocar por Linking.openURL(`https://wa.me/<numero-real>`) quando o Dr. Fábio confirmar
// os números de plantão (Ipanema / Tijuca / Niterói) — ver docs/questionario_cliente.md.
export default function SosModal() {
  const { sosOpen, closeSos } = useApp();

  return (
    <Modal visible={sosOpen} transparent animationType="fade" onRequestClose={closeSos}>
      <View style={styles.backdrop}>
        <BlurView intensity={25} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={[display, styles.title]}>Falar com especialista agora</Text>
          <Text style={[body, styles.desc]}>
            Você será redirecionado para o WhatsApp de plantão da equipe SafeHof. Tenha em mãos: região tratada,
            produto, volume e tempo desde a aplicação.
          </Text>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={[body, styles.statusText]}>Plantão ativo · resposta média 4 min</Text>
          </View>
          <Pressable style={styles.primaryBtn} onPress={closeSos}>
            <LinearGradient colors={NAVY_GRADIENT} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFill} />
            <Text style={[cond, styles.primaryBtnText]}>Abrir WhatsApp</Text>
          </Pressable>
          <Pressable style={styles.cancelBtn} onPress={closeSos}>
            <Text style={[body, styles.cancelBtnText]}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, paddingBottom: 34 },
  handle: { width: 38, height: 4, borderRadius: 2, backgroundColor: '#e2e0dd', alignSelf: 'center', marginBottom: 20 },
  title: { fontSize: 22, color: '#000', lineHeight: 27 },
  desc: { fontSize: 13, lineHeight: 20, color: TEXT_MUTED, marginTop: 10 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(28,70,112,0.05)', borderRadius: 10, padding: 13, marginTop: 16, marginBottom: 18 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: NAVY_GRADIENT[1] },
  statusText: { fontSize: 12, color: '#33383d' },
  primaryBtn: { width: '100%', borderRadius: 10, paddingVertical: 16, alignItems: 'center', overflow: 'hidden' },
  primaryBtnText: { color: '#fff', fontSize: 14, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase' },
  cancelBtn: { width: '100%', paddingVertical: 12, alignItems: 'center' },
  cancelBtnText: { color: TAUPE, fontSize: 13 },
});
