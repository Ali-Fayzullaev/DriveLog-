import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, font, radius, gradients } from '../theme';

/** Section header with optional action link */
export function SectionLabel({ title, action, onAction, color }: { title: string; action?: string; onAction?: () => void; color?: string }) {
  return (
    <View style={s.secRow}>
      <Text style={[s.secTitle, color ? { color } : null]}>{title}</Text>
      {action ? (
        <Pressable onPress={onAction}><Text style={s.secAction}>{action}</Text></Pressable>
      ) : null}
    </View>
  );
}

/** Solid gold pill button */
export function GoldButton({ title, icon, onPress, style }: { title: string; icon?: string; onPress?: () => void; style?: ViewStyle }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [pressed && { transform: [{ scale: 0.98 }] }, style]}>
      <LinearGradient colors={gradients.gold} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.gold}>
        {icon ? <MaterialCommunityIcons name={icon as any} size={18} color="#1a1406" /> : null}
        <Text style={s.goldText}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

/** Outline / ghost button */
export function GhostButton({ title, icon, onPress, style }: { title: string; icon?: string; onPress?: () => void; style?: ViewStyle }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.ghost, pressed && { opacity: 0.7 }, style]}>
      {icon ? <MaterialCommunityIcons name={icon as any} size={18} color={colors.txt} /> : null}
      <Text style={s.ghostText}>{title}</Text>
    </Pressable>
  );
}

/** Small square icon button */
export function IconButton({ icon, onPress }: { icon: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.iconBtn, pressed && { transform: [{ scale: 0.92 }] }]}>
      <MaterialCommunityIcons name={icon as any} size={20} color={colors.txt} />
    </Pressable>
  );
}

/** Avatar / initials chip */
export function Avatar({ text, size = 42 }: { text: string; size?: number }) {
  return (
    <LinearGradient colors={gradients.violet} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[s.avatar, { width: size, height: size, borderRadius: size * 0.33 }]}>
      <Text style={[s.avatarText, { fontSize: size * 0.34 }]}>{text}</Text>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  secRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 22, marginBottom: 12, paddingHorizontal: 4 },
  secTitle: { fontFamily: font.semibold, fontSize: 14, color: colors.txt },
  secAction: { fontFamily: font.medium, fontSize: 12, color: colors.goldLight },
  gold: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: radius.sm },
  goldText: { fontFamily: font.bold, fontSize: 15, color: '#1a1406' },
  ghost: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.glassBrd, backgroundColor: colors.glass },
  ghostText: { fontFamily: font.semibold, fontSize: 14, color: colors.txt },
  iconBtn: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.glassBrd, alignItems: 'center', justifyContent: 'center' },
  avatar: { alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: font.bold, color: '#0d0a26' },
});
