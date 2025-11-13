import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, RefreshControl, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  index: undefined;
};
import InviteStaffModal from '../components/InviteStaffModal';
import AddStaffModal from '../components/AddStaffModal';

export default function GestionPersonnelScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const rolesData = [
    {
      id: 1,
      name: 'Gestionnaire',
      color: '#3B82F6',
      permissions: [
        'Accès complet',
        'Création & modification',
        'Gestion des utilisateurs',
        'Rapports avancés'
      ]
    },
    {
      id: 2,
      name: 'Coordinateur',
      color: '#8B5CF6',
      permissions: [
        'Coordonne horaires',
        'Gestion des infos',
        'Création de rapports',
        'Supervision équipes'
      ]
    },
    {
      id: 3,
      name: 'Observateur',
      color: '#6B7280',
      permissions: [
        'Accès lecture seule',
        'Consultation rapports',
        'Vue des horaires',
        'Notifications'
      ]
    }
  ];

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
        <Text style={styles.headerTitle}>Gestion du Personnel</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#2563eb" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Bandeau informatif */}
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle-outline" size={20} color="#2563eb" />
          <Text style={styles.infoText}>
            Ajoutez des membres du personnel avec des rôles et permissions spécifiques pour votre organisation
          </Text>
        </View>

        {/* Section Rôles & Permissions */}
        <View style={styles.rolesSection}>
          <Text style={styles.sectionTitle}>Rôles & Permissions du Personnel</Text>
          <Text style={styles.sectionSubtitle}>Comprendre les rôles et accès possibles</Text>
          
          <View style={styles.rolesContainer}>
            <View style={styles.rolesTopRow}>
              {rolesData.slice(0, 2).map((role) => (
                <View key={role.id} style={styles.roleCard}>
                  <View style={styles.roleHeader}>
                    <View style={[styles.roleDot, { backgroundColor: role.color }]} />
                    <Text style={styles.roleName}>{role.name}</Text>
                  </View>
                  <View style={styles.permissionsList}>
                    {role.permissions.map((permission, index) => (
                      <View key={index} style={styles.permissionItem}>
                        <View style={styles.bulletPoint} />
                        <Text style={styles.permissionText}>{permission}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.rolesBottomRow}>
              <View style={styles.roleCardCentered}>
                <View style={styles.roleHeader}>
                  <View style={[styles.roleDot, { backgroundColor: rolesData[2].color }]} />
                  <Text style={styles.roleName}>{rolesData[2].name}</Text>
                </View>
                <View style={styles.permissionsList}>
                  {rolesData[2].permissions.map((permission, index) => (
                    <View key={index} style={styles.permissionItem}>
                      <View style={styles.bulletPoint} />
                      <Text style={styles.permissionText}>{permission}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Section Gestion du Personnel */}
        <View style={styles.managementSection}>
          <View style={styles.managementHeader}>
            <View>
              <Text style={styles.sectionTitle}>Gestion du Personnel</Text>
              <Text style={styles.sectionSubtitle}>Gérez les membres et leurs permissions</Text>
            </View>
          </View>

          {/* État vide */}
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color="#6C757D" />
            <Text style={styles.emptyTitle}>Aucun membre du personnel pour le moment</Text>
            <Text style={styles.emptySubtext}>
              Ajoutez des membres pour commencer à gérer votre équipe
            </Text>
            
            {/* Boutons centrés dans l'état vide */}
            <View style={styles.emptyActions}>
              <TouchableOpacity style={styles.emptyPrimaryButton} onPress={() => setAddModalVisible(true)}>
                <Ionicons name="person-add" size={20} color="#fff" />
                <Text style={styles.emptyPrimaryButtonText}>Ajouter un Utilisateur</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.emptySecondaryButton} onPress={() => setInviteModalVisible(true)}>
                <Ionicons name="mail" size={20} color="#E87525" />
                <Text style={styles.emptySecondaryButtonText}>Inviter un Membre</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Section d'aide */}
        <View style={styles.helpSection}>
          <TouchableOpacity style={styles.helpCard}>
            <Ionicons name="help-circle-outline" size={24} color="#3B82F6" />
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>Besoin d'aide ?</Text>
              <Text style={styles.helpText}>Guide de gestion du personnel</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6C757D" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <InviteStaffModal
        visible={inviteModalVisible}
        onClose={() => setInviteModalVisible(false)}
        onSubmit={(data) => {
          console.log('Données d\'invitation:', data);
          Alert.alert('Succès', `Invitation envoyée à ${data.firstName} ${data.lastName}`);
          setInviteModalVisible(false);
        }}
      />
      
      <AddStaffModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSubmit={(data) => {
          console.log('Données du nouveau membre:', data);
          Alert.alert('Succès', `Membre ${data.firstName} ${data.lastName} ajouté avec succès!`);
          setAddModalVisible(false);
        }}
      />
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
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF8FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 8,
    padding: 12,
    margin: 16,
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
  },
  rolesSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 16,
  },
  rolesContainer: {
    gap: 12,
  },
  rolesTopRow: {
    flexDirection: 'row',
    gap: 12,
  },
  rolesBottomRow: {
    alignItems: 'center',
  },
  roleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  roleCardCentered: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  roleDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  roleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  permissionsList: {
    gap: 6,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bulletPoint: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#6C757D',
  },
  permissionText: {
    fontSize: 12,
    color: '#374151',
    flex: 1,
  },
  managementSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  managementHeader: {
    marginBottom: 16,
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E1E1E',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyActions: {
    gap: 12,
    width: '100%',
  },
  emptyPrimaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  emptyPrimaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptySecondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E87525',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  emptySecondaryButtonText: {
    color: '#E87525',
    fontSize: 16,
    fontWeight: '600',
  },
  helpSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  helpCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
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
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  helpText: {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 4,
  },
});