import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import MegaSenaScreen from './screens/MegaSenaScreen';
import JogoDoBichoScreen from './screens/JogoDoBichoScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#000000',
            tabBarInactiveTintColor: '#FFFFFF',
            headerStyle: { backgroundColor: '#808080' },
            headerTintColor: '#FFFFFF',
            tabBarStyle: { backgroundColor: '#808080' },
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Mega Sena') {
                iconName = 'numeric-6-box-multiple';
              } else if (route.name === 'Jogo do Bicho') {
                iconName = 'paw';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Mega Sena" component={MegaSenaScreen} />
          <Tab.Screen name="Jogo do Bicho" component={JogoDoBichoScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}