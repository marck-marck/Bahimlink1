import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  index: undefined;
};
import { Colors } from '@/constants/theme';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ReportsScreen() {
  const [activeFilter, setActiveFilter] = useState('Toute la couverture');
  const [activeSiteFilter, setActiveSiteFilter] = useState('Tous les sites');
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [selectedType, setSelectedType] = useState('Tous les types');
  const [selectedSite, setSelectedSite] = useState('Tous les sites');
  const [startDate, setStartDate] = useState('Toutes les dates');
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDate, setCustomDate] = useState<Date | null>(null);

  const reportsData = [
    {
      id: 1,
      name: 'Incident de sécurité - Site Principal',
      address: 'Site Principal - Paris',
      type: 'Incident',
      site: 'Site Principal',
      gravity: 'Haute',
      status: 'En cours',
      date: '27/10/2025'
    },
    {
      id: 2,
      name: 'Rapport de patrouille - Site Secondaire',
      address: 'Site Secondaire - Lyon',
      type: 'Patrouille',
      site: 'Site Secondaire',
      gravity: 'Normale',
      status: 'Terminé',
      date: '26/10/2025'
    }
  ];

  const kpiData = [
    { title: 'Rapports \nTotaux', value: '0', icon: 'document-text-outline', color: '#3B82F6' },
    { title: 'Incidents', value: '0', icon: 'warning-outline', color: '#EF4444' },
    { title: 'Rapports de \n Patrouille', value: '0', icon: 'time-outline', color: '#8B5CF6' },
    { title: 'Maintenance', value: '0', icon: 'construct-outline', color: '#F59E0B' }
  ];

  const typeOptions = ['Tous les types', 'Incident', 'Patrouille', 'Maintenance', 'Inspection'];
  const siteOptions = ['Tous les sites', 'Site Principal', 'Site Secondaire', 'Site Industriel'];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AUCUN': return '#EF4444';
      case 'COUVERT': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getSecurityColor = (level: string) => {
    switch (level) {
       case 'élevé': return '#10B981';
      case 'moyen': return '#F59E0B';
      case 'faible': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const clearFilters = () => {
    setSearchText('');
    setSelectedType('Tous les types');
    setSelectedSite('Tous les sites');
    setStartDate('Toutes les dates');
    setCustomDate(null);
    setShowDatePicker(false);
  };

  const filteredReports = reportsData.filter(report => {
    const matchesSearch = report.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                         report.address?.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = selectedType === 'Tous les types' || report.type === selectedType;
    const matchesSite = selectedSite === 'Tous les sites' || report.site === selectedSite;
    const matchesDate = startDate === 'Toutes les dates' || 
                       (startDate === 'Aujourd\'hui' && report.date === new Date().toLocaleDateString('fr-FR')) ||
                       startDate === 'Cette semaine' || startDate === 'Ce mois';
    
    return matchesSearch && matchesType && matchesSite && matchesDate;
  });

  return (
    <View style={styles.container}>
      {/* En-tête fixe */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#090909ff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rapports de Sécurité</Text>
        <TouchableOpacity onPress={onRefresh}>
          <Ionicons name="refresh" size={24} color="#2563eb" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* En-tête de page */}
        <View style={styles.pageHeader}>
          <View>
            <Text style={styles.pageTitle}>Rapports de Sécurité</Text>
            <Text style={styles.pageSubtitle}>Consultez et gérez vos rapports de sécurité</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="download-outline" size={20} color="#555559" />
              <Text style={styles.actionButtonText}>Exporter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="calendar-outline" size={20} color="#555559" />
              <Text style={styles.actionButtonText}>Programmer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* KPI Grid */}
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
            <Text style={styles.filtersTitle}>Filtres</Text>
            <Ionicons 
              name={filtersExpanded ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color="#6C757D" 
            />
          </TouchableOpacity>
          
          {filtersExpanded && (
            <View style={styles.filtersContent}>
              {/* Recherche */}
              <View style={styles.filterField}>
                <Ionicons name="search-outline" size={20} color="#2563eb"  />
                <TextInput
                  style={styles.filterInput}
                  placeholder="Rechercher..."
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>
              
              {/* Type */}
              <View style={styles.filterField}>
                <Ionicons name="document-outline" size={20} color="#2563eb"  />
                <View style={styles.dropdownContainer}>
                  <Text style={styles.dropdownLabel}>Type</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.optionsRow}>
                      {typeOptions.map((type) => (
                        <TouchableOpacity
                          key={type}
                          style={[styles.optionButton, selectedType === type && styles.activeOption]}
                          onPress={() => setSelectedType(type)}
                        >
                          <Text style={[styles.optionText, selectedType === type && styles.activeOptionText]}>
                            {type}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </View>
              
              {/* Site */}
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
              
              {/* Date */}
              <View style={styles.filterField}>
                <Ionicons name="calendar-outline" size={20} color="#2563eb" />
                <View style={styles.dropdownContainer}>
                  <Text style={styles.dropdownLabel}>Date</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.optionsRow}>
                      {['Toutes les dates', 'Aujourd\'hui', 'Cette semaine', 'Ce mois', 'Date personnalisée'].map((date) => (
                        <TouchableOpacity
                          key={date}
                          style={[styles.optionButton, startDate === date && styles.activeOption]}
                          onPress={() => setStartDate(date)}
                        >
                          <Text style={[styles.optionText, startDate === date && styles.activeOptionText]}>
                            {date}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                  {startDate === 'Date personnalisée' && (
                    <View style={styles.calendarContainer}>
                      <TouchableOpacity 
                        style={styles.datePickerButton}
                        onPress={() => setShowDatePicker(true)}
                      >
                        <Ionicons name="calendar" size={16} color="#2563eb" />
                        <Text style={styles.datePickerText}>
                          {customDate ? customDate.toLocaleDateString('fr-FR') : 'Sélectionner une date'}
                        </Text>
                      </TouchableOpacity>
                      {showDatePicker && (
                        <DateTimePicker
                          value={customDate || new Date()}
                          mode="date"
                          display="default"
                          onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                              setCustomDate(selectedDate);
                            }
                          }}
                        />
                      )}
                    </View>
                  )}
                </View>
              </View>
              
              {/* Actions */}
              <View style={styles.filterActions}>
                <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
                  <Ionicons name="close-outline" size={16} color="#6C757D" />
                  <Text style={styles.clearButtonText}>Effacer les Filtres</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyButton}>
                  <Text style={styles.applyButtonText}>Appliquer</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Résultats */}
        <View style={styles.resultsSection}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>Rapports</Text>
            <TouchableOpacity onPress={onRefresh}>
              <Ionicons name="refresh-outline" size={20} color="#6C757D" />
            </TouchableOpacity>
          </View>
          
          {filteredReports.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="document-outline" size={64} color="#6C757D" />
              <Text style={styles.emptyText}>Aucun rapport trouvé</Text>
              <Text style={styles.emptySubtext}>Aucun rapport ne correspond à vos critères de recherche</Text>
            </View>
          ) : (
            <View style={styles.reportsContainer}>
              {filteredReports.map((report) => (
                <View key={report.id} style={styles.reportCard}>
                  <View style={styles.reportHeader}>
                    <View style={styles.reportType}>
                      <Ionicons name="warning-outline" size={16} color="#EF4444" />
                      <Text style={styles.reportTypeText}>INCIDENT</Text>
                    </View>
                    <TouchableOpacity>
                      <Ionicons name="ellipsis-horizontal" size={20} color="#6C757D" />
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.reportTitle}>{report.name}</Text>
                  <Text style={styles.reportSite}>{report.address}</Text>
                  
                  <View style={styles.reportFooter}>
                    <View style={styles.reportMeta}>
                      <Text style={styles.reportGravity}>Gravité : Haute</Text>
                      <Text style={styles.reportDate}>27/10/2025</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: '#F59E0B' }]}>
                      <Text style={styles.statusText}>En cours</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
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
  pageHeader: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#555559',
    fontWeight: '500',
  },
  kpiContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  kpiGrid: {
    flexDirection: 'row',
    gap: 12,
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
    alignItems: 'center',
    gap: 12,
  },
  filterInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    paddingVertical: 8,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#6C757D',
  },
  applyButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  resultsSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E1E1E',
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
    marginTop: 8,
    textAlign: 'center',
  },
  reportsContainer: {
    paddingHorizontal: 16,
    
    paddingBottom: 20,
  },
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reportTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  reportSite: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 12,
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportMeta: {
    flex: 1,
  },
  reportGravity: {
    fontSize: 12,
    color: '#6C757D',
    marginBottom: 2,
  },
  reportDate: {
    fontSize: 12,
    color: '#6C757D',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  calendarContainer: {
    marginTop: 12,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  datePickerText: {
    fontSize: 14,
    color: '#374151',
  },
});