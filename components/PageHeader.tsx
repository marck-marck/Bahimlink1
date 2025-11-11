import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  primaryAction?: string;
  onPrimaryAction?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  primaryAction, 
  onPrimaryAction 
}) => (
  <View style={styles.header}>
    <View style={styles.titleContainer}>
      <Text style={styles.mainTitle}>{title}</Text>
      {subtitle && <Text style={styles.subTitle}>{subtitle}</Text>}
    </View>
    
    {primaryAction && (
      <TouchableOpacity style={styles.primaryButton} onPress={onPrimaryAction}>
        <Text style={styles.buttonText}>{primaryAction}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: Colors.light.background,
  },
  titleContainer: {
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  primaryButton: {
    backgroundColor: '#EA580C',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});