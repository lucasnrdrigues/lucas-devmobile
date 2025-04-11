import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from "react-native-paper"
import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import JogadoresScreen from './Screens/JogadoresScreen';
import EscudoScreen from './Screens/EscudoScreen';
import TitulosScreen from './Screens/TitulosScreen';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'white',
          },
        }}>

        <Tab.Screen
          name='EscudoScreen'
          component={EscudoScreen}
          options={{
            title: 'Escudo',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              color: '#fff',
            },
            tabBarActiveTintColor: 'red',
            tabBarInactiveBackgroundColor: 'black',
            tabBarInactiveTintColor: 'white',

            tabBarIcon: ({ color, size }) => (
              <Ionicons name='shield' color={color} size={size} />
            ),
          }}
        />

          <Tab.Screen
            name='JogadoresScreen'
            component={JogadoresScreen}
            options={{
              title: 'Jogadores',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'red'
              },
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: 'bold',
                color: 'white',
              },
              tabBarActiveTintColor: 'red',
              tabBarInactiveBackgroundColor: 'black',
              tabBarInactiveTintColor: 'white',

              tabBarIcon: ({ color, size }) => <Ionicons name='person' color={color} size={size} />
            
            }}
          />

          <Tab.Screen
            name='TitulosScreen'
            component={TitulosScreen}
            options={{
              title: 'Titulos',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'red'
              },
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: 'bold',
                color: 'white',
              },
              tabBarActiveTintColor: 'red',
              tabBarInactiveBackgroundColor: 'black',
              tabBarInactiveTintColor: 'white',

              tabBarIcon: ({ color, size }) => <Ionicons name='trophy' color={color} size={size} />
          
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
