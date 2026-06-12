import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors, font } from '../theme';

const icons: Record<string, string> = {
  Garage: 'warehouse',
  Dashboard: 'view-dashboard-outline',
  History: 'history',
  Reminders: 'bell-outline',
  Settings: 'cog-outline',
};

const labels: Record<string, string> = {
  Garage: 'Гараж',
  Dashboard: 'Авто',
  History: 'История',
  Reminders: 'Напом.',
  Settings: 'Ещё',
};

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {Platform.OS !== 'web' && <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />}
      <View style={[StyleSheet.absoluteFill, styles.tint]} />
      <View style={styles.row}>
        {state.routes.map((route, i) => {
          const focused = state.index === i;
          return (
            <Pressable
              key={route.key}
              style={styles.tab}
              onPress={() => {
                const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
              }}
            >
              <MaterialCommunityIcons
                name={icons[route.name] as any}
                size={23}
                color={focused ? colors.goldLight : colors.txt3}
              />
              <Text style={[styles.label, { color: focused ? colors.goldLight : colors.txt3 }]}>
                {labels[route.name]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, bottom: 0, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.07)' },
  tint: { backgroundColor: 'rgba(8,10,18,0.82)' },
  row: { flexDirection: 'row', paddingTop: 12, paddingHorizontal: 10 },
  tab: { flex: 1, alignItems: 'center', gap: 5 },
  label: { fontFamily: font.medium, fontSize: 10 },
});
