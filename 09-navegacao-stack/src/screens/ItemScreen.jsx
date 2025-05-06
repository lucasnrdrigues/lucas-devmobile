import { StyleSheet, Text, View } from "react-native";
import { Card, Button } from "react-native-paper";
import React from "react";

export default function ItemScreen({ navigation, route }) {
  console.log("CARRO RECEBIDO => ", route.params);

  const carro = route.params.item;

  return (
    <View>
      {/* Adicionado um Card para mostar o carro que foi selecionado na página de lista */}
      <Card>
        <Card.Content>
          <Text>Nome: {carro.nome}</Text>
          <Text>Fabricante: {carro.fabricante}</Text>
          <Text>Cor: {carro.cor}</Text>
          <Text>Ano: {carro.ano}</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="container"
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          >
            Voltar
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
