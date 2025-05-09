import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import EscudoScreen from '../screens/EscudoScreen';
import JogadoresScreen from '../screens/JogadoresScreen';
import TitulosScreen from '../screens/TitulosScreen';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    
    // Aba de navegação
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#000000' },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#FF0000',
        drawerInactiveTintColor: '#000000',
        drawerLabelStyle: { fontSize: 16 },
      }}
    >

      {/* Janela do Escudo */}
      <Drawer.Screen
        name="Escudo"
        component={EscudoScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="shield" size={size} color={color} />
          )
        }}
      />

      {/* Janela de Jogadores */}
      <Drawer.Screen
        name="Jogadores"
        component={JogadoresScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          )
        }}
      />

      {/* Janela de Títulos */}
      <Drawer.Screen
        name="Títulos"
        component={TitulosScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="trophy" size={size} color={color} />
          )
        }}
      />
    </Drawer.Navigator>
  );
}
