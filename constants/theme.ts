import { TextStyle, ViewStyle } from 'react-native';

export const NAVY = '#1C4670';
export const NAVY_DEEP = '#12314e'; // sombra/base de gradiente, mesma cor, só mais escura
export const NAVY_SOFT = '#2f5c86'; // topo de gradiente, mesma cor, mais clara — nunca um tom novo
export const TAUPE = '#9f9b93';
export const BG = '#faf9f8';
export const BORDER = 'rgba(28,70,112,0.10)'; // antes era cinza sólido — agora um traço navy bem diluído
export const TEXT_MUTED = '#5a5f65';

export const NAVY_GRADIENT: [string, string] = [NAVY_SOFT, NAVY_DEEP];

// Sombra suave em vez de contorno duro — dá a leitura "elevado", não "emoldurado".
export const softShadow: ViewStyle = {
  shadowColor: NAVY_DEEP,
  shadowOpacity: 0.08,
  shadowRadius: 16,
  shadowOffset: { width: 0, height: 6 },
  elevation: 3,
};

// "cond" — Open Sans Condensed, reservada a rótulos pequenos (botões, tabs, eyebrows, tags).
// Nessa escala ela lê nítida e confiante; é em títulos GRANDES que ela pesava — por isso
// títulos grandes agora usam `display` (serifa) ou `heading` (sans sem condensar).
export const cond: TextStyle = {
  fontFamily: 'OpenSansCondensed_700Bold',
  letterSpacing: 0.3,
};

// "display" — serifa delicada para títulos de destaque (telas de entrada, hero de região,
// headline do paywall). Único elemento novo de identidade visual, usado com moderação.
export const display: TextStyle = {
  fontFamily: 'Fraunces_500Medium',
};

export const displayItalic: TextStyle = {
  fontFamily: 'Fraunces_500Medium_Italic',
};

// "heading" — títulos de seção/card. Sans normal (não condensada), peso médio: mais
// suave que o antigo bold condensado, mas ainda claramente hierárquico.
export const heading: TextStyle = {
  fontFamily: 'OpenSans_600SemiBold',
};

export const body: TextStyle = {
  fontFamily: 'OpenSans_400Regular',
};

export const bodySemibold: TextStyle = {
  fontFamily: 'OpenSans_600SemiBold',
};

export const bodyBold: TextStyle = {
  fontFamily: 'OpenSans_700Bold',
};
