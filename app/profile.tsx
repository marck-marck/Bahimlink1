import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  index: undefined;
};
import { Colors } from '@/constants/theme';
import { useTheme } from '@/hooks/useTheme';

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  
  // États pour les informations utilisateur
  const [userInfo, setUserInfo] = useState({
    firstName: 'phelane',
    lastName: 'christopher',
    email: 'pricejuliane4@gmail.com',
    phone: '+1 6199857807',
    address: 'Non fourni',
    companyName: 'PEPISvv',
    notes: 'Aucune note supplémentaire'
  });

  const [editedInfo, setEditedInfo] = useState(userInfo);

  const handleSave = () => {
    setUserInfo(editedInfo);
    setIsEditing(false);
    Alert.alert('Succès', 'Profil mis à jour avec succès');
  };

  const handleCancel = () => {
    setEditedInfo(userInfo);
    setIsEditing(false);
  };

  const renderField = (label: string, value: string, key: keyof typeof userInfo, icon: string, editable = true) => (
    <View style={[styles.fieldContainer, { borderBottomColor: colors.border }]}>
      <View style={styles.fieldHeader}>
        <Ionicons name={icon as any} size={20} color={colors.primary} />
        <Text style={[styles.fieldLabel, { color: colors.text }]}>{label}</Text>
        {editable && !isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Ionicons name="pencil-outline" size={16} color={colors.icon} />
          </TouchableOpacity>
        )}
      </View>
      {isEditing && editable ? (
        <TextInput
          style={[styles.fieldInput, { color: colors.text, borderColor: colors.primary }]}
          value={editedInfo[key]}
          onChangeText={(text) => setEditedInfo(prev => ({ ...prev, [key]: text }))}
          placeholder={label}
          placeholderTextColor={colors.icon}
        />
      ) : (
        <Text style={[styles.fieldValue, { color: colors.text }]}>{value}</Text>
      )}
      {key === 'email' && (
        <Text style={[styles.fieldNote, { color: colors.icon }]}>
          L'e-mail ne peut pas être modifié ici...
        </Text>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* En-tête fixe */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#080808ff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil Utilisateur</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* En-tête du profil */}
        <View style={[styles.profileHeader, { backgroundColor: colors.background }]}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatarCircle, { backgroundColor: colors.primary }]}>
              <Ionicons name="person" size={40} color="#fff" />
              <TouchableOpacity style={styles.cameraButton}>
                <Ionicons name="camera" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>
              {userInfo.firstName} {userInfo.lastName}
            </Text>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Client</Text>
            </View>
            <Text style={[styles.memberSince, { color: colors.icon }]}>
              Membre depuis 25/07/2025
            </Text>
          </View>

          {!isEditing ? (
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Ionicons name="pencil-outline" size={16} color="#fff" />
              <Text style={styles.editButtonText}>Modifier</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Ionicons name="close" size={16} color={colors.error} />
                <Text style={[styles.cancelButtonText, { color: colors.error }]}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Ionicons name="checkmark" size={16} color="#fff" />
                <Text style={styles.saveButtonText}>Enregistrer</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Informations Personnelles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-outline" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Informations Personnelles</Text>
          </View>
          <Text style={[styles.sectionDescription, { color: colors.icon }]}>
            Vos détails personnels et informations de contact
          </Text>

          <View style={[styles.card, { backgroundColor: colors.background }]}>
            {renderField('Prénom', userInfo.firstName, 'firstName', 'person-outline')}
            {renderField('Nom', userInfo.lastName, 'lastName', 'person-outline')}
            {renderField('Adresse E-mail', userInfo.email, 'email', 'mail-outline', false)}
            {renderField('Numéro de Téléphone', userInfo.phone, 'phone', 'call-outline')}
            {renderField('Adresse', userInfo.address, 'address', 'location-outline')}
          </View>
        </View>

        {/* Informations de l'Entreprise */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="business-outline" size={24} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Informations de l'Entreprise</Text>
          </View>
          <Text style={[styles.sectionDescription, { color: colors.icon }]}>
            Détails de l'entreprise et informations supplémentaires
          </Text>

          <View style={[styles.card, { backgroundColor: colors.background }]}>
            {renderField('Nom de l\'Entreprise', userInfo.companyName, 'companyName', 'business-outline')}
            {renderField('Notes supplémentaires', userInfo.notes, 'notes', 'document-text-outline')}
            
            <View style={[styles.fieldContainer, { borderBottomColor: colors.border }]}>
              <View style={styles.fieldHeader}>
                <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
                <Text style={[styles.fieldLabel, { color: colors.text }]}>Statut du Compte</Text>
              </View>
              <View style={styles.accountStatusRow}>
                <View style={styles.statusInfo}>
                  <Text style={[styles.fieldValue, { color: colors.text }]}>
                    Votre compte est actuellement actif et sécurisé
                  </Text>
                  <Text style={[styles.fieldNote, { color: colors.icon }]}>
                    Dernière mise à jour: 25/07/2025
                  </Text>
                </View>
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>Actif</Text>
                </View>
              </View>
            </View>

            <View style={styles.fieldContainer}>
              <View style={styles.fieldHeader}>
                <Ionicons name="calendar-outline" size={20} color={colors.primary} />
                <Text style={[styles.fieldLabel, { color: colors.text }]}>Membre depuis</Text>
              </View>
              <Text style={[styles.fieldValue, { color: colors.text }]}>25/07/2025</Text>
            </View>
          </View>
        </View>

        {/* Indicateur de complétude */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={[styles.completionCard, { backgroundColor: colors.background }]}>
            <View style={styles.completionHeader}>
              <Ionicons name="checkmark-circle-outline" size={24} color="#10b981" />
              <Text style={[styles.completionTitle, { color: colors.text }]}>Profil Complet</Text>
              <Text style={styles.completionPercentage}>85%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
            <Text style={[styles.completionText, { color: colors.icon }]}>
              Votre profil est presque complet. Ajoutez une adresse pour atteindre 100%.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
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
  placeholder: {
    width: 24,
  },
  profileHeader: {
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#EA580C',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginRight: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  memberSince: {
    fontSize: 14,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EA580C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EF4444',
    gap: 6,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  saveButtonText: {
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
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
  fieldContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    flex: 1,
  },
  fieldValue: {
    fontSize: 16,
    marginLeft: 28,
  },
  fieldInput: {
    fontSize: 16,
    marginLeft: 28,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  fieldNote: {
    fontSize: 12,
    marginLeft: 28,
    marginTop: 4,
    fontStyle: 'italic',
  },
  accountStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 28,
  },
  statusInfo: {
    flex: 1,
  },
  activeBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activeBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  completionCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  completionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  completionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  completionPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    width: '85%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  completionText: {
    fontSize: 14,
    lineHeight: 20,
  },
});