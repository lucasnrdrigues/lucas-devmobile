// Imports
import { StatusBar } from 'expo-status-bar';
import { Image, Button, StyleSheet, Text, View } from 'react-native';

// Função que define o componente
// Retorna o que vai ser mostrado na tela
export default function App() {
  // Lógica do componente
  const nome = "Lucas"
  function alerta(){
    alert("Clicou no botão !")
  }


  //Retorno com o jsx
  return (
    <View style={styles.container}>
      <Text>{2 + 3}</Text>
      <Text>{nome}</Text>
      <Text style={{fontStyle: "italic"}}>Vai palmeiras!</Text>
      <StatusBar style="auto" />

      {/* Adicionando imagem */}
      <Image source={{uri: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/874.png'}}
      
      style={{
        height: 400,
        width: 400
      }}

      />

      {/* Adicionando um votão com ação */}
      <Button title="Clicar !" onPress={alerta}></Button >
    </View>
  );
}



// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
