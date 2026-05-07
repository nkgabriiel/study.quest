import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function HomeScreen() {
    return (
        <View>
            <Text style = {styles.container}></Text>
            <Text style = {styles.title}>Inicio</Text>
            <Text style = {styles.subtitle}>Aqui ficará o seu resumo de estudos</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D3748',
    },
    subtitle: {
        fontSize: 16,
        color: '#718096',
        marginTop: 8,
    }
});