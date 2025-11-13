  
// import Drawer supprimé, on utilise @react-navigation/drawer
import React from 'react';

import CustomDrawerContent from '@/components/CustomDrawerContent';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// Ce composant gère la navigation principale avec un menu latéral (drawer) adapté au mobile
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: Colors[colorScheme ?? 'light'].primary,
        drawerInactiveTintColor: Colors[colorScheme ?? 'light'].icon,
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          width: 260,
        },
        drawerItemStyle: {
          borderRadius: 8,
        },
        drawerLabelStyle: {
          marginLeft: -16,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        component={require('./index').default}
        options={{
          title: 'Tableau de Bord',
        }}
      />
      <Drawer.Screen
        name="sites"
        component={require('../sites').default}
        options={{
          title: 'Mes sites',
        }}
      />
      <Drawer.Screen
        name="reports"
        component={require('../reports').default}
        options={{
          title: 'Rapports de sécurité',
        }}
      />
      <Drawer.Screen
        name="demandes"
        component={require('../demandes').default}
        options={{
          title: 'Demandes de service',
        }}
      />
      <Drawer.Screen
        name="schedule"
        component={require('../schedule').default}
        options={{
          title: 'Horaire de sécurité',
        }}
      />
          <Drawer.Screen
        name="account"
  component={require('./account').default}
        options={{
          title: 'Paramètre Compte',
        }}
      />
      <Drawer.Screen
        name="aide"
        component={require('../aide').default}
        options={{
          title: 'Aide & support',
        }}
      />
      <Drawer.Screen
        name="gestionP"
        component={require('../gestionP').default}
        options={{
          title: 'Gestion du Personnel',
        }}
      />
      <Drawer.Screen
        name="creerDemande"
        component={require('../creerDemande').default}
        options={{
          title: 'Créer une Demande',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="contactSupport"
        component={require('../contactSupport').default}
        options={{
          title: 'Contacter le Support',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="contactsUrgence"
        component={require('../contactsUrgence').default}
        options={{
          title: 'Contacts d\'Urgence',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="profile"
        component={require('../profile').default}
        options={{
          title: 'Profil Utilisateur',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="billing"
        component={require('../billing').default}
        options={{
          title: 'Facturation',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="siteDetails"
        component={require('../siteDetails').default}
        options={{
          title: 'Détails du Site',
          headerShown: false,
        }}
      />

      {/* Ajoutez ici d'autres écrans selon le menu */}
    </Drawer.Navigator>
  );
}
