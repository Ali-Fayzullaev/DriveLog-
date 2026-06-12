import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, font, radius, gradients } from '../theme';
import { StatItem } from '../types';

const fillMap = {
  gold: gradients.gold,
  green: gradients.green,
  amber: gradients.amber,
  violet: gradients.violet,
} as const;

export default function StatCard({ item, onPress }: { item: StatItem; onPress?: () => void }) {
  const Wrapper: any = onPress ? Pressable : View;
  return (
    <Wrapper style={({ pressed }: any) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <View style={styles.lblRow}>
        <MaterialCommunityIcons name={item.icon as any} size={14} color={colors.txt3} />
        <Text style={styles.lbl}>{item.label}</Text>
      </View>
      <View style={styles.bigRow}>
        <Text style={styles.big}>{item.value}</Text>
        {item.unit ? <Text style={styles.unit}> {item.unit}</Text> : null}
      </View>
      <View style={styles.track}>
        <LinearGradient
          colors={fillMap[item.fill]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fill, { width: `${Math.round(item.progress * 100)}%` }]}
        />
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBrd,
    borderRadius: radius.sm,
    padding: 15,
    flex: 1,
  },
  pressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
  lblRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 9 },
  lbl: { fontFamily: font.regular, fontSize: 11.5, color: colors.txt3 },
  bigRow: { flexDirection: 'row', alignItems: 'baseline' },
  big: { fontFamily: font.display, fontSize: 22, color: colors.txt, letterSpacing: -0.5 },
  unit: { fontFamily: font.regular, fontSize: 13, color: colors.txt3 },
  track: { height: 5, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.08)', marginTop: 11, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 5 },
});
