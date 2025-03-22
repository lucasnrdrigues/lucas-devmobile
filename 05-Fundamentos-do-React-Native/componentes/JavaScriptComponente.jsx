import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function JavaScriptComponente() {
    const nome = "Lucas"
    const idade = 20

    // Função para exibir nome
    function exibirNome() {
        return nome
    }

    // Função para checar se é maior de idade
    function checarMaiorIdade() {
        if(idade >= 18){
            return "Maior de Idade"
        } else {
            return "Menor de Idade"
        }
    }

    // Retornando os componentes para visualização
    return (
        <View>
            <Text>JavaScript Componente</Text>
            <Text>Nome: {nome}</Text>
            <Text>Idade: {idade}</Text>
            <Text>Nome: {exibirNome()}</Text>
            <Text>Resultado: {25 + 30}</Text>
            <Text>Idade: {idade + 30}</Text>
            <Text>Check 18+: {checarMaiorIdade()}</Text>
            {/* Usando operador ternário */}
            <Text>Check 18+: {idade >= 18 ? "Maior de Idade" : "Menor de Idade"}</Text>
        </View>
    )
}

// Adicionar estilos
const styles = StyleSheet.create({})