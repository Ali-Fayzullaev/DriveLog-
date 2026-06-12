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
import { font, radius } from '../../theme';

export default function LoginScreen() {
  const nav = useNavigation<any>();
  const { signIn } = useAuth();
  const { colors, gradients } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = 'Введите email';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Неверный формат email';
    if (!password) e.password = 'Введите пароль';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handle = async () => {
    if (!validate()) return;
    setLoading(true);
    const { error } = await signIn(email.trim().toLowerCase(), password);
    setLoading(false);
    if (error) Alert.alert('Ошибка входа', error);
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
              <Text style={[styles.title, { color: colors.txt }]}>Добро{'\n'}пожаловать</Text>
              <Text style={[styles.sub, { color: colors.txt3 }]}>Войдите в свой аккаунт</Text>
            </View>

            <View style={styles.form}>
              <AppInput
                icon="email-outline"
                placeholder="Email"
                value={email}
                onChangeText={(v) => { setEmail(v); setErrors((e) => ({ ...e, email: undefined })); }}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
                colors={colors}
              />
              <AppInput
                icon="lock-outline"
                placeholder="Пароль"
                value={password}
                onChangeText={(v) => { setPassword(v); setErrors((e) => ({ ...e, password: undefined })); }}
                secureTextEntry={!showPass}
                rightIcon={showPass ? 'eye-off-outline' : 'eye-outline'}
                onRightIcon={() => setShowPass((v) => !v)}
                error={errors.password}
                colors={colors}
              />
              <Pressable style={styles.forgot} onPress={() => Alert.alert('Сброс пароля', 'Введите email для сброса пароля')}>
                <Text style={[styles.forgotText, { color: colors.gold }]}>Забыли пароль?</Text>
              </Pressable>
            </View>

            <AppButton label="Войти" onPress={handle} loading={loading} colors={colors} />

            <View style={styles.registerRow}>
              <Text style={[styles.registerText, { color: colors.txt3 }]}>Нет аккаунта? </Text>
              <Pressable onPress={() => nav.navigate('Register')}>
                <Text style={[styles.registerLink, { color: colors.gold }]}>Зарегистрируйтесь</Text>
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
  back: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  head: { marginBottom: 40 },
  title: { fontFamily: font.displayBold, fontSize: 36, letterSpacing: -1, lineHeight: 44 },
  sub: { fontFamily: font.regular, fontSize: 14, marginTop: 10 },
  form: { gap: 14, marginBottom: 8 },
  forgot: { alignSelf: 'flex-end', paddingVertical: 4 },
  forgotText: { fontFamily: font.medium, fontSize: 13 },
  registerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 28 },
  registerText: { fontFamily: font.regular, fontSize: 14 },
  registerLink: { fontFamily: font.semibold, fontSize: 14 },
});
