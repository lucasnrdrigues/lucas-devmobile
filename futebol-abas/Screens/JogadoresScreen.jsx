import { StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import { Card, Avatar, Text } from 'react-native-paper'

export default function JogadoresScreen(props) {

    const { nome, imagem, numero } = props

    const jogadores = [
        {
            nome: "Arrascaeta",
            numero: 10,
            imagem: "https://lncimg.lance.com.br/cdn-cgi/image/width=1280,height=720,quality=75,background=white,fit=pad/uploads/2024/12/Arrascaeta-Flamengo-aspect-ratio-512-320.jpg"
        },
        {
            nome: "Bruno Henrique",
            numero: 27,
            imagem: "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/09/bruno-henrique-flamengo-e1727122623476.jpg"
        },
        {
            nome: "Luiz Araujo",
            numero: 7,
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrY8eZGk1iHscwDsv4ZqmHlf-B65O71YN-Tg&s"
        },
        {
            nome: "Everton Cebolinha",
            numero: 11,
            imagem: "https://lncimg.lance.com.br/uploads/2022/11/03/63640bbd1dd34.jpeg"
        },
        {
            nome: "Juninho",
            numero: 23,
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4IWW3tx8t-iQVXS0zZkTvb86N5w6KVCNWRw&s"
        }
    ];

    return (
        <View style={styles.container}>
            <FlatList
                data={jogadores}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Content>
                            <View style={styles.textContainer}>
                                    <Avatar.Image source={{ uri: item.imagem }} size={60} style={styles.avatar} />
                                    <Text style={styles.nome}>N° {item.numero} - {item.nome}</Text>
                            </View>
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
        backgroundColor: 'black',
        padding: 16,
        paddingTop: 30,
      },
      card: {
        backgroundColor: 'red',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
      },
      avatar: {
        backgroundColor: 'white',
        marginRight: 12,
      },
      textContainer: {
        flex: 1,
        flexDirection: "row",
      },
      nome: {
        paddingTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#f3e5f5',
      }
})