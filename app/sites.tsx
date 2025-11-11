import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SitesScreen() {
  const [activeTab, setActiveTab] = useState('carte');
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const sitesData = [
    {
      id: 1,
      name: 'Site Principal',
      address: '123 Rue de la Sécurité\n75001 Paris, France',
      securityLevel: 'moyen',
      activeAgents: 2,
      recentActivity: '3 événements',
      status: 'Actif',
      features: ['Alarme', 'Caméras'],
      contact: '+33 1 23 45 67 89',
      coordinates: { latitude: 48.8566, longitude: 2.3522 }
    },
    {
      id: 2,
      name: 'Site Secondaire',
      address: '456 Avenue de la Protection\n69000 Lyon, France',
      securityLevel: 'élevé',
      activeAgents: 1,
      recentActivity: '1 événement',
      status: 'Alerte',
      features: ['CCTV', 'Contrôle d\'accès'],
      contact: '+33 4 78 90 12 34',
      coordinates: { latitude: 45.7640, longitude: 4.8357 }
    },
    {
      id: 3,
      name: 'Site Industriel',
      address: '789 Zone Industrielle\n13000 Marseille, France',
      securityLevel: 'élevé',
      activeAgents: 0,
      recentActivity: '0 événements',
      status: 'Inactif',
      features: ['Détection périmètre', 'Patrouille'],
      contact: '+33 4 91 23 45 67',
      coordinates: { latitude: 43.2965, longitude: 5.3698 }
    },
    {
      id: 4,
      name: 'Centre Commercial',
      address: '321 Boulevard du Commerce\n33000 Bordeaux, France',
      securityLevel: 'moyen',
      activeAgents: 3,
      recentActivity: '5 événements',
      status: 'Urgence',
      features: ['CCTV', 'Alarme incendie', 'Contrôle accès'],
      contact: '+33 5 56 78 90 12',
      coordinates: { latitude: 44.8378, longitude: -0.5792 }
    }
  ];

  const kpiData = [
    { title: 'Total des Sites', value: sitesData.length.toString(), icon: 'business-outline' },
    { title: 'Sites Actifs', value: sitesData.filter(site => site.status === 'Actif').length.toString(), icon: 'checkmark-circle-outline' },
    { title: 'En Alerte', value: sitesData.filter(site => site.status === 'Alerte' || site.status === 'Urgence').length.toString(), icon: 'warning-outline' },
    { title: 'Avec CCTV', value: sitesData.filter(site => site.features.includes('CCTV')).length.toString(), icon: 'videocam-outline' },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getSecurityColor = (level: string) => {
    switch (level) {
      case 'élevé': return '#10B981';
      case 'moyen': return '#F59E0B';
      case 'faible': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return '#10B981';
      case 'Inactif': return '#6B7280';
      case 'Alerte': return '#EF4444';
      case 'Urgence': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const filteredSites = sitesData.filter(site => 
    site.name.toLowerCase().includes(searchText.toLowerCase()) ||
    site.address.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* En-tête fixe */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#090909ff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mes Sites</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >

        {/* Section 1: Mes Sites */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.mainTitle}>Mes Sites</Text>
            <Text style={styles.subtitle}>Tous les sites sous votre gestion de sécurité</Text>
          </View>

          {/* KPI Grid */}
          <View style={styles.kpiContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.kpiGrid}>
                {kpiData.map((kpi, index) => (
                  <View key={index} style={styles.kpiCard}>
                    <Ionicons name={kpi.icon as any} size={24} color={Colors.light.primary} />
                    <Text style={styles.kpiValue}>{kpi.value}</Text>
                    <Text style={styles.kpiTitle}>{kpi.title}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Section 2: Couverture de Sécurité */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Couverture de Sécurité</Text>
            <Text style={styles.sectionSubtitle}>Statut de couverture de sécurité en temps réel sur tous vos sites</Text>
          </View>

          {/* Tableau de bord */}
          <View style={styles.dashboardCard}>
            <Text style={styles.dashboardTitle}>Tableau de Bord de Couverture</Text>
            <Text style={styles.dashboardDesc}>Surveiller la couverture de sécurité en temps réel et le déploiement d'agents sur tous les sites</Text>
          </View>

          {/* Contrôles de vue */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'carte' && styles.activeTab]}
              onPress={() => setActiveTab('carte')}
            >
              <Text style={[styles.tabText, activeTab === 'carte' && styles.activeTabText]}>Carte en Direct</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'details' && styles.activeTab]}
              onPress={() => setActiveTab('details')}
            >
              <Text style={[styles.tabText, activeTab === 'details' && styles.activeTabText]}>Détails du Site</Text>
            </TouchableOpacity>
          </View>

          {/* Barre de recherche */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#6B7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher des sites..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* Contenu selon l'onglet actif */}
          {activeTab === 'carte' && (
            <View style={styles.mapContainer}>
              <View style={styles.mapPlaceholder}>
                <Ionicons name="map-outline" size={48} color="#6B7280" />
                <Text style={styles.mapText}>Emplacements des Sites</Text>
                <Text style={styles.mapSubtext}>Aperçu géographique de vos sites protégés</Text>
                
                {/* Sites sur la carte */}
                <View style={styles.mapSites}>
                  {filteredSites.map((site) => (
                    <TouchableOpacity key={site.id} style={styles.mapSite}>
                      <View style={[styles.mapMarker, { backgroundColor: getStatusColor(site.status) }]}>
                        <Ionicons name="location" size={16} color="#fff" />
                      </View>
                      <Text style={styles.mapSiteName}>{site.name}</Text>
                      <Text style={styles.mapSiteStatus}>{site.status}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                
                {/* Légende */}
                <View style={styles.legend}>
                  <View style={styles.legendRow}>
                    <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                    <Text style={styles.legendText}>Actif</Text>
                    <View style={[styles.legendDot, { backgroundColor: '#6B7280' }]} />
                    <Text style={styles.legendText}>Inactif</Text>
                  </View>
                  <View style={styles.legendRow}>
                    <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
                    <Text style={styles.legendText}>Alerte</Text>
                    <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
                    <Text style={styles.legendText}>Urgence</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Liste des sites */}
          <View style={styles.sitesContainer}>
            {filteredSites.map((site) => (
              <View key={site.id} style={styles.siteCard}>
                <View style={styles.siteHeader}>
                  <Text style={styles.siteName}>{site.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(site.status) }]}>
                    <Text style={styles.statusText}>{site.status}</Text>
                  </View>
                </View>
                
                <Text style={styles.siteAddress}>{site.address}</Text>
                
                <View style={styles.siteBadges}>
                  <View style={[styles.badge, { backgroundColor: getSecurityColor(site.securityLevel) }]}>
                    <Text style={styles.badgeText}>{site.securityLevel}</Text>
                  </View>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{site.activeAgents} Agents</Text>
                  </View>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{site.recentActivity}</Text>
                  </View>
                </View>
                
                <View style={styles.siteFooter}>
                  <View style={styles.siteInfo}>
                    <Text style={styles.infoLabel}>Contact: {site.contact}</Text>
                    <Text style={styles.infoLabel}>Fonctionnalités: {site.features.join(', ')}</Text>
                  </View>
                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}>Voir les Détails</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Métriques secondaires */}
          <View style={styles.secondaryMetrics}>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{sitesData.reduce((total, site) => total + site.activeAgents, 0)}</Text>
              <Text style={styles.metricLabel}>Agents</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{sitesData.filter(site => site.status === 'Alerte' || site.status === 'Urgence').length}</Text>
              <Text style={styles.metricLabel}>Incidents</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{sitesData.filter(site => site.features.includes('Patrouille')).length}</Text>
              <Text style={styles.metricLabel}>Patrouilles</Text>
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
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionHeader: {
    marginBottom: 16,
  },


  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  kpiContainer: {
    marginBottom: 1,
  },
  kpiGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  kpiCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    minWidth: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginTop: 8,
  },
  kpiTitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  dashboardCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  dashboardDesc: {
    fontSize: 14,
    color: '#6B7280',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
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
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.light.primary,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E1E1E',
  },
  mapContainer: {
    marginBottom: 20,
  },
  mapPlaceholder: {
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
  mapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginTop: 12,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    marginBottom: 16,
  },
  legend: {
    gap: 8,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
  },
  mapSites: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 16,
  },
  mapSite: {
    alignItems: 'center',
    padding: 8,
  },
  mapMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  mapSiteName: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1E1E1E',
    textAlign: 'center',
  },
  mapSiteStatus: {
    fontSize: 8,
    color: '#6B7280',
    textAlign: 'center',
  },
  sitesContainer: {
    gap: 16,
    marginBottom: 20,
  },
  siteCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  siteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  siteName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  siteAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  siteBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#1E1E1E',
    fontWeight: '600',
  },
  siteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  siteInfo: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  detailsButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
    
  },
  metricItem: {
    alignItems: 'center',
    marginBottom: 2,

  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.primary,
     
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    
  },
});