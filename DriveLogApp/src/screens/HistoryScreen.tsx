import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Screen from '../components/Screen';
import GlassCard from '../components/GlassCard';
import { IconButton } from '../components/common';
import Fab from '../components/Fab';
import { useVehicles } from '../context/VehicleContext';
import { colors, font, radius } from '../theme';
import { fmtMoney } from '../data';
import { ServiceEvent } from '../types';

const filters = [
  { key: 'all', label: 'Все' },
  { key: 'oil', label: 'Масло' },
  { key: 'filter', label: 'Фильтры' },
  { key: 'tires', label: 'Шины' },
  { key: 'maintenance', label: 'ТО' },
];

const match = (e: ServiceEvent, f: string) => {
  if (f === 'all') return true;
  if (f === 'oil') return e.type.includes('oil') && e.type !== 'oil_filter';
  if (f === 'filter') return e.type.includes('filter') || e.type === 'adblue';
  if (f === 'tires') return e.type === 'tires';
  if (f === 'maintenance') return e.type === 'maintenance';
  return true;
};

export default function HistoryScreen() {
  const nav = useNavigation<any>();
  const { selected } = useVehicles();
  const [active, setActive] = useState('all');

  const total = selected.history.reduce((s, e) => s + e.cost, 0);
  const avg = Math.round(total / selected.history.length);
  const list = selected.history.filter((e) => match(e, active));

  return (
    <>
      <Screen>
        <View style={styles.head}>
          <View>
            <Text style={styles.title}>История</Text>
            <Text style={styles.sub}>{selected.make} {selected.model} · {selected.history.length} записей</Text>
          </View>
          <IconButton icon="chart-bar" onPress={() => nav.navigate('Stats')} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters} contentContainerStyle={{ gap: 8 }}>
          {filters.map((f) => (
            <Pressable key={f.key} onPress={() => setActive(f.key)} style={[styles.chip, active === f.key && styles.chipOn]}>
              <Text style={[styles.chipText, active === f.key && styles.chipTextOn]}>{f.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <GlassCard style={{ marginBottom: 18 }}>
          <View style={styles.spendRow}>
            <View>
              <Text style={styles.spendLbl}>Потрачено за 2026</Text>
              <Text style={styles.spendBig}>{fmtMoney(total)}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.spendLbl}>средний чек</Text>
              <Text style={styles.spendAvg}>{fmtMoney(avg)}</Text>
            </View>
          </View>
        </GlassCard>

        <View style={styles.tl}>
          <View style={styles.tlLine} />
          {list.map((e) => (
            <View key={e.id} style={styles.tlItem}>
              <View style={styles.node}>
                <MaterialCommunityIcons name={e.icon as any} size={11} color={colors.goldLight} />
              </View>
              <Pressable style={({ pressed }) => [styles.ev, pressed && { opacity: 0.7 }]} onPress={() => e.type === 'tires' && nav.navigate('Tire')}>
                <View style={styles.evTop}>
                  <Text style={styles.evName} numberOfLines={1}>{e.name}</Text>
                  <Text style={styles.evCost}>{fmtMoney(e.cost)}</Text>
                </View>
                <View style={styles.evDet}>
                  <Detail icon="calendar-blank-outline" text={e.date} />
                  <Detail icon="speedometer" text={e.mileage} />
                  <Detail icon="map-marker-outline" text={e.place} />
                </View>
              </Pressable>
            </View>
          ))}
        </View>
      </Screen>
      <Fab onPress={() => nav.navigate('AddEvent')} />
    </>
  );
}

function Detail({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.detail}>
      <MaterialCommunityIcons name={icon as any} size={12} color={colors.txt3} />
      <Text style={styles.detailText} numberOfLines={1}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  title: { fontFamily: font.display, fontSize: 25, color: colors.txt, letterSpacing: -0.5 },
  sub: { fontFamily: font.regular, fontSize: 12.5, color: colors.txt3, marginTop: 2 },
  filters: { marginBottom: 18, flexGrow: 0 },
  chip: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.glassBrd },
  chipOn: { backgroundColor: colors.gold, borderColor: 'transparent' },
  chipText: { fontFamily: font.medium, fontSize: 12.5, color: colors.txt2 },
  chipTextOn: { color: '#1a1406', fontFamily: font.semibold },
  spendRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  spendLbl: { fontFamily: font.regular, fontSize: 11.5, color: colors.txt3 },
  spendBig: { fontFamily: font.display, fontSize: 24, color: colors.gold, marginTop: 2 },
  spendAvg: { fontFamily: font.display, fontSize: 18, color: colors.txt, marginTop: 2 },
  tl: { position: 'relative', paddingLeft: 30 },
  tlLine: { position: 'absolute', left: 9, top: 6, bottom: 6, width: 2, backgroundColor: 'rgba(231,200,115,0.25)' },
  tlItem: { position: 'relative', marginBottom: 14 },
  node: { position: 'absolute', left: -30, top: 14, width: 20, height: 20, borderRadius: 10, backgroundColor: colors.bg1, borderWidth: 2, borderColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  ev: { backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.glassBrd, borderRadius: radius.sm, paddingVertical: 13, paddingHorizontal: 15 },
  evTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  evName: { fontFamily: font.semibold, fontSize: 13.5, color: colors.txt, flex: 1, marginRight: 8 },
  evCost: { fontFamily: font.display, fontSize: 14, color: colors.goldLight },
  evDet: { flexDirection: 'row', gap: 14, marginTop: 8 },
  detail: { flexDirection: 'row', alignItems: 'center', gap: 4, flexShrink: 1 },
  detailText: { fontFamily: font.regular, fontSize: 11.5, color: colors.txt3 },
});
