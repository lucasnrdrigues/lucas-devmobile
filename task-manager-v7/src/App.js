import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppRoutes from './routes/index';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </PaperProvider>
  );
}
