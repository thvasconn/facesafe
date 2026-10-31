import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LAYERS } from '../constants/content';
import { TAUPE, cond, display, body } from '../constants/theme';

export default function AnatomyScreen() {
  const router = useRouter();
  const [layersOn, setLayersOn] = useState<Record<string, boolean>>(
    () => Object.fromEntries(LAYERS.map((l) => [l.name, true]))
  );

  const toggleLayer = (name: string) => setLayersOn((s) => ({ ...s, [name]: !s[name] }));
  const visible = LAYERS.filter((l) => layersOn[l.name]);

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <Pressable onPress={() => router.push('/(tabs)')}>
          <Text style={styles.back}>‹</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={[display, styles.title]}>Anatomia em camadas</Text>
          <Text style={[body, styles.subtitle]}>Corte coronal · região temporal</Text>
        </View>
      </SafeAreaView>

      <View style={styles.diagram}>
        <View style={styles.diagramInner}>
          {visible.map((l) => (
            <View key={l.name} style={[styles.band, { flex: l.height, backgroundColor: l.color }]}>
              <Text style={styles.bandLabel}>{l.name}</Text>
            </View>
          ))}
        </View>
        <View style={styles.diagramCaption}>
          <Text style={styles.diagramCaptionText}>Ilustração técnica — placeholder</Text>
        </View>
      </View>

      <View style={styles.legendArea}>
        <Text style={[cond, styles.legendTitle]}>Camadas visíveis</Text>
        <View style={styles.chips}>
          {LAYERS.map((l) => {
            const on = layersOn[l.name];
            return (
              <Pressable
                key={l.name}
                style={[styles.chip, { borderColor: on ? 'rgba(255,255,255,.28)' : 'rgba(255,255,255,.08)' }]}
                onPress={() => toggleLayer(l.name)}
              >
                {on && <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />}
                <View style={[styles.swatch, { backgroundColor: l.color, opacity: on ? 1 : 0.3 }]} />
                <Text style={[styles.chipText, { color: on ? '#fff' : '#5c5c5c' }]}>{l.name}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 22, paddingTop: 4, paddingBottom: 14 },
  back: { color: 'rgba(255,255,255,.7)', fontSize: 16 },
  title: { fontSize: 19, color: '#fff' },
  subtitle: { fontSize: 11, color: TAUPE, marginTop: 2 },
  diagram: { flex: 1, marginHorizontal: 16, borderRadius: 12, overflow: 'hidden', backgroundColor: '#0a0a0a', borderWidth: 1, borderColor: '#1e1e1e' },
  diagramInner: { flex: 1 },
  band: { justifyContent: 'center', paddingLeft: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,.18)' },
  bandLabel: { fontSize: 9.5, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: '700', color: 'rgba(0,0,0,.55)' },
  diagramCaption: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingVertical: 10, paddingHorizontal: 14 },
  diagramCaptionText: { fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: '#5c5c5c' },
  legendArea: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 34 },
  legendTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase', color: TAUPE, marginBottom: 10 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 9, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, overflow: 'hidden' },
  swatch: { width: 9, height: 9, borderRadius: 2 },
  chipText: { fontSize: 12 },
});
