import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/DashboardScreen';
import ScannerScreen from '../screens/ScannerScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useApp } from '../context/AppContext';
import { palette } from '../theme/colors';

const Tab = createBottomTabNavigator();

export const MainTabNavigator: React.FC = () => {
  const { unreadAlertCount } = useApp();

  const getIcon = (routeName: string, focused: boolean) => {
    const color = focused ? palette.sky : palette.neutral400;
    switch (routeName) {
      case 'Dashboard':
        return <Ionicons name="grid-outline" size={22} color={color} />;
      case 'Scanner':
        return <Ionicons name="scan-outline" size={22} color={color} />;
      case 'History':
        return <Ionicons name="time-outline" size={22} color={color} />;
      case 'Settings':
        return <Ionicons name="settings-outline" size={22} color={color} />;
      default:
        return null;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => getIcon(route.name, focused),
        tabBarActiveTintColor: palette.sky,
        tabBarInactiveTintColor: palette.neutral400,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: '#FFFFFF',
          height: 64,
          paddingBottom: 8,
          paddingTop: 8
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600'
        }
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          tabBarBadge: unreadAlertCount > 0 ? unreadAlertCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: palette.danger,
            color: '#FFFFFF'
          }
        }}
      />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarBadge: unreadAlertCount > 0 ? '!' : undefined,
          tabBarBadgeStyle: {
            backgroundColor: palette.warning,
            color: '#111827'
          }
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
