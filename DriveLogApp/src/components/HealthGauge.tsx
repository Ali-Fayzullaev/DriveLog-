import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { colors, font } from '../theme';

interface Props {
  value: number; // 0..100
  size?: number;
  label?: string;
}

export default function HealthGauge({ value, size = 128, label = 'здоровье' }: Props) {
  const stroke = 11;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);
  const center = size / 2;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Defs>
          <SvgGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={colors.goldLight} />
            <Stop offset="0.5" stopColor={colors.gold} />
            <Stop offset="1" stopColor={colors.goldDark} />
          </SvgGradient>
        </Defs>
        <Circle cx={center} cy={center} r={r} stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} fill="none" />
        <Circle
          cx={center}
          cy={center}
          r={r}
          stroke="url(#gaugeGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          fill="none"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>
      <View style={styles.center}>
        <Text style={styles.num}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  num: { fontFamily: font.displayBold, fontSize: 34, color: colors.gold, lineHeight: 38 },
  label: { fontFamily: font.regular, fontSize: 12, color: colors.txt3, marginTop: 2 },
});
