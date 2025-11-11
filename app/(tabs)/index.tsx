
import TopHeader from '@/components/headers/TopHeader';
import { ThemedView } from '@/components/themed-view';
import { StatCard } from '@/components/ui/StatCard';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';

type RootStackParamList = {
  explore: undefined;
  demandes: undefined;
  sites: undefined;
  reports: undefined;
  schedule: undefined;
  gestionP: undefined;
  // add other routes here if needed
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const actionItemAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ]).current;

  useEffect(() => {
    const animations = actionItemAnims.map((anim, index) => 
      Animated.timing(anim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      })
    );
    Animated.stagger(100, animations).start();
  }, []);

  // Fonction pour ouvrir le drawer latéral
  const openDrawer = () => {
    // @ts-ignore
    navigation.openDrawer && navigation.openDrawer();
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header mobile avec menu hamburger, notifications, profil */}
      <TopHeader onMenuPress={openDrawer} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Bloc d'accueil stylé, fond bleu clair, bord arrondi */}
        <View style={styles.accueilCard}>
          <Text style={styles.accueilTitle}>Bon retour, phelane&nbsp;!</Text>
          <Text style={styles.accueilSubtitle}>
            Voici un aperçu de vos services de sécurité et de votre activité récente.
          </Text>
        </View>

        {/* Grille 2x2 des cartes statistiques dans une carte principale */}
        <View style={styles.statsMainCard}>
          <Text style={styles.statsMainCardTitle}>Statistiques</Text>
          <Text style={styles.statsMainCardSubtitle}>Vue d'ensemble de vos indicateurs clés</Text>
          <View style={styles.statsGrid}>
            {/* Ligne 1 */}
            <View style={styles.statsRow}>
              <View style={styles.statsCard}><StatCard title="Total des Sites" value="2 Actif" icon="business-outline" /></View>
              <View style={styles.statsCard}><StatCard title="Équipes Actives" value="4 En Service" icon="people-outline" /></View>
            </View>
            {/* Ligne 2 */}
            <View style={styles.statsRow}>
              <View style={styles.statsCard}><StatCard title="Total des Rapports" value="0 Ce Mois" icon="document-text-outline" /></View>
              <View style={styles.statsCard}><StatCard title="Demandes en Attente" value="0 En Attente de Réponse" icon="time-outline" /></View>
            </View>
          </View>
        </View>
        {/* Section Actions rapides dans une carte */}
        <View style={styles.actionsCard}>
          <Text style={styles.actionsCardTitle}>Actions Rapides</Text>
          <Text style={styles.actionsCardSubtitle}>Actions courantes et raccourcis</Text>
          <View style={styles.actionsContainer}>
            <View style={styles.actionRow}>
              <Animated.View style={{ opacity: actionItemAnims[0], transform: [{ translateY: actionItemAnims[0].interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }], marginBottom: 8 }}>
                <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('demandes')}> 
                  <Text style={styles.actionText}>Nouvelle Demande</Text>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={{ opacity: actionItemAnims[1], transform: [{ translateY: actionItemAnims[1].interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }], marginBottom: 8 }}>
                <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('sites')}> 
                  <Text style={styles.actionText}>Mes Sites</Text>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={{ opacity: actionItemAnims[2], transform: [{ translateY: actionItemAnims[2].interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }], marginBottom: 8 }}>
                <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('reports')}> 
                  <Text style={styles.actionText}>Voir les Rapports</Text>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={{ opacity: actionItemAnims[3], transform: [{ translateY: actionItemAnims[3].interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }], marginBottom: 8 }}>
                <TouchableOpacity style={styles.actionButton} onPress={() =>  navigation.navigate('schedule')}> 
                  <Text style={styles.actionText}>Horaire</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
            <View style={styles.actionRowCentered}>
              <Animated.View style={{ opacity: actionItemAnims[4], transform: [{ translateY: actionItemAnims[4].interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }], marginBottom: 8 }}>
                <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('gestionP')}> 
                  <Text style={styles.actionText}>Gestion du Personnel</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </View>
        {/* Section Gestion du personnel */}
      
    
      {/*<View style={styles.staffCard}>
            <View style={styles.staffIconContainer}>
              {/* Illustration d'état vide : icône utilisateur centrée '/
              <Ionicons name="person-circle-outline" size={48} color={colors.icon} />
            </View>
            <Text style={styles.staffTitle}>Gestion du Personnel</Text>
            <Text style={styles.staffDesc}>Invitez ou ajoutez des membres pour gérer la sécurité de vos sites.</Text>
            <Text style={styles.staffEmpty}>Aucun membre du personnel pour le moment.</Text>
            <View style={styles.staffActionsRow}>
              <TouchableOpacity style={styles.staffButtonMain} onPress={() => alert('Inviter un membre du personnel')}> 
                <Text style={styles.staffButtonTextMain}>Inviter un membre</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.staffButtonSecondary} onPress={() => alert('Ajouter un utilisateur existant')}> 
                <Text style={styles.staffButtonTextSecondary}>Ajouter un utilisateur</Text>
              </TouchableOpacity>
            </View>
          </View>*/}
    
        {/* Section Rapports récents / Équipes actives / Demandes récentes */}
        <View style={styles.tripleCardsRow}>
          {/* Carte Rapports récents */}
          <View style={styles.tripleCard}>
            <Ionicons name="document-outline" size={28} color={colors.icon} style={styles.tripleCardIcon} />
            <Text style={styles.tripleCardTitle}>Rapports récents</Text>
            <Text style={styles.tripleCardEmpty}>Aucun rapport récent</Text>
            <TouchableOpacity style={styles.tripleCardButton} onPress={() =>  navigation.navigate('reports')}> 
              <Text style={styles.tripleCardButtonText}>Voir tous les rapports</Text>
            </TouchableOpacity>
          </View>
          {/* Carte Équipes actives */}
          <View style={styles.tripleCard}>
            <Ionicons name="people-outline" size={28} color={colors.icon} style={styles.tripleCardIcon} />
            <Text style={styles.tripleCardTitle}>Équipes actives</Text>
            {/* Liste d'agents actifs (exemple statique) */}
            <View style={styles.agentRow}>
              <View style={styles.agentDot} />
              <Text style={styles.agentName}>Agent 1</Text>
              <Text style={styles.agentBadge}>active</Text>
            </View>
            <View style={styles.agentRow}>
              <View style={styles.agentDot} />
              <Text style={styles.agentName}>Agent 2</Text>
              <Text style={styles.agentBadge}>active</Text>
            </View>
            <View style={styles.agentRow}>
              <View style={styles.agentDot} />
              <Text style={styles.agentName}>Agent 3</Text>
              <Text style={styles.agentBadge}>active</Text>
            </View>
            <TouchableOpacity style={styles.tripleCardButton} onPress={() =>  navigation.navigate('schedule')}> 
              <Text style={styles.tripleCardButtonText}>Voir l’horaire</Text>
            </TouchableOpacity>
          </View>
          {/* Carte Demandes récentes */}
          <View style={styles.tripleCard}>
            <Ionicons name="time-outline" size={28} color={colors.icon} style={styles.tripleCardIcon} />
            <Text style={styles.tripleCardTitle}>Demandes récentes</Text>
            <Text style={styles.tripleCardEmpty}>Aucune demande récente</Text>
            <TouchableOpacity style={styles.tripleCardButtonMain}  onPress={() => navigation.navigate('demandes')}> 
              <Text style={styles.tripleCardButtonTextMain}>Créer une demande</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100, // Add padding to account for bottom header + extra space
  },
  // Bloc d'accueil stylé
  accueilCard: {
    backgroundColor: '#E9F0FF', // bleu clair
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'flex-start',
    shadowColor: '#E0E0E0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  accueilTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb', // bleu principal
    marginBottom: 6,
    fontFamily: 'System', // police sobre
  },
  accueilSubtitle: {
    fontSize: 15,
    color: '#1E1E1E',
    opacity: 0.8,
    fontFamily: 'System',
  },
  // Grille 2x2 pour les cartes statistiques
  statsGrid: {
    gap: 16,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
  },
  // Styles pour la carte principale et les sous-cartes statistiques
  statsMainCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#E0E0E0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  statsMainCardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2563eb', // bleu principal
    marginBottom: 2,
  },
  statsMainCardSubtitle: {
    fontSize: 14,
    color: '#1E1E1E',
    opacity: 0.7,
    marginBottom: 12,
  },
  statsCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 8,
    flex: 1,
    marginHorizontal: 2,
    shadowColor: '#E0E0E0',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 2,
    elevation: 1,
  },
  // Styles pour la section Actions rapides ok
  actionsContainer: {
    marginBottom: 24,
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionRowCentered: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  
  actionButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#10b981',
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minWidth: 90,
    marginBottom: 8,
    shadowColor: '#E0E0E0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 1,
  },
  actionTextMain: {
    color: '#101513ff',
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
  actionText: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
  // Styles pour la carte Actions rapides/
  actionsCard: {
    backgroundColor: '#2d343b0a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#E0E0E0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  actionsCardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2563eb', // bleu principal
    marginBottom: 2,
  },
  actionsCardSubtitle: {
    fontSize: 14,
    color: '#1E1E1E',
    opacity: 0.7,
    marginBottom: 12,
  },
  // Styles pour la section Gestion du personnel
  staffCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#E0E0E0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  staffIconContainer: {
    marginBottom: 8,
  },
  staffTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
    textAlign: 'center',
  },
  staffDesc: {
    fontSize: 14,
    color: '#1E1E1E',
    opacity: 0.8,
    marginBottom: 8,
    textAlign: 'center',
  },
  staffEmpty: {
    fontSize: 13,
    color: '#6C757D',
    marginBottom: 12,
    textAlign: 'center',
  },
  staffActionsRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  staffButtonMain: {
    backgroundColor: '#E87525', // orange action
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  staffButtonTextMain: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  staffButtonSecondary: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  staffButtonTextSecondary: {
    color: '#1E1E1E',
    fontSize: 13,
  },
  // Styles pour la section triple cartes
  tripleCardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  tripleCard: {
    backgroundColor: '#1015130f',
    borderRadius: 14,
    padding: 14,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#E0E0E0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 1,
  },
  tripleCardIcon: {
    marginBottom: 6,
  },
  tripleCardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2563eb', // bleu principal
    marginBottom: 4,
    textAlign: 'center',
  },
  tripleCardEmpty: {
    fontSize: 13,
    color: '#6C757D',
    marginBottom: 8,
    textAlign: 'center',
  },
  agentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  agentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50', // pastille verte active
    marginRight: 4,
  },
  agentName: {
    fontSize: 12,
    color: '#1E1E1E',
    marginRight: 4,
  },
  agentBadge: {
    fontSize: 11,
    color: '#fff',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    overflow: 'hidden',
  },
  tripleCardButton: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginTop: 6,
  },
  tripleCardButtonText: {
    color: '#2563eb', // bleu principal
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tripleCardButtonMain: {
    backgroundColor: '#E87525', // orange action
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginTop: 9,
  },
  tripleCardButtonTextMain: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
// Couleurs harmonisées :
// Bleu principal : #2563eb
// Vert accent : #10b981 (cartes, succès), #4CAF50 (pastille active)
// Orange action : #E87525
// Gris clair : #e5e7eb (bordures)
// Fond neutre : #f8fafc

// Exemple d'utilisation dans les styles :
// accueilTitle: {
//   color: '#2563eb', // bleu principal
// },
// staffButtonMain: {
//   backgroundColor: '#E87525', // orange action
// },
// agentDot: {
//   backgroundColor: '#4CAF50', // pastille verte active
// },
// tripleCardButtonMain: {
//   backgroundColor: '#E87525', // orange action
// },
// tripleCardTitle: {
//   color: '#2563eb', // bleu principal
// },
