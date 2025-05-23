import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
      .then(response => setCategorias(response.data.map(categoria => ({
        name: categoria.charAt(0).toUpperCase() + categoria.slice(1),
        slug: categoria
      }))))
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Produtos', { categoria: item.slug })}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardText}>{item.name}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.slug}
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
    marginVertical: 6,
    marginHorizontal: 8,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    paddingVertical: 12,
  },
});
