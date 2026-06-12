import React from 'react';
import Svg, {
  Path, Circle, Defs, LinearGradient, Stop, Ellipse, Rect, Line,
} from 'react-native-svg';

export type VehicleModelType = 'sedan' | 'suv' | 'sport' | 'pickup' | 'truck' | 'van';

export const VEHICLE_MODELS: Array<{
  type: VehicleModelType;
  label: string;
  description: string;
  topColor: string;
  bottomColor: string;
  accentColor: string;
}> = [
  { type: 'sedan',  label: 'Легковой',    description: 'Седан · хэтчбек',        topColor: '#5B8DB8', bottomColor: '#2A5478', accentColor: '#7AAFDE' },
  { type: 'suv',    label: 'Внедорожник', description: 'SUV · кроссовер',         topColor: '#4A8060', bottomColor: '#2A5A3C', accentColor: '#6AA882' },
  { type: 'sport',  label: 'Спорткар',    description: 'Купе · суперкар',         topColor: '#C84B4B', bottomColor: '#8C2828', accentColor: '#E86A6A' },
  { type: 'pickup', label: 'Пикап',       description: 'Пикап · off-road',        topColor: '#B89A4A', bottomColor: '#8A6820', accentColor: '#D8BC6A' },
  { type: 'truck',  label: 'Фура',        description: 'Тягач · полуприцеп',      topColor: '#6A7885', bottomColor: '#3D4D5C', accentColor: '#8EA0B0' },
  { type: 'van',    label: 'Минивэн',     description: 'Бус · микроавтобус',      topColor: '#5A6A9A', bottomColor: '#2A3568', accentColor: '#7A8EC0' },
];

interface Props {
  type: VehicleModelType;
  width?: number;
  height?: number;
}

const W = { sedan: 280, suv: 280, sport: 280, pickup: 340, truck: 400, van: 280 };
const H = { sedan: 116, suv: 116, sport: 106, pickup: 116, truck: 122, van: 116 };

