import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import { BLOCKS } from '../../constants/content';
import { NAVY, NAVY_GRADIENT, TAUPE, BORDER, softShadow, cond, display, heading, body } from '../../constants/theme';
import SosFab from '../../components/SosFab';

export default function RegionScreen() {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useApp();
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });

  const toggle = (i: number) => setOpen((o) => ({ ...o, [i]: !o[i] }));

  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.heroPlaceholder}>Fotografia clínica</Text>
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.15)', 'rgba(18,49,78,.88)']} locations={[0, 0.45, 1]} style={StyleSheet.absoluteFill} />
        <SafeAreaView edges={['top']} style={styles.heroTop}>
          <Pressable style={styles.heroBtn} onPress={() => router.push('/(tabs)')}>
            <BlurView intensity={35} tint="dark" style={StyleSheet.absoluteFill} />
            <Text style={styles.heroBtnText}>‹</Text>
          </Pressable>
          <Pressable style={styles.heroFavBtn} onPress={toggleFavorite}>
            <BlurView intensity={35} tint="dark" style={StyleSheet.absoluteFill} />
            <Text style={styles.heroFavText}>{isFavorite ? '★ Salvo' : '☆ Salvar'}</Text>
          </Pressable>
        </SafeAreaView>
        <View style={styles.heroCaption}>
          <Text style={styles.heroEyebrow}>Região temporal</Text>
          <Text style={[display, styles.heroTitle]}>Têmpora</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.primaryAction} onPress={() => router.push('/ficha')}>
          <LinearGradient colors={NAVY_GRADIENT} style={StyleSheet.absoluteFill} />
          <Text style={[cond, styles.primaryActionText]}>Ficha rápida</Text>
        </Pressable>
        <Pressable style={styles.secondaryAction} onPress={() => router.push('/anatomy')}>
          <Text style={[cond, styles.secondaryActionText]}>Camadas</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.blocksContent}>
        {BLOCKS.map((b, i) => {
          const isOpen = !!open[i];
          return (
            <View key={b.title} style={[styles.block, softShadow, { borderColor: isOpen ? 'rgba(28,70,112,0.22)' : BORDER }]}>
              <Pressable style={styles.blockHeader} onPress={() => toggle(i)}>
                <Text style={styles.blockNum}>{String(i + 1).padStart(2, '0')}</Text>
                <Text style={[heading, styles.blockTitle]}>{b.title}</Text>
                <Text style={[styles.blockChevron, isOpen && styles.blockChevronOpen]}>›</Text>
              </Pressable>
              {isOpen && (
                <View style={styles.blockBody}>
                  <Text style={[body, styles.blockBodyText]}>{b.body}</Text>
                  {b.points.map((pt) => (
                    <View key={pt} style={styles.blockPoint}>
                      <View style={styles.blockDot} />
                      <Text style={[body, styles.blockPointText]}>{pt}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
      <SosFab />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#faf9f8' },
  hero: { height: 236, backgroundColor: '#000', overflow: 'hidden' },
  heroPlaceholder: { position: 'absolute', top: '45%', width: '100%', textAlign: 'center', color: '#3a3a3a', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase' },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 18 },
  heroBtn: { width: 34, height: 34, borderRadius: 17, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  heroBtnText: { color: '#fff', fontSize: 16 },
  heroFavBtn: { height: 34, paddingHorizontal: 12, borderRadius: 17, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  heroFavText: { color: '#fff', fontSize: 11.5 },
  heroCaption: { position: 'absolute', left: 22, right: 22, bottom: 18 },
  heroEyebrow: { fontSize: 10.5, letterSpacing: 2, textTransform: 'uppercase', color: '#9f9b93', marginBottom: 6 },
  heroTitle: { fontSize: 38, color: '#fff' },
  actions: { flexDirection: 'row', gap: 8, padding: 14, paddingHorizontal: 22, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eeecea' },
  primaryAction: { flex: 1, borderRadius: 10, paddingVertical: 13, alignItems: 'center', overflow: 'hidden' },
  primaryActionText: { color: '#fff', fontSize: 13, fontWeight: '700', letterSpacing: 0.7, textTransform: 'uppercase' },
  secondaryAction: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: NAVY, borderRadius: 10, paddingVertical: 13, alignItems: 'center' },
  secondaryActionText: { color: NAVY, fontSize: 13, fontWeight: '700', letterSpacing: 0.7, textTransform: 'uppercase' },
  blocksContent: { padding: 16, paddingHorizontal: 22, paddingBottom: 130, gap: 10 },
  block: { backgroundColor: '#fff', borderWidth: 1, borderRadius: 12, overflow: 'hidden' },
  blockHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 15, paddingHorizontal: 16 },
  blockNum: { fontSize: 11, fontWeight: '700', color: TAUPE, width: 18 },
  blockTitle: { flex: 1, fontSize: 15.5, color: '#000' },
  blockChevron: { color: TAUPE, fontSize: 16 },
  blockChevronOpen: { transform: [{ rotate: '90deg' }] },
  blockBody: { paddingHorizontal: 16, paddingLeft: 46, paddingBottom: 18, gap: 10 },
  blockBodyText: { fontSize: 13, lineHeight: 20, color: '#33383d' },
  blockPoint: { flexDirection: 'row', gap: 9, alignItems: 'flex-start' },
  blockDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: NAVY, marginTop: 7 },
  blockPointText: { flex: 1, fontSize: 12.5, lineHeight: 18, color: '#4a4f55' },
});
