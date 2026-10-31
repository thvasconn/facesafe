import React from 'react';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import { FAVORITES, ACCOUNT_ROWS } from '../../constants/content';
import { NAVY, NAVY_GRADIENT, TAUPE, BORDER, softShadow, cond, display, heading, body } from '../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import SosFab from '../../components/SosFab';

export default function ProfileScreen() {
  const router = useRouter();
  const { plan } = useApp();

  return (
    <View style={styles.screen}>
      <ScrollView>
        <SafeAreaView edges={['top']} style={styles.header}>
          <View style={styles.identity}>
            <View style={styles.avatar}>
              <LinearGradient colors={NAVY_GRADIENT} style={StyleSheet.absoluteFill} />
              <Text style={styles.avatarText}>MC</Text>
            </View>
            <View>
              <Text style={[display, styles.name]}>Dra. Marina Costa</Text>
              <Text style={styles.crm}>CRO-SP 88.412 · Odontologia</Text>
            </View>
          </View>
          <View style={styles.planRow}>
            <View>
              <Text style={styles.planLabel}>Plano atual</Text>
              <Text style={[heading, styles.planValue]}>
                {plan === 'full' ? 'Full · 13 regiões' : 'Free · 4 regiões'}
              </Text>
            </View>
            <Pressable style={styles.upgradeBtn} onPress={() => router.push('/(tabs)/paywall')}>
              <LinearGradient colors={NAVY_GRADIENT} style={StyleSheet.absoluteFill} />
              <Text style={[cond, styles.upgradeBtnText]}>Upgrade</Text>
            </Pressable>
          </View>
        </SafeAreaView>

        <View style={styles.body}>
          <Text style={[cond, styles.label]}>Favoritos</Text>
          <View style={{ gap: 8, marginBottom: 22 }}>
            {FAVORITES.map((f) => (
              <Pressable key={f.name} style={[styles.favRow, softShadow]} onPress={() => router.push(f.route)}>
                <View>
                  <Text style={[heading, styles.favName]}>{f.name}</Text>
                  <Text style={styles.favMeta}>{f.meta}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </Pressable>
            ))}
          </View>

          <Text style={[cond, styles.label]}>Conta</Text>
          <View style={[styles.accountBox, softShadow]}>
            {ACCOUNT_ROWS.map((row) => (
              <View key={row.k} style={styles.accountRow}>
                <Text style={styles.accountKey}>{row.k}</Text>
                <Text style={styles.accountVal}>{row.v}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <SosFab />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#faf9f8' },
  header: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eeecea', paddingHorizontal: 22, paddingBottom: 24 },
  identity: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: { width: 56, height: 56, borderRadius: 28, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  name: { fontSize: 21, color: '#000' },
  crm: { fontSize: 12, color: TAUPE, marginTop: 3 },
  planRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, backgroundColor: 'rgba(28,70,112,0.05)', borderRadius: 12, padding: 14, paddingHorizontal: 16 },
  planLabel: { fontSize: 10.5, letterSpacing: 1.2, textTransform: 'uppercase', color: TAUPE },
  planValue: { fontSize: 16, color: NAVY, marginTop: 2 },
  upgradeBtn: { borderRadius: 8, paddingVertical: 11, paddingHorizontal: 15, overflow: 'hidden' },
  upgradeBtnText: { color: '#fff', fontSize: 11.5, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase' },
  body: { padding: 22, paddingBottom: 130 },
  label: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase', color: TAUPE, marginBottom: 10 },
  favRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', borderWidth: 1, borderColor: BORDER, borderRadius: 12, padding: 14, paddingHorizontal: 16 },
  favName: { fontSize: 14.5, color: '#000' },
  favMeta: { fontSize: 11, color: TAUPE, marginTop: 2 },
  chevron: { color: TAUPE, fontSize: 16 },
  accountBox: { backgroundColor: '#fff', borderWidth: 1, borderColor: BORDER, borderRadius: 12, overflow: 'hidden' },
  accountRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#f1efed' },
  accountKey: { fontSize: 13.5, color: '#33383d' },
  accountVal: { fontSize: 12.5, color: TAUPE },
});
