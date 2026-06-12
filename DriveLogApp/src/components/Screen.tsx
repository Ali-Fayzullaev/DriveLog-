import React from 'react';
import { ScrollView, StyleSheet, ViewStyle, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Background from './Background';

interface Props {
  children: React.ReactNode;
  scroll?: boolean;
  contentStyle?: ViewStyle;
  /** extra bottom padding so content clears the tab bar */
  tabPadding?: boolean;
}

export default function Screen({ children, scroll = true, contentStyle, tabPadding = true }: Props) {
  const insets = useSafeAreaInsets();
  const pad = {
    paddingTop: insets.top + 8,
    paddingBottom: tabPadding ? 110 : insets.bottom + 24,
    paddingHorizontal: 20,
  };

  return (
    <Background>
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[pad, contentStyle]}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, pad, contentStyle]}>{children}</View>
      )}
    </Background>
  );
}

const styles = StyleSheet.create({ flex: { flex: 1 } });
