import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import GoalsScreen from '../screens/GoalsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// 🔽 Bottom Tabs
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Tasks') iconName = focused ? 'list' : 'list-outline';
          else if (route.name === 'Categories') iconName = focused ? 'albums' : 'albums-outline';
          else if (route.name === 'Goals') iconName = focused ? 'trophy' : 'trophy-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Goals" component={GoalsScreen} />
    </Tab.Navigator>
  );
}

// 🔽 Drawer Navigation
function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#6200ee',
        },
        drawerActiveTintColor: '#6200ee',
        drawerInactiveTintColor: '#555',
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -10,
        },
        drawerStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={MainTabs}
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Configurações',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// 🔽 Stack principal
export default function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DrawerRoutes" component={DrawerRoutes} />
    </Stack.Navigator>
  );
}
