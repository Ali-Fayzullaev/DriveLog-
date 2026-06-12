import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import AppButton from '../../components/ui/AppButton';
import AppInput from '../../components/ui/AppInput';
import { font } from '../../theme';

export default function RegisterScreen() {
  const nav = useNavigation<any>();
  const { signUp } = useAuth();
  const { colors, gradients } = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Введите имя';
    if (!email.trim()) e.email = 'Введите email';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Неверный формат';
    if (!password) e.password = 'Введите пароль';
    else if (password.length < 6) e.password = 'Минимум 6 символов';
    if (password !== confirm) e.confirm = 'Пароли не совпадают';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const clear = (key: string) => setErrors((e) => { const n = { ...e }; delete n[key]; return n; });

  const handle = async () => {
    if (!validate()) return;
    setLoading(true);
    const { error } = await signUp(email.trim().toLowerCase(), password, name.trim());
    setLoading(false);
    if (error) {
      Alert.alert('Ошибка регистрации', error);
    } else {
      nav.navigate('VehiclePicker');
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
            <Pressable style={styles.back} onPress={() => nav.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={22} color={colors.txt2} />
            </Pressable>

            <View style={styles.head}>
              <Text style={[styles.title, { color: colors.txt }]}>Создать{'\n'}аккаунт</Text>
              <Text style={[styles.sub, { color: colors.txt3 }]}>Займёт меньше минуты</Text>
            </View>

            <View style={styles.form}>
              <AppInput
                icon="account-outline"
                placeholder="Полное имя"
                value={name}
                onChangeText={(v) => { setName(v); clear('name'); }}
                autoCapitalize="words"
                error={errors.name}
                colors={colors}
              />
              <AppInput
                icon="email-outline"
                placeholder="Email"
                value={email}
                onChangeText={(v) => { setEmail(v); clear('email'); }}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
                colors={colors}
              />
              <AppInput
                icon="lock-outline"
                placeholder="Пароль"
                value={password}
                onChangeText={(v) => { setPassword(v); clear('password'); }}
                secureTextEntry={!showPass}
                rightIcon={showPass ? 'eye-off-outline' : 'eye-outline'}
                onRightIcon={() => setShowPass((v) => !v)}
                error={errors.password}
                colors={colors}
              />
              <AppInput
                icon="lock-check-outline"
                placeholder="Повторите пароль"
                value={confirm}
                onChangeText={(v) => { setConfirm(v); clear('confirm'); }}
                secureTextEntry={!showPass}
                error={errors.confirm}
                colors={colors}
              />
            </View>

            <AppButton label="Зарегистрироваться" onPress={handle} loading={loading} colors={colors} />

            <View style={styles.loginRow}>
              <Text style={[styles.loginText, { color: colors.txt3 }]}>Уже есть аккаунт? </Text>
              <Pressable onPress={() => nav.navigate('Login')}>
                <Text style={[styles.loginLink, { color: colors.gold }]}>Войти</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, paddingHorizontal: 28, paddingTop: 16, paddingBottom: 40 },
  back: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  head: { marginBottom: 36 },
  title: { fontFamily: font.displayBold, fontSize: 36, letterSpacing: -1, lineHeight: 44 },
  sub: { fontFamily: font.regular, fontSize: 14, marginTop: 10 },
  form: { gap: 14, marginBottom: 28 },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  loginText: { fontFamily: font.regular, fontSize: 14 },
  loginLink: { fontFamily: font.semibold, fontSize: 14 },
});
