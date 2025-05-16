import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';

export default function MegaSenaScreen() {
  const [jogosMegaSena, setJogosMegaSena] = useState([]);

  const gerarJogo = () => {
    const numeros = [];
    while (numeros.length < 6) {
      const num = Math.floor(Math.random() * 60) + 1;
      if (!numeros.includes(num)) numeros.push(num);
    }
    const jogo = numeros.sort((a, b) => a - b).join(' - ');
    setJogosMegaSena([jogo, ...jogosMegaSena]);
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" buttonColor="#000000" textColor="#FFFFFF" onPress={gerarJogo}>
        Gerar Jogo
      </Button>
      <FlatList
        data={jogosMegaSena}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Text style={styles.jogoTexto}>{item}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  card: {
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  jogoTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#333',
  },
});
