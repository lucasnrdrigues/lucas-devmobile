import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const time = {
  nome: "Clube de Regatas Flamengo - CRF",
  escudo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Logo_Flamengo_crest_1980-2018.png/960px-Logo_Flamengo_crest_1980-2018.png",
  fundacao: "15 de novembro de 1895",
  estadio: "Maracanã",
  mascote: "Urubu",
  cores: ["vermelho", "preto"],
  presidente: "Rodolfo Landim"
};

export default function EscudoScreen() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: time.escudo }} style={styles.escudo} />
        <Card.Content>
            <Text variant="titleLarge" style={{paddingTop: 20, fontSize: 30, fontWeight: 'bold', color: '#7b1f3a'}}>{time.nome}</Text>
            <Text variant="bodyMedium" style={{paddingTop: 10}}>Fundado em: {time.fundacao}</Text>
            <Text variant="bodyMedium">Estádio: {time.estadio}</Text>
            <Text variant="bodyMedium">Mascote: {time.mascote}</Text>
            <Text variant="bodyMedium" style={styles.texto}>Cores: {time.cores.join(", ")}</Text>
            <Text variant="bodyMedium" style={styles.texto}>Presidente: {time.presidente}</Text>
          </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#FF0000' },
  card: { elevation: 4 },
  escudo: { resizeMode: 'contain', backgroundColor: '#fff', height: 450 }
});
