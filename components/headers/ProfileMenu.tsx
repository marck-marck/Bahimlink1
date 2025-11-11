import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/theme';
import { useTheme } from '../../hooks/useTheme';

// Définir le type de navigation pour autoriser les noms de routes string
type RootStackParamList = {
  requests: undefined;
  // Ajoutez d'autres routes ici si nécessaire
};

// Composant du menu déroulant du profil utilisateur
export default function ProfileMenu({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  // Les infos utilisateur seront dynamiques plus tard
  const user = {
    name: 'phelane christopher',
    email: 'phelane.christopher@BahinSarl.com',
  };

  // Animation slide-up + fade
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  // Animations individuelles pour chaque bouton
  const menuItemAnims = [0, 1, 2, 3, 4].map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    if (visible) {
      menuItemAnims.forEach((anim, i) => {
        Animated.timing(anim, {
          toValue: 1,
          duration: 350,
          delay: 120 + i * 80,
          useNativeDriver: true,
        }).start();
      });
    } else {
      menuItemAnims.forEach((anim) => {
        Animated.timing(anim, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [visible]);

  // Modal de confirmation pour la déconnexion
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { colorScheme, toggleColorScheme } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}> 
        <Animated.View
          style={[styles.menuCard, {
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [320, 0],
                }),
              },
            ],
            opacity: fadeAnim,
          }]}
        >
          {/* Profil résumé dans une card bleue */}
          <View style={styles.profileCardBlue}>
            <View style={styles.profileRow}>
              <View style={styles.avatarCircle}>
                <Ionicons name="person" size={32} color={Colors.light.icon} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{user.name}</Text>
                <Text style={styles.profileEmail}>{user.email}</Text>
              </View>
            </View>
          </View>
          <View style={styles.separator} />
          {/* Liens du menu avec animation fade-in individuelle et navigation */}
          <Animated.View style={{ opacity: menuItemAnims[0], transform: [{ translateY: menuItemAnims[0].interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }], marginBottom: 8 }}>
            <TouchableOpacity style={styles.menuItemBi} onPress={toggleColorScheme}> 
              <Ionicons name={colorScheme === 'dark' ? 'sunny-outline' : 'moon-outline'} size={22} color={Colors.light.secondary} style={styles.menuIcon} />
              <Text style={styles.menuTextBi}>{colorScheme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ opacity: menuItemAnims[1], transform: [{ translateY: menuItemAnims[1].interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }], marginBottom: 8 }}>
            <TouchableOpacity style={styles.menuItemAccent} onPress={() => {
              // Ouvre le site web externe
              const url = 'https://bahinsarl.com/upgrade';
              if (typeof window !== 'undefined') {
                window.open(url, '_blank');
              } else {
                // Pour mobile, utiliser Linking
                import('react-native').then(({ Linking }) => {
                  Linking.openURL(url);
                });
              }
            }}>              
              <Ionicons name="flash-outline" size={22} color={Colors.light.primary} style={styles.menuIcon} />
              <Text style={styles.menuTextAccent}>Upgrade to Pro</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ opacity: menuItemAnims[2], transform: [{ translateY: menuItemAnims[2].interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }], marginBottom: 8 }}>
            <TouchableOpacity style={styles.menuItemBi} onPress={() => navigation.navigate('requests')}> 
              <Ionicons name="card-outline" size={22} color={Colors.light.secondary} style={styles.menuIcon} />
              <Text style={styles.menuTextBi}>Billing</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ opacity: menuItemAnims[4], transform: [{ translateY: menuItemAnims[4].interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }], marginBottom: 8 }}>
            <TouchableOpacity style={styles.menuItemLogout} onPress={() => setShowLogoutModal(true)}> 
              <Ionicons name="log-out-outline" size={22} color={Colors.light.error} style={styles.menuIcon} />
              <Text style={styles.menuTextLogout}>Log out</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        
        {/* Modal de confirmation de déconnexion */}
        {showLogoutModal && (
          <View style={styles.logoutModalOverlay}>
            <View style={styles.logoutModalCard}>
              <Text style={styles.logoutModalTitle}>Confirmer la déconnexion</Text>
              <Text style={styles.logoutModalText}>Voulez-vous vraiment vous déconnecter ?</Text>
              <View style={styles.logoutModalActions}>
                <TouchableOpacity style={styles.logoutModalButton} onPress={() => { setShowLogoutModal(false); onClose(); }}>
                  <Text style={styles.logoutModalButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.logoutModalButton, styles.logoutModalButtonDanger]} onPress={() => { setShowLogoutModal(false); alert('Déconnecté !'); onClose(); }}>
                  <Text style={[styles.logoutModalButtonText, styles.logoutModalButtonTextDanger]}>Déconnexion</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        
        {/* Fermer en tapant sur l'overlay */}
        <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} />
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.12)',
    justifyContent: 'flex-end',
  },
  overlayTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menuCard: {
    backgroundColor: '#cbbabaff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 8,
  },
  logoutModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  logoutModalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: 280,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 12,
  },
  logoutModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1E1E1E',
  },
  logoutModalText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 18,
    textAlign: 'center',
  },
  logoutModalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  logoutModalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 6,
    borderRadius: 8,
    backgroundColor: '#E9F0FF',
    alignItems: 'center',
  },
  logoutModalButtonDanger: {
    backgroundColor: '#FFE5E5',
  },
  logoutModalButtonText: {
    fontSize: 15,
    color: Colors.light.primary,
    fontWeight: '600',
  },
  logoutModalButtonTextDanger: {
    color: Colors.light.error,
  },
  profileCardBlue: {
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    marginBottom: 10,
    padding: 12,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  profileEmail: {
    fontSize: 13,
    color: '#f8f8f8ff',
  },
  separator: {
    height: 1,
    backgroundColor: '#E9ECEF',
    marginVertical: 10,
  },
 
  menuItemAccent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#E9F0FF',
  },
  menuItemLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#e7bdbdff',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 15,
    color: Colors.light.secondary,
    fontWeight: '500',
    
  },
menuTextBi:{
    fontSize: 15,
    color: Colors.light.secondary,
    fontWeight: '600',
  },
  menuItemBi: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#E9F0FF',
  },
  menuTextAccent: {
    fontSize: 15,
    color: Colors.light.primary,
    fontWeight: '600',
    
  },
  menuTextLogout: {
    fontSize: 15,
    color: Colors.light.error,
    fontWeight: '600',
  },
});