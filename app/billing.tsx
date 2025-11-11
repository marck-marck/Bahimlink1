import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function BillingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Facturation</Text>
      <Text style={styles.desc}>Consultez et gérez vos informations de facturation.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
  },
  desc: {
    fontSize: 15,
    color: '#1E1E1E',
    opacity: 0.8,
  },
});
