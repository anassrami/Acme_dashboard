import React from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

interface SafeAreaProviderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

/**
 * A component that provides consistent SafeArea handling throughout the app
 * Wraps content in a SafeAreaView with appropriate styling based on theme
 */
export function SafeAreaProvider({ children, style }: SafeAreaProviderProps) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  return (
    <SafeAreaView 
      style={[styles.container, 
        isDarkMode ? styles.darkContainer : styles.lightContainer,
        style
      ]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: '#1A1A2E',
  },
  lightContainer: {
    backgroundColor: '#FFFFFF',
  },
});