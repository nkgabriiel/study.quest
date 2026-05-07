import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { Link } from 'expo-router';

import { Button } from '../components/Button';
import { Input } from '../components/Input';


export default function LoginScreen() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const handleLogin = (): void => {
        if(!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
            return;
        }

        Alert.alert('Sucesso', `Autenticando o usuário: ${email}`)

          setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        Alert.alert('Sucesso', `Autenticando o usuário: ${email}`);
    }, 2000);
    };

    return (
        <KeyboardAvoidingView
        style = {styles.container}
        behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style = {styles.formContainer}>
                <Text style = {styles.title}>Study Quest</Text>
                <Text style = {styles.subtitle}>Sua jornada começa aqui!</Text>

                <Input
                placeholder = "Digite seu email"
                placeholderTextColor = {"#A0A0A0"}
                autoCapitalize = 'none'
                autoCorrect = {false}
                value = {email}
                onChangeText = {setEmail}
                />

                <Input
                placeholder = "Digite sua senha"
                placeholderTextColor={"#A0A0A0"}
                secureTextEntry = {true}
                value = {password}
                onChangeText={setPassword}
                />

                <Button
                title = "Entrar"
                onPress = {handleLogin}
                isLoading = {isLoading}
                />

                <Link href="/register" asChild>
                <Text style = {styles.linkText}>Ainda não tem uma conta? Cadastre-se</Text>
                </Link>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FC',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#718096',
        marginBottom: 32,
        textAlign: 'center',
    },
    linkText: {
        marginTop: 24,
        textAlign: 'center',
        color: '#4C51BF',
        fontWeight: '600',
        fontSize: 14,
    },
});