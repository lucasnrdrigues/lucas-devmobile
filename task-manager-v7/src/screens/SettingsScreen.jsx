import React from 'react';
import { View, Text } from 'react-native';
import { Appbar, List, Switch } from 'react-native-paper';
import { useState } from 'react';

// Tela de configurações do aplicativo
const SettingsScreen = () => {
  // Estado para controlar se as notificações estão ativadas ou não
  const [notifications, setNotifications] = useState(true);

  return (
    <>
      {/* View principal com padding para espaçamento interno */}
      <View style={{ padding: 16 }}>

        {/* Seção de configurações agrupadas */}
        <List.Section>
          <List.Subheader>Preferências</List.Subheader>

          {/* Item de configuração: alternar notificações */}
          <List.Item
            title="Notificações"
            description="Receber notificações"
            left={() => <List.Icon icon="bell" />}
            right={() => (
              <Switch
                value={notifications}
                onValueChange={() => setNotifications(!notifications)} // Inverte o valor ao alternar
              />
            )}
          />

          {/* Item de configuração: tema escuro (em desenvolvimento, provavelmente não vou ter tempo para realizar a config deste funcionalidade) */}
          <List.Item
            title="Tema Escuro"
            description="(Em desenvolvimento)"
            left={() => <List.Icon icon="theme-light-dark" />}
          />

          {/* Item informativo: versão do aplicativo */}
          <List.Item
            title="Sobre"
            description="Versão 1.0.0"
            left={() => <List.Icon icon="information" />}
          />
        </List.Section>
      </View>
    </>
  );
};

export default SettingsScreen;
