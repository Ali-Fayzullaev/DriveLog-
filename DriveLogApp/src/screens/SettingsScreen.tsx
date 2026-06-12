import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Screen from '../components/Screen';
import GlassCard from '../components/GlassCard';
import { Avatar } from '../components/common';
import { colors, font, radius } from '../theme';

export default function SettingsScreen() {
  const nav = useNavigation<any>();
  const [faceId, setFaceId] = useState(false);
  const [weather, setWeather] = useState(true);

  return (
    <Screen>
      <View style={styles.head}>
        <Text style={styles.title}>Настройки</Text>
        <Avatar text="АФ" />
      </View>

      <GlassCard style={{ marginBottom: 18 }}>
        <View style={styles.profile}>
          <Avatar text="АФ" size={50} />
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>Али Файзуллаев</Text>
            <Text style={styles.profileSub}>Гостевой режим · локально</Text>
          </View>
          <View style={styles.pro}><Text style={styles.proText}>PRO</Text></View>
        </View>
      </GlassCard>

      <Group>
        <Row icon="palette-outline" title="Тема" sub="оформление приложения" value="Тёмная" />
        <Row icon="ruler" title="Единицы" value="км · литры" />
        <Row icon="translate" title="Язык" value="Русский" last />
      </Group>

      <Group>
        <Row icon="bell-ring-outline" title="Напоминать заранее" value="за 3 дня" />
        <Row icon="face-recognition" title="Face ID для входа" toggle value={faceId} onToggle={() => setFaceId((v) => !v)} />
        <Row icon="thermometer" title="Шины по погоде" toggle value={weather} onToggle={() => setWeather((v) => !v)} last />
      </Group>

      <Group>
        <Row icon="cloud-upload-outline" title="Резервная копия" sub="iCloud · вчера 21:40" chevron />
        <Row icon="tray-arrow-down" title="Экспорт данных" sub="PDF · CSV · JSON" chevron />
        <Row icon="information-outline" title="О приложении" value="v1.0" last onPress={() => nav.navigate('About')} />
      </Group>
    </Screen>
  );
}

function Group({ children }: { children: React.ReactNode }) {
  return <View style={styles.group}>{children}</View>;
}

function Row({ icon, title, sub, value, last, toggle, onToggle, chevron, onPress }: any) {
  const Wrapper: any = onPress || onToggle ? Pressable : View;
  return (
    <Wrapper style={[styles.row, !last && styles.rowBorder]} onPress={onPress ?? onToggle}>
      <View style={styles.rowIc}><MaterialCommunityIcons name={icon} size={17} color={colors.txt} /></View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{title}</Text>
        {sub ? <Text style={styles.rowSub}>{sub}</Text> : null}
      </View>
      {toggle ? (
        <View style={[styles.toggle, !value && styles.toggleOff]}>
          <View style={[styles.knob, !value && styles.knobOff]} />
        </View>
      ) : (
        <View style={styles.rowRight}>
          {value ? <Text style={styles.rowVal}>{value}</Text> : null}
          {(chevron || value) ? <MaterialCommunityIcons name="chevron-right" size={18} color={colors.txt3} /> : null}
        </View>
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 },
  title: { fontFamily: font.display, fontSize: 25, color: colors.txt, letterSpacing: -0.5 },
  profile: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  profileName: { fontFamily: font.semibold, fontSize: 15, color: colors.txt },
  profileSub: { fontFamily: font.regular, fontSize: 12, color: colors.txt3, marginTop: 2 },
  pro: { backgroundColor: colors.gold, borderRadius: 20, paddingVertical: 6, paddingHorizontal: 13 },
  proText: { fontFamily: font.bold, fontSize: 11, color: '#1a1406' },
  group: { backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.glassBrd, borderRadius: radius.md, overflow: 'hidden', marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 13, paddingVertical: 15, paddingHorizontal: 16 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  rowIc: { width: 34, height: 34, borderRadius: 10, backgroundColor: colors.glass2, alignItems: 'center', justifyContent: 'center' },
  rowTitle: { fontFamily: font.medium, fontSize: 14, color: colors.txt },
  rowSub: { fontFamily: font.regular, fontSize: 11.5, color: colors.txt3, marginTop: 1 },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rowVal: { fontFamily: font.regular, fontSize: 12.5, color: colors.txt3 },
  toggle: { width: 46, height: 27, borderRadius: 20, backgroundColor: colors.gold, justifyContent: 'center', paddingHorizontal: 3 },
  toggleOff: { backgroundColor: 'rgba(255,255,255,0.12)' },
  knob: { width: 21, height: 21, borderRadius: 11, backgroundColor: '#fff', alignSelf: 'flex-end' },
  knobOff: { alignSelf: 'flex-start' },
});
