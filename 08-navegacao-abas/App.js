import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from "react-native-paper" // Importando o paper provider
import { Ionicons } from '@expo/vector-icons' //Importando icones do paper
import { NavigationContainer } from '@react-navigation/native'; // Importando o React Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Importando o BottomTabNavigator, você instala a navegação de acordo com a que você quer
import HomeScreen from './screens/HomeScreen'; //Importando o HomeScreen
import ProfileScreen from './screens/ProfileScreen'; // Importando ProfileScreen
import SettingsScreen from './screens/SettingsScreen'; // Importando SettingsScreen

// Criando uma constante para utilizar o BottomTabNavigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <PaperProvider>

        {/* Chamando a lib */}
        <NavigationContainer>

        {/* Chamando o Tab - dentro dele vai as nossas abas*/}
          <Tab.Navigator>

            {/* Puxando a tela HomeScreen*/}
            {/* Esse estilo fica somente no HomeScreen */}
            <Tab.Screen 
              name='HomeScreen' 
              component={HomeScreen}
              options={{
                title: 'Início',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: 'orange'
                },
                tabBarInactiveBackgroundColor: 'black', //Quando a tela estiver inativa
                tabBarActiveTintColor: 'orange', //Quando a tela estiver inativa
                //Função para mudar o ícone da página
                tabBarIcon: ({ color, size }) => <Ionicons name='home' color={color} size={size} />
              }}
            />

            {/* Puxando a tela ProfileScreen*/}
            <Tab.Screen 
              name='ProfileScreen' 
              component={ProfileScreen}
              options={{
                title: 'Perfil',
                tabBarIcon: ({ color, size }) => <Ionicons name='person' color={color} size={size} />
              }}
            />

            {/* Puxando a tela SettingsScreen*/}
            <Tab.Screen 
              name='SettingsScreen' 
              component={SettingsScreen}
              options={{
                title: 'Settings',
                tabBarIcon: ({ color, size }) => <Ionicons name='settings' color={color} size={size} />
              }}
            />

          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
