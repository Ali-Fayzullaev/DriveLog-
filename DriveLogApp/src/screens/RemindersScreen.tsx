import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Screen from '../components/Screen';
import ReminderRow from '../components/ReminderRow';
import { IconButton, GoldButton, GhostButton, SectionLabel } from '../components/common';
import { useVehicles } from '../context/VehicleContext';
import { colors, font } from '../theme';

const groups: { key: 'overdue' | 'week' | 'month' | 'later'; label: string; color: string }[] = [
  { key: 'overdue', label: 'Просрочено', color: colors.red },
  { key: 'week', label: 'Эта неделя', color: colors.amber },
  { key: 'month', label: 'Этот месяц', color: colors.txt2 },
  { key: 'later', label: 'Позже', color: colors.txt2 },
];

export default function RemindersScreen() {
  const nav = useNavigation<any>();
  const { selected } = useVehicles();

  const overdue = selected.reminders.filter((r) => r.group === 'overdue').length;
  const active = selected.reminders.length;

  return (
    <Screen>
      <View style={styles.head}>
        <View>
          <Text style={styles.title}>Напоминания</Text>
          <Text style={styles.sub}>{active} активных · {overdue} просрочено</Text>
        </View>
        <IconButton icon="calendar-month-outline" />
      </View>

      {groups.map((g) => {
        const items = selected.reminders.filter((r) => r.group === g.key);
        if (!items.length) return null;
        return (
          <View key={g.key}>
            <SectionLabel title={g.label} color={g.color} />
            {items.map((r) => (
              <ReminderRow key={r.id} item={r} onPress={() => nav.navigate('AddEvent')} />
            ))}
          </View>
        );
      })}

      <View style={styles.actions}>
        <GhostButton title="Отложить на день" icon="clock-outline" style={{ flex: 1 }} />
        <GoldButton title="Выполнить" icon="check" onPress={() => nav.navigate('AddEvent')} style={{ flex: 1 }} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  title: { fontFamily: font.display, fontSize: 25, color: colors.txt, letterSpacing: -0.5 },
  sub: { fontFamily: font.regular, fontSize: 12.5, color: colors.txt3, marginTop: 2 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 18 },
});
