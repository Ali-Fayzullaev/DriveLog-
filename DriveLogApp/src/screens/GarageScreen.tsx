import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import Screen from '../components/Screen';
import { IconButton } from '../components/common';
import { useVehicles } from '../context/VehicleContext';
import { colors, font, radius, gradients } from '../theme';
import { Vehicle } from '../types';

export default function GarageScreen() {
  const nav = useNavigation<any>();
  const { vehicles, select } = useVehicles();

  const open = (v: Vehicle) => {
    select(v.id);
    nav.navigate('Dashboard');
  };

  return (
    <Screen>
      <View style={styles.head}>
        <View>
          <Text style={styles.title}>Гараж</Text>
          <Text style={styles.sub}>{vehicles.length} автомобиля</Text>
        </View>
        <IconButton icon="plus" onPress={() => nav.navigate('AddEvent')} />
      </View>

      {vehicles.map((v) => (
        <VehicleCard key={v.id} v={v} onPress={() => open(v)} />
      ))}

      <Pressable style={styles.addCard} onPress={() => nav.navigate('AddEvent')}>
        <MaterialCommunityIcons name="plus-circle-outline" size={26} color={colors.gold} />
        <Text style={styles.addTitle}>Добавить транспорт</Text>
        <Text style={styles.addSub}>легковой, фура или спецтехника · 1 из 3 в Free</Text>
      </Pressable>
    </Screen>
  );
}

function VehicleCard({ v, onPress }: { v: Vehicle; onPress: () => void }) {
  const isTruck = v.kind === 'truck';
  const badgeStyle = v.badge.urgency === 'ok' ? styles.badgeOk : styles.badgeWarn;
  const badgeColor = v.badge.urgency === 'ok' ? colors.green : colors.amber;
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && { transform: [{ scale: 0.98 }] }]} onPress={onPress}>
      <LinearGradient colors={isTruck ? gradients.cardB : gradients.cardA} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.photo}>
        <MaterialCommunityIcons name={v.glyphIcon as any} size={104} color="rgba(255,255,255,0.13)" style={styles.glyph} />
        <View style={[styles.badge, badgeStyle]}>
          <Text style={[styles.badgeText, { color: badgeColor }]}>{v.badge.text}</Text>
        </View>
        <View style={styles.kindTag}>
          <MaterialCommunityIcons name={isTruck ? 'truck' : 'car'} size={13} color={colors.txt2} />
          <Text style={styles.kindText}>{isTruck ? 'Фура' : 'Легковой'}</Text>
        </View>
        <View style={styles.plate}>
          <Text style={styles.plateText}>{v.plate}</Text>
        </View>
      </LinearGradient>
      <View style={styles.info}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{v.make} {v.model}</Text>
          <Text style={styles.meta}>{v.year} · {v.engine} · {v.color}</Text>
        </View>
        <View style={styles.kmBox}>
          <Text style={styles.km}>{v.mileage.toLocaleString('ru-RU')}</Text>
          <Text style={styles.kmUnit}>км</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 },
  title: { fontFamily: font.display, fontSize: 25, color: colors.txt, letterSpacing: -0.5 },
  sub: { fontFamily: font.regular, fontSize: 12.5, color: colors.txt3, marginTop: 2 },
  card: { backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.glassBrd, borderRadius: radius.md, overflow: 'hidden', marginBottom: 14 },
  photo: { height: 130, justifyContent: 'flex-end', padding: 14 },
  glyph: { position: 'absolute', right: -8, top: 12 },
  badge: { position: 'absolute', top: 12, right: 12, paddingVertical: 5, paddingHorizontal: 11, borderRadius: 20, borderWidth: 1 },
  badgeOk: { backgroundColor: 'rgba(94,224,168,0.18)', borderColor: 'rgba(94,224,168,0.3)' },
  badgeWarn: { backgroundColor: 'rgba(255,193,94,0.18)', borderColor: 'rgba(255,193,94,0.3)' },
  badgeText: { fontFamily: font.semibold, fontSize: 10.5 },
  kindTag: { position: 'absolute', top: 12, left: 12, flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(0,0,0,0.4)', borderWidth: 1, borderColor: colors.glassBrd, borderRadius: 20, paddingVertical: 4, paddingHorizontal: 10 },
  kindText: { fontFamily: font.medium, fontSize: 11, color: colors.txt2 },
  plate: { alignSelf: 'flex-start', backgroundColor: 'rgba(0,0,0,0.45)', borderWidth: 1, borderColor: colors.glassBrd, borderRadius: 8, paddingVertical: 4, paddingHorizontal: 11 },
  plateText: { fontFamily: font.semibold, fontSize: 12, color: colors.txt, letterSpacing: 1 },
  info: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  name: { fontFamily: font.display, fontSize: 17, color: colors.txt },
  meta: { fontFamily: font.regular, fontSize: 12, color: colors.txt3, marginTop: 3 },
  kmBox: { alignItems: 'flex-end' },
  km: { fontFamily: font.display, fontSize: 16, color: colors.txt },
  kmUnit: { fontFamily: font.regular, fontSize: 11, color: colors.txt3 },
  addCard: { borderWidth: 1, borderColor: colors.glassBrd, borderStyle: 'dashed', borderRadius: radius.md, padding: 22, alignItems: 'center', marginTop: 4 },
  addTitle: { fontFamily: font.semibold, fontSize: 13.5, color: colors.txt, marginTop: 8 },
  addSub: { fontFamily: font.regular, fontSize: 11.5, color: colors.txt3, marginTop: 3 },
});
