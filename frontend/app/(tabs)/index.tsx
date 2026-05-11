import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { user, signOut } = useAuth();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      

      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Olá, {user?.firstName || 'John'}</Text>
          <Text style={styles.title}>StudyQuest</Text>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={signOut}
          activeOpacity={0.7}
        >
          <Feather name="log-out" size={20} color={theme.colors.danger} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Feather name="zap" size={48} color={theme.colors.warning} />
        <Text style={styles.subtitle}>Dashboard em construção...</Text>
        <Text style={styles.info}>
         Em breve, suas estatísticas de XP e nível aparecerão aqui.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  welcomeText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 16,
  },
  info: {
    fontSize: 14,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  }
});