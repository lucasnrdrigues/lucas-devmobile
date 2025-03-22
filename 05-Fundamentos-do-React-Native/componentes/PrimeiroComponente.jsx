// Imports
import React from "react";
import { StyleSheet, Text, View } from 'react-native';

// Função do componente
export default function PrimeiroComponente() {

    // Retorno do JSX
    return (
        <View>
            <Text style={styles.textoGrande}>
                Meu primeiro componente
            </Text>
        </View>
    );

}

const styles = StyleSheet.create({
    textoGrande: {
        fontSize: 40,
        fontWeight: 600
    }
})