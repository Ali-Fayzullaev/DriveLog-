import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, Pressable, FlatList,
  Animated, Dimensions, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import VehicleSVG, { VEHICLE_MODELS, VehicleModelType } from '../../components/vehicles/VehicleSVG';
import { font, radius } from '../../theme';

const { width: SW } = Dimensions.get('window');
const CARD_W = SW - 80;
const CARD_MARGIN = 12;
const SNAP = CARD_W + CARD_MARGIN * 2;

export default function VehiclePickerScreen() {
  const nav = useNavigation<any>();
  const { colors, gradients } = useTheme();
  const [selected, setSelected] = useState<VehicleModelType>('sedan');
  const scales = useRef(VEHICLE_MODELS.map(() => new Animated.Value(1))).current;

  const select = (type: VehicleModelType, idx: number) => {
    setSelected(type);
    scales.forEach((s, i) => {
      Animated.spring(s, {
        toValue: i === idx ? 1.03 : 0.97,
        useNativeDriver: true,
        tension: 180,
        friction: 12,
      }).start();
    });
  };

  const confirm = () => nav.navigate('VehicleForm', { vehicleType: selected });

  return (
    <LinearGradient colors={gradients.bg as any} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.head}>
          <Text style={[styles.title, { color: colors.txt }]}>Выберите{'\n'}тип транспорта</Text>
          <Text style={[styles.sub, { color: colors.txt3 }]}>
            Выбор определяет поля учёта и иконку
          </Text>
        </View>

        {/* Carousel */}
        <FlatList
          data={VEHICLE_MODELS}
          keyExtractor={(item) => item.type}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={SNAP}
          decelerationRate="fast"
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => {
            const isSelected = selected === item.type;
            return (
              <Animated.View style={[{ transform: [{ scale: scales[index] }] }]}>
                <Pressable
                  onPress={() => select(item.type, index)}
                  style={({ pressed }) => [pressed && { opacity: 0.95 }]}
                >
                  <View
                    style={[
                      styles.card,
                      {
                        width: CARD_W,
                        marginHorizontal: CARD_MARGIN,
                        backgroundColor: colors.glass2,
                        borderColor: isSelected ? item.topColor : colors.glassBrd,
                        borderWidth: isSelected ? 1.5 : 1,
                      },
                    ]}
                  >
                    {/* Glow when selected */}
                    {isSelected && (
                      <View
                        style={[
                          styles.selectedGlow,
                          { backgroundColor: item.topColor + '18' },
                        ]}
                        pointerEvents="none"
                      />
                    )}

                    {/* Vehicle SVG */}
                    <View style={styles.svgWrap}>
                      <VehicleSVG
                        type={item.type}
                        width={Math.min(CARD_W - 40, 280)}
                        height={110}
                      />
                    </View>

                    {/* Labels */}
                    <View style={styles.labels}>
                      <View style={styles.labelRow}>
                        <Text style={[styles.typeLabel, { color: colors.txt }]}>
                          {item.label}
                        </Text>
                        {isSelected && (
                          <View style={[styles.checkBadge, { backgroundColor: item.topColor }]}>
                            <MaterialCommunityIcons name="check" size={13} color="#fff" />
                          </View>
                        )}
                      </View>
                      <Text style={[styles.typeDesc, { color: colors.txt3 }]}>
                        {item.description}
                      </Text>
                    </View>

                    {/* Color accent bar */}
                    <View style={[styles.accentBar, { backgroundColor: item.topColor }]} />
                  </View>
                </Pressable>
              </Animated.View>
            );
          }}
        />

        {/* Dots indicator */}
        <View style={styles.dots}>
          {VEHICLE_MODELS.map((m) => (
            <View
              key={m.type}
              style={[
                styles.dot,
                {
                  backgroundColor: selected === m.type ? m.topColor : colors.glassBrd2,
                  width: selected === m.type ? 18 : 6,
                },
              ]}
            />
          ))}
        </View>

        {/* CTA */}
        <View style={styles.footer}>
          <Pressable
            style={({ pressed }) => [styles.btn, pressed && { opacity: 0.85 }]}
            onPress={confirm}
          >
            <LinearGradient
              colors={['#f6e3a6', '#e7c873', '#b8923f']}
              style={styles.btnGrad}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.btnText}>Далее</Text>
              <MaterialCommunityIcons name="arrow-right" size={18} color="#1a1406" style={{ marginLeft: 6 }} />
            </LinearGradient>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  head: { paddingHorizontal: 28, paddingTop: 24, paddingBottom: 28 },
  title: { fontFamily: font.displayBold, fontSize: 32, letterSpacing: -0.8, lineHeight: 40 },
  sub: { fontFamily: font.regular, fontSize: 13.5, marginTop: 8 },
  list: { paddingHorizontal: 28, paddingBottom: 4 },
  card: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    paddingTop: 28,
    paddingBottom: 0,
  },
  selectedGlow: {
    ...StyleSheet.absoluteFillObject,
  },
  svgWrap: { alignItems: 'center', paddingHorizontal: 20 },
  labels: { padding: 20, paddingTop: 16 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  typeLabel: { fontFamily: font.display, fontSize: 20 },
  typeDesc: { fontFamily: font.regular, fontSize: 13 },
  checkBadge: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  accentBar: { height: 3, width: '100%' },
  dots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, marginVertical: 20 },
  dot: { height: 6, borderRadius: 3 },
  footer: { paddingHorizontal: 28, paddingBottom: Platform.OS === 'android' ? 24 : 8 },
  btn: { borderRadius: radius.sm, overflow: 'hidden' },
  btnGrad: { paddingVertical: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: radius.sm },
  btnText: { fontFamily: font.bold, fontSize: 16, color: '#1a1406' },
});
