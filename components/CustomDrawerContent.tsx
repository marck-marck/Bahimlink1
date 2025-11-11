import { Colors } from '@/constants/theme';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


// Composant personnalisé pour le bouton de menu latéral (drawer)
// Affiche un bouton avec un icône et un texte
export function CustomDrawerButton({ icon, text, onPress }: { icon: string; text: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.drawerButton}>
      <Ionicons name={icon as any} size={24} color={Colors.light.primary} />
      <Text style={styles.drawerButtonText}>{text}</Text>
    </TouchableOpacity>
  );
}
// Composant personnalisé pour le menu latéral (drawer)
// Affiche le logo, la navigation, le profil et le statut connecté
export default function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Logo et nom d'entreprise */}
      <View style={styles.logoContainer}>
        {/* Logo */}
        <Image source={require('@/assets/images/Logo_bahin.png')} style={styles.logo} />
        <Text style={styles.companyName}>BahinSarl</Text>
      </View>

      {/* Liens de navigation */}
      <View style={styles.menuSection}>
        <Pressable 
          style={({pressed}) => [styles.drawerItem, pressed && styles.pressed]}
          onPress={() => props.navigation.navigate('index')}
        >
          <Ionicons name="grid-outline" size={24} color={Colors.light.primary} />
          <Text style={styles.drawerText}>Tableau de Bord</Text>
        </Pressable>
        
        <Pressable 
          style={({pressed}) => [styles.drawerItem, pressed && styles.pressed]}
          onPress={() => props.navigation.navigate('sites')}
        >
          <Ionicons name="business-outline" size={24} color={Colors.light.primary} />
          <Text style={styles.drawerText}>Mes sites</Text>
        </Pressable>
        
        <Pressable 
          style={({pressed}) => [styles.drawerItem, pressed && styles.pressed]}
          onPress={() => props.navigation.navigate('reports')}
        >
          <Ionicons name="document-text-outline" size={24} color={Colors.light.primary} />
          <Text style={styles.drawerText}>Rapports de sécurité</Text>
        </Pressable>
        
        <Pressable 
          style={({pressed}) => [styles.drawerItem, pressed && styles.pressed]}
          onPress={() => props.navigation.navigate('demandes')}
        >
          <Ionicons name="help-circle-outline" size={24} color={Colors.light.primary} />
          <Text style={styles.drawerText}>Demande de service</Text>
        </Pressable>
        
        <Pressable 
          style={({pressed}) => [styles.drawerItem, pressed && styles.pressed]}
          onPress={() => props.navigation.navigate('schedule')}
        >
          <Ionicons name="time-outline" size={24} color={Colors.light.primary} />
          <Text style={styles.drawerText}>Horaire de sécurité</Text>
        </Pressable>
        
        <Pressable 
          style={({pressed}) => [styles.drawerItem, pressed && styles.pressed]}
          onPress={() => props.navigation.navigate('account')}
        >
          <Ionicons name="person-outline" size={24} color={Colors.light.primary} />
          <Text style={styles.drawerText}>Paramètre Compte</Text>
        </Pressable>

        <Pressable 
          style={({pressed}) => [styles.drawerItem, pressed && styles.pressed]}
          onPress={() => props.navigation.navigate('gestionP')}
        >
          <Ionicons name="people-outline" size={24} color={Colors.light.primary} />
          <Text style={styles.drawerText}>Gestion du Personnel</Text>
        </Pressable>

        <Pressable 
          style={({pressed}) => [styles.drawerItem, pressed && styles.pressed]}
          onPress={() => props.navigation.navigate('aide')}
        >
          <Ionicons name="information-circle-outline" size={24} color={Colors.light.primary} />
          <Text style={styles.drawerText}>Aide & support</Text>
        </Pressable>
        
      </View>

      {/* Profil utilisateur */}
      <View style={styles.profileSection}>
        {/* Avatar rond */}
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>PC</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>phelane christopher</Text>
          <Text style={styles.profileEmail}>phelane.christopher@bah...</Text>
        </View>
        {/* Statut connecté */}
        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Connecté</Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

// Styles du drawer, adaptés à la charte mobile
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: Colors.light.background,
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  logo: {
    width: 100,
    height: 120,
    resizeMode: 'contain',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: Colors.light.primary,
  },
  menuSection: {
    marginBottom: 32,
  },
  profileSection: {
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 8,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  profileEmail: {
    fontSize: 13,
    color: Colors.light.icon,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50', // vert succès
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    color: Colors.light.text,
  },
  drawerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 4,
  },
  drawerButtonText: {
    fontSize: 16,
    color: Colors.light.text,
    marginLeft: 12,
    fontWeight: '500',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 2,
    borderRadius: 8,
  },
  pressed: {
    backgroundColor: Colors.light.primary + '20',
    transform: [{ scale: 0.98 }],
  },
  drawerText: {
    fontSize: 16,
    color: Colors.light.text,
    marginLeft: 12,
    fontWeight: '500',
  },
});