import React from 'react';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HISTORICO } from '../../constants/content';
import { NAVY, TAUPE, BORDER, softShadow, display, heading } from '../../constants/theme';
import SosFab from '../../components/SosFab';

export default function HistoricoScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <ScrollView>
        <SafeAreaView edges={['top']} style={styles.header}>
          <Text style={[display, styles.title]}>Histórico de casos</Text>
          <Text style={styles.subtitle}>Registros salvos neste dispositivo</Text>
        </SafeAreaView>
        <View style={styles.list}>
          {HISTORICO.map((h) => (
            <Pressable key={h.title} style={[styles.row, softShadow]} onPress={() => router.push('/conduta')}>
              <View style={[styles.dot, { backgroundColor: h.severity === 'grave' ? NAVY : TAUPE }]} />
              <View style={{ flex: 1 }}>
                <Text style={[heading, styles.rowTitle]}>{h.title}</Text>
                <Text style={styles.rowMeta}>{h.meta}</Text>
              </View>
              <Text style={styles.rowDate}>{h.date}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <SosFab />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#faf9f8' },
  header: { paddingHorizontal: 22, paddingBottom: 18, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eeecea' },
  title: { fontSize: 24, color: '#000' },
  subtitle: { fontSize: 12, color: TAUPE, marginTop: 5 },
  list: { padding: 16, paddingHorizontal: 22, paddingBottom: 130, gap: 9 },
  row: { flexDirection: 'row', gap: 13, alignItems: 'flex-start', backgroundColor: '#fff', borderWidth: 1, borderColor: BORDER, borderRadius: 12, padding: 15, paddingHorizontal: 16 },
  dot: { width: 8, height: 8, borderRadius: 4, marginTop: 6 },
  rowTitle: { fontSize: 15, color: '#000' },
  rowMeta: { fontSize: 11.5, color: TAUPE, marginTop: 3 },
  rowDate: { fontSize: 10.5, color: TAUPE },
});
