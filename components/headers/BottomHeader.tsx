import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Colors } from '../../constants/theme';

export default function BottomHeader() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const toggleColorScheme = () => {
    // This will be implemented later with the theme context
  };

  const handleLogout = () => {
    // This will be implemented later with Firebase auth
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="person-outline" size={24} color={colors.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={toggleColorScheme}>
        <Ionicons 
          name={colorScheme === 'dark' ? 'sunny-outline' : 'moon-outline'} 
          size={24} 
          color={colors.icon} 
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color={colors.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconButton: {
    padding: 8,
  },
});