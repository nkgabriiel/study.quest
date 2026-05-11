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
import { theme } from '../constants/theme'; // Importação do nosso tema central
import { useAuth } from '../contexts/AuthContext';


export default function LoginScreen() {
    const { signIn } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const handleLogin = async (): Promise<void> => {
        if(!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
            return;
        }

        setIsLoading(true);

        try {
            await signIn({ email, password });

        } catch (error: any) {
            console.log("ERRO REAL DO AXIOS: ", error.message, error.response?.data);
            
            const errorMessage = error.response?.data?.message || 'Falha ao autenticar. Verifique email e senha.';
            Alert.alert ('Ops!', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Study Quest</Text>
                <Text style={styles.subtitle}>Sua jornada começa aqui!</Text>

                <Input
                placeholder="Digite seu email"
                placeholderTextColor={theme.colors.textMuted}
                autoCapitalize='none'
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                />

                <Input
                placeholder="Digite sua senha"
                placeholderTextColor={theme.colors.textMuted}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                />

                <Button
                title="Entrar"
                onPress={handleLogin}
                isLoading={isLoading}
                />

                <Link href="/register" asChild>
                <Text style={styles.linkText}>Ainda não tem uma conta? Cadastre-se</Text>
                </Link>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: theme.colors.textMuted,
        marginBottom: 32,
        textAlign: 'center',
    },
    linkText: {
        marginTop: 24,
        textAlign: 'center',
        color: theme.colors.primary,
        fontWeight: '600',
        fontSize: 14,
    },
});