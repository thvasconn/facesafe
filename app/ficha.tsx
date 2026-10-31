import React from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FICHA, FICHA_TAGS } from '../constants/content';
import { NAVY, NAVY_GRADIENT, TAUPE, cond, display, body } from '../constants/theme';

export default function FichaScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <LinearGradient colors={NAVY_GRADIENT} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
      <SafeAreaView edges={['top']} style={styles.headerArea}>
        <Pressable onPress={() => router.push('/(tabs)/region')}>
          <Text style={[body, styles.back]}>‹ Têmpora</Text>
        </Pressable>
        <Text style={[body, styles.eyebrow]}>Ficha rápida</Text>
        <Text style={[display, styles.title]}>Têmpora · Preenchedor</Text>
        <View style={styles.tags}>
          {FICHA_TAGS.map((t) => (
            <Text key={t} style={styles.tag}>
              {t}
            </Text>
          ))}
        </View>
      </SafeAreaView>

      <ScrollView style={styles.sheet} contentContainerStyle={styles.sheetContent}>
        {FICHA.map((f) => (
          <View key={f.k} style={styles.row}>
            <Text style={[cond, styles.rowKey]}>{f.k}</Text>
            <Text
              style={[
                body,
                styles.rowVal,
                { color: f.kind === 2 ? NAVY : '#22262a', fontWeight: f.kind === 0 ? '400' : '700' },
              ]}
            >
              {f.v}
            </Text>
          </View>
        ))}
        <Pressable style={styles.anatomyBtn} onPress={() => router.push('/anatomy')}>
          <Text style={[cond, styles.anatomyBtnText]}>Ver anatomia em camadas</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  headerArea: { paddingHorizontal: 22, paddingBottom: 20 },
  back: { color: 'rgba(255,255,255,.7)', fontSize: 12, marginBottom: 16 },
  eyebrow: { fontSize: 10.5, letterSpacing: 1.5, textTransform: 'uppercase', color: '#9f9b93' },
  title: { fontSize: 28, color: '#fff', lineHeight: 33, marginTop: 6 },
  tags: { flexDirection: 'row', gap: 6, marginTop: 12, flexWrap: 'wrap' },
  tag: {
    fontSize: 10.5,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.22)',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontWeight: '700',
    overflow: 'hidden',
  },
  sheet: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  sheetContent: { paddingTop: 6, paddingBottom: 130 },
  row: { flexDirection: 'row', gap: 14, paddingHorizontal: 22, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#f1efed', alignItems: 'flex-start' },
  rowKey: { width: 104, fontSize: 10.5, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase', color: TAUPE, paddingTop: 2 },
  rowVal: { flex: 1, fontSize: 13.5, lineHeight: 19 },
  anatomyBtn: { marginHorizontal: 22, marginTop: 18, backgroundColor: '#f4f3f1', borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  anatomyBtnText: { color: NAVY, fontSize: 13, fontWeight: '700', letterSpacing: 0.7, textTransform: 'uppercase' },
});
