// Ícones portados 1:1 (mesmos paths) do protótipo "SafeHof Atlas v2".
import React, { ReactNode } from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

export type IconProps = { size?: number; color?: string; strokeWidth?: number };

function IconBase({
  size = 20,
  color = '#1C4670',
  strokeWidth = 1.6,
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
      {children}
    </Svg>
  );
}

export const SearchIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Circle cx={11} cy={11} r={7} />
    <Path d="M20 20l-4-4" />
  </IconBase>
);

export const AcidoIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M12 3c3.5 4.2 5.5 7 5.5 9.5A5.5 5.5 0 0 1 12 18a5.5 5.5 0 0 1-5.5-5.5C6.5 10 8.5 7.2 12 3z" />
  </IconBase>
);

export const ToxinaIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Rect x={8} y={7} width={8} height={14} rx={2} />
    <Path d="M9 3h6M12 3v4M8 12h8" />
  </IconBase>
);

export const BioIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Circle cx={8} cy={9} r={2.2} />
    <Circle cx={15} cy={13} r={2.2} />
    <Circle cx={10} cy={17} r={2.2} />
    <Path d="M4 4l16 16" />
  </IconBase>
);

export const UsIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Circle cx={12} cy={12} r={2} />
    <Path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2" />
  </IconBase>
);

export const FiosIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M4 18c5-1 7-4 8-7s3-5 8-5" />
    <Path d="M7 15l-1.5 3M11 11l-1 3M15 8l-.6 3" />
  </IconBase>
);

export const SosIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 3h16l-2-3z" />
    <Path d="M10 21h4" />
  </IconBase>
);

export const ProtocolosIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Rect x={5} y={3} width={14} height={18} rx={2} />
    <Path d="M9 8h6M9 12h6M9 16h3" />
  </IconBase>
);

export const AnatomyIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M15 21c0-3 2-4 2-8A6 6 0 0 0 6 9.5c0 2 .5 3 .5 4.5H5l1.8 2.2-.8.8 1 1v3" />
    <Circle cx={13} cy={9} r={1} />
  </IconBase>
);

export const DorIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M13 2L5 13h6l-1 9 8-11h-6l1-9z" />
  </IconBase>
);

export const PalidezIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Circle cx={12} cy={12} r={8} />
    <Path d="M9 10h.01M15 10h.01M9 15c1.5-1 4.5-1 6 0" />
  </IconBase>
);

export const LivedoIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M6 21V9M6 13l-2.5-3M6 15l2.5-3M12 21V6M12 11L9 7M12 13l3-4M18 21V10M18 14l-2-3M18 16l2-3" />
  </IconBase>
);

export const EdemaIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M12 4c3.2 4 5 6.6 5 8.8A5 5 0 0 1 7 12.8C7 10.6 8.8 8 12 4z" />
  </IconBase>
);

export const VisualIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z" />
    <Circle cx={12} cy={12} r={2.5} />
  </IconBase>
);

export const NecroseIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Circle cx={12} cy={12} r={1.4} />
    <Circle cx={8} cy={9} r={1} />
    <Circle cx={16} cy={9} r={1} />
    <Circle cx={8} cy={15} r={1} />
    <Circle cx={16} cy={15} r={1} />
    <Circle cx={12} cy={6} r={1} />
    <Circle cx={12} cy={18} r={1} />
  </IconBase>
);

export const ImediataIcon = DorIcon;

export const AlertaIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M12 4l9 16H3L12 4z" />
    <Path d="M12 10v4M12 17h.01" />
  </IconBase>
);

export const MateriaisIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Rect x={3} y={7} width={18} height={13} rx={2} />
    <Path d="M8 7V5h8v2M12 11v5M9.5 13.5h5" />
  </IconBase>
);

export const EncaminharIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Circle cx={10} cy={8} r={3.2} />
    <Path d="M4 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M18 8h4M20 6v4" />
  </IconBase>
);

export const AcompanhamentoIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Rect x={3} y={5} width={18} height={16} rx={2} />
    <Path d="M3 10h18M8 3v4M16 3v4" />
  </IconBase>
);

export const HomeIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M4 11l8-6 8 6v9H4z" />
  </IconBase>
);

export const StarIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M12 4l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 9.7l5.4-.8L12 4z" />
  </IconBase>
);

export const HistoryIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Circle cx={12} cy={12} r={8} />
    <Path d="M12 7v5l3 2" />
  </IconBase>
);

export const DotsIcon = (p: IconProps) => (
  <IconBase {...p} strokeWidth={p.strokeWidth ?? 1.9}>
    <Circle cx={6} cy={12} r={1} />
    <Circle cx={12} cy={12} r={1} />
    <Circle cx={18} cy={12} r={1} />
  </IconBase>
);

export const RegistrarIcon = (p: IconProps) => (
  <IconBase {...p}>
    <Path d="M6 3h9l4 4v14H6z" />
    <Path d="M9 12h6M9 16h4" />
  </IconBase>
);
