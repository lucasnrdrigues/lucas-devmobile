import { StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import { Card, Text } from 'react-native-paper'

export default function TitulosScreen() {

  const titulos = [
    {
      nome: "Copa Libertadores da América",
      anos: [1981, 2019, 2022]
    },
    {
      nome: "Campeonato Brasileiro",
      anos: [1980, 1982, 1983, 1987, 1992, 2009, 2019, 2020]
    },
    {
      nome: "Copa do Brasil",
      anos: [1990, 2006, 2013, 2022]
    },
    {
      nome: "Mundial de Clubes",
      anos: [1981]
    }
  ];

  return (
    <View style={styles.container}>
      <FlatList style={{ paddingTop: 20}}
      data={titulos}
      contentContainerStyle={{ padding: 16 }}
      keyExtractor={(item) => item.nome}
      renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardContent}>
                <Text style={styles.titulo}>{item.nome}</Text>
                <Text style={styles.anos}>{item.anos.join(', ')}</Text>
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  card: {
    backgroundColor: 'red',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  cardContent: {
    padding: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f3e5f5',
    marginBottom: 8,
  },
  anos: {
    fontSize: 15,
    color: 'white',
  }
})