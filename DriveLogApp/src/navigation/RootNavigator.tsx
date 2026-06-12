import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from './TabBar';
import { colors } from '../theme';

import GarageScreen from '../screens/GarageScreen';
import DashboardScreen from '../screens/DashboardScreen';
import HistoryScreen from '../screens/HistoryScreen';
import RemindersScreen from '../screens/RemindersScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddEventScreen from '../screens/AddEventScreen';
import TireScreen from '../screens/TireScreen';
import StatsScreen from '../screens/StatsScreen';
import AboutScreen from '../screens/AboutScreen';

export type RootStackParams = {
  Tabs: undefined;
  AddEvent: undefined;
  Tire: undefined;
  Stats: undefined;
  About: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false, sceneContainerStyle: { backgroundColor: 'transparent' } }}
      initialRouteName="Dashboard"
    >
      <Tab.Screen name="Garage" component={GarageScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Reminders" component={RemindersScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.bg0, card: colors.bg0, text: colors.txt, border: 'transparent' },
};

export default function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg0 }, animation: 'slide_from_right' }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="AddEvent" component={AddEventScreen} options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="Tire" component={TireScreen} />
        <Stack.Screen name="Stats" component={StatsScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
