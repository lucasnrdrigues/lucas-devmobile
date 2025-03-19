import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';

export default function App() {

//Criando a função para quando apertar o botão:
function alertaGol(){
  alert("GOOOOLLLLL !!!")
}

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Flamengo</Text>
      <Text style={styles.nomeJogador}>Neymar da Silva Santos Junior</Text>
      <Text style={styles.info}>
        Neymar da Silva Santos Júnior, conhecido como Neymar Jr., é um dos maiores jogadores de futebol da atualidade. Nascido em 5 de fevereiro de 1992, em Mogi das Cruzes, São Paulo, Neymar ganhou destaque no Santos, onde conquistou a Libertadores da América em 2011.

        Em 2013, transferiu-se para o Barcelona, formando um trio lendário com Messi e Suárez e conquistando a Liga dos Campeões em 2015. Em 2017, tornou-se a transferência mais cara da história ao assinar com o Paris Saint-Germain (PSG). Além disso, é um dos principais jogadores da Seleção Brasileira, tendo participado de Copas do Mundo e conquistado o ouro olímpico em 2016.

        Atualmente, Neymar joga no Santos, do Brasil, e continua sendo um dos atletas mais influentes do futebol mundial.
      </Text>
      
      <View style={styles.card}>
        <Text style={styles.info}>Posição: Atacante</Text>
        <Text style={styles.info}>Número: 10</Text>
        <Text style={styles.info}>Idade: 33 anos</Text>
        <Text style={styles.info}>Nacionalidade: Brasileiro</Text>
        <Text style={styles.info}>Clube Atual: Flamengo</Text>
      </View>
      
      <View style={styles.imageContainer}>
        <Image source={{ uri: "https://i.pinimg.com/736x/c1/7e/c7/c17ec7e8b9c091db8ce74323c169cc97.jpg" }} style={styles.image} />
        <Image source={{ uri: "https://i.pinimg.com/736x/e3/96/a9/e396a9b722d0ec007f4114b5470d1d0d.jpg" }} style={styles.image} />
        <Image source={{ uri: "https://i.pinimg.com/474x/b0/59/8a/b0598a46b1b8349261426ca304accee7.jpg" }} style={styles.image} />
        <Image source={{ uri: "https://i.pinimg.com/474x/e4/ac/f8/e4acf800cc806626312daafe69c2bae5.jpg" }} style={styles.image} />
        <Image source={{ uri: "https://i.pinimg.com/236x/a7/2b/f9/a72bf9fed62c62db01c1439f67f24ce8.jpg" }} style={styles.image} />
        <Image source={{ uri: "https://i.pinimg.com/474x/77/d6/ab/77d6abb47a4c0e4dd826fb561be4238b.jpg" }} style={styles.image} />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="GRITAR GOL !" onPress={alertaGol} color="#FFF" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FF0000",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  nomeJogador: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    color: "#FFFFFF",
  },
  card: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  buttonContainer: {
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
});
