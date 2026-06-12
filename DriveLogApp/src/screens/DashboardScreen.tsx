import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import Screen from '../components/Screen';
import GlassCard from '../components/GlassCard';
import HealthGauge from '../components/HealthGauge';
import StatCard from '../components/StatCard';
import ReminderRow from '../components/ReminderRow';
import { SectionLabel, Avatar } from '../components/common';
import Fab from '../components/Fab';
import { useVehicles } from '../context/VehicleContext';
import { colors, font, radius, gradients } from '../theme';

export default function DashboardScreen() {
  const nav = useNavigation<any>();
  const { selected } = useVehicles();
  const isTruck = selected.kind === 'truck';

  const healthColor =
    selected.health >= 80 ? colors.green : selected.health >= 50 ? colors.amber : colors.red;

  const weekReminders = selected.reminders.filter((r) => r.group === 'overdue' || r.group === 'week' || r.group === 'month').slice(0, 3);

  return (
    <>
      <Screen>
        {/* Header: vehicle switcher chip + avatar */}
        <View style={styles.head}>
          <Pressable style={styles.chip} onPress={() => nav.navigate('Garage')}>
            <LinearGradient colors={gradients.gold} style={styles.chipDot}>
              <MaterialCommunityIcons name={isTruck ? 'truck' : 'car'} size={16} color="#1a1406" />
            </LinearGradient>
            <Text style={styles.chipText}>{selected.make} {selected.model}</Text>
            <MaterialCommunityIcons name="chevron-down" size={18} color={colors.txt3} />
          </Pressable>
          <Avatar text="АФ" />
        </View>

        {/* Health card */}
        <GlassCard>
          <View style={styles.healthRow}>
            <HealthGauge value={selected.health} />
            <View style={styles.healthMeta}>
              <Text style={styles.healthTitle}>{selected.healthLabel}</Text>
              {selected.reminders.slice(0, 3).map((r) => (
                <View key={r.id} style={styles.metaLine}>
                  <View style={[styles.metaIc, { backgroundColor: tint(r.urgency) }]}>
                    <MaterialCommunityIcons
                      name={r.urgency === 'ok' ? 'check' : r.urgency === 'warn' ? 'alert' : 'alert-circle'}
                      size={12}
                      color={dot(r.urgency)}
                    />
                  </View>
                  <Text style={styles.metaText} numberOfLines={1}>{r.title}</Text>
                </View>
              ))}
            </View>
          </View>

          {isTruck && (
            <View style={styles.truckBanner}>
              <View style={styles.truckBadge}>
                <MaterialCommunityIcons name="truck-trailer" size={14} color={colors.goldLight} />
                <Text style={styles.truckBadgeText}>Тягач + полуприцеп · {selected.axles} оси</Text>
              </View>
              <Text style={styles.trailerPlate}>{selected.trailerPlate}</Text>
            </View>
          )}
        </GlassCard>

        {/* Stat grid */}
        <View style={styles.grid}>
          {selected.stats.map((s, i) => (
            <View key={s.key} style={styles.cell}>
              <StatCard item={s} onPress={s.target ? () => nav.navigate(s.target) : undefined} />
            </View>
          ))}
        </View>

        {/* AdBlue warning for truck */}
        {isTruck && selected.adBlueLevel !== undefined && selected.adBlueLevel < 0.35 && (
          <GlassCard style={styles.adblue}>
            <View style={styles.adblueRow}>
              <MaterialCommunityIcons name="water-alert-outline" size={22} color={colors.amber} />
              <Text style={styles.adblueText}>
                AdBlue на исходе — <Text style={{ color: colors.goldLight }}>{Math.round(selected.adBlueLevel * 100)}%</Text>. Долейте в ближайшие ~520 км.
              </Text>
            </View>
          </GlassCard>
        )}

        {/* Reminders */}
        <SectionLabel title="Напоминания · эта неделя" action="всё →" onAction={() => nav.navigate('Reminders')} />
        {weekReminders.map((r) => (
          <ReminderRow key={r.id} item={r} onPress={() => nav.navigate('Reminders')} />
        ))}
      </Screen>
      <Fab onPress={() => nav.navigate('AddEvent')} />
    </>
  );
}

const tint = (u: string) => (u === 'ok' ? 'rgba(94,224,168,0.14)' : u === 'warn' ? 'rgba(255,193,94,0.14)' : 'rgba(255,122,133,0.14)');
const dot = (u: string) => (u === 'ok' ? colors.green : u === 'warn' ? colors.amber : colors.red);

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.glassBrd, borderRadius: 30, paddingVertical: 7, paddingLeft: 8, paddingRight: 14 },
  chipDot: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  chipText: { fontFamily: font.semibold, fontSize: 13, color: colors.txt },
  healthRow: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  healthMeta: { flex: 1 },
  healthTitle: { fontFamily: font.bold, fontSize: 16, color: colors.txt, marginBottom: 8 },
  metaLine: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 7 },
  metaIc: { width: 24, height: 24, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  metaText: { fontFamily: font.regular, fontSize: 12.5, color: colors.txt2, flex: 1 },
  truckBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingTop: 14, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  truckBadge: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  truckBadgeText: { fontFamily: font.medium, fontSize: 12, color: colors.txt2 },
  trailerPlate: { fontFamily: font.semibold, fontSize: 12, color: colors.txt3, letterSpacing: 0.5 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 14, marginHorizontal: -6 },
  cell: { width: '50%', paddingHorizontal: 6, marginBottom: 12 },
  adblue: { borderColor: 'rgba(255,193,94,0.25)', backgroundColor: 'rgba(255,193,94,0.08)', marginTop: 2 },
  adblueRow: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  adblueText: { flex: 1, fontFamily: font.regular, fontSize: 12.5, color: colors.txt2, lineHeight: 18 },
});
