import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import VehicleSVG from '../../components/vehicles/VehicleSVG';
import { font, radius } from '../../theme';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const nav = useNavigation<any>();
  const { colors, gradients } = useTheme();

  const carY = useRef(new Animated.Value(32)).current;
  const carOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const btnsOpacity = useRef(new Animated.Value(0)).current;
  const glowScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(100),
      Animated.parallel([
        Animated.timing(carOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(carY, { toValue: 0, duration: 700, useNativeDriver: true }),
        Animated.timing(glowScale, { toValue: 1, duration: 900, useNativeDriver: true }),
      ]),
      Animated.delay(100),
      Animated.timing(textOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.delay(100),
      Animated.timing(btnsOpacity, { toValue: 1, duration: 450, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <LinearGradient colors={['#050711', '#090D1F', '#060810']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.safe}>
        {/* Ambient glow */}
        <Animated.View
          style={[styles.glow, { transform: [{ scale: glowScale }] }]}
          pointerEvents="none"
        />

        {/* Car illustration */}
        <Animated.View
          style={[
            styles.carWrap,
            { opacity: carOpacity, transform: [{ translateY: carY }] },
          ]}
        >
          <VehicleSVG type="sedan" width={Math.min(width - 32, 320)} height={128} />
        </Animated.View>

        {/* Title */}
        <Animated.View style={[styles.titleWrap, { opacity: textOpacity }]}>
          <Text style={[styles.logo, { color: colors.gold }]}>DriveLog</Text>
          <Text style={[styles.tagline, { color: colors.txt2 }]}>
            Умный учёт ваших автомобилей
          </Text>

          <View style={styles.pills}>
            {['Пробег', 'История ТО', 'Напоминания'].map((t) => (
              <View key={t} style={[styles.pill, { borderColor: colors.glassBrd, backgroundColor: colors.glass }]}>
                <Text style={[styles.pillText, { color: colors.txt3 }]}>{t}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Buttons */}
        <Animated.View style={[styles.btns, { opacity: btnsOpacity }]}>
          <Pressable
            style={({ pressed }) => [styles.btnPrimary, pressed && { opacity: 0.85 }]}
            onPress={() => nav.navigate('Register')}
          >
            <LinearGradient
              colors={['#f6e3a6', '#e7c873', '#b8923f']}
              style={styles.btnGrad}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.btnPrimaryText}>Создать аккаунт</Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.btnGhost,
              { borderColor: colors.glassBrd2 },
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => nav.navigate('Login')}
          >
            <Text style={[styles.btnGhostText, { color: colors.txt }]}>Войти</Text>
          </Pressable>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
  glow: {
    position: 'absolute',
    width: 320,
    height: 240,
    borderRadius: 160,
    backgroundColor: 'rgba(231,200,115,0.055)',
    top: '30%',
  },
  carWrap: { marginBottom: 44 },
  titleWrap: { alignItems: 'center', marginBottom: 52, gap: 10 },
  logo: { fontFamily: font.displayBold, fontSize: 46, letterSpacing: -1.5 },
  tagline: { fontFamily: font.medium, fontSize: 15.5, textAlign: 'center' },
  pills: { flexDirection: 'row', gap: 8, marginTop: 4 },
  pill: { borderWidth: 1, borderRadius: 20, paddingVertical: 5, paddingHorizontal: 12 },
  pillText: { fontFamily: font.medium, fontSize: 11.5 },
  btns: { width: '100%', gap: 12 },
  btnPrimary: { borderRadius: radius.sm, overflow: 'hidden' },
  btnGrad: { paddingVertical: 17, alignItems: 'center', borderRadius: radius.sm },
  btnPrimaryText: { fontFamily: font.bold, fontSize: 16, color: '#1a1406' },
  btnGhost: { borderWidth: 1, borderRadius: radius.sm, paddingVertical: 16, alignItems: 'center' },
  btnGhostText: { fontFamily: font.semibold, fontSize: 16 },
});
