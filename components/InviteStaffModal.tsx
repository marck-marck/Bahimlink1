import React, { useState, useEffect } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Permission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface RolePermissions {
  siteManagement: Permission[];
  reportsAnalytics: Permission[];
  scheduleManagement: Permission[];
  staffManagement: Permission[];
}

interface InviteStaffModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const InviteStaffModal: React.FC<InviteStaffModalProps> = ({ visible, onClose, onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('Observateur');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [permissions, setPermissions] = useState<RolePermissions>({
    siteManagement: [],
    reportsAnalytics: [],
    scheduleManagement: [],
    staffManagement: []
  });

  const roles = ['Gestionnaire', 'Coordinateur', 'Observateur'];

  const defaultPermissions = {
    Gestionnaire: {
      siteManagement: [
        { id: 'view_sites', name: 'Voir les Sites', description: 'Consulter les informations des sites', enabled: true },
        { id: 'edit_sites', name: 'Modifier les Sites', description: 'Éditer les informations des sites', enabled: true },
        { id: 'create_sites', name: 'Créer des Sites', description: 'Ajouter de nouveaux sites', enabled: true }
      ],
      reportsAnalytics: [
        { id: 'view_reports', name: 'Voir les Rapports', description: 'Accéder aux rapports de sécurité', enabled: true },
        { id: 'export_reports', name: 'Exporter les Rapports', description: 'Télécharger les données de rapport', enabled: true },
        { id: 'analytics_dashboard', name: 'Tableau de Bord Analytics', description: 'Accéder aux analyses et insights', enabled: true }
      ],
      scheduleManagement: [
        { id: 'view_schedules', name: 'Voir les Horaires', description: 'Consulter les horaires et plannings', enabled: true },
        { id: 'edit_schedules', name: 'Modifier les Horaires', description: 'Modifier les horaires et assignations', enabled: true },
        { id: 'approve_changes', name: 'Approuver les Changements', description: 'Approuver les modifications d\'horaires', enabled: true }
      ],
      staffManagement: [
        { id: 'view_staff', name: 'Voir le Personnel', description: 'Consulter les informations des membres', enabled: true },
        { id: 'invite_staff', name: 'Inviter du Personnel', description: 'Inviter de nouveaux membres', enabled: true },
        { id: 'manage_staff', name: 'Gérer le Personnel', description: 'Éditer les rôles et permissions', enabled: true }
      ]
    },
    Coordinateur: {
      siteManagement: [
        { id: 'view_sites', name: 'Voir les Sites', description: 'Consulter les informations des sites', enabled: true },
        { id: 'edit_sites', name: 'Modifier les Sites', description: 'Éditer les informations des sites', enabled: false },
        { id: 'create_sites', name: 'Créer des Sites', description: 'Ajouter de nouveaux sites', enabled: false }
      ],
      reportsAnalytics: [
        { id: 'view_reports', name: 'Voir les Rapports', description: 'Accéder aux rapports de sécurité', enabled: true },
        { id: 'export_reports', name: 'Exporter les Rapports', description: 'Télécharger les données de rapport', enabled: true },
        { id: 'analytics_dashboard', name: 'Tableau de Bord Analytics', description: 'Accéder aux analyses et insights', enabled: false }
      ],
      scheduleManagement: [
        { id: 'view_schedules', name: 'Voir les Horaires', description: 'Consulter les horaires et plannings', enabled: true },
        { id: 'edit_schedules', name: 'Modifier les Horaires', description: 'Modifier les horaires et assignations', enabled: true },
        { id: 'approve_changes', name: 'Approuver les Changements', description: 'Approuver les modifications d\'horaires', enabled: false }
      ],
      staffManagement: [
        { id: 'view_staff', name: 'Voir le Personnel', description: 'Consulter les informations des membres', enabled: true },
        { id: 'invite_staff', name: 'Inviter du Personnel', description: 'Inviter de nouveaux membres', enabled: false },
        { id: 'manage_staff', name: 'Gérer le Personnel', description: 'Éditer les rôles et permissions', enabled: false }
      ]
    },
    Observateur: {
      siteManagement: [
        { id: 'view_sites', name: 'Voir les Sites', description: 'Consulter les informations des sites', enabled: true },
        { id: 'edit_sites', name: 'Modifier les Sites', description: 'Éditer les informations des sites', enabled: false },
        { id: 'create_sites', name: 'Créer des Sites', description: 'Ajouter de nouveaux sites', enabled: false }
      ],
      reportsAnalytics: [
        { id: 'view_reports', name: 'Voir les Rapports', description: 'Accéder aux rapports de sécurité', enabled: true },
        { id: 'export_reports', name: 'Exporter les Rapports', description: 'Télécharger les données de rapport', enabled: false },
        { id: 'analytics_dashboard', name: 'Tableau de Bord Analytics', description: 'Accéder aux analyses et insights', enabled: false }
      ],
      scheduleManagement: [
        { id: 'view_schedules', name: 'Voir les Horaires', description: 'Consulter les horaires et plannings', enabled: true },
        { id: 'edit_schedules', name: 'Modifier les Horaires', description: 'Modifier les horaires et assignations', enabled: false },
        { id: 'approve_changes', name: 'Approuver les Changements', description: 'Approuver les modifications d\'horaires', enabled: false }
      ],
      staffManagement: [
        { id: 'view_staff', name: 'Voir le Personnel', description: 'Consulter les informations des membres', enabled: true },
        { id: 'invite_staff', name: 'Inviter du Personnel', description: 'Inviter de nouveaux membres', enabled: false },
        { id: 'manage_staff', name: 'Gérer le Personnel', description: 'Éditer les rôles et permissions', enabled: false }
      ]
    }
  };

  useEffect(() => {
    if (selectedRole && defaultPermissions[selectedRole as keyof typeof defaultPermissions]) {
      setPermissions(defaultPermissions[selectedRole as keyof typeof defaultPermissions]);
    }
  }, [selectedRole]);

  const togglePermission = (category: keyof RolePermissions, permissionId: string) => {
    setPermissions(prev => ({
      ...prev,
      [category]: prev[category].map(perm => 
        perm.id === permissionId ? { ...perm, enabled: !perm.enabled } : perm
      )
    }));
  };

  const handleSubmit = () => {
    if (!firstName || !lastName || !email) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    const invitationData = {
      firstName,
      lastName,
      email,
      role: selectedRole,
      permissions
    };

    onSubmit(invitationData);
    
    // Reset form
    setFirstName('');
    setLastName('');
    setEmail('');
    setSelectedRole('Observateur');
  };

  const renderPermissionSection = (title: string, category: keyof RolePermissions) => (
    <View style={styles.permissionSection}>
      <Text style={styles.permissionSectionTitle}>{title}</Text>
      {permissions[category].map((permission) => (
        <TouchableOpacity
          key={permission.id}
          style={styles.permissionItem}
          onPress={() => togglePermission(category, permission.id)}
        >
          <View style={[styles.checkbox, permission.enabled && styles.checkboxEnabled]}>
            {permission.enabled && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>
          <View style={styles.permissionContent}>
            <Text style={styles.permissionName}>{permission.name}</Text>
            <Text style={styles.permissionDescription}>{permission.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* En-tête */}
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderContent}>
              <Text style={styles.modalTitle}>Inviter un Membre du Personnel</Text>
              <Text style={styles.modalSubtitle}>Ajouter un nouveau membre à votre organisation</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#6C757D" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {/* Informations personnelles */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informations du Membre</Text>
              
              <View style={styles.inputRow}>
                <View style={styles.inputHalf}>
                  <Text style={styles.label}>Prénom *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Prénom"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
                <View style={styles.inputHalf}>
                  <Text style={styles.label}>Nom *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nom"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Adresse Email *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="email@exemple.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Rôle et Permissions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Rôle et Permissions</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Rôle *</Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowRoleDropdown(!showRoleDropdown)}
                >
                  <Text style={styles.dropdownText}>{selectedRole}</Text>
                  <Ionicons name="chevron-down" size={20} color="#6C757D" />
                </TouchableOpacity>
                
                {showRoleDropdown && (
                  <View style={styles.dropdownMenu}>
                    {roles.map((role) => (
                      <TouchableOpacity
                        key={role}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setSelectedRole(role);
                          setShowRoleDropdown(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{role}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
              
              <Text style={styles.note}>
                Les permissions sont automatiquement définies selon le rôle sélectionné, mais peuvent être personnalisées.
              </Text>
            </View>

            {/* Permissions détaillées */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Permissions</Text>
              {renderPermissionSection('Gestion des Sites', 'siteManagement')}
              {renderPermissionSection('Rapports & Analytics', 'reportsAnalytics')}
              {renderPermissionSection('Gestion des Horaires', 'scheduleManagement')}
              {renderPermissionSection('Gestion du Personnel', 'staffManagement')}
            </View>
          </ScrollView>

          {/* Actions */}
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
              <Text style={styles.saveText}>Envoyer l'Invitation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeaderContent: {
    flex: 1,
    paddingRight: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6C757D',
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    maxHeight: 500,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  inputHalf: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
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
  note: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 8,
  },
  permissionSection: {
    backgroundColor: '#9e9e9fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  permissionSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
    marginBottom: 12,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxEnabled: {
    backgroundColor: '#E87525',
    borderColor: '#E87525',
  },
  permissionContent: {
    flex: 1,
  },
  permissionName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  permissionDescription: {
    fontSize: 12,
    color: '#2563eb',
    lineHeight: 16,
  },
  modalActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0c0d0eff',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#E87525',
    alignItems: 'center',
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default InviteStaffModal;