import React from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import { CATEGORIES, REGIONS } from '../../constants/content';
import { NAVY, NAVY_GRADIENT, TAUPE, BORDER, softShadow, cond, display, heading, body } from '../../constants/theme';
import {
  SearchIcon,
  AcidoIcon,
  ToxinaIcon,
  BioIcon,
  UsIcon,
  FiosIcon,
  SosIcon,
  ProtocolosIcon,
  AnatomyIcon,
  IconProps,
} from '../../components/icons';

const CATEGORY_ICONS: Record<string, (p: IconProps) => React.JSX.Element> = {
  acido: AcidoIcon,
  toxina: ToxinaIcon,
  bio: BioIcon,
  us: UsIcon,
  fios: FiosIcon,
};

export default function HomeScreen() {
  const router = useRouter();
  const { openSos, openLock } = useApp();

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.header}>
          <LinearGradient colors={NAVY_GRADIENT} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
          <SafeAreaView edges={['top']} style={styles.headerInner}>
            <View style={styles.headerTop}>
              <View>
                <Text style={[display, styles.brand]}>SafeHof</Text>
                <Text style={[cond, styles.brandSubtitle]}>Intercorrências</Text>
              </View>
              <Pressable style={styles.avatar} onPress={() => router.push('/(tabs)/profile')}>
                <Text style={styles.avatarText}>MC</Text>
              </Pressable>
            </View>
            <View style={styles.searchBar}>
              <SearchIcon size={15} color={TAUPE} strokeWidth={2.2} />
              <Text style={[body, styles.searchPlaceholder]}>Buscar região, sintoma, produto…</Text>
            </View>
          </SafeAreaView>
        </View>

        <View style={styles.section}>
          <Text style={[heading, styles.sectionTitle]}>Escolha a categoria</Text>
          <Text style={[body, styles.sectionDesc]}>Conduta guiada em 5 etapas.</Text>
          <View style={{ gap: 9 }}>
            {CATEGORIES.map((c) => {
              const Icon = CATEGORY_ICONS[c.key];
              return (
                <Pressable key={c.key} style={styles.categoryRow} onPress={() => router.push('/wizard')}>
                  <View style={styles.categoryIconWrap}>
                    <Icon size={20} color={NAVY} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[cond, styles.categoryTitle]}>{c.title}</Text>
                    <Text style={[body, styles.categorySubtitle]}>{c.subtitle}</Text>
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[heading, styles.sectionTitle]}>Suporte rápido</Text>
          <View style={styles.quickGrid}>
            <Pressable style={styles.quickEmergency} onPress={openSos}>
              <LinearGradient colors={NAVY_GRADIENT} style={StyleSheet.absoluteFill} />
              <SosIcon size={22} color="#fff" />
              <Text style={[cond, styles.quickEmergencyLabel]}>Emergência</Text>
            </Pressable>
            <Pressable style={styles.quickCard} onPress={() => router.push('/(tabs)/region')}>
              <ProtocolosIcon size={22} color={NAVY} />
              <Text style={[cond, styles.quickCardLabel]}>Protocolos</Text>
            </Pressable>
            <Pressable style={styles.quickCard} onPress={() => router.push('/anatomy')}>
              <AnatomyIcon size={22} color={NAVY} />
              <Text style={[cond, styles.quickCardLabel]}>Anatomia</Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.section, { paddingBottom: 130 }]}>
          <View style={styles.regionsHeader}>
            <Text style={[heading, styles.sectionTitle]}>Atlas por região</Text>
            <Text style={styles.regionsCount}>13 regiões</Text>
          </View>
          <View style={styles.regionsGrid}>
            {REGIONS.map((r) => (
              <Pressable
                key={r.name}
                style={[
                  styles.regionCard,
                  softShadow,
                  {
                    borderColor: r.name === 'Têmpora' ? 'rgba(28,70,112,0.35)' : BORDER,
                    backgroundColor: r.name === 'Têmpora' ? '#f5f8fb' : r.free ? '#fff' : '#faf9f8',
                    opacity: r.free ? 1 : 0.62,
                  },
                ]}
                onPress={() => (r.free ? router.push('/(tabs)/region') : openLock())}
              >
                <Text style={[cond, styles.regionName]}>{r.name}</Text>
                <Text style={styles.regionMeta}>{r.free ? r.meta : 'Plano Full'}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  header: { overflow: 'hidden' },
  headerInner: { paddingHorizontal: 22, paddingBottom: 18 },
  headerTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  brand: { fontSize: 26, color: '#fff', lineHeight: 28 },
  brandSubtitle: { fontSize: 13, color: '#9f9b93', letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,.14)', borderWidth: 1, borderColor: 'rgba(255,255,255,.25)', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 16, backgroundColor: 'rgba(255,255,255,.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,.16)', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 14 },
  searchPlaceholder: { fontSize: 13.5, color: 'rgba(255,255,255,.6)' },
  section: { paddingHorizontal: 22, paddingTop: 22, paddingBottom: 6 },
  sectionTitle: { fontSize: 15.5, color: '#141414', letterSpacing: 0.2, marginBottom: 4 },
  sectionDesc: { fontSize: 11.5, color: TAUPE, marginBottom: 12 },
  categoryRow: { flexDirection: 'row', alignItems: 'center', gap: 14, width: '100%', backgroundColor: '#fff', borderWidth: 1, borderColor: BORDER, borderRadius: 12, padding: 14, shadowColor: '#12314e', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 1 },
  categoryIconWrap: { width: 38, height: 38, borderRadius: 10, backgroundColor: 'rgba(28,70,112,0.06)', alignItems: 'center', justifyContent: 'center' },
  categoryTitle: { fontSize: 15.5, fontWeight: '700', color: '#000' },
  categorySubtitle: { fontSize: 11.5, color: TAUPE, marginTop: 2 },
  chevron: { color: TAUPE, fontSize: 16 },
  quickGrid: { flexDirection: 'row', gap: 9 },
  quickEmergency: { flex: 1, alignItems: 'center', gap: 9, borderRadius: 12, paddingVertical: 16, paddingHorizontal: 8, overflow: 'hidden' },
  quickEmergencyLabel: { fontSize: 12, fontWeight: '700', color: '#fff', textTransform: 'uppercase', letterSpacing: 0.5 },
  quickCard: { flex: 1, alignItems: 'center', gap: 9, backgroundColor: '#fff', borderWidth: 1, borderColor: BORDER, borderRadius: 12, paddingVertical: 16, paddingHorizontal: 8, shadowColor: '#12314e', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 1 },
  quickCardLabel: { fontSize: 12, fontWeight: '700', color: NAVY, textTransform: 'uppercase', letterSpacing: 0.5 },
  regionsHeader: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 },
  regionsCount: { fontSize: 11, color: TAUPE },
  regionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  regionCard: { width: '48%', alignItems: 'flex-start', paddingVertical: 14, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1, minHeight: 66, justifyContent: 'center' },
  regionName: { fontSize: 14.5, fontWeight: '700', color: '#000' },
  regionMeta: { fontSize: 10.5, color: TAUPE, marginTop: 3 },
});
