import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '../../constants/theme';

export default function TabLayout() {
  // Esse hook mágico calcula o tamanho das barras do sistema nativo
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: [
          styles.tabBar,
          {
            // Adicionamos a margem inferior nativa do Android/iOS para não sobrepor
            height: 70 + (Platform.OS === 'android' ? insets.bottom : 0),
            paddingBottom: 12 + (Platform.OS === 'android' ? insets.bottom : 0),
          }
        ],
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <Feather name="grid" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="subjects"
        options={{
          title: 'Matérias',
          tabBarIcon: ({ color }) => <Feather name="book" size={24} color={color} />,
        }}
      />
      
      {/* Botão Central de Play */}
      <Tabs.Screen
        name="timer"
        options={{
          title: '',
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <View style={styles.playButton}>
              <FontAwesome5 name="play" size={20} color={theme.colors.background} style={{ marginLeft: 4 }} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="mission"
        options={{
          title: 'Missões',
          tabBarIcon: ({ color }) => <Feather name="target" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    elevation: 0,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  }
});