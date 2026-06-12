import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import Screen from '../components/Screen';
import GlassCard from '../components/GlassCard';
import { GhostButton, SectionLabel, Avatar } from '../components/common';
import { useVehicles } from '../context/VehicleContext';
import { colors, font, gradients } from '../theme';
import { fmtMoney } from '../data';

export default function StatsScreen() {
  const nav = useNavigation<any>();
  const { selected } = useVehicles();

  const total = selected.history.reduce((s, e) => s + e.cost, 0);
  const avg = Math.round(total / selected.history.length);
  const perKm = (total / (selected.mileage * 0.05)).toFixed(1);

  const bars = [
    { m: 'фев', h: 40, on: true }, { m: 'апр', h: 18, on: false }, { m: 'июл', h: 90, on: true },
    { m: 'сен', h: 28, on: false }, { m: 'окт', h: 55, on: false }, { m: 'июн', h: 46, on: true },
  ];

  const cats = [
    { name: 'ТО', color: colors.gold, value: Math.round(total * 0.39) },
    { name: 'Масло', color: colors.violet, value: Math.round(total * 0.28) },
    { name: 'Шины', color: colors.green, value: Math.round(total * 0.2) },
    { name: 'Фильтры', color: colors.blue, value: Math.round(total * 0.13) },
  ];

  return (
    <Screen>
      <Pressable style={styles.back} onPress={() => nav.goBack()}>
        <MaterialCommunityIcons name="chevron-left" size={20} color={colors.txt2} />
        <Text style={styles.backText}>история</Text>
      </Pressable>
      <View style={styles.head}>
        <Text style={styles.title}>Расходы</Text>
        <Avatar text="₽" />
      </View>

      <View style={styles.grid}>
        <Metric label="за год" value={fmtMoney(total)} />
        <Metric label="средний чек" value={fmtMoney(avg)} />
        <Metric label="на 1 км" value={`${perKm} ₽`} />
        <Metric label="записей" value={String(selected.history.length)} />
      </View>

      <SectionLabel title="По месяцам" />
      <GlassCard>
        <View style={styles.chart}>
          {bars.map((b, i) => (
            <View key={i} style={styles.barCol}>
              {b.on ? (
                <LinearGradient colors={gradients.gold} style={[styles.bar, { height: b.h }]} />
              ) : (
                <View style={[styles.bar, { height: b.h, backgroundColor: 'rgba(255,255,255,0.12)' }]} />
              )}
              <Text style={styles.barLabel}>{b.m}</Text>
            </View>
          ))}
        </View>
      </GlassCard>

      <SectionLabel title="По категориям" />
      <GlassCard>
        {cats.map((c, i) => (
          <View key={c.name} style={[styles.catRow, i < cats.length - 1 && { marginBottom: 13 }]}>
            <View style={styles.catLeft}>
              <View style={[styles.catDot, { backgroundColor: c.color }]} />
              <Text style={styles.catName}>{c.name}</Text>
            </View>
            <Text style={styles.catVal}>{fmtMoney(c.value)}</Text>
          </View>
        ))}
      </GlassCard>

      <GhostButton title="Экспорт в PDF для продажи" icon="file-pdf-box" style={{ marginTop: 18 }} />
    </Screen>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  back: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  backText: { fontFamily: font.regular, fontSize: 13, color: colors.txt2 },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  title: { fontFamily: font.display, fontSize: 25, color: colors.txt, letterSpacing: -0.5 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6, marginTop: 14 },
  metric: { width: '50%', paddingHorizontal: 6, marginBottom: 12 },
  metricLabel: { fontFamily: font.regular, fontSize: 11.5, color: colors.txt3, marginBottom: 6 },
  metricValue: { fontFamily: font.display, fontSize: 20, color: colors.txt },
  chart: { flexDirection: 'row', alignItems: 'flex-end', gap: 9, height: 130 },
  barCol: { flex: 1, alignItems: 'center' },
  bar: { width: '100%', borderRadius: 7 },
  barLabel: { fontFamily: font.regular, fontSize: 10, color: colors.txt3, marginTop: 7 },
  catRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  catLeft: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  catDot: { width: 11, height: 11, borderRadius: 3 },
  catName: { fontFamily: font.regular, fontSize: 13, color: colors.txt },
  catVal: { fontFamily: font.display, fontSize: 14, color: colors.txt },
});
