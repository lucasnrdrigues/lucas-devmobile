import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import Jogador from './Jogador' 

export default function Time(props) {

    const  { nome, anoFundacao, mascote, imagem, jogadores } = props

    return (
        <Card style={styles.card}>

            <Card.Title
                title={nome}
                subtitle={`Fundado em ${anoFundacao}`}
                titleStyle={styles.title}
                subtitleStyle={styles.subtitle}
            />

            <Card.Content>
                <Text style={styles.mascote}>Mascote: {mascote}</Text>
            </Card.Content>

            <Card.Cover source={{ uri: imagem }} style={styles.imagemTime} />

            <Card.Actions>

                <Text style={styles.jogadoresTitle}>Jogadores:</Text>

                <FlatList
                    horizontal
                    data={jogadores}
                    keyExtractor={(item) => item.nome}
                    renderItem={({ item }) => (
                        <Jogador
                            nome={item.nome}
                            numero={item.numero}
                            imagem={item.imagem}
                        />
                    )}
                />

            </Card.Actions>

        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 30,
        marginBottom: 20,
        backgroundColor: 'red',
        borderRadius: 15,
        paddingBottom: 10,
        elevation: 5,
    },
    title: {
        paddingTop: 40,
        paddingBottom: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#280079',
    },
    subtitle: {
        fontSize: 16,
        paddingBottom: 10,
        color: '#1b0050',
        fontWeight: '600',
    },
    mascote: {
        fontSize: 16,
        color: '#1b0050',
        marginBottom: 10,
    },
    imagemTime: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        borderRadius: 10,
        backgroundColor: 'red',
    },
    jogadoresTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1b0050',
        marginLeft: 10,
    }
});