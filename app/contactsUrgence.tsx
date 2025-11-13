import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  index: undefined;
  creerDemande: undefined;
  sites: undefined;
};
import { Colors } from '@/constants/theme';

export default function ContactsUrgenceScreen() {
  const [expandedProtocol, setExpandedProtocol] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const emergencyContacts = [
    {
      title: 'Services d\'Urgence',
      category: 'Police/Fire/Medical',
      description: 'Urgences médicales, incendies, crimes en cours',
      phone: '117',
      email: null,
      availability: '24/7',
      badge: 'CRITICAL',
      icon: 'medical-outline',
      color: '#EF4444'
    },
    {
      title: 'Police Nationale',
      category: 'Sécurité Publique',
      description: 'Crimes, vols, troubles à l\'ordre public',
      phone: '117',
      email: 'police@cameroun.gov.cm',
      availability: '24/7',
      badge: 'CRITICAL',
      icon: 'shield-outline',
      color: '#EF4444'
    },
    {
      title: 'Pompiers',
      category: 'Incendies/Secours',
      description: 'Incendies, accidents, sauvetages',
      phone: '118',
      email: null,
      availability: '24/7',
      badge: 'CRITICAL',
      icon: 'flame-outline',
      color: '#EF4444'
    },
    {
      title: 'SAMU',
      category: 'Urgences Médicales',
      description: 'Urgences médicales, ambulances',
      phone: '115',
      email: null,
      availability: '24/7',
      badge: 'CRITICAL',
      icon: 'medical-outline',
      color: '#EF4444'
    }
  ];

  const internalContacts = [
    {
      title: 'Centre de Sécurité BahinSarl',
      category: 'Support Interne',
      description: 'Coordination sécurité, rapports incidents',
      phone: '+237 677889988',
      email: 'security@bahinsarl.com',
      availability: 'Lun-Ven 8:00-18:00',
      badge: 'INTERNAL',
      icon: 'business-outline',
      color: '#6B7280'
    },
    {
      title: 'Superviseur de Garde',
      category: 'Supervision',
      description: 'Coordination équipes, urgences sites',
      phone: '+237 655443322',
      email: 'supervisor@bahinsarl.com',
      availability: '24/7',
      badge: 'INTERNAL',
      icon: 'person-outline',
      color: '#6B7280'
    },
    {
      title: 'Support Technique',
      category: 'Assistance Technique',
      description: 'Problèmes équipements, systèmes',
      phone: '+237 698654321',
      email: 'tech@bahinsarl.com',
      availability: 'Lun-Ven 8:00-20:00',
      badge: 'INTERNAL',
      icon: 'construct-outline',
      color: '#6B7280'
    }
  ];

  const quickActions = [
    {
      title: 'Signaler une Urgence sur Site',
      icon: 'warning-outline',
      color: '#EF4444',
      action: () => Linking.openURL('tel:+237699887766')
    },
    {
      title: 'Demander Sécurité Supplémentaire',
      icon: 'shield-checkmark-outline',
      color: '#EA580C',
      action: () => navigation.navigate('creerDemande' as never)
    },
    {
      title: 'Mise à jour Statut du Site',
      icon: 'refresh-outline',
      color: Colors.light.primary,
      action: () => navigation.navigate('sites' as never)
    }
  ];

  const protocolSteps = [
    '1. Évaluez la situation et assurez votre sécurité',
    '2. Appelez immédiatement les services d\'urgence (117)',
    '3. Contactez notre centre de sécurité',
    '4. Suivez les instructions du personnel d\'urgence',
    '5. Documentez l\'incident pour le rapport'
  ];

  const renderContactCard = (contact: any, index: number) => (
    <View key={index} style={styles.contactCard}>
      <View style={styles.contactHeader}>
        <View style={styles.contactIconContainer}>
          <Ionicons name={contact.icon as any} size={24} color={contact.color} />
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactTitle}>{contact.title}</Text>
          <Text style={styles.contactCategory}>{contact.category}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: contact.badge === 'CRITICAL' ? '#FEE2E2' : '#F3F4F6' }]}>
          <Text style={[styles.badgeText, { color: contact.badge === 'CRITICAL' ? '#EF4444' : '#6B7280' }]}>
            {contact.badge}
          </Text>
        </View>
      </View>
      
      <Text style={styles.contactDescription}>{contact.description}</Text>
      
      <View style={styles.contactDetails}>
        <View style={styles.availabilityContainer}>
          <Ionicons name="time-outline" size={16} color="#6B7280" />
          <Text style={styles.availability}>{contact.availability}</Text>
        </View>
      </View>

      <View style={styles.contactActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.phoneButton]}
          onPress={() => Linking.openURL(`tel:${contact.phone}`)}
        >
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.phoneButtonText}>{contact.phone}</Text>
        </TouchableOpacity>
        
        {contact.email && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.emailButton]}
            onPress={() => Linking.openURL(`mailto:${contact.email}`)}
          >
            <Ionicons name="mail-outline" size={20} color={Colors.light.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* En-tête fixe */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#080808ff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contacts d'Urgence</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Section principale */}
        <View style={styles.mainSection}>
          <Text style={styles.title}>Contacts d'Urgence</Text>
          <Text style={styles.subtitle}>Informations importantes de contact d'urgence pour votre sécurité</Text>
        </View>

        {/* Protocole d'Urgence */}
        <View style={styles.section}>
          <View style={styles.protocolCard}>
            <View style={styles.protocolHeader}>
              <Ionicons name="warning" size={24} color="#EF4444" />
              <Text style={styles.protocolTitle}>Protocole d'Urgence pour les Clients</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.protocolToggle}
              onPress={() => setExpandedProtocol(!expandedProtocol)}
            >
              <Text style={styles.protocolToggleText}>
                {expandedProtocol ? 'Masquer les étapes' : 'Voir les étapes à suivre'}
              </Text>
              <Ionicons 
                name={expandedProtocol ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#EF4444" 
              />
            </TouchableOpacity>

            {expandedProtocol && (
              <View style={styles.protocolSteps}>
                {protocolSteps.map((step, index) => (
                  <Text key={index} style={styles.protocolStep}>{step}</Text>
                ))}
              </View>
            )}

            <View style={styles.protocolActions}>
              <TouchableOpacity 
                style={styles.emergencyButton}
                onPress={() => Linking.openURL('tel:+237 612345678')}
              >
                <Ionicons name="call" size={20} color="#fff" />
                <Text style={styles.emergencyButtonText}>Services d'Urgence</Text>
                <Text style={styles.emergencyNumber}>+237 612345678</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.emergencyButton}
                onPress={() => Linking.openURL('tel:+237699887766')}
              >
                <Ionicons name="shield" size={20} color="#fff" />
                <Text style={styles.emergencyButtonText}>Ligne Urgence Sécurité</Text>
                <Text style={styles.emergencyNumber}>+237 699 887 766</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Contacts d'Urgence Principaux */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contacts d'Urgence Principaux</Text>
          <View style={styles.contactsContainer}>
            {emergencyContacts.map((contact, index) => renderContactCard(contact, index))}
          </View>
        </View>

        {/* Autres Contacts Importants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Autres Contacts Importants</Text>
          <View style={styles.contactsContainer}>
            {internalContacts.map((contact, index) => renderContactCard(contact, index))}
          </View>
        </View>

        {/* Actions Rapides */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Actions Rapides</Text>
          <View style={styles.quickActionsContainer}>
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.quickActionCard, { borderLeftColor: action.color }]}
                onPress={action.action}
              >
                <Ionicons name={action.icon as any} size={24} color={action.color} />
                <Text style={styles.quickActionText}>{action.title}</Text>
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
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
  placeholder: {
    width: 24,
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
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 16,
  },
  protocolCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FECACA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  protocolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  protocolTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EF4444',
    marginLeft: 4,
    flex: 1,
  },
  protocolToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginBottom: 12,
  },
  protocolToggleText: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '500',
  },
  protocolSteps: {
    marginBottom: 16,
  },
  protocolStep: {
    fontSize: 14,
    color: '#7F1D1D',
    marginBottom: 8,
    lineHeight: 20,
  },
  protocolActions: {
    gap: 12,
  },
  emergencyButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  emergencyNumber: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  contactsContainer: {
    gap: 12,
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  contactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 2,
  },
  contactCategory: {
    fontSize: 14,
    color: '#6B7280',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  contactDescription: {
    fontSize: 14,
    color: '#1257e2ff',
    marginBottom: 12,
    lineHeight: 20,
  },
  contactDetails: {
    marginBottom: 16,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  availability: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  contactActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  phoneButton: {
    backgroundColor: '#EF4444',
    flex: 1,
  },
  phoneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emailButton: {
    backgroundColor: '#F3F4F6',
    width: 50,
    justifyContent: 'center',
  },
  quickActionsContainer: {
    gap: 12,
  },
  quickActionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
   lastSection: {
    paddingBottom: 80,
  },
  quickActionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E1E1E',
    flex: 1,
  },
});