import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

const titulos = [
  {
    nome: "Campeonato Brasileiro",
    anos: [1980, 1982, 1983, 1992, 2009, 2019, 2020],
  },
  {
    nome: "Copa Libertadores da América",
    anos: [1981, 2019, 2022],
  },
  {
    nome: "Copa do Brasil",
    anos: [1990, 2006, 2013, 2022, 2024],
  },
  {
    nome: "Supercopa do Brasil",
    anos: [2020, 2021, 2025],
  },
];

export default function TitulosScreen() {
  return (
    <FlatList
      data={titulos}
      keyExtractor={(item) => item.nome}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.tituloNome}>{item.nome}</Text>
            <Text variant="bodyMedium">Anos: {item.anos.join(", ")}</Text>
          </Card.Content>
        </Card>
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#FF0000" },
  card: { marginBottom: 16, backgroundColor: "#f5f5f5" },
  tituloNome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7b1f3a",
    marginBottom: 4,
  },
});
