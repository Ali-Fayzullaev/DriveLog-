import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { gradients, radius } from '../theme';

export default function Fab({ onPress }: { onPress?: () => void }) {
  const insets = useSafeAreaInsets();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.fab, { bottom: Math.max(insets.bottom, 10) + 78 }, pressed && { transform: [{ scale: 0.92 }] }]}
    >
      <LinearGradient colors={gradients.gold} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.grad}>
        <MaterialCommunityIcons name="plus" size={28} color="#1a1406" />
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    width: 60,
    height: 60,
    borderRadius: radius.md,
    shadowColor: '#e7c873',
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  grad: { flex: 1, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
});
