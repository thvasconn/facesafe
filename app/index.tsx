import React from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Platform, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NAVY_GRADIENT, TAUPE, cond, display, displayItalic, body } from '../constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const goHome = () => router.replace('/(tabs)');

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={NAVY_GRADIENT} start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.safe}>
        <View>
          <Text style={[display, styles.brand]}>SafeHof</Text>
          <View style={styles.rule} />
          <Text style={[displayItalic, styles.tagline]}>
            Atlas clínico e condutas em intercorrências de Harmonização Orofacial.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={[body, styles.label]}>E-mail profissional</Text>
            <View style={styles.inputGlass}>
              <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
              <TextInput
                style={styles.input}
                value="dra.marina@clinica.com.br"
                editable={false}
                placeholderTextColor="rgba(255,255,255,.5)"
              />
            </View>
          </View>
          <View style={styles.field}>
            <Text style={[body, styles.label]}>Senha</Text>
            <View style={styles.inputGlass}>
              <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
              <TextInput style={styles.input} value="000000000" secureTextEntry editable={false} />
            </View>
          </View>
          <Pressable style={styles.primaryBtn} onPress={goHome}>
            <Text style={[cond, styles.primaryBtnText]}>Entrar</Text>
          </Pressable>
          <Pressable style={styles.secondaryBtn} onPress={goHome}>
            <Text style={[body, styles.secondaryBtnText]}>Criar conta profissional</Text>
          </Pressable>
          <Text style={[body, styles.footnote]}>
            Acesso restrito a cirurgiões-dentistas e médicos{'\n'}com registro ativo em conselho de classe.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safe: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 36,
  },
  brand: { fontSize: 46, color: '#fff', lineHeight: 50 },
  rule: { width: 40, height: 1, backgroundColor: TAUPE, opacity: 0.6, marginVertical: 18 },
  tagline: { fontSize: 15.5, lineHeight: 23, color: 'rgba(255,255,255,.78)', maxWidth: 250 },
  form: { gap: 12 },
  field: { gap: 8, marginBottom: 4 },
  label: { fontSize: 10.5, letterSpacing: 1.3, textTransform: 'uppercase', color: 'rgba(255,255,255,.55)' },
  inputGlass: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.16)',
    overflow: 'hidden',
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,.05)',
    padding: 14,
    color: '#fff',
    fontSize: 14,
    position: 'relative',
    zIndex: 1,
  },
  primaryBtn: { marginTop: 8, width: '100%', backgroundColor: '#fff', borderRadius: 10, paddingVertical: 16, alignItems: 'center' },
  primaryBtnText: { color: NAVY_GRADIENT[1], fontSize: 15, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase' },
  secondaryBtn: { width: '100%', borderWidth: 1, borderColor: 'rgba(255,255,255,.25)', borderRadius: 10, paddingVertical: 15, alignItems: 'center' },
  secondaryBtnText: { color: 'rgba(255,255,255,.8)', fontSize: 13.5 },
  footnote: { textAlign: 'center', fontSize: 10.5, lineHeight: 15, color: 'rgba(255,255,255,.45)', marginTop: 6 },
});
