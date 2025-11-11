import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/theme';
import DemandeModal from '@/components/DemandeModal';

export default function DemandesScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  

  const stats = [
    { title: 'Demandes Totales', value: '0', icon: 'calendar-outline' },
    { title: 'En Attente', value: '0', icon: 'information-circle-outline' },
    { title: 'En Cours', value: '0', icon: 'time-outline' },
    { title: 'Terminé', value: '0', icon: 'checkmark-circle-outline' },
  ];

  const quickOptions = [
    { title: 'Patrouille Supplémentaire', icon: 'time-outline' },
    { title: 'Évaluation de Sécurité', icon: 'checkmark-outline' },
    { title: 'Réponse d\'Urgence', icon: 'warning-outline' },
  ];

  return (
    <View style={styles.container}>
      {/* En-tête fixe */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#080808ff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Demandes de Service</Text>
        <TouchableOpacity 
          style={styles.newRequestButton} 
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Section principale */}
        <View style={styles.mainSection}>
          <Text style={styles.title}>Demandes de Service</Text>
          <Text style={styles.subtitle}>Gérez vos demandes de service de sécurité</Text>
        </View>

        {/* Statistiques */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Statistiques</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Ionicons name={stat.icon as any} size={24} color={Colors.light.primary} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
            ))}
          </View>
        </View>

    
      {/* Options de Demande Rapide */}
    {/*
      <View style={styles.quickOptionsContainer}>
        <Text style={styles.sectionTitle}>Options de Demande Rapide</Text>
        <View style={styles.quickOptionsGrid}>
          {quickOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.quickOptionCard}>
                <Ionicons name={option.icon as any} size={32} color={Colors.light.primary} />
                <Text style={styles.quickOptionTitle}>{option.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
    */}

        {/* Vos Demandes */}
        <View style={styles.requestsContainer}>
          <Text style={styles.sectionTitle}>Vos Demandes de Service</Text>
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color="#6C757D" />
            <Text style={styles.emptyText}>Aucune demande pour le moment</Text>
            <Text style={styles.emptySubtext}>Créez votre première demande de service</Text>
          </View>
        </View>
      </ScrollView>

      <DemandeModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 25,
    backgroundColor: '#3b95ef34',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#080808ff',
  },
  mainSection: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 20,
  },
  newRequestButton: {
    backgroundColor: '#E87525',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  newRequestText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginTop: 8,
  },
  statTitle: {
    fontSize: 12,
    color: '#6C757D',
    textAlign: 'center',
    marginTop: 4,
  },
  quickOptionsContainer: {
    padding: 20,
  },
  quickOptionsGrid: {
    gap: 12,
  },
  quickOptionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    flex: 1,
  },
  requestsContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E1E1E',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 40,
  },
});