import React from 'react';
import { StyleSheet, View } from 'react-native'
import { Card, Paragraph, Text, Title } from 'react-native-paper' //Importando o Text do react native paper


export default function HomeScreen() {
  return (
    //LEMBRE-SE DE APLICAR O ESTILO NA VIEW!!!!!!
    <View style={styles.container}>
      <Text variant='headlineLarge' style={{ textAlign: "center" }} >Tela de início</Text>

      {/* Adicionando um Card */}
      <Card style={{width: '90%'}}>
        <Card.Content>
            <Title>Um título</Title>
            <Paragraph>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit alias omnis doloribus tenetur consequuntur exercitationem obcaecati sed impedit quaerat excepturi nesciunt, odit officiis! Quibusdam, illum. Vero ab aspernatur ut facere.
            </Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: 'https://picsum.photos/700' }}/>
      </Card>
      
      {/* Adicionando um Card 2 */}
      <Card style={{width: '90%'}}>
        <Card.Content>
            <Title>Um título</Title>
            <Paragraph>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit alias omnis doloribus tenetur consequuntur exercitationem obcaecati sed impedit quaerat excepturi nesciunt, odit officiis! Quibusdam, illum. Vero ab aspernatur ut facere.
            </Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: 'https://picsum.photos/700' }}/>
      </Card>

      {/* Adicionando um Card 3 */}
      <Card style={{width: '90%'}}>
        <Card.Content>
            <Title>Um título</Title>
            <Paragraph>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit alias omnis doloribus tenetur consequuntur exercitationem obcaecati sed impedit quaerat excepturi nesciunt, odit officiis! Quibusdam, illum. Vero ab aspernatur ut facere.
            </Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: 'https://picsum.photos/700' }}/>
      </Card>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
    }
})