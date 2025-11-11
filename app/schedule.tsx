import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ScheduleScreen() {
  const [activeTab, setActiveTab] = useState('Aperçu');
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedDate, setSelectedDate] = useState('Aujourd\'hui');
  const [selectedStatus, setSelectedStatus] = useState('Tous les Statuts');
  const [selectedSite, setSelectedSite] = useState('Tous les Sites');
  
  const dateOptions = ['Aujourd\'hui', 'Cette semaine', 'Ce mois', 'Date personnalisée'];
  const statusOptions = ['Tous les Statuts', 'Programmé', 'En cours', 'Terminé', 'Annulé'];
  const siteOptions = ['Tous les Sites', 'Site Principal', 'Site Secondaire', 'Site Industriel'];
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const kpiData = [
    { title: 'Total des\néquipes', value: '0', icon: 'people-outline', color: '#3B82F6' },
    { title: 'Actives\nmaintenant', value: '0', icon: 'checkmark-circle-outline', color: '#10B981' },
    { title: 'Heures de\ncouverture', value: '0h', icon: 'time-outline', color: '#8B5CF6' },
    { title: 'Sites\ncouverts', value: '0', icon: 'location-outline', color: '#F59E0B' }
  ];

  const allTeams = [
    {
      id: 1,
      name: 'stevo digital',
      agent: 'Agent inconnu',
      site: 'Site Principal',
      startTime: '08:00',
      endTime: '16:00',
      date: 'Aujourd\'hui',
      status: 'Programmé',
      isActive: false
    },
    {
      id: 2,
      name: 'Équipe Alpha',
      agent: 'Jean Dupont',
      site: 'Site Secondaire',
      startTime: '14:00',
      endTime: '22:00',
      date: 'Aujourd\'hui',
      status: 'En cours',
      isActive: true
    },
    {
      id: 3,
      name: 'Équipe Beta',
      agent: 'Marie Martin',
      site: 'Site Principal',
      startTime: '22:00',
      endTime: '06:00',
      date: 'Demain',
      status: 'Programmé',
      isActive: false
    },
    {
      id: 4,
      name: 'Équipe Gamma',
      agent: 'Paul Durand',
      site: 'Site Industriel',
      startTime: '06:00',
      endTime: '14:00',
      date: 'Cette semaine',
      status: 'Terminé',
      isActive: false
    }
  ];

  const filteredTeams = allTeams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         team.agent.toLowerCase().includes(searchText.toLowerCase()) ||
                         team.site.toLowerCase().includes(searchText.toLowerCase());
    const matchesDate = selectedDate === 'Aujourd\'hui' ? team.date === 'Aujourd\'hui' :
                       selectedDate === 'Cette semaine' ? ['Aujourd\'hui', 'Demain', 'Cette semaine'].includes(team.date) :
                       selectedDate === 'Ce mois' ? true : true;
    const matchesStatus = selectedStatus === 'Tous les Statuts' || team.status === selectedStatus;
    const matchesSite = selectedSite === 'Tous les Sites' || team.site === selectedSite;
    
    return matchesSearch && matchesDate && matchesStatus && matchesSite;
  });

  const activeTeams = filteredTeams.filter(team => team.isActive);
  const upcomingTeams = filteredTeams.filter(team => !team.isActive);

  const tabs = ['Aperçu', 'Horaire', 'Historique'];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <View style={styles.container}>
      {/* En-tête fixe */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#090909ff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Équipes de Sécurité</Text>
        <TouchableOpacity onPress={onRefresh}>
          <Ionicons name="refresh" size={24} color="#2563eb" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Section principale */}
        <View style={styles.mainSection}>
          <Text style={styles.title}>Équipes de Sécurité</Text>
          <Text style={styles.subtitle}>Gérez et surveillez vos équipes de sécurité</Text>
          {/* <TouchableOpacity style={styles.supportButton}>
            <Ionicons name="headset-outline" size={20} color="#fff" />
            <Text style={styles.supportButtonText}>Contacter le support</Text>
          </TouchableOpacity>*/}
        </View>

        {/* KPI Cards */}
        <View style={styles.kpiContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.kpiGrid}>
              {kpiData.map((kpi, index) => (
                <View key={index} style={styles.kpiCard}>
                  <Ionicons name={kpi.icon as any} size={20} color={kpi.color} />
                  <Text style={[styles.kpiValue, { color: kpi.color }]}>{kpi.value}</Text>
                  <Text style={styles.kpiTitle}>{kpi.title}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Zone de Filtres */}
        <View style={styles.filtersSection}>
          <TouchableOpacity 
            style={styles.filtersHeader}
            onPress={() => setFiltersExpanded(!filtersExpanded)}
          >
            <Text style={styles.filtersTitle}>Filtres & Recherche</Text>
            <Ionicons 
              name={filtersExpanded ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color="#6C757D" 
            />
          </TouchableOpacity>
          
          {filtersExpanded && (
            <View style={styles.filtersContent}>
              <View style={styles.filterField}>
                <Ionicons name="search-outline" size={20} color="#2563eb" />
                <TextInput
                  style={styles.filterInput}
                  placeholder="Rechercher des équipes, sites ou agents..."
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>
              
              <View style={styles.filterField}>
                <Ionicons name="calendar-outline" size={20} color="#2563eb" />
                <View style={styles.dropdownContainer}>
                  <Text style={styles.dropdownLabel}>Date</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.optionsRow}>
                      {dateOptions.map((date) => (
                        <TouchableOpacity
                          key={date}
                          style={[styles.optionButton, selectedDate === date && styles.activeOption]}
                          onPress={() => setSelectedDate(date)}
                        >
                          <Text style={[styles.optionText, selectedDate === date && styles.activeOptionText]}>
                            {date}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </View>
              
              <View style={styles.filterField}>
                <Ionicons name="flag-outline" size={20} color="#2563eb" />
                <View style={styles.dropdownContainer}>
                  <Text style={styles.dropdownLabel}>Statut</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.optionsRow}>
                      {statusOptions.map((status) => (
                        <TouchableOpacity
                          key={status}
                          style={[styles.optionButton, selectedStatus === status && styles.activeOption]}
                          onPress={() => setSelectedStatus(status)}
                        >
                          <Text style={[styles.optionText, selectedStatus === status && styles.activeOptionText]}>
                            {status}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </View>
              
              <View style={styles.filterField}>
                <Ionicons name="location-outline" size={20} color="#2563eb" />
                <View style={styles.dropdownContainer}>
                  <Text style={styles.dropdownLabel}>Site</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.optionsRow}>
                      {siteOptions.map((site) => (
                        <TouchableOpacity
                          key={site}
                          style={[styles.optionButton, selectedSite === site && styles.activeOption]}
                          onPress={() => setSelectedSite(site)}
                        >
                          <Text style={[styles.optionText, selectedSite === site && styles.activeOptionText]}>
                            {site}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </View>
              
              <View style={styles.filterActions}>
                <TouchableOpacity 
                  style={styles.clearButton} 
                  onPress={() => {
                    setSearchText('');
                    setSelectedDate('Aujourd\'hui');
                    setSelectedStatus('Tous les Statuts');
                    setSelectedSite('Tous les Sites');
                  }}
                >
                  <Ionicons name="close-outline" size={16} color="#6C757D" />
                  <Text style={styles.clearButtonText}>Effacer les Filtres</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Onglets de navigation */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contenu des équipes */}
        <View style={styles.teamsContainer}>
          {/* Équipes Actives */}
          <View style={styles.teamSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.sectionTitle}>Équipes Actives</Text>
            </View>
            {activeTeams.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="shield-outline" size={48} color="#6C757D" />
                <Text style={styles.emptyText}>Aucune équipe active pour le moment</Text>
              </View>
            ) : (
              activeTeams.map((team) => (
                <View key={team.id} style={styles.teamCard}>
                  <View style={styles.teamHeader}>
                    <Ionicons name="people" size={16} color="#10B981" />
                    <Text style={styles.teamName}>{team.name}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: '#D1FAE5' }]}>
                      <Text style={[styles.statusText, { color: '#065F46' }]}>{team.status}</Text>
                    </View>
                  </View>
                  <Text style={styles.teamAgent}>{team.agent} • {team.site}</Text>
                  <Text style={styles.teamTime}>{team.date} {team.startTime} - {team.endTime}</Text>
                </View>
              ))
            )}
          </View>

          {/* Équipes à Venir */}
          <View style={styles.teamSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name="time" size={20} color="#3B82F6" />
              <Text style={styles.sectionTitle}>Équipes à Venir</Text>
            </View>
            {upcomingTeams.map((team) => (
              <View key={team.id} style={styles.teamCard}>
                <View style={styles.teamHeader}>
                  <Ionicons name="people" size={16} color="#3B82F6" />
                  <Text style={styles.teamName}>{team.name}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{team.status}</Text>
                  </View>
                </View>
                <Text style={styles.teamAgent}>{team.agent} • {team.site}</Text>
                <Text style={styles.teamTime}>{team.date} {team.startTime} - {team.endTime}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bloc d'aide */}
         
          <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Besoin d'aide ?</Text>
          <View style={styles.helpActions}>
            <TouchableOpacity style={styles.helpCard}
            onPress={() => navigation.navigate('contactSupport' as never)}>
              <Ionicons name="headset" size={24} color="#3B82F6" />
              <Text style={styles.helpCardTitle}>Contacter le support</Text>
              <Text style={styles.helpCardDesc}>Questions sur les équipes</Text>              
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.helpCard}
              onPress={() => navigation.navigate('creerDemande' as never)}
            >
              <Ionicons name="add-circle" size={24} color="#10B981" />
              <Text style={styles.helpCardTitle}>Demander une couverture</Text>
              <Text style={styles.helpCardDesc}>Ajouter sécurité</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpCard}>
              <Ionicons name="call" size={24} color="#EF4444" />
              <Text style={styles.helpCardTitle}>Contacts d'Urgence</Text>
              <Text style={styles.helpCardDesc}>Alerte immédiate</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </ScrollView>
    </View>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#080808ff',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  mainSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 16,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E87525',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    alignSelf: 'flex-start',
  },
  supportButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  kpiGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  kpiContainer: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  kpiCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  kpiTitle: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  filtersSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  filtersContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  filterField: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  filterInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E1E1E',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dropdownContainer: {
    flex: 1,
  },
  dropdownLabel: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 8,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  optionButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeOption: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  optionText: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '500',
  },
  activeOptionText: {
    color: '#fff',
    fontWeight: '600',
  },
  filterActions: {
    alignItems: 'center',
    marginTop: 8,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#6C757D',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  teamsContainer: {
    paddingHorizontal: 16,
    gap: 20,
  },
  teamSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 8,
  },
  teamCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    flex: 1,
    marginLeft: 8,
  },
  statusBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: '#92400E',
    fontWeight: '600',
  },
  teamAgent: {
    fontSize: 12,
    color: '#6C757D',
    marginBottom: 2,
  },
  teamTime: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  helpSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ec420aff',
    
    },
  helpActions: {
    gap: 12,
    
  },
  helpCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    
  },
  helpCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    flex: 1,
    marginLeft: 10,
    
  },
  helpCardDesc: {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 4,
    
  },
});