import { AddEditNote } from '@/components/AddEditNote';
import { CancelSubmitButton } from '@/components/CancelSubmitButton';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from '@/components/ContainerView';
import { PageToolbar } from '@/components/PageToolbar';
import { useBaseEntity } from '@/hooks/useBaseEntity';
import { INote } from '@/models/INote';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Card } from '../../../components/Card';
import { ContainerContent } from '../../../components/ContainerContent';

export default function ViewNote() {
    const searchParams = useLocalSearchParams();
    const id = Array.isArray(searchParams.id) ? searchParams.id[0] : searchParams.id;

    const [note, setNote] = useState<INote | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { onUpdate, onDelete, onDetail } = useBaseEntity({
        entity: 'Note',
        viewRoute: '/note/view-note'
    });

    const handleFormUpdate = (text: string, value: string) => {
        setNote(prev => ({ ...prev, [value]: text }));
    }

    const fetchNote = useCallback(async (id?: string) => {
        if (id) {
            const data = await onDetail(id);
            if (data) {
                setError(null);
                setNote(data);
            } else {
                setError('Failed to load note details.');
            }
        }
    }, [onDetail]);

    const onSubmit = async () => {
        if (!note) return;
        const result = await onUpdate(note);
        if (result?.ok) {
            fetchNote(note.id);
        }
    }

    useEffect(() => {
        if (!id) return;
        fetchNote(id);
    }, [id, fetchNote]);

    return (
        <ContainerView>
            <ContainerDrawer title='View Note' />
            <ContainerContent>
                <PageToolbar icon='note' title='View Note' showBackButton={true} />
                {isLoading ? (
                    <ActivityIndicator size="large" color="#ea580c" />
                ) : error ? (
                    <Text className="text-red-500 font-bold p-4">{error}</Text>
                ) : note ? (
                    <View className="w-full items-center">
                        <Card className='border-gray-100'>
                            <CancelSubmitButton submitText='Save' onSubmit={onSubmit} onDelete={() => onDelete(note.id)} />
                        </Card>
                        <ScrollView className='w-full h-screen'>
                            <AddEditNote note={note} handleFormUpdate={handleFormUpdate} />
                        </ScrollView>
                    </View>
                ) : (
                    <Text className="text-zinc-500">Note not found.</Text>
                )}
            </ContainerContent>
        </ContainerView>
    );
}
