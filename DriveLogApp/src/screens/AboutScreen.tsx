import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import Screen from '../components/Screen';
import { colors, font, radius, gradients } from '../theme';

const links = [
  { icon: 'star-outline', title: 'Оценить в App Store' },
  { icon: 'email-outline', title: 'Поддержка' },
  { icon: 'shield-lock-outline', title: 'Политика конфиденциальности' },
  { icon: 'play-circle-outline', title: 'Посмотреть онбординг' },
];

export default function AboutScreen() {
  const nav = useNavigation<any>();
  return (
    <Screen>
      <Pressable style={styles.back} onPress={() => nav.goBack()}>
        <MaterialCommunityIcons name="chevron-left" size={20} color={colors.txt2} />
        <Text style={styles.backText}>настройки</Text>
      </Pressable>

      <View style={styles.hero}>
        <LinearGradient colors={gradients.gold} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.mark}>
          <Text style={styles.markText}>D</Text>
        </LinearGradient>
        <Text style={styles.name}>DriveLog</Text>
        <Text style={styles.version}>Версия 1.0 · сборка 100</Text>
        <Text style={styles.desc}>Премиальный учёт обслуживания авто и грузового транспорта. Все данные хранятся только на вашем устройстве.</Text>
      </View>

      <View style={styles.group}>
        {links.map((l, i) => (
          <Pressable key={l.title} style={[styles.row, i < links.length - 1 && styles.rowBorder]} onPress={() => i === 3 && nav.navigate('Tabs')}>
            <View style={styles.rowIc}><MaterialCommunityIcons name={l.icon as any} size={17} color={colors.txt} /></View>
            <Text style={styles.rowTitle}>{l.title}</Text>
            <MaterialCommunityIcons name="chevron-right" size={18} color={colors.txt3} />
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  backText: { fontFamily: font.regular, fontSize: 13, color: colors.txt2 },
  hero: { alignItems: 'center', paddingVertical: 30 },
  mark: { width: 84, height: 84, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  markText: { fontFamily: font.displayBold, fontSize: 42, color: '#1a1406' },
  name: { fontFamily: font.display, fontSize: 26, color: colors.txt, marginTop: 18 },
  version: { fontFamily: font.regular, fontSize: 13, color: colors.txt3, marginTop: 4 },
  desc: { fontFamily: font.regular, fontSize: 13, color: colors.txt2, lineHeight: 20, textAlign: 'center', marginTop: 18, paddingHorizontal: 14 },
  group: { backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.glassBrd, borderRadius: radius.md, overflow: 'hidden', marginTop: 20 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 13, paddingVertical: 15, paddingHorizontal: 16 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  rowIc: { width: 34, height: 34, borderRadius: 10, backgroundColor: colors.glass2, alignItems: 'center', justifyContent: 'center' },
  rowTitle: { fontFamily: font.medium, fontSize: 14, color: colors.txt, flex: 1 },
});
