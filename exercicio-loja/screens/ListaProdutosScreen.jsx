import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Card, Text, Title } from 'react-native-paper';
import axios from 'axios';

export default function ListaProdutosScreen({ route, navigation }) {
  const { categoria } = route.params;
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/category/${categoria}`)
      .then(response => setProdutos(response.data.products))
      .catch(error => console.error(error));
  }, [categoria]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Produto', { idProduto: item.id })}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: item.thumbnail }} style={styles.image} />
        <Card.Content>
          <Title style={styles.title}>{item.title}</Title>
          <Text style={styles.price}>R$ {item.price}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F6F6',
    flex: 1,
    padding: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  image: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    color: '#2ecc71',
    marginTop: 4,
    fontWeight: 'bold',
  },
});
