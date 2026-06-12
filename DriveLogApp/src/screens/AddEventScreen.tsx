import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Screen from '../components/Screen';
import { GoldButton } from '../components/common';
import { useVehicles } from '../context/VehicleContext';
import { colors, font, radius } from '../theme';

export default function AddEventScreen() {
  const nav = useNavigation<any>();
  const { selected } = useVehicles();
  const isTruck = selected.kind === 'truck';

  const types = isTruck
    ? [
        { key: 'engine_oil', icon: 'oil', name: 'Масло двигателя', sub: 'Shell Rimula 10W-40' },
        { key: 'fuel_filter', icon: 'filter-variant', name: 'Фильтры', sub: 'топливный · масл. · возд.' },
        { key: 'adblue', icon: 'water-percent', name: 'AdBlue', sub: 'долив реагента' },
        { key: 'tires', icon: 'truck', name: 'Шины по осям', sub: 'рулевая / ведущая / прицеп' },
      ]
    : [
        { key: 'engine_oil', icon: 'oil', name: 'Масло двигателя', sub: 'синтетика 5W-30' },
        { key: 'air_filter', icon: 'air-filter', name: 'Фильтры', sub: '4 типа' },
        { key: 'tires', icon: 'snowflake', name: 'Шины', sub: 'смена сезона' },
        { key: 'maintenance', icon: 'cog', name: 'ТО', sub: 'плановое' },
      ];

  const [type, setType] = useState(types[0].key);

  return (
    <Screen>
      <Pressable style={styles.back} onPress={() => nav.goBack()}>
        <MaterialCommunityIcons name="chevron-left" size={20} color={colors.txt2} />
        <Text style={styles.backText}>назад</Text>
      </Pressable>
      <Text style={styles.title}>Новое событие</Text>
      <Text style={styles.sub}>{selected.make} {selected.model}</Text>

      <View style={styles.typeGrid}>
        {types.map((t) => {
          const sel = type === t.key;
          return (
            <Pressable key={t.key} onPress={() => setType(t.key)} style={styles.typeCardWrap}>
              <View style={[styles.typeCard, sel && styles.typeSel]}>
                <View style={[styles.typeIc, sel && styles.typeIcSel]}>
                  <MaterialCommunityIcons name={t.icon as any} size={19} color={sel ? '#1a1406' : colors.txt} />
                </View>
                <Text style={styles.typeName}>{t.name}</Text>
                <Text style={styles.typeSub}>{t.sub}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <Field label="Дата" value="12 июня 2026" icon="calendar-blank-outline" />
      <View style={styles.row2}>
        <Field label={isTruck ? 'Пробег' : 'Пробег'} value={isTruck ? '642 300' : '87 500'} unit="км" half />
        <Field label="Стоимость" value={isTruck ? '28 400' : '6 800'} unit="₽" half />
      </View>
      {isTruck && (
        <View style={styles.row2}>
          <Field label="Моточасы" value="9 840" unit="ч" half />
          <Field label="Ось / позиция" value="Ведущая (2)" half />
        </View>
      )}
      <Field label="Расходник" value={isTruck ? 'Shell Rimula R6 10W-40' : 'Mobil 1 5W-30'} />
      <Field label="Место сервиса" placeholder={isTruck ? 'DAF Сервис Казань' : '«У Михалыча»'} />

      <View style={styles.hint}>
        <MaterialCommunityIcons name="creation" size={18} color={colors.violet} />
        <Text style={styles.hintText}>
          Следующая замена рассчитается автоматически: <Text style={styles.hintB}>{isTruck ? 'через 60 000 км' : 'через 8 000 км'}</Text>
          {isTruck ? ' или 1 500 моточасов' : ' или 12 месяцев'} — что наступит раньше.
        </Text>
      </View>

      <Field label="Фото чека" placeholder="Прикрепить фото" icon="camera-outline" action="+ добавить" />

      <GoldButton title="Сохранить событие" icon="content-save-outline" onPress={() => nav.navigate('Tabs', { screen: 'History' })} style={{ marginTop: 6 }} />
    </Screen>
  );
}

function Field({ label, value, placeholder, unit, icon, action, half }: { label: string; value?: string; placeholder?: string; unit?: string; icon?: string; action?: string; half?: boolean }) {
  return (
    <View style={[styles.field, half && { flex: 1 }]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.input}>
        <View style={styles.inputLeft}>
          {icon ? <MaterialCommunityIcons name={icon as any} size={16} color={colors.txt3} style={{ marginRight: 8 }} /> : null}
          <Text style={value ? styles.inputVal : styles.inputPh}>{value ?? placeholder}</Text>
          {unit ? <Text style={styles.inputUnit}> {unit}</Text> : null}
        </View>
        {action ? <Text style={styles.inputAction}>{action}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  back: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  backText: { fontFamily: font.regular, fontSize: 13, color: colors.txt2 },
  title: { fontFamily: font.display, fontSize: 25, color: colors.txt, letterSpacing: -0.5 },
  sub: { fontFamily: font.regular, fontSize: 12.5, color: colors.txt3, marginTop: 4, marginBottom: 18 },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5.5, marginBottom: 8 },
  typeCardWrap: { width: '50%', padding: 5.5 },
  typeCard: { backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.glassBrd, borderRadius: radius.sm, padding: 16 },
  typeSel: { borderColor: colors.gold, backgroundColor: 'rgba(231,200,115,0.10)' },
  typeIc: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.glass2, alignItems: 'center', justifyContent: 'center', marginBottom: 11 },
  typeIcSel: { backgroundColor: colors.gold },
  typeName: { fontFamily: font.semibold, fontSize: 13.5, color: colors.txt },
  typeSub: { fontFamily: font.regular, fontSize: 11, color: colors.txt3, marginTop: 2 },
  row2: { flexDirection: 'row', gap: 11 },
  field: { marginBottom: 14 },
  fieldLabel: { fontFamily: font.regular, fontSize: 12, color: colors.txt3, marginBottom: 7, paddingLeft: 2 },
  input: { backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.glassBrd, borderRadius: radius.sm, paddingVertical: 14, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  inputLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  inputVal: { fontFamily: font.semibold, fontSize: 14, color: colors.txt },
  inputPh: { fontFamily: font.regular, fontSize: 14, color: colors.txt3 },
  inputUnit: { fontFamily: font.regular, fontSize: 12, color: colors.txt3 },
  inputAction: { fontFamily: font.medium, fontSize: 12, color: colors.goldLight },
  hint: { flexDirection: 'row', alignItems: 'center', gap: 9, backgroundColor: 'rgba(123,108,240,0.10)', borderWidth: 1, borderColor: 'rgba(123,108,240,0.25)', borderRadius: radius.sm, padding: 13, marginBottom: 16 },
  hintText: { flex: 1, fontFamily: font.regular, fontSize: 12, color: colors.txt2, lineHeight: 17 },
  hintB: { fontFamily: font.semibold, color: colors.goldLight },
});
