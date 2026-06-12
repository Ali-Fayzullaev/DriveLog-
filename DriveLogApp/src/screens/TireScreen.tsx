import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import Screen from '../components/Screen';
import GlassCard from '../components/GlassCard';
import ReminderRow from '../components/ReminderRow';
import { GoldButton, SectionLabel } from '../components/common';
import { useVehicles } from '../context/VehicleContext';
import { colors, font, radius, gradients } from '../theme';
import { TireSet } from '../types';

export default function TireScreen() {
  const nav = useNavigation<any>();
  const { selected } = useVehicles();
  const isTruck = selected.kind === 'truck';

  const installHistory = selected.tires.filter((t) => t.active || t.season === 'winter');

  return (
    <Screen>
      <Pressable style={styles.back} onPress={() => nav.goBack()}>
        <MaterialCommunityIcons name="chevron-left" size={20} color={colors.txt2} />
        <Text style={styles.backText}>назад</Text>
      </Pressable>
      <Text style={styles.title}>Шины</Text>
      <Text style={styles.sub}>{selected.make} {selected.model}{isTruck ? ' · по осям' : ''}</Text>

      {/* weather / seasonal hint */}
      <GlassCard style={styles.note}>
        <View style={styles.noteRow}>
          <MaterialCommunityIcons name="thermometer" size={20} color={colors.blue} />
          <Text style={styles.noteText}>
            За окном стабильно <Text style={{ color: colors.txt }}>+12 °C</Text>.{' '}
            {isTruck ? 'Проверьте давление и износ по всем осям перед рейсом.' : 'Рекомендуем сменить зимние шины на летние.'}
          </Text>
        </View>
      </GlassCard>

      {/* tire sets */}
      <View style={{ marginTop: 16 }}>
        {selected.tires.map((t) => (
          <TireCard key={t.id} t={t} truck={isTruck} />
        ))}
      </View>

      <GoldButton
        title={isTruck ? 'Переставить / заменить ось' : 'Установить летний комплект'}
        icon="autorenew"
        onPress={() => nav.navigate('AddEvent')}
        style={{ marginTop: 6 }}
      />

      <SectionLabel title="История установок" />
      {installHistory.map((t, idx) => (
        <ReminderRow
          key={'h' + t.id}
          item={{
            id: 'h' + t.id,
            title: `Установлены ${t.season === 'winter' ? 'зимние' : 'летние'}`,
            subtitle: `${t.manufacturer} ${t.model}`,
            icon: t.season === 'winter' ? 'snowflake' : 'white-balance-sunny',
            urgency: idx % 2 === 0 ? 'ok' : 'warn',
            value: '+' + t.distanceKm.toLocaleString('ru-RU'),
            unit: 'км',
            group: 'later',
          }}
        />
      ))}
    </Screen>
  );
}

function TireCard({ t, truck }: { t: TireSet; truck: boolean }) {
  const winter = t.season === 'winter';
  const treadColor = t.treadMm / t.treadMax > 0.6 ? colors.green : t.treadMm / t.treadMax > 0.3 ? colors.amber : colors.red;
  const treadGrad = t.treadMm / t.treadMax > 0.6 ? gradients.green : gradients.amber;
  return (
    <GlassCard style={[styles.tire, t.active && styles.tireActive]}>
      {t.active && (
        <View style={styles.nowTag}>
          <Text style={styles.nowText}>{truck ? 'НА ОСИ' : 'УСТАНОВЛЕНЫ'}</Text>
        </View>
      )}
      <View style={styles.seasonRow}>
        <View style={[styles.seasonIc, { backgroundColor: winter ? 'rgba(133,183,235,0.16)' : 'rgba(255,193,94,0.16)' }]}>
          <MaterialCommunityIcons name={winter ? 'snowflake' : 'white-balance-sunny'} size={15} color={winter ? colors.blue : colors.amber} />
        </View>
        <Text style={styles.seasonText}>{truck ? t.axle : winter ? 'Зима' : 'Лето'}</Text>
      </View>

      <Text style={styles.spec}>{t.manufacturer} <Text style={styles.specB}>{t.model}</Text></Text>
      <Text style={styles.spec}>{t.size}{t.studType ? ` · ${t.studType === 'studded' ? 'шип' : 'липучка'}` : ''}</Text>

      <Text style={styles.km}>{t.distanceKm.toLocaleString('ru-RU')} <Text style={styles.kmSmall}>{t.distanceLabel}</Text></Text>

      <View style={styles.tread}>
        <View style={styles.treadLbl}>
          <Text style={styles.treadLblText}>протектор</Text>
          <Text style={[styles.treadLblText, { color: treadColor }]}>{t.treadMm} мм</Text>
        </View>
        <View style={styles.treadBar}>
          <LinearGradient colors={treadGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.treadFill, { width: `${Math.round((t.treadMm / t.treadMax) * 100)}%` }]} />
        </View>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  back: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  backText: { fontFamily: font.regular, fontSize: 13, color: colors.txt2 },
  title: { fontFamily: font.display, fontSize: 25, color: colors.txt, letterSpacing: -0.5 },
  sub: { fontFamily: font.regular, fontSize: 12.5, color: colors.txt3, marginTop: 4, marginBottom: 16 },
  note: { borderColor: 'rgba(133,183,235,0.25)', backgroundColor: 'rgba(133,183,235,0.08)' },
  noteRow: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  noteText: { flex: 1, fontFamily: font.regular, fontSize: 12.5, color: colors.txt2, lineHeight: 18 },
  tire: { marginBottom: 12 },
  tireActive: { borderColor: colors.gold, backgroundColor: 'rgba(231,200,115,0.07)' },
  nowTag: { position: 'absolute', top: 14, right: 14, backgroundColor: 'rgba(231,200,115,0.14)', borderRadius: 10, paddingVertical: 3, paddingHorizontal: 8 },
  nowText: { fontFamily: font.bold, fontSize: 9.5, color: colors.goldLight, letterSpacing: 0.5 },
  seasonRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  seasonIc: { width: 28, height: 28, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  seasonText: { fontFamily: font.semibold, fontSize: 13, color: colors.txt },
  spec: { fontFamily: font.regular, fontSize: 11.5, color: colors.txt3, marginBottom: 4 },
  specB: { fontFamily: font.semibold, color: colors.txt },
  km: { fontFamily: font.display, fontSize: 18, color: colors.txt, marginTop: 8 },
  kmSmall: { fontFamily: font.regular, fontSize: 11, color: colors.txt3 },
  tread: { marginTop: 10 },
  treadLbl: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  treadLblText: { fontFamily: font.regular, fontSize: 11, color: colors.txt3 },
  treadBar: { height: 6, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  treadFill: { height: '100%', borderRadius: 6 },
});
