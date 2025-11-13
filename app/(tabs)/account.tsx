import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';

export default function AccountScreen() {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme, colors } = useTheme();
  
  // États pour les notifications
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [incidentAlerts, setIncidentAlerts] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [shiftUpdates, setShiftUpdates] = useState(true);
  const [reportNotifications, setReportNotifications] = useState(true);
  const [deliveryFrequency, setDeliveryFrequency] = useState('Immediate');
  const [showFrequencyModal, setShowFrequencyModal] = useState(false);

  const frequencies = ['Immediate', 'Hourly', 'Daily', 'Weekly'];

  const notificationTypes = [
    {
      title: 'Incident Alerts',
      description: 'Alerte immédiate d\'incident',
      icon: 'warning-outline',
      color: '#EF4444',
      value: incidentAlerts,
      setValue: setIncidentAlerts
    },
    {
      title: 'Emergency Alerts',
      description: 'Notification d\'urgence critique',
      icon: 'alert-circle-outline',
      color: '#2563eb',
      value: emergencyAlerts,
      setValue: setEmergencyAlerts
    },
    {
      title: 'Shift Updates',
      description: 'Informations sur les horaires',
      icon: 'time-outline',
      color: '#10b981',
      value: shiftUpdates,
      setValue: setShiftUpdates
    },
    {
      title: 'Report Notifications',
      description: 'Nouveaux rapports de sécurité',
      icon: 'document-text-outline',
      color: '#8b5cf6',
      value: reportNotifications,
      setValue: setReportNotifications
    }
  ];

  const saveSettings = () => {
    Alert.alert('Succès', 'Paramètres enregistrés avec succès');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* En-tête fixe */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#080808ff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres du Compte</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Section principale */}
        <View style={styles.mainSection}>
          <Text style={[styles.title, { color: colors.text }]}>Paramètres du Compte</Text>
          <Text style={[styles.subtitle, { color: colors.icon }]}>Configurez vos préférences et paramètres de sécurité</Text>
        </View>

        {/* Notification Preferences */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="notifications-outline" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Préférences de Notification</Text>
          </View>
          <Text style={[styles.sectionDescription, { color: colors.icon }]}>
            Configurez comment et quand vous recevez les notifications sur vos services de sécurité
          </Text>

          {/* Communication Methods */}
          <View style={[styles.card, { backgroundColor: colors.background }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Méthodes de Communication</Text>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="mail-outline" size={20} color={colors.primary} style={styles.settingIcon} />
                <View style={styles.settingText}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>Email Notifications</Text>
                  <Text style={[styles.settingDescription, { color: colors.icon }]}>Recevoir les notifications par email</Text>
                </View>
              </View>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: '#D1D5DB', true: '#EA580C' }}
                thumbColor={emailNotifications ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="chatbubble-outline" size={20} color={colors.primary} style={styles.settingIcon} />
                <View style={styles.settingText}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>SMS Notifications</Text>
                  <Text style={[styles.settingDescription, { color: colors.icon }]}>Recevoir les notifications par SMS</Text>
                </View>
              </View>
              <Switch
                value={smsNotifications}
                onValueChange={setSmsNotifications}
                trackColor={{ false: '#D1D5DB', true: '#EA580C' }}
                thumbColor={smsNotifications ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Notification Types */}
          <View style={[styles.card, { backgroundColor: colors.background }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Types de Notifications</Text>
            
            {notificationTypes.map((type, index) => (
              <View key={index} style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Ionicons name={type.icon as any} size={20} color={type.color} style={styles.settingIcon} />
                  <View style={styles.settingText}>
                    <Text style={[styles.settingTitle, { color: colors.text }]}>{type.title}</Text>
                    <Text style={[styles.settingDescription, { color: colors.icon }]}>{type.description}</Text>
                  </View>
                </View>
                <Switch
                  value={type.value}
                  onValueChange={type.setValue}
                  trackColor={{ false: '#D1D5DB', true: '#EA580C' }}
                  thumbColor={type.value ? '#fff' : '#f4f3f4'}
                />
              </View>
            ))}
          </View>

          {/* Notification Frequency */}
          <View style={[styles.card, { backgroundColor: colors.background }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Fréquence de Livraison</Text>
            <Text style={[styles.cardDescription, { color: colors.icon }]}>À quelle fréquence recevoir les notifications non urgentes</Text>
            
            <TouchableOpacity 
              style={[styles.frequencySelector, { borderColor: colors.border }]}
              onPress={() => setShowFrequencyModal(true)}
            >
              <Ionicons name="time-outline" size={20} color={colors.primary} />
              <Text style={[styles.frequencyText, { color: colors.text }]}>{deliveryFrequency}</Text>
              <Ionicons name="chevron-down" size={20} color={colors.icon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Security Settings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="shield-checkmark-outline" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Paramètres de Sécurité</Text>
          </View>
          <Text style={[styles.sectionDescription, { color: colors.icon }]}>
            Gérez la sécurité de votre compte et les préférences d'accès
          </Text>

          {/* Account Status */}
          <View style={[styles.card, { backgroundColor: colors.background }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Statut du Compte</Text>
            
            <View style={styles.accountStatus}>
              <View style={styles.statusInfo}>
                <Text style={[styles.statusText, { color: colors.text }]}>Votre compte est actuellement actif et sécurisé</Text>
                <Text style={[styles.lastLogin, { color: colors.icon }]}>Dernière connexion: 12/11/2025</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>Actif</Text>
              </View>
            </View>
          </View>

          {/* Dark Mode */}
          <View style={[styles.card, { backgroundColor: colors.background }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Apparence</Text>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons 
                  name={colorScheme === 'dark' ? 'moon-outline' : 'sunny-outline'} 
                  size={20} 
                  color={colors.primary} 
                  style={styles.settingIcon} 
                />
                <View style={styles.settingText}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>Mode Sombre</Text>
                  <Text style={[styles.settingDescription, { color: colors.icon }]}>Activer le thème sombre pour l'application</Text>
                </View>
              </View>
              <Switch
                value={colorScheme === 'dark'}
                onValueChange={toggleColorScheme}
                trackColor={{ false: '#D1D5DB', true: '#EA580C' }}
                thumbColor={colorScheme === 'dark' ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* Frequency Modal */}
        {showFrequencyModal && (
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Fréquence de Livraison</Text>
              {frequencies.map((freq, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.modalOption, deliveryFrequency === freq && styles.modalOptionSelected]}
                  onPress={() => {
                    setDeliveryFrequency(freq);
                    setShowFrequencyModal(false);
                  }}
                >
                  <Text style={[styles.modalOptionText, { color: colors.text }]}>{freq}</Text>
                  {deliveryFrequency === freq && (
                    <Ionicons name="checkmark" size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[styles.modalCloseButton, { backgroundColor: colors.border }]}
                onPress={() => setShowFrequencyModal(false)}
              >
                <Text style={[styles.modalCloseText, { color: colors.text }]}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Save Button */}
        <View style={[styles.section, styles.lastSection]}>
          <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
            <Ionicons name="save-outline" size={20} color="#fff" />
            <Text style={styles.saveButtonText}>Enregistrer les Paramètres</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  placeholder: {
    width: 24,
  },
  mainSection: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  lastSection: {
    paddingBottom: 80,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 14,
    marginTop: 2,
  },
  frequencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    gap: 12,
  },
  frequencyText: {
    fontSize: 16,
    flex: 1,
  },
  accountStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusInfo: {
    flex: 1,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
  },
  lastLogin: {
    fontSize: 14,
    marginTop: 4,
  },
  statusBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#EA580C',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  modalOptionSelected: {
    backgroundColor: '#F3F4F6',
  },
  modalOptionText: {
    fontSize: 16,
  },
  modalCloseButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: '500',
  },
});