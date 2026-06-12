import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients } from '../theme';

const { width } = Dimensions.get('window');

/**
 * Deep premium background: base diagonal gradient + soft violet / gold glows.
 */
export default function Background({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.root}>
      <LinearGradient colors={gradients.bg} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
      {/* violet glow top-left */}
      <View style={[styles.glow, { top: -120, left: -100, backgroundColor: 'rgba(124,108,240,0.20)' }]} />
      {/* gold glow top-right */}
      <View style={[styles.glow, { top: -60, right: -120, backgroundColor: 'rgba(231,200,115,0.10)' }]} />
      {/* green glow bottom */}
      <View style={[styles.glow, { bottom: -160, left: width / 2 - 180, backgroundColor: 'rgba(94,224,168,0.07)' }]} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  glow: {
    position: 'absolute',
    width: 360,
    height: 360,
    borderRadius: 360,
  },
});
