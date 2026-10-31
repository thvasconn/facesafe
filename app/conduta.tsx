import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { CONDUTA_ITEMS, RESOLUCAO } from '../constants/content';
import { NAVY, NAVY_GRADIENT, TAUPE, BORDER, TEXT_MUTED, softShadow, cond, display, heading, body } from '../constants/theme';
import {
  ImediataIcon,
  AlertaIcon,
  MateriaisIcon,
  EncaminharIcon,
  AcompanhamentoIcon,
  RegistrarIcon,
  IconProps,
} from '../components/icons';

const ITEM_ICONS: ((p: IconProps) => React.JSX.Element)[] = [
  ImediataIcon,
  AlertaIcon,
  MateriaisIcon,
  EncaminharIcon,
  AcompanhamentoIcon,
];

export default function CondutaScreen() {
  const router = useRouter();
  const { isFavorite, toggleFavorite, openSos } = useApp();
  const [resolved, setResolved] = useState<Record<number, boolean>>({ 0: true, 1: true, 2: true, 3: true });

  const toggleResolved = (i: number) => setResolved((r) => ({ ...r, [i]: !r[i] }));

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable style={styles.navBtn} onPress={() => router.push('/wizard')}>
          <Text style={styles.navBtnText}>‹</Text>
        </Pressable>
        <Text style={[cond, styles.headerTitle]}>Ácido hialurônico</Text>
        <Pressable style={styles.navBtn} onPress={toggleFavorite}>
          <Text style={styles.navBtnIcon}>{isFavorite ? '★' : '☆'}</Text>
        </Pressable>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.intro}>
          <View style={styles.introIcon}>
            <LinearGradient colors={NAVY_GRADIENT} style={StyleSheet.absoluteFill} />
            <RegistrarIcon size={22} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[display, styles.introTitle]}>Conduta recomendada</Text>
            <Text style={[body, styles.introDesc]}>Baseado nos sinais, sintomas e gravidade selecionados.</Text>
          </View>
        </View>

        <View style={styles.list}>
          {CONDUTA_ITEMS.map((item, i) => {
            const Icon = ITEM_ICONS[i];
            return (
              <Pressable
                key={item.title}
                style={[styles.condCard, softShadow]}
                onPress={item.opensSos ? openSos : undefined}
              >
                <Icon size={21} color={NAVY} />
                <View style={{ flex: 1 }}>
                  <Text style={[heading, styles.condTitle]}>{item.title}</Text>
                  <Text style={[body, styles.condBody]}>{item.body}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.resolSection}>
          <View style={styles.resolHeaderRow}>
            <Text style={[heading, styles.resolHeader]}>Resolução do problema</Text>
            <View style={styles.resolRule} />
          </View>
          <View style={[styles.resolBox, softShadow]}>
            {RESOLUCAO.map((label, i) => {
              const on = !!resolved[i];
              return (
                <Pressable key={label} style={styles.resolRow} onPress={() => toggleResolved(i)}>
                  <View style={[styles.resolCheck, { backgroundColor: on ? NAVY : 'transparent', borderColor: on ? NAVY : '#dcd9d5' }]}>
                    {on && <Text style={styles.resolCheckMark}>✓</Text>}
                  </View>
                  <Text style={[body, styles.resolLabel, { color: on ? '#22262a' : '#8b8f94' }]}>{label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable style={styles.registerBtn} onPress={() => router.push('/(tabs)/historico')}>
          <LinearGradient colors={NAVY_GRADIENT} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFill} />
          <Text style={[cond, styles.registerBtnText]}>Registrar caso</Text>
          <RegistrarIcon size={18} color="#fff" />
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#faf9f8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eeecea',
  },
  navBtn: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#f4f3f1', alignItems: 'center', justifyContent: 'center' },
  navBtnText: { color: NAVY, fontSize: 16 },
  navBtnIcon: { color: NAVY, fontSize: 13 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '800', color: '#000' },
  body: { padding: 22, paddingTop: 22, paddingBottom: 130, gap: 0 },
  intro: { flexDirection: 'row', gap: 14, alignItems: 'flex-start', marginBottom: 14 },
  introIcon: { width: 44, height: 44, borderRadius: 12, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  introTitle: { fontSize: 22, color: NAVY, lineHeight: 25 },
  introDesc: { fontSize: 12, lineHeight: 18, color: TEXT_MUTED, marginTop: 5 },
  list: { gap: 9 },
  condCard: { flexDirection: 'row', gap: 13, alignItems: 'flex-start', backgroundColor: '#fff', borderWidth: 1, borderColor: BORDER, borderRadius: 12, padding: 15 },
  condTitle: { fontSize: 15, color: '#000' },
  condBody: { fontSize: 11.5, lineHeight: 17, color: TEXT_MUTED, marginTop: 3 },
  chevron: { color: TAUPE, fontSize: 15 },
  resolSection: { marginTop: 24 },
  resolHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  resolHeader: { fontSize: 14.5, color: NAVY, letterSpacing: 0.3 },
  resolRule: { flex: 1, height: 1, backgroundColor: '#e0ddd9' },
  resolBox: { backgroundColor: '#fff', borderWidth: 1, borderColor: BORDER, borderRadius: 12, paddingVertical: 6, paddingHorizontal: 4 },
  resolRow: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingVertical: 11, paddingHorizontal: 14 },
  resolCheck: { width: 17, height: 17, borderRadius: 9, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  resolCheckMark: { color: '#fff', fontSize: 10 },
  resolLabel: { fontSize: 12.5 },
  registerBtn: { marginTop: 20, flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 10, paddingVertical: 17, overflow: 'hidden' },
  registerBtnText: { color: '#fff', fontSize: 15, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase' },
});
