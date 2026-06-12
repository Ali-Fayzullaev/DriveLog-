import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkColors, lightColors, makeGradients, font, radius, spacing } from '../theme';

export type AppColors = typeof darkColors;

type ThemeContextType = {
  dark: boolean;
  colors: AppColors;
  gradients: ReturnType<typeof makeGradients>;
  font: typeof font;
  radius: typeof radius;
  spacing: typeof spacing;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('app_theme').then((val) => {
      if (val === 'light') setDark(false);
    });
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    AsyncStorage.setItem('app_theme', next ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider
      value={{
        dark,
        colors: dark ? darkColors : lightColors,
        gradients: makeGradients(dark),
        font,
        radius,
        spacing,
        toggle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
