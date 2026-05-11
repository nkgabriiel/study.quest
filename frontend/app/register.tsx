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
import { theme } from '../constants/theme';
import { api } from '../services/api';

export default function RegisterScreen() {
    const [firstName, setfirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [age, setAge] = useState<number>();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleRegister = async (): Promise<void> => {
        if(!firstName || !lastName || !username || !age || !email || !password || !confirmPassword) {
            Alert.alert('Erro', 'Preencha todos os campos.');
            return;
        }

        if(password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        setIsLoading(true);

        try {
            const payload = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                age: age,
                email: email,
                password: password
            };

            await api.post('/auth/register', payload);

            Alert.alert('Sucesso', 'Conta criada! Faça o login para continuar.', [
                { text: 'OK', onPress: () => router.replace('/') }
            ]);
        } catch (error: any) {
    // ADICIONE ESTA LINHA AQUI 👇
    console.log("ERRO REAL DO AXIOS: ", error.message, error.response?.data);

    const errorMessage = error.response?.data?.message || 'Falha ao conectar com servidor.';
    Alert.alert('Ops!', errorMessage);
} finally {
            setIsLoading(false);
        }
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
            value = {firstName}
            onChangeText={setfirstName}
            autoCapitalize = "words"
            />

             <Input
            placeholder = 'Digite seu sobrenome'
            value = {lastName}
            onChangeText={setLastName}
            autoCapitalize = "words"
            />

            <Input
            placeholder = 'Digite seu apelido'
            value = {username}
            onChangeText={setUsername}
            autoCapitalize = "words"
            />
            
            <Input
            placeholder = 'Digite sua idade'
            keyboardType = 'numeric'
            value = {age?.toString()}
            onChangeText={(text) => setAge(Number(text))}
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
            backgroundColor: theme.colors.background
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
            color: theme.colors.text,
            marginBottom: 8,
        },
        subtitle: {
            fontSize: 16,
            color: theme.colors.textMuted,
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