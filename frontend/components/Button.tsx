import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    isLoading?: boolean;
}

export function Button ({ title, isLoading = false, ...rest}: ButtonProps) {
    return (
        <TouchableOpacity
        style = {[
            styles.button,
            isLoading? styles.buttonDisabled : null
        ]}
        activeOpacity = {0.8}
        disabled = {isLoading}
        {...rest}
        >
        {isLoading ? (
            <ActivityIndicator color = "#FFFFFF" />
        ) : (
        <Text style = {styles.buttonText}>{title}</Text>
        )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        backgroundColor: '#4C51BF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        width: '100%',
    },
    buttonDisabled: {
        backgroundColor: '#A0AEC0',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});