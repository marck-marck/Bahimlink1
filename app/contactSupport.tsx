import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  index: undefined;
};
import { Colors } from '@/constants/theme';
import { Linking } from 'react-native';

export default function ContactSupportScreen() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Demande Générale');
  const [priority, setPriority] = useState('Moyen');
  const [contactMethod, setContactMethod] = useState('Email');
  const [showHours, setShowHours] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const categories = [
    'Demande Générale',
    'Facturation et Paiements', 
    'Problème Technique',
    'Demande de Service',
    'Gestion de Site',
    'Rapports et Analyses',
    'Support d\'Urgence'
  ];
  const priorities = ['Faible', 'Moyen', 'Élevé', 'Urgent'];
  const contactMethods = [
    { label: 'Email', icon: 'mail-outline' },
    { label: 'Appel Téléphonique', icon: 'call-outline' },
    { label: 'Message dans l\'Application', icon: 'chatbubble-outline' }
  ];

  const submitTicket = () => {
    if (!subject.trim() || !description.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }
    Alert.alert('Succès', 'Votre ticket de support a été soumis avec succès');
    // Réinitialiser tous les champs
    setSubject('');
    setDescription('');
    setCategory('Demande Générale');
    setPriority('Moyen');
    setContactMethod('Email');
  };

  return (
    <View style={styles.container}>
      {/* En-tête fixe */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#080808ff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contacter le Support</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Section principale */}
        <View style={styles.mainSection}>
          <Text style={styles.title}>Contacter le Support</Text>
          <Text style={styles.subtitle}>Contactez notre équipe de support pour obtenir de l'aide rapidement</Text>
        </View>

        {/* Heures de Support */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.hoursCard}
            onPress={() => setShowHours(!showHours)}
          >
            <View style={styles.hoursHeader}>
              <View style={styles.hoursIconContainer}>
                <Ionicons name="time-outline" size={24} color={Colors.light.primary} />
              </View>
              <View style={styles.hoursInfo}>
                <Text style={styles.hoursTitle}>Heures de Support</Text>
                <Text style={styles.hoursSubtitle}>Consultez nos horaires d'assistance</Text>
              </View>
              <Ionicons 
                name={showHours ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#6C757D" 
              />
            </View>
            {showHours && (
              <View style={styles.hoursDetails}>
                <View style={styles.hourItem}>
                  <Text style={styles.dayText}>Lundi - Vendredi</Text>
                  <Text style={styles.timeText}>8h00 - 20h00</Text>
                </View>
                <View style={styles.hourItem}>
                  <Text style={styles.dayText}>Samedi</Text>
                  <Text style={styles.timeText}>9h00 - 17h00</Text>
                </View>
                 <View style={styles.hourItem}>
                  <Text style={styles.dayText}>Dimanche</Text>
                  <Text style={styles.timeText}>10h00 - 16h00</Text>
                </View>
                <View style={styles.hourItem}>
                  <Text style={styles.dayText}>Jours fériés</Text>
                  <Text style={styles.timeTextSpecial}>Urgences uniquement</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Contact Rapide */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Rapide</Text>
          <View style={styles.quickContactContainer}>
            <TouchableOpacity 
              style={styles.quickContactCard}
              onPress={() => Linking.openURL('tel:+237 699887766')}
            >
              <Ionicons name="call-outline" size={24} color={Colors.light.primary} />
              <Text style={styles.quickContactTitle}>Appeler le Support</Text>
              <Text style={styles.quickContactValue}>+237 699887766</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickContactCard}
              onPress={() => Linking.openURL('mailto:support@bahinsarl.com')}
            >
              <Ionicons name="mail-outline" size={24} color={Colors.light.primary} />
              <Text style={styles.quickContactTitle}>Email Support</Text>
              <Text style={styles.quickContactValue}>support@bahinsarl.com</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Formulaire Ticket */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Soumettre un Ticket de Support</Text>
          
          <View style={styles.formContainer}>
            {/* Catégorie */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Catégorie *</Text>
              <TouchableOpacity
                style={styles.selectContainer}
                onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                <Text style={styles.selectText}>{category}</Text>
                <Ionicons name="chevron-down" size={20} color="#6C757D" />
              </TouchableOpacity>
              
              {showCategoryDropdown && (
                <View style={styles.dropdownMenu}>
                  {categories.map((cat, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setCategory(cat);
                        setShowCategoryDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{cat}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Priorité */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Priorité *</Text>
              <TouchableOpacity
                style={styles.selectContainer}
                onPress={() => setShowPriorityDropdown(!showPriorityDropdown)}
              >
                <Text style={styles.selectText}>{priority}</Text>
                <Ionicons name="chevron-down" size={20} color="#6C757D" />
              </TouchableOpacity>
              
              {showPriorityDropdown && (
                <View style={styles.dropdownMenu}>
                  {priorities.map((prio, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setPriority(prio);
                        setShowPriorityDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{prio}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Sujet */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Sujet *</Text>
              <TextInput
                style={styles.textInput}
                value={subject}
                onChangeText={setSubject}
                placeholder="Décrivez brièvement votre demande"
                placeholderTextColor="#6C757D"
              />
            </View>

            {/* Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description *</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Décrivez votre problème en détail..."
                placeholderTextColor="#6C757D"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Méthode de contact préférée */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Méthode de contact préférée</Text>
              <View style={styles.radioGroup}>
                {contactMethods.map((method, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.radioItem}
                    onPress={() => setContactMethod(method.label)}
                  >
                    <Ionicons 
                      name={method.icon as any} 
                      size={20} 
                      color={Colors.light.primary} 
                      style={styles.radioIcon}
                    />
                    <View style={styles.radioButton}>
                      <View style={[
                        styles.radioCircle,
                        contactMethod === method.label && styles.radioSelected
                      ]} />
                    </View>
                    <Text style={styles.radioText}>{method.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Bouton Submit */}
            <TouchableOpacity style={styles.submitButton} onPress={submitTicket}>
              <Text style={styles.submitButtonText}>Soumettre le Ticket de Support</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support d'Urgence */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.emergencyCard}>
            <View style={styles.emergencyHeader}>
              <Ionicons name="warning" size={24} color="#EF4444" />
              <Text style={styles.emergencyTitle}>Support d'Urgence</Text>
            </View>
            <Text style={styles.emergencyText}>
              Pour les urgences de sécurité, contactez immédiatement nos lignes d'urgence disponibles 24h/24
            </Text>
            <View style={styles.emergencyButtons}>
              <TouchableOpacity 
                style={styles.emergencyButton}
                onPress={() => Linking.openURL('tel:+237 612345678')}
              >
                <Ionicons name="call" size={20} color="#fff" />
                <Text style={styles.emergencyButtonText}>Ligne d'Urgence</Text>
                <Text style={styles.emergencyNumber}>+237 612345678</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.emergencyButton}
                onPress={() => Linking.openURL('tel:+237 698765432')}
              >
                <Ionicons name="shield" size={20} color="#fff" />
                <Text style={styles.emergencyButtonText}>Urgence Sécurité</Text>
                <Text style={styles.emergencyNumber}>+237 698765432</Text>
              </TouchableOpacity>
            </View>
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
  lastSection: {
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 16,
  },
  hoursCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  hoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  hoursIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  hoursInfo: {
    flex: 1,
  },
  hoursTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  hoursSubtitle: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 2,
  },
  hoursDetails: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  hourItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayText: {
    fontSize: 14,
    color: '#1E1E1E',
    fontWeight: '500',
  },
  timeText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '600',
  },
  timeTextSpecial: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '600',
  },
  quickContactContainer: {
    gap: 12,
  },
  quickContactCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickContactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginTop: 8,
  },
  quickContactValue: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 4,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  selectText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  radioGroup: {
    gap: 12,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioIcon: {
    marginRight: 12,
  },
  radioButton: {
    marginRight: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  radioSelected: {
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.primary,
  },
  radioText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  submitButton: {
    backgroundColor: '#EA580C',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emergencyCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EF4444',
    marginLeft: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: '#7F1D1D',
    marginBottom: 16,
    lineHeight: 20,
  },
  emergencyButtons: {
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
  dropdownMenu: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2563eb',
    borderRadius: 8,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
});