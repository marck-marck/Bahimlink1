import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DemandeModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function DemandeModal({ visible, onClose }: DemandeModalProps) {
  const [formData, setFormData] = useState({
    serviceType: '',
    site: '',
    priority: '',
    requestedDate: '',
    requestTitle: '',
    description: '',
    durationNumber: '1',
    durationUnit: 'jour(s)',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState({ type: '', visible: false });

  // Données qui peuvent être actualisées depuis la base de données
  const [serviceTypes] = useState(['Patrouille Supplémentaire', 'Évaluation de Sécurité', 'Réponse d\'Urgence', 'Installation d\'équipement',
     'Formation à la sécurité', 'Consultation de sécurité', 'Autre']);
  const [sites] = useState(['Site Principal', 'Site Secondaire', 'Entrepôt Nord', 'Site Industriel', 'Bureau Central']);
  const [priorities] = useState(['Faible', 'Moyenne', 'Élevée', 'Urgente']);

  const handleSubmit = () => {
    if (!formData.serviceType || !formData.site || !formData.priority || !formData.requestTitle) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    Alert.alert('Succès', 'Demande soumise avec succès', [
      { text: 'OK', onPress: onClose }
    ]);
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setFormData({...formData, requestedDate: date.toLocaleDateString('fr-FR')});
    }
  };

  const renderDropdown = (value: string, placeholder: string, options: string[], field: string) => (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{placeholder} *</Text>
      <TouchableOpacity 
        style={styles.dropdown}
        onPress={() => setShowDropdown({ type: field, visible: true })}
      >
        <Text style={[value ? styles.selectedText : styles.placeholder]}>
          {value || `Sélectionner ${placeholder.toLowerCase()}`}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#6C757D" />
      </TouchableOpacity>
      
      {showDropdown.visible && showDropdown.type === field && (
        <View style={styles.dropdownOptions}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownOption}
              onPress={() => {
                setFormData({...formData, [field]: option});
                setShowDropdown({ type: '', visible: false });
              }}
            >
              <Text style={styles.dropdownOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#1E1E1E" />
          </TouchableOpacity>
          <Text style={styles.title}>Soumettre une Demande</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            {/* Service Type */}
            {renderDropdown(
              formData.serviceType,
              'Type de Service',
              serviceTypes,
              'serviceType'
            )}

            {/* Site */}
            {renderDropdown(
              formData.site,
              'Site',
              sites,
              'site'
            )}

            {/* Priority */}
            {renderDropdown(
              formData.priority,
              'Priorité',
              priorities,
              'priority'
            )}

            {/* Requested Date */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date Demandée *</Text>
              <TouchableOpacity 
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={[formData.requestedDate ? styles.selectedText : styles.placeholder]}>
                  {formData.requestedDate || 'Sélectionner une date'}
                </Text>
                <Ionicons name="calendar-outline" size={20} color={Colors.light.primary} />
              </TouchableOpacity>
              
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}
            </View>

            {/* Request Title */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Titre de la Demande *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Entrez le titre de votre demande"
                value={formData.requestTitle}
                onChangeText={(text) => setFormData({...formData, requestTitle: text})}
              />
            </View>

            {/* Durée nécessaire */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Durée nécessaire *</Text>
              <View style={styles.durationContainer}>
                <View style={styles.durationField}>
                  <TouchableOpacity 
                    style={styles.durationDropdown}
                    onPress={() => setShowDropdown({ type: 'number', visible: !showDropdown.visible || showDropdown.type !== 'number' })}
                  >
                    <Text style={[formData.durationNumber ? styles.selectedText : styles.placeholder]}>
                      {formData.durationNumber || '1'}
                    </Text>
                    <Ionicons name="chevron-down" size={16} color="#6C757D" />
                  </TouchableOpacity>
                  {showDropdown.visible && showDropdown.type === 'number' && (
                    <View style={styles.numberDropdownMenu}>
                      <ScrollView style={styles.numberScrollView}>
                        {Array.from({length: 31}, (_, i) => i + 1).map((number) => (
                          <TouchableOpacity
                            key={number}
                            style={styles.dropdownOption}
                            onPress={() => {
                              setFormData({...formData, durationNumber: number.toString()});
                              setShowDropdown({ type: '', visible: false });
                            }}
                          >
                            <Text style={styles.dropdownOptionText}>{number}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
                
                <View style={styles.durationField}>
                  <TouchableOpacity 
                    style={styles.durationDropdown}
                    onPress={() => setShowDropdown({ type: 'unit', visible: !showDropdown.visible || showDropdown.type !== 'unit' })}
                  >
                    <Text style={[formData.durationUnit ? styles.selectedText : styles.placeholder]}>
                      {formData.durationUnit || 'jour(s)'}
                    </Text>
                    <Ionicons name="chevron-down" size={16} color="#6C757D" />
                  </TouchableOpacity>
                  {showDropdown.visible && showDropdown.type === 'unit' && (
                    <View style={styles.dropdownOptions}>
                      {['jour(s)', 'semaine(s)', 'mois', 'année(s)'].map((unit, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.dropdownOption}
                          onPress={() => {
                            setFormData({...formData, durationUnit: unit});
                            setShowDropdown({ type: '', visible: false });
                          }}
                        >
                          <Text style={styles.dropdownOptionText}>{unit}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </View>

            {/* Description */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description *</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Décrivez votre demande en détail..."
                value={formData.description}
                onChangeText={(text) => setFormData({...formData, description: text})}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>
        </ScrollView>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Soumettre la Demande</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  placeholder: {
    width: 200,
    color: '#6C757D',
  
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 20,
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  dropdownContainer: {
    gap: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0a4fdaff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 48,
  },
  dropdownText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  selectedText: {
    fontSize: 16,
    color: Colors.light.primary,
    fontWeight: '600',
  },
  
  dropdownOptions: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0a4fdaff',
    marginTop: 4,
    maxHeight: 2000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 48,
  },
  inputText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1E1E1E',
    minHeight: 48,
  },
  textArea: {
    minHeight: 120,
  },
  actions: {
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  submitButton: {
    backgroundColor: '#E87525',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelText: {
    color: '#6C757D',
    fontSize: 16,
    fontWeight: '600',
  },
  durationContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  durationField: {
    flex: 1,
    position: 'relative',
  },
  durationDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 48,
  },
  numberDropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 200,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  numberScrollView: {
    maxHeight: 200,
  },
  placeholder: {
    fontSize: 16,
    color: '#6C757D',
  },
});