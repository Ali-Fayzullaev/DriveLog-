import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable,
  KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useVehicles } from '../../context/VehicleContext';
import AppInput from '../../components/ui/AppInput';
import AppButton from '../../components/ui/AppButton';
import VehicleSVG, { VEHICLE_MODELS, VehicleModelType } from '../../components/vehicles/VehicleSVG';
import { font, radius } from '../../theme';

const CURRENT_YEAR = new Date().getFullYear();

export default function VehicleFormScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<any>();
  const vehicleType: VehicleModelType = route.params?.vehicleType ?? 'sedan';
  const model = VEHICLE_MODELS.find((m) => m.type === vehicleType)!;

  const { colors, gradients } = useTheme();
  const { addVehicle } = useVehicles();

  const [make, setMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [year, setYear] = useState(String(CURRENT_YEAR));
  const [plate, setPlate] = useState('');
  const [engine, setEngine] = useState('');
  const [color, setColor] = useState('');
  const [mileage, setMileage] = useState('0');
  const [trailerPlate, setTrailerPlate] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isTruck = vehicleType === 'truck';
  const clear = (k: string) => setErrors((e) => { const n = { ...e }; delete n[k]; return n; });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!make.trim()) e.make = 'Введите марку';
    if (!vehicleModel.trim()) e.vehicleModel = 'Введите модель';
    const y = parseInt(year);
    if (!year || isNaN(y) || y < 1900 || y > CURRENT_YEAR + 1) e.year = 'Неверный год';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handle = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await addVehicle({
        kind: isTruck ? 'truck' : 'car',
        modelType: vehicleType,
        make: make.trim(),
        model: vehicleModel.trim(),
        year: parseInt(year),
        plate: plate.trim().toUpperCase(),
        engine: engine.trim(),
        color: color.trim(),
        mileage: parseInt(mileage) || 0,
        ...(isTruck && { trailerPlate: trailerPlate.trim().toUpperCase() }),
      });
      nav.reset({ index: 0, routes: [{ name: 'Tabs' }] });
    } catch (err: any) {
      Alert.alert('Ошибка', err?.message ?? 'Не удалось сохранить');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={gradients.bg as any} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Back */}
            <Pressable style={styles.back} onPress={() => nav.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={22} color={colors.txt2} />
            </Pressable>

            {/* Header with vehicle preview */}
            <View style={styles.head}>
              <View style={[styles.svgBg, { backgroundColor: colors.glass }]}>
                <VehicleSVG type={vehicleType} width={240} height={96} />
              </View>
              <Text style={[styles.title, { color: colors.txt }]}>
                Добавить {model.label.toLowerCase()}
              </Text>
              <Text style={[styles.sub, { color: colors.txt3 }]}>
                Заполните данные о транспортном средстве
              </Text>
            </View>

            {/* Form sections */}
            <View style={[styles.section, { backgroundColor: colors.glass, borderColor: colors.glassBrd }]}>
              <Text style={[styles.sectionTitle, { color: colors.txt2 }]}>Основное</Text>
              <View style={styles.row2}>
                <View style={{ flex: 1 }}>
                  <AppInput
                    label="Марка"
                    icon="car-outline"
                    placeholder="Toyota"
                    value={make}
                    onChangeText={(v) => { setMake(v); clear('make'); }}
                    autoCapitalize="words"
                    error={errors.make}
                    colors={colors}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <AppInput
                    label="Модель"
                    placeholder="Camry"
                    value={vehicleModel}
                    onChangeText={(v) => { setVehicleModel(v); clear('vehicleModel'); }}
                    autoCapitalize="words"
                    error={errors.vehicleModel}
                    colors={colors}
                  />
                </View>
              </View>
              <View style={styles.row2}>
                <View style={{ flex: 1 }}>
                  <AppInput
                    label="Год"
                    icon="calendar-outline"
                    placeholder={String(CURRENT_YEAR)}
                    value={year}
                    onChangeText={(v) => { setYear(v); clear('year'); }}
                    keyboardType="numeric"
                    error={errors.year}
                    colors={colors}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <AppInput
                    label="Гос. номер"
                    icon="card-text-outline"
                    placeholder="A 001 AA"
                    value={plate}
                    onChangeText={setPlate}
                    autoCapitalize="characters"
                    colors={colors}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.section, { backgroundColor: colors.glass, borderColor: colors.glassBrd }]}>
              <Text style={[styles.sectionTitle, { color: colors.txt2 }]}>Дополнительно</Text>
              <AppInput
                label="Двигатель"
                icon="engine-outline"
                placeholder="2.0 TSI · 180 л.с."
                value={engine}
                onChangeText={setEngine}
                colors={colors}
              />
              <AppInput
                label="Цвет"
                icon="palette-outline"
                placeholder="Белый перламутр"
                value={color}
                onChangeText={setColor}
                autoCapitalize="words"
                colors={colors}
              />
              <AppInput
                label="Начальный пробег (км)"
                icon="counter"
                placeholder="0"
                value={mileage}
                onChangeText={setMileage}
                keyboardType="numeric"
                colors={colors}
              />
            </View>

            {isTruck && (
              <View style={[styles.section, { backgroundColor: colors.glass, borderColor: colors.glassBrd }]}>
                <Text style={[styles.sectionTitle, { color: colors.txt2 }]}>Фура / прицеп</Text>
                <AppInput
                  label="Номер прицепа"
                  icon="truck-trailer"
                  placeholder="AB 1234 CD"
                  value={trailerPlate}
                  onChangeText={setTrailerPlate}
                  autoCapitalize="characters"
                  colors={colors}
                />
              </View>
            )}

            <AppButton
              label="Добавить транспорт"
              onPress={handle}
              loading={loading}
              colors={colors}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 16, paddingBottom: 40, gap: 16 },
  back: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  head: { alignItems: 'center', marginBottom: 4 },
  svgBg: { borderRadius: radius.md, paddingVertical: 16, paddingHorizontal: 20, marginBottom: 18, width: '100%', alignItems: 'center' },
  title: { fontFamily: font.displayBold, fontSize: 26, letterSpacing: -0.6 },
  sub: { fontFamily: font.regular, fontSize: 13, marginTop: 6, textAlign: 'center' },
  section: { borderWidth: 1, borderRadius: radius.md, padding: 16, gap: 14 },
  sectionTitle: { fontFamily: font.semibold, fontSize: 11.5, letterSpacing: 0.8, textTransform: 'uppercase' },
  row2: { flexDirection: 'row', gap: 12 },
});
