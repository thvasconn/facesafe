import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { SYMPTOMS, SEVERITIES, STEP_NAMES } from '../constants/content';
import { NAVY, NAVY_GRADIENT, TAUPE, BORDER, TEXT_MUTED, softShadow, cond, heading, body } from '../constants/theme';
import { DorIcon, PalidezIcon, LivedoIcon, EdemaIcon, VisualIcon, NecroseIcon, IconProps } from '../components/icons';

const SYMPTOM_ICONS: Record<string, (p: IconProps) => React.JSX.Element> = {
  dor: DorIcon,
  palidez: PalidezIcon,
  livedo: LivedoIcon,
  edema: EdemaIcon,
  visual: VisualIcon,
  necrose: NecroseIcon,
};

const ACTIVE_STEP = 2; // "2. Sinais e sintomas" é o passo corrente nesta tela, igual ao mock

export default function WizardScreen() {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useApp();
  const [symptoms, setSymptoms] = useState<Record<string, boolean>>(
    () => Object.fromEntries(SYMPTOMS.map((s) => [s.key, s.defaultOn]))
  );
  const [severity, setSeverity] = useState<'leve' | 'moderada' | 'grave'>('moderada');

  const toggleSymptom = (key: string) => setSymptoms((s) => ({ ...s, [key]: !s[key] }));

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <Pressable style={styles.navBtn} onPress={() => router.back()}>
            <Text style={styles.navBtnText}>‹</Text>
          </Pressable>
          <Text style={[cond, styles.headerTitle]}>Ácido hialurônico</Text>
          <Pressable style={styles.navBtn} onPress={toggleFavorite}>
            <Text style={styles.navBtnIcon}>{isFavorite ? '★' : '☆'}</Text>
          </Pressable>
        </View>

        <View style={styles.stepper}>
          {STEP_NAMES.map((name, i) => {
            const n = i + 1;
            const done = n <= ACTIVE_STEP;
            const active = n === ACTIVE_STEP;
            return (
              <View key={name} style={styles.stepItem}>
                <View
                  style={[
                    styles.stepDot,
                    { backgroundColor: active ? NAVY : done ? '#dfe6ed' : '#fff', borderColor: done ? NAVY : BORDER },
                  ]}
                >
                  <Text style={[styles.stepDotText, { color: active ? '#fff' : done ? NAVY : TAUPE }]}>{n}</Text>
                </View>
                <Text style={[styles.stepLabel, { color: active ? NAVY : TAUPE, fontWeight: active ? '700' : '400' }]}>
                  {name}
                </Text>
              </View>
            );
          })}
        </View>
      </SafeAreaView>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        <Text style={[heading, styles.sectionTitle]}>2. Sinais e sintomas</Text>
        <Text style={[body, styles.sectionDesc]}>Selecione os sinais e sintomas presentes no paciente.</Text>
        <View style={styles.grid3}>
          {SYMPTOMS.map((s) => {
            const on = symptoms[s.key];
            const Icon = SYMPTOM_ICONS[s.key];
            return (
              <Pressable
                key={s.key}
                style={[styles.symptomCard, softShadow, { borderColor: on ? 'rgba(28,70,112,0.35)' : BORDER, backgroundColor: on ? '#f5f8fb' : '#fff' }]}
                onPress={() => toggleSymptom(s.key)}
              >
                <View style={[styles.badge, { backgroundColor: on ? NAVY : 'transparent', borderColor: on ? NAVY : '#dcd9d5' }]}>
                  {on && <Text style={styles.badgeCheck}>✓</Text>}
                </View>
                <Icon size={22} color={on ? NAVY : TAUPE} />
                <Text style={[styles.symptomText, { color: on ? '#000' : '#6b6f74' }]}>{s.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={[heading, styles.sectionTitle, { marginTop: 24 }]}>3. Gravidade</Text>
        <Text style={[body, styles.sectionDesc]}>Avalie a gravidade do quadro.</Text>
        <View style={styles.grid3}>
          {SEVERITIES.map((sev) => {
            const on = severity === sev.key;
            return (
              <Pressable
                key={sev.key}
                style={[styles.severityCard, softShadow, { borderColor: on ? 'rgba(28,70,112,0.35)' : BORDER, backgroundColor: on ? '#f5f8fb' : '#fff' }]}
                onPress={() => setSeverity(sev.key)}
              >
                <Text style={[cond, styles.severityTitle, { color: on ? NAVY : '#000' }]}>{sev.title}</Text>
                <Text style={styles.severitySubtitle}>{sev.subtitle}</Text>
                <View style={[styles.radio, { borderColor: on ? NAVY : '#dcd9d5', backgroundColor: on ? NAVY : 'transparent' }]} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <Pressable style={styles.continueBtn} onPress={() => router.push('/conduta')}>
          <LinearGradient colors={NAVY_GRADIENT} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFill} />
          <Text style={[cond, styles.continueBtnText]}>Continuar →</Text>
        </Pressable>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>2 de 5 etapas</Text>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#faf9f8' },
  safe: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eeecea' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 18, paddingTop: 8, paddingBottom: 12 },
  navBtn: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#f4f3f1', alignItems: 'center', justifyContent: 'center' },
  navBtnText: { color: NAVY, fontSize: 16 },
  navBtnIcon: { color: NAVY, fontSize: 13 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '800', color: '#000' },
  stepper: { flexDirection: 'row', paddingHorizontal: 14, paddingBottom: 14, paddingTop: 4 },
  stepItem: { flex: 1, alignItems: 'center', gap: 6 },
  stepDot: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  stepDotText: { fontSize: 11.5, fontWeight: '700' },
  stepLabel: { fontSize: 8.5, lineHeight: 11, textAlign: 'center', maxWidth: 62 },
  body: { flex: 1 },
  bodyContent: { padding: 22, paddingBottom: 24 },
  sectionTitle: { fontSize: 16.5, color: NAVY },
  sectionDesc: { fontSize: 12.5, lineHeight: 18, color: TEXT_MUTED, marginTop: 5, marginBottom: 14 },
  grid3: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  symptomCard: { width: '31%', position: 'relative', alignItems: 'center', gap: 9, paddingVertical: 18, paddingHorizontal: 6, borderRadius: 10, borderWidth: 1 },
  badge: { position: 'absolute', top: 6, right: 6, width: 15, height: 15, borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  badgeCheck: { color: '#fff', fontSize: 9 },
  symptomText: { fontSize: 11, fontWeight: '600', textAlign: 'center', lineHeight: 13 },
  severityCard: { width: '31%', alignItems: 'flex-start', gap: 4, paddingVertical: 13, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1 },
  severityTitle: { fontSize: 14.5, fontWeight: '700' },
  severitySubtitle: { fontSize: 10.5, lineHeight: 14, color: TAUPE },
  radio: { marginTop: 6, width: 13, height: 13, borderRadius: 7, borderWidth: 1 },
  footer: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eeecea', paddingHorizontal: 22, paddingTop: 14, paddingBottom: 12 },
  continueBtn: { width: '100%', borderRadius: 10, paddingVertical: 17, alignItems: 'center', overflow: 'hidden' },
  continueBtnText: { color: '#fff', fontSize: 15, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 12 },
  progressLabel: { fontSize: 11, color: TAUPE },
  progressTrack: { flex: 1, height: 4, borderRadius: 2, backgroundColor: '#e6e4e1', overflow: 'hidden' },
  progressFill: { height: '100%', width: '40%', backgroundColor: NAVY },
});
