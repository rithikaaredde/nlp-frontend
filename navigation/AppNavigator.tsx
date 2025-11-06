import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import { MainTabNavigator } from './MainTabNavigator';
import { useApp } from '../context/AppContext';
import { palette } from '../theme/colors';

const Stack = createNativeStackNavigator();

export const AppNavigator: React.FC = () => {
  const { isLoading, isSignedIn, hasCompletedOnboarding } = useApp();

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={palette.sky} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isSignedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : !hasCompletedOnboarding ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000'
  }
});

export default AppNavigator;
