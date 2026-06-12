import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { font, radius } from '../../theme';
import type { AppColors } from '../../context/ThemeContext';

interface Props {
  icon?: string;
  placeholder?: string;
  value: string;
  onChangeText: (v: string) => void;
  secureTextEntry?: boolean;
  rightIcon?: string;
  onRightIcon?: () => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  label?: string;
  colors: AppColors;
  editable?: boolean;
}

export default function AppInput({
  icon, placeholder, value, onChangeText, secureTextEntry,
  rightIcon, onRightIcon, keyboardType, autoCapitalize,
  error, label, colors, editable = true,
}: Props) {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? colors.red
    : focused
    ? colors.gold
    : colors.glassBrd;

  return (
    <View style={styles.wrap}>
      {label && <Text style={[styles.label, { color: colors.txt2 }]}>{label}</Text>}
      <View
        style={[
          styles.row,
          { backgroundColor: colors.glass2, borderColor },
        ]}
      >
        {icon && (
          <MaterialCommunityIcons
            name={icon as any}
            size={19}
            color={focused ? colors.gold : colors.txt3}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[styles.input, { color: colors.txt }]}
          placeholder={placeholder}
          placeholderTextColor={colors.txt3}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType ?? 'default'}
          autoCapitalize={autoCapitalize ?? 'sentences'}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          editable={editable}
        />
        {rightIcon && (
          <Pressable onPress={onRightIcon} style={styles.rightBtn}>
            <MaterialCommunityIcons name={rightIcon as any} size={19} color={colors.txt3} />
          </Pressable>
        )}
      </View>
      {error && <Text style={[styles.error, { color: colors.red }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  label: { fontFamily: font.medium, fontSize: 12.5, marginLeft: 4 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: radius.sm,
    paddingHorizontal: 14,
    height: 54,
    gap: 10,
  },
  icon: { width: 22 },
  input: { flex: 1, fontFamily: font.medium, fontSize: 15, height: '100%' },
  rightBtn: { padding: 4 },
  error: { fontFamily: font.regular, fontSize: 12, marginLeft: 4 },
});
