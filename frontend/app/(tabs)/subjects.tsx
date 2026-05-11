import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { theme } from '../../constants/theme';

export default function MissionScreen() {
    return (
        <View style = {styles.container}>
            <View style= {styles.content}>
                <FontAwesome5 name="tools" size={64} color={theme.colors.primary} style={styles.icon}/>
                <Text style = {styles.title}>Área em produção</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: theme.colors.card,
        padding: 32,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        marginHorizontal: 24,
        borderWidth: 1,
        borderColor: theme.colors.border
    },
    icon: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: theme.colors.textMuted,
        textAlign: 'center',
        lineHeight: 24,
    }
});