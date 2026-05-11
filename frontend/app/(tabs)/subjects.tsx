import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { theme } from '../../constants/theme';
import { api } from '../../services/api';

interface Subject {
    id: number;
    name: string;
    colorHex: string;
    priority: 'ALTA' | 'MEDIA' | 'BAIXA';
}

export default function SubjectsScreen() {
    const insets = useSafeAreaInsets();

    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newSubjectName, setNewSubjectName] = useState('');
    const [newSubjectPriority, setNewSubjectPriority] = useState<'ALTA' | 'MEDIA' | 'BAIXA'>('MEDIA');
    const [isCreating, setIsCreating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await api.get('/subjects');
            setSubjects(response.data);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar as matérias.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenEditModal = (subject: Subject) => {
        setEditingSubject(subject);
        setNewSubjectName(subject.name);
        setNewSubjectPriority(subject.priority);
        setIsModalVisible(true);
    };

    const handleSaveSubject = async () => {
        if (!newSubjectName.trim()) return Alert.alert('Aviso', 'Nome obrigatório.');

        setIsSaving(true);
        try {
            const payload = { name: newSubjectName, priority: newSubjectPriority };

            if (editingSubject) {
                await api.put(`/subjects/${editingSubject.id}`, payload);
            } else {
                await api.post('/subjects', { ...payload });
            }

            setIsModalVisible(false);
            setEditingSubject(null);
            fetchSubjects();
        } catch (error) {
            Alert.alert('Erro', 'Falha ao salvar.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteSubject = async (id: number) => {
        Alert.alert('Apagar', 'Deseja excluir esta matéria?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir', style: 'destructive', onPress: async () => {
                    await api.delete(`/subjects/${id}`);
                    fetchSubjects();
                }
            }
        ]);
    };

    const renderSubjectCard = ({ item }: { item: Subject }) => {
        const priorityLabel = { ALTA: 'Alta', MEDIA: 'Média', BAIXA: 'Baixa' };

        return (
            <View style={styles.card}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleOpenEditModal(item)}
                >
                    <Feather name="edit-2" size={16} color={theme.colors.textMuted} />
                </TouchableOpacity>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                </View>


                <View style={styles.priorityBadge}>
                    <Text style={styles.priorityText}>{priorityLabel[item.priority]}</Text>
                </View>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteSubject(item.id)}
                >
                    <Feather name="trash-2" size={18} color={theme.colors.danger} />
                </TouchableOpacity>
            </View>


        );
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Matérias</Text>
                    <Text style={styles.subtitle}>{subjects.length} disciplinas em andamento</Text>
                </View>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        setEditingSubject(null);
                        setNewSubjectName('');
                        setNewSubjectPriority('MEDIA');
                        setIsModalVisible(true);
                    }}>

                    <Feather name="plus" size={16} color={theme.colors.primary} />
                    <Text style={styles.addButtonText}>Nova</Text>
                </TouchableOpacity>
            </View>
            {isLoading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={subjects}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderSubjectCard}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Nenhuma matéria adicionada.</Text>
                    }
                />
            )}
            <Modal
                visible={isModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {editingSubject ? 'Editar Matéria' : 'Nova Matéria'}
                        </Text>


                        <TextInput
                            style={styles.input}
                            placeholder="Ex: Java, Algoritmos..."
                            placeholderTextColor={theme.colors.textMuted}
                            value={newSubjectName}
                            onChangeText={setNewSubjectName}
                            autoFocus
                        />

                        <View style={styles.prioritySelector}>
                            {(['ALTA', 'MEDIA', 'BAIXA'] as const).map((p) => (
                                <TouchableOpacity
                                    key={p}
                                    style={[
                                        styles.priorityOption,
                                        newSubjectPriority === p && styles.priorityOptionSelected
                                    ]}
                                    onPress={() => setNewSubjectPriority(p)}
                                >
                                    <Text style={[
                                        styles.priorityOptionText,
                                        newSubjectPriority === p && styles.priorityOptionTextSelected
                                    ]}>
                                        {p === 'ALTA' ? 'Alta' : p === 'MEDIA' ? 'Média' : 'Baixa'}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={styles.modalActions} >
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setIsModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={handleSaveSubject}
                                disabled={isCreating}
                            >
                                {isSaving ? (
                                    <ActivityIndicator color={theme.colors.background} size="small" />
                                ) : (
                                    <Text style={styles.saveButtonText}>
                                        {editingSubject ? 'Salvar' : 'Forjar Matéria'}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    subtitle: {
        fontSize: 14,
        color: theme.colors.textMuted,
        marginTop: 4,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: theme.borderRadius.full,
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    addButtonText: {
        color: theme.colors.primary,
        fontWeight: '600',
        marginLeft: 6,
    },
    listContainer: {
        paddingHorizontal: 24,
        paddingBottom: 100, // Espaço extra para o botão central do layout não tampar o último item
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    priorityBadge: {
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginBottom: 16,
    },
    priorityText: {
        color: theme.colors.primary,
        fontSize: 12,
        fontWeight: '600',
    },
    emptyText: {
        color: theme.colors.textMuted,
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
    },
    // Estilos do Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: theme.colors.card,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 20,
    },
    input: {
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.sm,
        color: theme.colors.text,
        padding: 16,
        fontSize: 16,
        marginBottom: 24,
    },
    prioritySelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    priorityOption: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        borderRadius: theme.borderRadius.sm,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginHorizontal: 4,
    },
    priorityOptionSelected: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    priorityOptionText: {
        color: theme.colors.textMuted,
        fontWeight: '600',
    },
    priorityOptionTextSelected: {
        color: theme.colors.background,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        marginRight: 12,
    },
    cancelButtonText: {
        color: theme.colors.textMuted,
        fontSize: 16,
        fontWeight: '600',
    },
    saveButton: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        padding: 16,
        borderRadius: theme.borderRadius.sm,
        alignItems: 'center',
    },
    saveButtonText: {
        color: theme.colors.background,
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.md,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
        position: 'relative', // Essencial para o posicionamento absoluto dos ícones
        minHeight: 120,
        padding: 20,
        paddingRight: 45, // Evita que o texto encoste nos botões da direita
    },
    editButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 10,
    },
    deleteButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        zIndex: 10,
    },
});
