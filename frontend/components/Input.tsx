import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from 'react-native';

interface InputProps extends TextInputProps {
    errorMessage?: string;
}

export function Input({errorMessage, ...rest}: InputProps) {
    return (
        <View style={styles.container}>
            <TextInput
            style = {[
                styles.input,
                errorMessage ? styles.inputError : null
            ]}
            placeholderTextColor = "#A0A0A0" {...rest}
            />
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        width: '100%',
    },
    input: {
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        color: '#2D3748',
    },
    inputError: {
        borderColor: '#E53E3E',
    },
    errorText: {
        color: '#E53E3E',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    }
});