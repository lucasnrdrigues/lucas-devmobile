import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PrimeiroComponente from './componentes/PrimeiroComponente';
import SegundoComponente from './componentes/SegundoComponente';
import JavaScriptComponente from './componentes/JavaScriptComponente';
import Perfil from './componentes/Perfil';
import TerceiroComponente from './componentes/TerceiroComponente';

export default function App() {
  return (
    <View style={styles.container}>
      
      <StatusBar style="auto"/>

      {/* Adicionando os componentes */}
      <PrimeiroComponente />

      <SegundoComponente />

      <TerceiroComponente />

      <JavaScriptComponente />
      
      <Perfil
        nome="Lucas"
        sobrenome="Rodrigues"
        idade={20}
      />

      <Perfil
        nome="Edimar"
        sobrenome="Rodrigues"
        idade={43}
      />

      <Perfil
        nome="Cleide"
        sobrenome="Rodrigues"
        idade={44}
      />

    </View>
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
