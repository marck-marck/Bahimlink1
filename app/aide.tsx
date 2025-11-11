import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/theme';

export default function AideScreen() {
  const [searchText, setSearchText] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const navigation = useNavigation();

  const quickActions = [
    { 
      title: 'Contacter le Support', 
      icon: 'mail-outline', 
      color: '#EA580C',
      action: () => navigation.navigate('contactSupport' as never)
    },
    { 
      title: 'Contacts d\'Urgence', 
      icon: 'warning-outline', 
      color: '#EF4444',
      action: () => navigation.navigate('contactsUrgence' as never)
    },
    { 
      title: 'Demande de Service', 
      icon: 'add-circle-outline', 
      color: Colors.light.primary,
      action: () => navigation.navigate('creerDemande' as never)
    },
  ];

  const helpTopics = [
    { title: 'Démarrage', icon: 'play-circle-outline', description: 'Bases et gestion sécurité' },
    { title: 'Gestion de Site', icon: 'business-outline', description: 'Administration des sites' },
    { title: 'Rapports', icon: 'document-text-outline', description: 'Génération et analyse' },
    { title: 'Personnel', icon: 'people-outline', description: 'Gestion des équipes' },
    { title: 'Facturation', icon: 'card-outline', description: 'Paiements et factures' },
    { title: 'Sécurité', icon: 'shield-checkmark-outline', description: 'Protocoles de sécurité' },
  ];

  const faqItems = [
    {
      question: 'Comment savoir si mon site est correctement couvert ?',
      answer: 'Vous pouvez vérifier la couverture de votre site dans la section "Mes Sites". Un indicateur de statut vous montre l\'état de la surveillance en temps réel.'
    },
    {
      question: 'À quelle fréquence recevrai-je des rapports ?',
      answer: 'Les rapports sont générés automatiquement selon votre abonnement : quotidiens, hebdomadaires ou mensuels. Vous pouvez les consulter dans la section "Rapports de sécurité".'
    },
    {
      question: 'Que faire en cas d\'urgence ?',
      answer: 'En cas d\'urgence, utilisez le bouton "Contacts d\'Urgence" ci-dessus ou appelez directement le +237 123 456 789. Notre équipe est disponible 24h/24.'
    },
    {
      question: 'Comment ajouter un nouveau site à surveiller ?',
      answer: 'Rendez-vous dans "Mes Sites" puis cliquez sur le bouton "+" pour ajouter un nouveau site. Remplissez les informations requises et notre équipe configurera la surveillance.'
    },
    {
      question: 'Comment modifier mes informations de compte ?',
      answer: 'Accédez à "Paramètre Compte" depuis le menu principal pour modifier vos informations personnelles, mot de passe et préférences de notification.'
    },
  ];

  const contactInfo = [
    {
      type: 'Email',
      icon: 'mail-outline',
      value: 'support@bahinsarl.com',
      action: () => Linking.openURL('mailto:support@bahinsarl.com')
    },
    {
      type: 'Téléphone',
      icon: 'call-outline',
      value: '+237 699887766',
      action: () => Linking.openURL('tel:+237699887766')
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <View style={styles.container}>
      {/* En-tête fixe */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#080808ff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aide & Support</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Section principale avec recherche */}
        <View style={styles.mainSection}>
          <Text style={styles.title}>Aide & Support</Text>
          <Text style={styles.subtitle}>Trouvez rapidement l'aide dont vous avez besoin</Text>
          
          {/* Barre de recherche */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#6C757D" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher des sujets d'aide..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#6C757D"
            />
          </View>
        </View>

        {/* Actions Rapides */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions Rapides</Text>
          <Text style={styles.sectionSubtitle}>Obtenez une aide immédiate</Text>
          <View style={styles.quickActionsContainer}>
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.quickActionCard, { backgroundColor: action.color }]}
                onPress={action.action}
              >
                <Ionicons name={action.icon as any} size={24} color="#fff" />
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sujets d'Aide */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sujets d'Aide</Text>
          <Text style={styles.sectionSubtitle}>Parcourez les sujets d'aide par catégorie</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topicsScroll}>
            <View style={styles.topicsContainer}>
              {helpTopics.map((topic, index) => (
                <TouchableOpacity key={index} style={styles.topicCard}>
                  <Ionicons name={topic.icon as any} size={32} color={Colors.light.primary} />
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                  <Text style={styles.topicDescription}>{topic.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Questions Fréquemment Posées</Text>
          <View style={styles.faqContainer}>
            {faqItems.map((item, index) => (
              <View key={index} style={styles.faqItem}>
                <TouchableOpacity 
                  style={styles.faqQuestion}
                  onPress={() => toggleFAQ(index)}
                >
                  <Text style={styles.faqQuestionText}>{item.question}</Text>
                  <Ionicons 
                    name={expandedFAQ === index ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color={Colors.light.primary} 
                  />
                </TouchableOpacity>
                {expandedFAQ === index && (
                  <View style={styles.faqAnswer}>
                    <Text style={styles.faqAnswerText}>{item.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Besoin de Plus d'Aide */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Besoin de Plus d'Aide ?</Text>
          <Text style={styles.sectionSubtitle}>Contactez notre équipe de support</Text>
          <View style={styles.contactContainer}>
            {contactInfo.map((contact, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.contactCard}
                onPress={contact.action}
              >
                <View style={styles.contactIcon}>
                  <Ionicons name={contact.icon as any} size={24} color={Colors.light.primary} />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactType}>{contact.type}</Text>
                  <Text style={styles.contactValue}>{contact.value}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6C757D" />
              </TouchableOpacity>
            ))}
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
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E1E1E',
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
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 16,
  },
  quickActionsContainer: {
    gap: 12,
  },
  quickActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    gap: 16,
  },
  quickActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  topicsScroll: {
    marginHorizontal: -20,
  },
  topicsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  topicCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  topicTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    marginTop: 8,
    textAlign: 'center',
  },
  topicDescription: {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 4,
    textAlign: 'center',
  },
  faqContainer: {
    gap: 8,
  },
  faqItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E1E1E',
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#6C757D',
    lineHeight: 20,
  },
  contactContainer: {
    gap: 12,
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  contactValue: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 2,
  },
});