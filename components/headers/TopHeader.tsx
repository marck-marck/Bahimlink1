import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Colors } from '../../constants/theme';
import ProfileMenu from './ProfileMenu';

export default function TopHeader({ onMenuPress }: { onMenuPress?: () => void }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [menuVisible, setMenuVisible] = useState(false);

  // Les infos utilisateur seront dynamiques plus tard
  const user = {
    name: 'phelane christopher',
    email: 'phelane.christopher@BahinSarl.com',
  };

  return (
    <View style={[styles.container, { backgroundColor: '#E9F0FF' }]}> {/* Fond bleu clair */}
      {/* Menu hamburger à gauche */}
      <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
        <Ionicons name="menu-outline" size={28} color={colors.icon} />
      </TouchableOpacity>
      {/* Espace */}
      <View style={{ flex: 1 }} />
      {/* Icône notification */}
      <TouchableOpacity style={styles.iconButton} onPress={() => alert('Notifications')}> 
        <Ionicons name="notifications-outline" size={24} color={colors.icon} />
      </TouchableOpacity>
      {/* Avatar utilisateur à droite */}
      <TouchableOpacity style={styles.avatarContainer} onPress={() => setMenuVisible(true)}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={24} color={colors.icon} />
        </View>
        <Ionicons name="chevron-down" size={18} color={colors.icon} style={{ marginLeft: 2 }} />
      </TouchableOpacity>
      {/* Menu déroulant du profil */}
      <ProfileMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    backgroundColor: '#E9F0FF',
  },
  menuButton: {
    padding: 8,
    marginRight: 4,
  },
  iconButton: {
    padding: 8,
    marginRight: 4,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    marginLeft: 8,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});