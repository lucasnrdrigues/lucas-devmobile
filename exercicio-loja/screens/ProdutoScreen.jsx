import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, Text, Paragraph } from 'react-native-paper';
import axios from 'axios';

export default function ProdutoScreen({ route }) {
  const { idProduto } = route.params;
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${idProduto}`)
      .then(response => setProduto(response.data))
      .catch(error => console.error(error));
  }, [idProduto]);

  if (!produto) return <Text style={styles.loading}>Carregando...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: produto.thumbnail }} style={styles.image} />
        <Card.Content>
          <Title style={styles.title}>{produto.title}</Title>
          <Paragraph style={styles.description}>{produto.description}</Paragraph>
          <Text style={styles.info}>💰 Preço: R$ {produto.price}</Text>
          <Text style={styles.info}>🏷️ Marca: {produto.brand}</Text>
          <Text style={styles.info}>📦 Categoria: {produto.category}</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#F4F6F6',
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
  },
  image: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: '#2c3e50',
    marginTop: 4,
  },
  loading: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 18,
    color: '#555',
  },
});
