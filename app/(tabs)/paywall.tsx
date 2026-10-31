import React from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import { NAVY, NAVY_GRADIENT, TAUPE, BORDER, softShadow, cond, display, heading, body } from '../../constants/theme';

const FREE_ITEMS = [
  { text: '4 regiões liberadas', on: true },
  { text: 'Fichas rápidas dessas regiões', on: true },
  { text: 'Condutas em intercorrências limitadas', on: false },
  { text: 'Sem acesso ao SOS', on: false },
];

const FULL_ITEMS = [
  'As 13 regiões da face',
  'Fluxo completo de intercorrências',
  'Anatomia em camadas completa',
  'Canal SOS com especialista',
];

export default function PaywallScreen() {
  const router = useRouter();
  const { setPlan } = useApp();

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.header}>
          <LinearGradient colors={NAVY_GRADIENT} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
          <SafeAreaView edges={['top']} style={styles.headerInner}>
            <Pressable onPress={() => router.push('/(tabs)')}>
              <Text style={styles.back}>‹ Voltar</Text>
            </Pressable>
            <Text style={[display, styles.title]}>Atlas completo, sem travas</Text>
            <Text style={[body, styles.subtitle]}>
              13 regiões, condutas em intercorrências e canal SOS com especialista.
            </Text>
          </SafeAreaView>
        </View>

        <View style={styles.body}>
          <View style={[styles.freeCard, softShadow]}>
            <View style={styles.planHeaderRow}>
              <Text style={[heading, styles.planName, { color: '#000' }]}>Free</Text>
              <Text style={[cond, styles.planPrice, { color: '#000' }]}>R$ 0</Text>
            </View>
            <View style={styles.rule} />
            <View style={{ gap: 9 }}>
              {FREE_ITEMS.map((it) => (
                <View key={it.text} style={styles.itemRow}>
                  <Text style={[styles.mark, { color: it.on ? '#22262a' : TAUPE }]}>{it.on ? '✓' : '—'}</Text>
                  <Text style={[body, styles.itemText, { color: it.on ? '#22262a' : '#7b7f84' }]}>{it.text}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.fullCard}>
            <LinearGradient colors={NAVY_GRADIENT} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
            <View style={styles.planHeaderRow}>
              <Text style={[heading, styles.planName, { color: '#fff' }]}>Full</Text>
              <Text style={[cond, styles.planPrice, { color: '#fff' }]}>R$ 39/mês</Text>
            </View>
            <View style={[styles.rule, { backgroundColor: 'rgba(255,255,255,.2)' }]} />
            <View style={{ gap: 9 }}>
              {FULL_ITEMS.map((text) => (
                <View key={text} style={styles.itemRow}>
                  <Text style={[styles.mark, { color: '#fff' }]}>✓</Text>
                  <Text style={[body, styles.itemText, { color: '#fff' }]}>{text}</Text>
                </View>
              ))}
            </View>
            <Pressable
              style={styles.ctaBtn}
              onPress={() => {
                setPlan('full');
                router.push('/(tabs)');
              }}
            >
              <Text style={[cond, styles.ctaBtnText]}>Assinar plano Full</Text>
            </Pressable>
          </View>

          <Text style={[body, styles.disclaimer]}>Renovação automática. Cancele quando quiser.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  header: { overflow: 'hidden' },
  headerInner: { paddingHorizontal: 22, paddingBottom: 24 },
  back: { color: 'rgba(255,255,255,.7)', fontSize: 12, marginBottom: 18 },
  title: { fontSize: 30, color: '#fff', lineHeight: 35, maxWidth: 260 },
  subtitle: { fontSize: 13, lineHeight: 20, color: 'rgba(255,255,255,.72)', marginTop: 10, maxWidth: 270 },
  body: { padding: 22, paddingBottom: 130, gap: 12 },
  freeCard: { borderWidth: 1, borderColor: BORDER, borderRadius: 14, padding: 18, backgroundColor: '#fff' },
  fullCard: { borderRadius: 14, padding: 18, overflow: 'hidden' },
  planHeaderRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
  planName: { fontSize: 17, letterSpacing: 0.3 },
  planPrice: { fontSize: 15, fontWeight: '700' },
  rule: { height: 1, backgroundColor: BORDER, marginVertical: 13 },
  itemRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  mark: { width: 15, fontSize: 12, fontWeight: '700' },
  itemText: { flex: 1, fontSize: 12.5, lineHeight: 18 },
  ctaBtn: { width: '100%', marginTop: 18, backgroundColor: '#fff', borderRadius: 8, paddingVertical: 15, alignItems: 'center' },
  ctaBtnText: { color: NAVY, fontSize: 13.5, fontWeight: '800', letterSpacing: 0.7, textTransform: 'uppercase' },
  disclaimer: { fontSize: 10.5, lineHeight: 17, color: TAUPE, textAlign: 'center' },
});
