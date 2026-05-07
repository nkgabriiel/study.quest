import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { Button } from '../components/Button';
import { Input } from '../components/Input';

export default function RegisterScreen() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleRegister = (): void => {
        if(!name || !email || !password || !confirmPassword) {
            Alert.alert('Erro', 'Preencha todos os campos.');
            return;
        }

        if(password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
        }

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            Alert.alert('Sucesso', 'Conta criada com sucesso!', [
                {text: 'OK', onPress: () => router.replace('/')}
            ]);
        }, 2000);
    };

    return (
        <KeyboardAvoidingView
        style = {styles.container}
        behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}
        >
           <ScrollView
           contentContainerStyle = {styles.scrollContent} showsHorizontalScrollIndicator = {false}
           >
            <View style  = {styles.header}>
                <Text style = {styles.title}>Criar conta</Text>
                <Text style = {styles.subtitle}>Junte-se ao Study Quest</Text>
            </View>

            <Input
            placeholder = 'Digite seu nome'
            value = {name}
            onChangeText={setName}
            autoCapitalize = "words"
            />
            
            <Input
            placeholder = 'Digite seu email'
            keyboardType = "email-address"
            autoCapitalize= "none"
            value = {email}
            onChangeText = {setEmail}
            />

            <Input
            placeholder = 'Digite sua senha'
            secureTextEntry
            value = {password}
            onChangeText={setPassword}
            />

            <Input
            placeholder= "Confirme a senha"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            />

            <Button
            title = "Cadastrar"
            onPress = {handleRegister}
            isLoading = {isLoading}
            />

            <Link href = "/">
                <Text style = {styles.linkText}>Já tem uma conta? Faça login</Text>
            </Link>
            </ScrollView> 
        </KeyboardAvoidingView>
    );
}

 const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F7F9FC'
        },
        scrollContent: {
            paddingHorizontal: 24,
            paddingTop: 60,
            paddingBottom: 40,
        },
        header : {
            marginBottom: 32,
            alignItems: 'center',
        },
        title: {
            fontSize: 32,
            fontWeight: 'bold',
            color: '#2D3748',
            marginBottom: 8,
        },
        subtitle: {
            fontSize: 16,
            color: '#718096',
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