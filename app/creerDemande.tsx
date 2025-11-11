import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

// Configuration pour masquer le header natif
export const options = {
  headerShown: false,
};

export default function CreerDemandeScreen() {
  const [activeTab, setActiveTab] = useState('service');
  const navigation = useNavigation();

  // États pour Service Supplémentaire
  const [serviceSite, setServiceSite] = useState('');
  const [servicePriorite, setServicePriorite] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dureeNecessaire, setDureeNecessaire] = useState('');
  const [showDureeDropdown, setShowDureeDropdown] = useState(false);
  const [exigencesSpeciales, setExigencesSpeciales] = useState('');
  const [showSiteDropdown, setShowSiteDropdown] = useState(false);
  const [showPrioriteDropdown, setShowPrioriteDropdown] = useState(false);

  // États pour Rapport d'Incident
  const [incidentSite, setIncidentSite] = useState('');
  const [incidentPriorite, setIncidentPriorite] = useState('');
  const [incidentDescription, setIncidentDescription] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [incidentTime, setIncidentTime] = useState('');
  const [specificLocation, setSpecificLocation] = useState('');
  const [witnesses, setWitnesses] = useState('');
  const [policeInvolved, setPoliceInvolved] = useState(false);
  const [insuranceClaim, setInsuranceClaim] = useState(false);
  const [showIncidentSiteDropdown, setShowIncidentSiteDropdown] = useState(false);
  const [showIncidentPrioriteDropdown, setShowIncidentPrioriteDropdown] = useState(false);
  const [showIncidentDatePicker, setShowIncidentDatePicker] = useState(false);
  const [showIncidentTimePicker, setShowIncidentTimePicker] = useState(false);
  const [selectedIncidentDate, setSelectedIncidentDate] = useState(new Date());
  const [selectedIncidentTime, setSelectedIncidentTime] = useState(new Date());

  // États pour Urgence
  const [urgenceSite, setUrgenceSite] = useState('');
  const [natureEmergency, setNatureEmergency] = useState('');
  const [emergencyDescription, setEmergencyDescription] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [emergencyLocation, setEmergencyLocation] = useState('');
  const [immediateResponse, setImmediateResponse] = useState(true);
  const [showUrgenceSiteDropdown, setShowUrgenceSiteDropdown] = useState(false);

  // Données des sites du projet
  const sites = ['Site Principal', 'Site Secondaire', 'Site Industriel', 'Centre Commercial'];
  
  // Données des priorités avec descriptions
  const priorites = [
    { value: 'Faible', description: 'Standard timeline' },
    { value: 'Moyen', description: 'Within 48 hours' },
    { value: 'Élevé', description: 'Within 24 hours' },
    { value: 'Urgent', description: 'Immediate attention' }
  ];
  
  // Options de durée
  const dureeOptions = [
    '1 jour', '2-3 jours', '1 semaine', '2 semaines', 
    '1 mois', '2-3 mois', '6 mois', '1 an', 'Continu'
  ];

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setDateDebut(date.toLocaleDateString('fr-FR'));
    }
  };

  const handleIncidentDateChange = (event: any, date?: Date) => {
    setShowIncidentDatePicker(false);
    if (date) {
      setSelectedIncidentDate(date);
      setIncidentDate(date.toLocaleDateString('fr-FR'));
    }
  };

  const handleIncidentTimeChange = (event: any, time?: Date) => {
    setShowIncidentTimePicker(false);
    if (time) {
      setSelectedIncidentTime(time);
      setIncidentTime(time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
    }
  };

  const handleSubmitService = () => {
    if (!serviceSite || !servicePriorite || !serviceDescription) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }
    Alert.alert('Succès', 'Demande de service soumise avec succès!');
  };

  const handleSubmitIncident = () => {
    if (!incidentSite || !incidentPriorite || !incidentDescription || !incidentDate || !incidentTime || !specificLocation) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }
    Alert.alert('Succès', 'Rapport d\'incident soumis avec succès!');
  };

  const handleSubmitEmergency = () => {
    if (!urgenceSite || !natureEmergency || !emergencyDescription || !contactPhone || !emergencyLocation) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }
    Alert.alert('Succès', 'Demande d\'urgence soumise avec succès!');
  };

  const renderServiceForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.descriptionContainer}>
        <Ionicons name="radio-button-on" size={16} color="#E87525" />
        <Text style={styles.descriptionText}>
          Demander des services de sécurité supplémentaires tels que des patrouilles supplémentaires, la sécurité d'événements ou une protection spécialisée.
        </Text>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Site *</Text>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => setShowSiteDropdown(!showSiteDropdown)}
          >
            <Text style={[styles.dropdownText, serviceSite && styles.selectedText]}>
              {serviceSite || 'Select a site'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#6C757D" />
          </TouchableOpacity>
          {showSiteDropdown && (
            <View style={styles.dropdownMenu}>
              {sites.map((site) => (
                <TouchableOpacity
                  key={site}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setServiceSite(site);
                    setShowSiteDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{site}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Priorité *</Text>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => setShowPrioriteDropdown(!showPrioriteDropdown)}
          >
            <Text style={[styles.dropdownText, servicePriorite && styles.selectedText]}>
              {servicePriorite || 'Select  priority'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#6C757D" />
          </TouchableOpacity>
          {showPrioriteDropdown && (
            <View style={styles.dropdownMenu}>
              {priorites.map((priorite) => (
                <TouchableOpacity
                  key={priorite.value}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setServicePriorite(priorite.value);
                    setShowPrioriteDropdown(false);
                  }}
                >
                  <View>
                    <Text style={styles.dropdownItemText}>{priorite.value}</Text>
                    <Text style={styles.dropdownItemDesc}>{priorite.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description du Service *</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Décrivez les services de sécurité supplémentaires dont vous avez besoin..."
          value={serviceDescription}
          onChangeText={setServiceDescription}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Date de Début Préférée</Text>
          <TouchableOpacity 
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={[styles.dropdownText, dateDebut && styles.selectedText]}>
              {dateDebut || 'Select date'}
            </Text>
            <Ionicons name="calendar-outline" size={20} color="#6C757D" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Durée Nécessaire</Text>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => setShowDureeDropdown(!showDureeDropdown)}
          >
            <Text style={[styles.dropdownText, dureeNecessaire && styles.selectedText]}>
              {dureeNecessaire || 'Select the duration'}
            
            </Text>
            <Ionicons name="chevron-down" size={20} color="#6C757D" />
          </TouchableOpacity>
          {showDureeDropdown && (
            <View style={styles.dropdownMenu}>
              {dureeOptions.map((duree) => (
                <TouchableOpacity
                  key={duree}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setDureeNecessaire(duree);
                    setShowDureeDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{duree}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Exigences Spéciales</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Toute exigence spéciale, certification nécessaire ou instruction spécifique..."
          value={exigencesSpeciales}
          onChangeText={setExigencesSpeciales}
          multiline
          numberOfLines={3}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitService}>
        <Ionicons name="checkmark-circle" size={20} color="#fff" />
        <Text style={styles.submitText}>Soumettre la Demande de Service</Text>
      </TouchableOpacity>
    </View>
  );

  const renderIncidentForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.descriptionContainer}>
        <Ionicons name="document-text" size={16} color="#E87525" />
        <Text style={styles.descriptionText}>
          Signaler les incidents qui se sont produits sur vos sites et qui nécessitent une enquête ou un suivi.
        </Text>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Site *</Text>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => setShowIncidentSiteDropdown(!showIncidentSiteDropdown)}
          >
            <Text style={[styles.dropdownText, incidentSite && styles.selectedText]}>
              {incidentSite || 'Select a site'}

            </Text>
            <Ionicons name="chevron-down" size={20} color="#6C757D" />
          </TouchableOpacity>
          {showIncidentSiteDropdown && (
            <View style={styles.dropdownMenu}>
              {sites.map((site) => (
                <TouchableOpacity
                  key={site}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setIncidentSite(site);
                    setShowIncidentSiteDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{site}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Priorité *</Text>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => setShowIncidentPrioriteDropdown(!showIncidentPrioriteDropdown)}
          >
            <Text style={[styles.dropdownText, incidentPriorite && styles.selectedText]}>
              {incidentPriorite || 'Select  priority'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#6C757D" />
          </TouchableOpacity>
          {showIncidentPrioriteDropdown && (
            <View style={styles.dropdownMenu}>
              {priorites.map((priorite) => (
                <TouchableOpacity
                  key={priorite.value}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setIncidentPriorite(priorite.value);
                    setShowIncidentPrioriteDropdown(false);
                  }}
                >
                  <View>
                    <Text style={styles.dropdownItemText}>{priorite.value}</Text>
                    <Text style={styles.dropdownItemDesc}>{priorite.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description de l'Incident *</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Fournissez une description détaillée de ce qui s'est passé..."
          value={incidentDescription}
          onChangeText={setIncidentDescription}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Date de l'Incident *</Text>
          <TouchableOpacity 
            style={styles.dateInput}
            onPress={() => setShowIncidentDatePicker(true)}
          >
            <Text style={[styles.dropdownText, incidentDate && styles.selectedText]}>
              {incidentDate || 'Select date'}
            </Text>
            <Ionicons name="calendar-outline" size={20} color="#6C757D" />
          </TouchableOpacity>
          {showIncidentDatePicker && (
            <DateTimePicker
              value={selectedIncidentDate}
              mode="date"
              display="default"
              onChange={handleIncidentDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Heure de l'Incident *</Text>
          <TouchableOpacity 
            style={styles.dateInput}
            onPress={() => setShowIncidentTimePicker(true)}
          >
            <Text style={[styles.dropdownText, incidentTime && styles.selectedText]}>
              {incidentTime || 'Select time'}
            </Text>
            <Ionicons name="time-outline" size={20} color="#6C757D" />
          </TouchableOpacity>
          {showIncidentTimePicker && (
            <DateTimePicker
              value={selectedIncidentTime}
              mode="time"
              display="default"
              onChange={handleIncidentTimeChange}
            />
          )}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Lieu Spécifique *</Text>
        <TextInput
          style={styles.input}
          placeholder="Lieu exact où l'incident s'est produit"
          value={specificLocation}
          onChangeText={setSpecificLocation}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Témoins</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Noms et informations de contact des témoins..."
          value={witnesses}
          onChangeText={setWitnesses}
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Informations Supplémentaires</Text>
        <TouchableOpacity 
          style={styles.checkboxItem}
          onPress={() => setPoliceInvolved(!policeInvolved)}
        >
          <View style={[styles.checkbox, policeInvolved && styles.checkboxChecked]}>
            {policeInvolved && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>
          <Text style={styles.checkboxText}>La police a été impliquée</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.checkboxItem}
          onPress={() => setInsuranceClaim(!insuranceClaim)}
        >
          <View style={[styles.checkbox, insuranceClaim && styles.checkboxChecked]}>
            {insuranceClaim && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>
          <Text style={styles.checkboxText}>Une réclamation d'assurance peut être déposée</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitIncident}>
        <Ionicons name="document-text" size={20} color="#fff" />
        <Text style={styles.submitText}>Soumettre le Rapport d'Incident</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmergencyForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.emergencyAlert}>
        <Ionicons name="warning" size={20} color="#DC2626" />
        <Text style={styles.emergencyAlertText}>
          DEMANDES D'URGENCE : Pour les situations d'urgence mettant la vie en danger, appelez d'abord le 911. Utilisez ce formulaire pour l'assistance de sécurité urgente qui nécessite une réponse immédiate.
        </Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Site *</Text>
        <TouchableOpacity 
          style={styles.dropdown}
          onPress={() => setShowUrgenceSiteDropdown(!showUrgenceSiteDropdown)}
        >
          <Text style={[styles.dropdownText, urgenceSite && styles.selectedText]}>
            {urgenceSite || 'Sélectionner un site'}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#6C757D" />
        </TouchableOpacity>
        {showUrgenceSiteDropdown && (
          <View style={styles.dropdownMenu}>
            {sites.map((site) => (
              <TouchableOpacity
                key={site}
                style={styles.dropdownItem}
                onPress={() => {
                  setUrgenceSite(site);
                  setShowUrgenceSiteDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{site}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nature de l'Urgence *</Text>
        <TextInput
          style={styles.input}
          placeholder="ex., Effraction en cours, Activité suspecte, Violation de sécurité"
          value={natureEmergency}
          onChangeText={setNatureEmergency}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description de l'Urgence *</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Fournissez des détails immédiats de la situation d'urgence..."
          value={emergencyDescription}
          onChangeText={setEmergencyDescription}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Téléphone de Contact *</Text>
          <TextInput
            style={styles.input}
            placeholder="Votre numéro de téléphone direct"
            value={contactPhone}
            onChangeText={setContactPhone}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Lieu Spécifique *</Text>
          <TextInput
            style={styles.input}
            placeholder="Lieu exact dans le site"
            value={emergencyLocation}
            onChangeText={setEmergencyLocation}
          />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.checkboxItem}
        onPress={() => setImmediateResponse(!immediateResponse)}
      >
        <View style={[styles.checkbox, immediateResponse && styles.checkboxChecked]}>
          {immediateResponse && <Ionicons name="checkmark" size={16} color="#fff" />}
        </View>
        <Text style={styles.checkboxText}>Réponse immédiate requise (dans les 15 minutes)</Text>
      </TouchableOpacity>

      <View style={styles.emergencyNote}>
        <Ionicons name="information-circle" size={16} color="#2563EB" />
        <Text style={styles.emergencyNoteText}>
          Les demandes d'urgence sont automatiquement marquées comme priorité URGENTE et seront immédiatement transmises à notre équipe de réponse.
        </Text>
      </View>

      <TouchableOpacity style={styles.emergencyButton} onPress={handleSubmitEmergency}>
        <Ionicons name="flash" size={20} color="#fff" />
        <Text style={styles.submitText}>Soumettre la Demande d'Urgence</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header fixe personnalisé */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1E1E1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Créer une Demande</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {/* Informations Client */}
        <View style={styles.clientHeader}>
          <View style={styles.clientInfo}>
            <Ionicons name="person" size={20} color="#2563EB" />
            <View style={styles.clientDetails}>
              <Text style={styles.clientName}>phelane christopher</Text>
              <Text style={styles.clientEmail}>pricejuliane4@gmail.com</Text>
            </View>
             <View style={styles.clientBadge}>
            <Text style={styles.clientBadgeText}>Client Actif</Text>
          </View>
          </View>
        </View>

        {/* Titre Principal */}
        <View style={styles.mainTitle}>
          <Text style={styles.title}>+ Créer une Demande de Service</Text>
          <Text style={styles.subtitle}>Sélectionnez le type de demande de service que vous souhaitez soumettre</Text>
        </View>

        {/* Navigation par onglets */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'service' && styles.activeTab]}
            onPress={() => setActiveTab('service')}
          >
            <Ionicons name="add-circle-outline" size={18} color={activeTab === 'service' ? '#E87525' : '#6C757D'} />
            <Text style={[styles.tabText, activeTab === 'service' && styles.activeTabText]}>
              Service Supplémentaire
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'incident' && styles.activeTab]}
            onPress={() => setActiveTab('incident')}
          >
            <Ionicons name="document-text-outline" size={18} color={activeTab === 'incident' ? '#E87525' : '#6C757D'} />
            <Text style={[styles.tabText, activeTab === 'incident' && styles.activeTabText]}>
              Rapport d'Incident
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'urgence' && styles.activeTab]}
            onPress={() => setActiveTab('urgence')}
          >
            <Ionicons name="flash-outline" size={18} color={activeTab === 'urgence' ? '#E87525' : '#6C757D'} />
            <Text style={[styles.tabText, activeTab === 'urgence' && styles.activeTabText]}>
              Urgence
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contenu dynamique */}
        {activeTab === 'service' && renderServiceForm()}
        {activeTab === 'incident' && renderIncidentForm()}
        {activeTab === 'urgence' && renderEmergencyForm()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#080808ff',
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  clientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  clientDetails: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
    textTransform: 'capitalize',
  },
  clientEmail: {
    fontSize: 14,
    color: '#2563EB',
    marginTop: 2,
  },
  clientBadge: {
    backgroundColor: '#E87525',
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 16,
  },
  clientBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  mainTitle: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6C757D',
    lineHeight: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 6,
  },
  activeTab: {
    backgroundColor: '#FFF7ED',
    borderColor: '#E87525',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6C757D',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#E87525',
    fontWeight: '600',
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF7ED',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    gap: 8,
  },
  descriptionText: {
    flex: 1,
    fontSize: 14,
    color: '#2563eb',
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 16,
    position: 'relative',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  inputHalf: {
    flex: 1,
    position: 'relative',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0c0d0eff',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#2563eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#2563eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#2563eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#374151',
  },
  selectedText: {
    color: '#2563eb',
    fontWeight: '500',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#2563eb',
  },
  dropdownItemDesc: {
    fontSize: 12,
    color: '#030712ff',
    lineHeight: 16,
    marginTop: 2,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#2563eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    marginBottom: 24,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d0a216ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#E87525',
    borderColor: '#E87525',
  },
  checkboxText: {
    fontSize: 14,
    color: '#0c0d0eff',
    flex: 1,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E87525',
    paddingVertical: 16,
    borderRadius: 8,
    gap: 8,
    marginTop: 24,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    borderRadius: 8,
    gap: 8,
    marginTop: 24,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emergencyAlert: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    gap: 8,
  },
  emergencyAlertText: {
    flex: 1,
    fontSize: 14,
    color: '#DC2626',
    lineHeight: 20,
    fontWeight: '500',
  },
  emergencyNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EBF8FF',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  emergencyNoteText: {
    flex: 1,
    fontSize: 12,
    color: '#2563eb',
    lineHeight: 16,
  },
});