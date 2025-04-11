import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { Card, Text } from 'react-native-paper'


export default function EscudoScreen() {
  
  const time = {
    nome: "Clube de Regatas Flamengo",
    escudo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flamengo_braz_logo.svg/250px-Flamengo_braz_logo.svg.png"
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.content}>
          <Image
            source={{ uri: time.escudo }}
            style={styles.escudo}
            resizeMode="contain"
          />
          <Text style={styles.nome}>{time.nome}</Text>
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  content: {
    alignItems: 'center',
  },
  escudo: {
    width: 300,
    height: 300,
    marginBottom: 16,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  }
})