export default function VehicleSVG({ type, width, height }: Props) {
  const m = VEHICLE_MODELS.find((v) => v.type === type)!;
  const vw = W[type];
  const vh = H[type];
  const w = width ?? vw;
  const h = height ?? vh;
  const id = type;

  const defs = (
    <Defs>
      <LinearGradient id={`${id}_body`} x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0%" stopColor={m.topColor} />
        <Stop offset="100%" stopColor={m.bottomColor} />
      </LinearGradient>
      <LinearGradient id={`${id}_gloss`} x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
        <Stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </LinearGradient>
      <LinearGradient id={`${id}_whl`} x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0%" stopColor="#3A3A3A" />
        <Stop offset="100%" stopColor="#111" />
      </LinearGradient>
      <LinearGradient id={`${id}_rim`} x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0%" stopColor="#D8D8D8" />
        <Stop offset="100%" stopColor="#909090" />
      </LinearGradient>
    </Defs>
  );

  const wheel = (cx: number, cy: number, r = 20) => (
    <>
      <Circle cx={cx} cy={cy} r={r} fill={`url(#${id}_whl)`} />
      <Circle cx={cx} cy={cy} r={r * 0.64} fill={`url(#${id}_rim)`} />
      <Circle cx={cx} cy={cy} r={r * 0.25} fill="#333" />
      <Line x1={cx} y1={cy - r * 0.55} x2={cx} y2={cy - r * 0.28} stroke="#888" strokeWidth="2" />
      <Line x1={cx} y1={cy + r * 0.28} x2={cx} y2={cy + r * 0.55} stroke="#888" strokeWidth="2" />
      <Line x1={cx - r * 0.55} y1={cy} x2={cx - r * 0.28} y2={cy} stroke="#888" strokeWidth="2" />
      <Line x1={cx + r * 0.28} y1={cy} x2={cx + r * 0.55} y2={cy} stroke="#888" strokeWidth="2" />
    </>
  );

  if (type === 'sedan') return (
    <Svg viewBox="0 0 280 116" width={w} height={h}>
      {defs}
      <Ellipse cx="140" cy="112" rx="112" ry="5" fill="rgba(0,0,0,0.28)" />
      {wheel(72, 90)}
      {wheel(208, 90)}
      {/* Body */}
      <Path
        d="M 24,90 L 24,70 Q 28,60 50,56 L 70,52 Q 82,40 96,24 L 184,24 Q 198,40 210,52 L 232,56 Q 252,60 256,70 L 256,90 Z"
        fill={`url(#${id}_body)`}
      />
      {/* Gloss */}
      <Path
        d="M 96,24 Q 82,40 76,52 L 88,52 Q 94,38 102,26 L 182,26 Q 188,38 194,52 L 206,52 Q 200,40 188,24 Z"
        fill={`url(#${id}_gloss)`}
      />
      {/* Window */}
      <Path
        d="M 88,52 Q 98,28 104,24 L 180,24 Q 186,28 196,52 Z"
        fill="rgba(140,200,255,0.48)"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="0.8"
      />
      {/* Door lines */}
      <Path d="M 110,52 L 118,88" stroke="rgba(0,0,0,0.2)" strokeWidth="1" fill="none" />
      <Path d="M 170,52 L 162,88" stroke="rgba(0,0,0,0.2)" strokeWidth="1" fill="none" />
      {/* Sill trim */}
      <Path d="M 52,86 L 250,86" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
      {/* Headlight */}
      <Path d="M 24,72 Q 24,64 30,62 L 36,60 Q 28,64 26,72 Z" fill="rgba(255,235,130,0.9)" />
      {/* Taillight */}
      <Path d="M 256,72 Q 256,64 250,62 L 244,60 Q 252,64 254,72 Z" fill="rgba(255,70,70,0.9)" />
    </Svg>
  );

  if (type === 'suv') return (
    <Svg viewBox="0 0 280 116" width={w} height={h}>
      {defs}
      <Ellipse cx="140" cy="112" rx="112" ry="5" fill="rgba(0,0,0,0.28)" />
      {wheel(72, 92, 22)}
      {wheel(208, 92, 22)}
      {/* Body lower */}
      <Path
        d="M 20,92 L 20,70 Q 24,58 46,54 L 68,52 L 68,18 Q 70,14 88,14 L 192,14 Q 210,14 212,18 L 212,52 L 234,54 Q 256,58 260,70 L 260,92 Z"
        fill={`url(#${id}_body)`}
      />
      {/* Gloss */}
      <Path
        d="M 68,52 L 68,16 L 80,16 L 80,48 L 200,48 L 200,16 L 212,16 L 212,52 Z"
        fill={`url(#${id}_gloss)`}
        opacity={0.5}
      />
      {/* Windows */}
      <Path
        d="M 72,50 L 72,16 L 154,16 L 154,50 Z"
        fill="rgba(140,200,255,0.48)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.8"
      />
      <Path
        d="M 158,50 L 158,16 L 210,16 L 210,50 Z"
        fill="rgba(140,200,255,0.48)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.8"
      />
      {/* B-pillar */}
      <Rect x="152" y="14" width="8" height="38" fill={m.bottomColor} />
      {/* Door line */}
      <Path d="M 70,52 L 70,90" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none" />
      <Path d="M 156,52 L 156,90" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none" />
      {/* Sill */}
      <Path d="M 48,88 L 234,88" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
      {/* Lights */}
      <Rect x="20" y="64" width="6" height="14" rx="2" fill="rgba(255,235,130,0.9)" />
      <Rect x="254" y="64" width="6" height="14" rx="2" fill="rgba(255,70,70,0.9)" />
      {/* Roof rack hint */}
      <Path d="M 88,14 L 88,10 L 192,10 L 192,14" stroke={m.accentColor} strokeWidth="1.5" fill="none" />
    </Svg>
  );

  if (type === 'sport') return (
    <Svg viewBox="0 0 280 106" width={w} height={h}>
      {defs}
      <Ellipse cx="140" cy="102" rx="112" ry="5" fill="rgba(0,0,0,0.28)" />
      {wheel(76, 84, 19)}
      {wheel(204, 84, 19)}
      {/* Body */}
      <Path
        d="M 18,84 L 18,68 Q 24,56 60,50 L 82,44 Q 92,28 112,22 L 168,22 Q 192,26 216,48 L 240,54 Q 260,60 262,70 L 262,84 Z"
        fill={`url(#${id}_body)`}
      />
      {/* Gloss */}
      <Path
        d="M 112,22 Q 96,30 88,46 L 100,46 Q 108,30 118,24 L 166,24 Q 178,28 188,46 L 200,46 Q 194,28 172,22 Z"
        fill={`url(#${id}_gloss)`}
      />
      {/* Window (fastback) */}
      <Path
        d="M 100,44 Q 112,26 120,22 L 168,22 Q 192,26 210,48 L 198,50 Q 184,30 170,26 L 124,26 Q 114,30 106,46 Z"
        fill="rgba(140,200,255,0.48)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.8"
      />
      {/* Low front splitter */}
      <Path d="M 18,80 L 40,78" stroke={m.accentColor} strokeWidth="2" fill="none" />
      <Path d="M 240,78 L 262,80" stroke={m.accentColor} strokeWidth="2" fill="none" />
      {/* Side vent */}
      <Path d="M 70,60 L 76,52 L 82,54 L 76,62 Z" fill="rgba(0,0,0,0.25)" />
      {/* Door line */}
      <Path d="M 116,44 L 120,82" stroke="rgba(0,0,0,0.2)" strokeWidth="1" fill="none" />
      {/* Lights */}
      <Path d="M 18,68 Q 20,58 26,56 L 30,55 Q 22,60 20,68 Z" fill="rgba(255,235,130,0.9)" />
      <Path d="M 262,70 Q 260,60 254,58 L 250,57 Q 258,62 260,70 Z" fill="rgba(255,70,70,0.9)" />
    </Svg>
  );

  if (type === 'pickup') return (
    <Svg viewBox="0 0 340 116" width={w} height={h}>
      {defs}
      <Ellipse cx="170" cy="112" rx="150" ry="5" fill="rgba(0,0,0,0.28)" />
      {wheel(76, 92, 22)}
      {wheel(194, 92, 22)}
      {wheel(290, 92, 20)}
      {/* Cab */}
      <Path
        d="M 18,92 L 18,62 Q 22,44 56,32 L 88,22 L 162,22 Q 178,24 180,38 L 180,92 Z"
        fill={`url(#${id}_body)`}
      />
      {/* Cab window */}
      <Path
        d="M 34,64 Q 38,36 60,28 L 88,22 L 162,22 Q 174,26 176,42 L 176,64 Z"
        fill="rgba(140,200,255,0.48)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.8"
      />
      {/* Cab gloss */}
      <Path
        d="M 60,28 Q 50,40 44,64 L 52,64 Q 58,40 66,30 L 162,24 L 162,22 L 88,22 Z"
        fill={`url(#${id}_gloss)`}
      />
      {/* Bed */}
      <Path
        d="M 186,92 L 186,44 L 316,44 L 316,92 Z"
        fill={`url(#${id}_body)`}
        opacity={0.85}
      />
      {/* Bed rails */}
      <Path d="M 186,44 L 186,50" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
      <Path d="M 316,44 L 316,50" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
      <Path d="M 186,44 L 316,44" stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none" />
      {/* Bed floor */}
      <Path d="M 188,90 L 314,90" stroke="rgba(0,0,0,0.2)" strokeWidth="1" fill="none" />
      {/* Headlight */}
      <Rect x="18" y="70" width="7" height="12" rx="2" fill="rgba(255,235,130,0.9)" />
      {/* Taillight */}
      <Rect x="311" y="52" width="7" height="20" rx="2" fill="rgba(255,70,70,0.9)" />
      {/* Fender flares */}
      <Path d="M 50,92 Q 60,82 86,80 Q 108,80 122,92" stroke={m.topColor} strokeWidth="3" fill="none" />
      <Path d="M 168,92 Q 178,82 204,80 Q 224,80 238,92" stroke={m.topColor} strokeWidth="3" fill="none" />
    </Svg>
  );

  if (type === 'truck') return (
    <Svg viewBox="0 0 400 122" width={w} height={h}>
      {defs}
      <Ellipse cx="200" cy="118" rx="185" ry="5" fill="rgba(0,0,0,0.28)" />
      {wheel(52, 102, 20)}
      {wheel(104, 102, 20)}
      {wheel(322, 102, 20)}
      {wheel(348, 102, 20)}
      {/* Cab */}
      <Path
        d="M 18,104 L 18,36 Q 22,14 54,12 L 90,12 Q 110,12 112,28 L 114,104 Z"
        fill={`url(#${id}_body)`}
      />
      {/* Cab window */}
      <Path
        d="M 28,52 Q 30,18 56,14 L 88,14 Q 106,16 108,32 L 108,52 Z"
        fill="rgba(140,200,255,0.48)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.8"
      />
      {/* Cab gloss */}
      <Path
        d="M 28,52 Q 30,18 44,14 L 44,18 Q 34,22 32,52 Z"
        fill={`url(#${id}_gloss)`}
      />
      {/* Exhaust stack */}
      <Rect x="92" y="6" width="6" height="30" rx="3" fill={m.bottomColor} />
      <Rect x="92" y="6" width="6" height="6" rx="3" fill="#555" />
      {/* Coupling / 5th wheel */}
      <Path d="M 112,68 L 128,68 L 128,78 L 112,78 Z" fill={m.bottomColor} />
      {/* Trailer */}
      <Path
        d="M 130,104 L 130,26 L 380,26 L 380,104 Z"
        fill={`url(#${id}_body)`}
        opacity={0.8}
      />
      {/* Trailer ribs */}
      {[168, 206, 244, 282, 320, 358].map((x) => (
        <Path key={x} d={`M ${x},28 L ${x},102`} stroke="rgba(0,0,0,0.15)" strokeWidth="1" fill="none" />
      ))}
      {/* Trailer top rail */}
      <Path d="M 130,26 L 380,26" stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none" />
      {/* Headlight */}
      <Rect x="18" y="78" width="7" height="14" rx="2" fill="rgba(255,235,130,0.9)" />
      {/* Taillight */}
      <Rect x="374" y="62" width="8" height="24" rx="2" fill="rgba(255,70,70,0.9)" />
      {/* Bumper */}
      <Path d="M 18,104 L 18,96 L 24,94 L 24,104" fill="rgba(0,0,0,0.3)" />
    </Svg>
  );

  // van
  return (
    <Svg viewBox="0 0 280 116" width={w} height={h}>
      {defs}
      <Ellipse cx="140" cy="112" rx="112" ry="5" fill="rgba(0,0,0,0.28)" />
      {wheel(72, 92, 20)}
      {wheel(210, 92, 20)}
      {/* Body */}
      <Path
        d="M 20,92 L 20,38 Q 24,12 52,12 L 228,12 Q 256,12 260,36 L 260,92 Z"
        fill={`url(#${id}_body)`}
      />
      {/* Gloss */}
      <Path
        d="M 20,38 Q 24,12 40,12 L 40,18 Q 28,18 26,42 Z"
        fill={`url(#${id}_gloss)`}
      />
      {/* Front window */}
      <Path
        d="M 28,52 Q 30,16 54,14 L 154,14 L 154,52 Z"
        fill="rgba(140,200,255,0.48)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.8"
      />
      {/* Side windows */}
      <Rect x="158" y="16" width="58" height="38" rx="3" fill="rgba(140,200,255,0.48)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
      <Rect x="220" y="16" width="36" height="38" rx="3" fill="rgba(140,200,255,0.48)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
      {/* Sliding door line */}
      <Path d="M 156,14 L 156,90" stroke="rgba(0,0,0,0.2)" strokeWidth="2" fill="none" />
      <Path d="M 218,14 L 218,90" stroke="rgba(0,0,0,0.2)" strokeWidth="2" fill="none" />
      {/* Sill */}
      <Path d="M 50,88 L 242,88" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
      {/* Lights */}
      <Rect x="20" y="62" width="8" height="18" rx="3" fill="rgba(255,235,130,0.9)" />
      <Rect x="252" y="62" width="8" height="18" rx="3" fill="rgba(255,70,70,0.9)" />
      {/* Roof rail */}
      <Path d="M 52,12 L 52,8 L 228,8 L 228,12" stroke={m.accentColor} strokeWidth="1.5" fill="none" />
    </Svg>
  );
}
