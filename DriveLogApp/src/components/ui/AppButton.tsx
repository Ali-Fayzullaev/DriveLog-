import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { font, radius } from '../../theme';
import type { AppColors } from '../../context/ThemeContext';

interface Props {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'gold' | 'ghost' | 'danger';
  colors: AppColors;
}

export default function AppButton({ label, onPress, loading, disabled, variant = 'gold', colors }: Props) {
  const isGhost = variant === 'ghost';
  const isDanger = variant === 'danger';

  if (isGhost) {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.ghost,
          { borderColor: colors.glassBrd2 },
          (pressed || disabled) && { opacity: 0.65 },
        ]}
        onPress={onPress}
        disabled={disabled || loading}
      >
        <Text style={[styles.ghostText, { color: colors.txt }]}>{label}</Text>
      </Pressable>
    );
  }

  const gradColors: [string, string, string] = isDanger
    ? ['#FF8A8A', '#E63946', '#9B2226']
    : ['#f6e3a6', '#e7c873', '#b8923f'];

  return (
    <Pressable
      style={({ pressed }) => [styles.wrap, (pressed || disabled) && { opacity: 0.82 }]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <LinearGradient
        colors={gradColors}
        style={styles.grad}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {loading ? (
          <ActivityIndicator color={isDanger ? '#fff' : '#1a1406'} />
        ) : (
          <Text style={[styles.text, isDanger && { color: '#fff' }]}>{label}</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: radius.sm, overflow: 'hidden' },
  grad: { paddingVertical: 17, alignItems: 'center', borderRadius: radius.sm },
  text: { fontFamily: font.bold, fontSize: 16, color: '#1a1406' },
  ghost: { borderWidth: 1, borderRadius: radius.sm, paddingVertical: 16, alignItems: 'center' },
  ghostText: { fontFamily: font.semibold, fontSize: 16 },
});
