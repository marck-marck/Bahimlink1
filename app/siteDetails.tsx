import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  index: undefined;
};
import { Colors } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';

export default function SiteDetailsScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { colors } = useTheme();
  const { site } = route.params as { site: any };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return '#10B981';
      case 'Inactif': return '#6B7280';
      case 'Alerte': return '#EF4444';
      case 'Urgence': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getSecurityColor = (level: string) => {
    switch (level) {
      case 'Élevé': return '#EF4444';
      case 'Moyen': return '#F59E0B';
      case 'Faible': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* En-tête fixe */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#080808ff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails du Site</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={24} color="#080808ff" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* En-tête du site */}
        <View style={[styles.siteHeader, { backgroundColor: colors.background }]}>
          <View style={styles.siteHeaderContent}>
            <Text style={[styles.siteName, { color: colors.text }]}>{site.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(site.status) }]}>
              <Text style={styles.statusText}>{site.status}</Text>
            </View>
          </View>
          <Text style={[styles.siteAddress, { color: colors.icon }]}>{site.address}</Text>
          <View style={[styles.securityBadge, { backgroundColor: getSecurityColor(site.securityLevel) }]}>
            <Ionicons name="shield-checkmark" size={16} color="#fff" />
            <Text style={styles.securityText}>Sécurité {site.securityLevel}</Text>
          </View>
        </View>

        {/* Informations générales */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Informations Générales</Text>
          <View style={[styles.card, { backgroundColor: colors.background }]}>
            <View style={styles.infoRow}>
              <Ionicons name="business-outline" size={20} color={colors.primary} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: colors.icon }]}>Type de Site</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>Commercial</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="resize-outline" size={20} color={colors.primary} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: colors.icon }]}>Surface</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>2,500 m²</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={20} color={colors.primary} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: colors.icon }]}>Horaires de Surveillance</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>24h/24 - 7j/7</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={20} color={colors.primary} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: colors.icon }]}>Contact Principal</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{site.contact}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Personnel de sécurité */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Personnel de Sécurité</Text>
          <View style={[styles.card, { backgroundColor: colors.background }]}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.text }]}>{site.activeAgents}</Text>
                <Text style={[styles.statLabel, { color: colors.icon }]}>Agents Actifs</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.text }]}>2</Text>
                <Text style={[styles.statLabel, { color: colors.icon }]}>Superviseurs</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.text }]}>1</Text>
                <Text style={[styles.statLabel, { color: colors.icon }]}>Chef d'équipe</Text>
              </View>
            </View>
            
            <View style={styles.agentsList}>
              <Text style={[styles.agentsTitle, { color: colors.text }]}>Équipe Actuelle</Text>
              {['Agent Martin', 'Agent Dubois', 'Superviseur Leroy'].map((agent, index) => (
                <View key={index} style={styles.agentItem}>
                  <View style={styles.agentAvatar}>
                    <Ionicons name="person" size={16} color={colors.primary} />
                  </View>
                  <Text style={[styles.agentName, { color: colors.text }]}>{agent}</Text>
                  <View style={styles.agentStatus}>
                    <View style={styles.statusDot} />
                    <Text style={[styles.agentStatusText, { color: colors.icon }]}>En service</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Équipements et fonctionnalités */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Équipements & Fonctionnalités</Text>
          <View style={[styles.card, { backgroundColor: colors.background }]}>
            <View style={styles.featuresGrid}>
              {site.features.map((feature: string, index: number) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons 
                    name={getFeatureIcon(feature)} 
                    size={20} 
                    color={colors.primary} 
                  />
                  <Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Activité récente */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Activité Récente</Text>
          <View style={[styles.card, { backgroundColor: colors.background }]}>
            <Text style={[styles.activityText, { color: colors.icon }]}>{site.recentActivity}</Text>
            
            <View style={styles.activityList}>
              {[
                { time: '14:30', action: 'Patrouille terminée', status: 'success' },
                { time: '12:15', action: 'Changement d\'équipe', status: 'info' },
                { time: '09:45', action: 'Vérification périmètre', status: 'success' },
                { time: '08:00', action: 'Début de service', status: 'info' }
              ].map((activity, index) => (
                <View key={index} style={styles.activityItem}>
                  <View style={styles.activityTime}>
                    <Text style={[styles.timeText, { color: colors.icon }]}>{activity.time}</Text>
                  </View>
                  <View style={[styles.activityDot, { 
                    backgroundColor: activity.status === 'success' ? '#10B981' : colors.primary 
                  }]} />
                  <Text style={[styles.activityAction, { color: colors.text }]}>{activity.action}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Actions rapides */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Actions Rapides</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]}>
              <Ionicons name="call" size={20} color="#fff" />
              <Text style={styles.actionText}>Contacter l'Équipe</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10B981' }]}>
              <Ionicons name="document-text" size={20} color="#fff" />
              <Text style={styles.actionText}>Rapport de Site</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#F59E0B' }]}>
              <Ionicons name="warning" size={20} color="#fff" />
              <Text style={styles.actionText}>Signaler Incident</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#EF4444' }]}>
              <Ionicons name="flash" size={20} color="#fff" />
              <Text style={styles.actionText}>Urgence</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function getFeatureIcon(feature: string) {
  switch (feature) {
    case 'Caméras': return 'videocam-outline';
    case 'Alarme': return 'alarm-outline';
    case 'Patrouille': return 'walk-outline';
    case 'Contrôle d\'accès': return 'key-outline';
    default: return 'checkmark-circle-outline';
  }
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
  siteHeader: {
    padding: 20,
  },
  siteHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  siteName: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  siteAddress: {
    fontSize: 16,
    marginBottom: 12,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: 6,
  },
  securityText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  lastSection: {
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  agentsList: {
    marginTop: 16,
  },
  agentsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  agentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  agentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  agentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  agentStatusText: {
    fontSize: 12,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activityText: {
    fontSize: 14,
    marginBottom: 16,
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityTime: {
    width: 50,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 12,
  },
  activityAction: {
    fontSize: 14,
    flex: 1,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    flex: 1,
    minWidth: '45%',
    justifyContent: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});