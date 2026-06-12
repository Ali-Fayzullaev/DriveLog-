import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, font, radius } from '../theme';
import { Reminder } from '../types';

const dotColor = { ok: colors.green, warn: colors.amber, danger: colors.red };
const valColor = { ok: colors.txt, warn: colors.amber, danger: colors.red };

export default function ReminderRow({ item, onPress }: { item: Reminder; onPress?: () => void }) {
  return (
    <Pressable style={({ pressed }) => [styles.row, pressed && styles.pressed]} onPress={onPress}>
      <View style={[styles.dot, { backgroundColor: dotColor[item.urgency], shadowColor: dotColor[item.urgency] }]} />
      <View style={styles.iconBox}>
        <MaterialCommunityIcons name={item.icon as any} size={18} color={colors.txt} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.sub} numberOfLines={1}>{item.subtitle}</Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.val, { color: valColor[item.urgency] }]}>{item.value}</Text>
        <Text style={styles.unit}>{item.unit}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBrd,
    borderRadius: radius.sm,
    paddingVertical: 13,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  pressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
  dot: { width: 9, height: 9, borderRadius: 9, shadowOpacity: 0.9, shadowRadius: 6, shadowOffset: { width: 0, height: 0 }, elevation: 4 },
  iconBox: { width: 38, height: 38, borderRadius: 11, backgroundColor: colors.glass2, alignItems: 'center', justifyContent: 'center' },
  body: { flex: 1, minWidth: 0 },
  title: { fontFamily: font.semibold, fontSize: 13.5, color: colors.txt },
  sub: { fontFamily: font.regular, fontSize: 11.5, color: colors.txt3, marginTop: 2 },
  right: { alignItems: 'flex-end' },
  val: { fontFamily: font.semibold, fontSize: 13 },
  unit: { fontFamily: font.regular, fontSize: 10.5, color: colors.txt3 },
});
