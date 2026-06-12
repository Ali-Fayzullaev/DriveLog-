import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Pressable,
  KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useVehicles } from '../../context/VehicleContext';
import AppInput from '../../components/ui/AppInput';
import AppButton from '../../components/ui/AppButton';
import GlassCard from '../../components/GlassCard';
import { font, radius } from '../../theme';

const today = () => new Date().toISOString().split('T')[0];

export default function AddMileageScreen() {
  const nav = useNavigation<any>();
  const { colors, gradients } = useTheme();
  const { selected, addMileageLog } = useVehicles();

  const [odometer, setOdometer] = useState(String(selected?.mileage ?? 0));
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  if (!selected) return null;

  const diff = (parseInt(odometer) || 0) - selected.mileage;
  const diffValid = diff > 0;

  const handle = async () => {
    const km = parseInt(odometer);
    if (isNaN(km) || km < selected.mileage) {
      Alert.alert('Ошибка', 'Новый пробег должен быть больше текущего');
      return;
    }
    setLoading(true);
    try {
      await addMileageLog({ vehicleId: selected.id, odometer: km, notes: notes.trim(), date: today() });
      nav.goBack();
    } catch (e: any) {
      Alert.alert('Ошибка', e?.message ?? 'Не удалось сохранить');
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
          >
            {/* Header */}
            <View style={styles.head}>
              <Pressable style={styles.back} onPress={() => nav.goBack()}>
                <MaterialCommunityIcons name="close" size={22} color={colors.txt2} />
              </Pressable>
              <Text style={[styles.title, { color: colors.txt }]}>Обновить пробег</Text>
              <View style={{ width: 42 }} />
            </View>

            {/* Current state card */}
            <GlassCard>
              <View style={styles.currentRow}>
                <View>
                  <Text style={[styles.currentLabel, { color: colors.txt3 }]}>
                    {selected.make} {selected.model}
                  </Text>
                  <Text style={[styles.currentKm, { color: colors.txt }]}>
                    {selected.mileage.toLocaleString('ru-RU')}
                    <Text style={[styles.currentUnit, { color: colors.txt3 }]}> км</Text>
                  </Text>
                  <Text style={[styles.currentSub, { color: colors.txt3 }]}>текущий одометр</Text>
                </View>
                <View style={[styles.iconWrap, { backgroundColor: colors.glass2 }]}>
                  <MaterialCommunityIcons name="counter" size={28} color={colors.gold} />
                </View>
              </View>
            </GlassCard>

            {/* Distance chip */}
            {diffValid && (
              <View style={[styles.diffChip, { backgroundColor: 'rgba(94,224,168,0.12)', borderColor: 'rgba(94,224,168,0.25)' }]}>
                <MaterialCommunityIcons name="road" size={16} color={colors.green} />
                <Text style={[styles.diffText, { color: colors.green }]}>
                  + {diff.toLocaleString('ru-RU')} км за поездку
                </Text>
              </View>
            )}

            {/* Input */}
            <AppInput
              label="Новый одометр (км)"
              icon="gauge"
              placeholder="Введите текущий пробег"
              value={odometer}
              onChangeText={setOdometer}
              keyboardType="numeric"
              colors={colors}
            />

            <AppInput
              label="Заметки (необязательно)"
              icon="note-text-outline"
              placeholder="Поездка в Ташкент..."
              value={notes}
              onChangeText={setNotes}
              colors={colors}
            />

            <AppButton
              label="Сохранить"
              onPress={handle}
              loading={loading}
              disabled={!diffValid && parseInt(odometer) !== selected.mileage}
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
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  back: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
  title: { fontFamily: font.display, fontSize: 20 },
  currentRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  currentLabel: { fontFamily: font.medium, fontSize: 12.5, marginBottom: 4 },
  currentKm: { fontFamily: font.displayBold, fontSize: 32, letterSpacing: -1 },
  currentUnit: { fontFamily: font.regular, fontSize: 16 },
  currentSub: { fontFamily: font.regular, fontSize: 11.5, marginTop: 2 },
  iconWrap: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  diffChip: { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderRadius: 30, paddingVertical: 9, paddingHorizontal: 16, alignSelf: 'flex-start' },
  diffText: { fontFamily: font.semibold, fontSize: 13.5 },
});
