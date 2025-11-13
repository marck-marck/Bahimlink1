import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View, Linking, Alert } from 'react-native';
import { Colors } from '../../constants/theme';
import { useTheme } from '../../hooks/useTheme';

// Composant du menu déroulant du profil utilisateur
export default function ProfileMenu({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  console.log('ProfileMenu rendered, visible:', visible);
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
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useTheme();

  if (!visible) return null;

  return (
    <>
      <TouchableOpacity 
        style={styles.backdrop} 
        onPress={onClose}
        activeOpacity={1}
      />
      <View style={styles.overlay}>
      <Animated.View
        style={[styles.menuCard, {
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
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
              <TouchableOpacity 
                style={styles.editProfileButton}
                onPress={() => {
                  console.log('Edit profile button pressed');
                  try {
                    // Délai pour permettre la navigation avant la fermeture
                    navigation.navigate('profile' as never);
                    setTimeout(() => onClose(), 100);
                  } catch (error) {
                    console.log('Navigation error:', error);
                    onClose();
                    Alert.alert('Erreur', 'Impossible d\'accéder au profil');
                  }
                }}
              >
                <Ionicons name="pencil-outline" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.separator} />
          {/* Liens du menu avec animation fade-in individuelle et navigation */}
          <Animated.View style={{ opacity: menuItemAnims[0], transform: [{ translateY: menuItemAnims[0].interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }], marginBottom: 8 }}>
            <TouchableOpacity style={styles.menuItemAccent} onPress={() => {
              console.log('Dark mode button pressed');
              try {
                toggleColorScheme();
                // Pas de fermeture pour le dark mode
              } catch (error) {
                console.log('Theme toggle error:', error);
              }
            }}> 
              <Ionicons name={colorScheme === 'dark' ? 'sunny-outline' : 'moon-outline'} size={22} color={Colors.light.primary} style={styles.menuIcon} />
              <Text style={styles.menuTextAccent}>{colorScheme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ opacity: menuItemAnims[1], transform: [{ translateY: menuItemAnims[1].interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }], marginBottom: 8 }}>
            <TouchableOpacity style={styles.menuItemAccent} onPress={() => {
              console.log('Upgrade button pressed');
              try {
                // Ouvre le site web externe
                const url = 'https://bahinsarl.com/upgrade';
                Linking.openURL(url).then(() => {
                  console.log('Link opened successfully');
                  setTimeout(() => onClose(), 100);
                }).catch(err => {
                  console.log('Linking error:', err);
                  onClose();
                  Alert.alert('Erreur', 'Impossible d\'ouvrir le lien');
                });
              } catch (error) {
                console.log('Error:', error);
                onClose();
              }
            }}>              
              <Ionicons name="flash-outline" size={22} color={Colors.light.primary} style={styles.menuIcon} />
              <Text style={styles.menuTextAccent}>Upgrade to Pro</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ opacity: menuItemAnims[2], transform: [{ translateY: menuItemAnims[2].interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }], marginBottom: 8 }}>
            <TouchableOpacity style={styles.menuItemAccent} onPress={() => {
              console.log('Billing button pressed');
              try {
                navigation.navigate('billing' as never);
                setTimeout(() => onClose(), 100);
              } catch (error) {
                console.log('Navigation error:', error);
                onClose();
                Alert.alert('Erreur', 'Impossible d\'accéder à la facturation');
              }
            }}> 
              <Ionicons name="card-outline" size={22} color={Colors.light.primary} style={styles.menuIcon} />
              <Text style={styles.menuTextAccent}>Billing</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={{ opacity: menuItemAnims[4], transform: [{ translateY: menuItemAnims[4].interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }], marginBottom: 8 }}>
            <TouchableOpacity style={styles.menuItemLogout} onPress={() => {
              console.log('Logout button pressed');
              setShowLogoutModal(true);
            }}> 
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    zIndex: 999,
  },
  overlay: {
    position: 'absolute',
    top: 60,
    right: 16,
    zIndex: 1000,
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  logoutModalOverlay: {
    position: 'absolute',
    top: -300,
    left: -140,
    right: -140,
    bottom: -300,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1001,
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
  editProfileButton: {
    backgroundColor: '#EA580C',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#E9ECEF',
    marginVertical: 10,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuItemBi: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  menuTextBi: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  menuItemAccent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#E9F0FF',
  },
  menuTextAccent: {
    fontSize: 16,
    color: Colors.light.primary,
    fontWeight: '600',
  },
  menuItemLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f6babaff',
  },

  menuTextLogout: {
    fontSize: 16,
    color: Colors.light.error,
    fontWeight: '500',
  },
});