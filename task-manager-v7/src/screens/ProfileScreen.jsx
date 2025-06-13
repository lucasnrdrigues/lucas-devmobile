import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Avatar, List, Title, Paragraph, Card } from 'react-native-paper';

// Componente que exibe as informações do perfil do usuário
const ProfileScreen = () => {
  return (
    <View style={styles.page}>

      {/* ScrollView permite rolagem caso o conteúdo ultrapasse a altura da tela */}
      <ScrollView contentContainerStyle={styles.container}>

        {/* Container do perfil com avatar, nome e e-mail */}
        <View style={styles.profileContainer}>
          {/* Avatar com iniciais do nome */}
          <Avatar.Text size={100} label="LU" style={styles.avatar} />

          {/* Nome do usuário */}
          <Title style={styles.name}>Lucas Nóbrega Rodrigues</Title>

          {/* E-mail do usuário */}
          <Paragraph style={styles.email}>lucas@gmail.com</Paragraph>
        </View>

        {/* Cartão com informações adicionais como telefone, cidade e versão do app */}
        <Card style={styles.card}>
          <Card.Content>
            <List.Item
              title="Telefone"
              description="(61) 9 9999-9999"
              left={props => <List.Icon {...props} icon="phone" />}
            />
            <List.Item
              title="Cidade"
              description="Brasília - DF"
              left={props => <List.Icon {...props} icon="map-marker" />}
            />
            <List.Item
              title="Versão do App"
              description="1.0.0"
              left={props => <List.Icon {...props} icon="information" />}
            />
          </Card.Content>
        </Card>

      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

// Estilos utilizados na tela de perfil
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f2f2f2', // Cor de fundo clara
  },
  container: {
    padding: 16, // Espaçamento interno do conteúdo
  },
  profileContainer: {
    alignItems: 'center', // Centraliza conteúdo horizontalmente
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: '#6200ee', // Roxo padrão do Material Design
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#333',
  },
  email: {
    color: '#777',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3, // Sombra no Android
  },
});
