import { AddEditNote } from '@/components/AddEditNote';
import { CancelSubmitButton } from '@/components/CancelSubmitButton';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from '@/components/ContainerView';
import { PageToolbar } from '@/components/PageToolbar';
import { INote } from '@/models/INote';
import baseEntityDataService from '@/services/BaseEntityDataService';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text } from 'react-native';
import { Card } from '../../../components/Card';
import { ContainerContent } from '../../../components/ContainerContent';

export default function ViewNote() {
    const searchParams = useLocalSearchParams();
    const id = Array.isArray(searchParams.id) ? searchParams.id[0] : searchParams.id;

    const [note, setNote] = useState<INote | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFormUpdate = (text: string, value: string) => {
        setNote(prev => ({ ...prev, [value]: text }));
    }

    const fetchNote = useCallback(async (id?: string) => {
        if (id) {
            try {
                setIsLoading(true);
                const result = await baseEntityDataService.GetDetail('Note', id);
                if (result.ok) {
                    const data = await result.json();
                    setError(null);
                    setNote(data);
                } else {
                    setError('Failed to load note details.');
                }
            } catch (err) {
                console.error(err, { logMessage: 'Error fetching note' });
                setError('An error occurred while loading the note.');
            } finally {
                setIsLoading(false);
            }
        }
    }, [baseEntityDataService]);

    const onSubmit = async () => {
        try {
            const result = await baseEntityDataService.Update('Note', note);
            if (result?.ok) {
                fetchNote(note?.id);
            }
        } catch (error) {
            console.error(error, { logMessage: 'Error saving note' });
        }
    }

    const onDelete = useCallback(async (id?: string) => {
        if (id) {
            try {
                const result = await baseEntityDataService.Delete('Note', id);
                if (result.ok) {
                    router.back();
                }
            } catch (e) {
                console.error(e, { logMessage: 'Error deleting note' });
            }
        }
    }, [baseEntityDataService]);



    useEffect(() => {
        if (!id) return;
        fetchNote(id);
    }, [id]);

    return (
        <ContainerView>
            <ContainerDrawer title='View Note' />
            <ContainerContent>
                <PageToolbar icon='note' title='View Note' />

                {isLoading ? (
                    <ActivityIndicator size="large" color="#ea580c" />
                ) : error ? (
                    <Text className="text-red-500 font-bold p-4">{error}</Text>
                ) : note ? (
                    <ScrollView className="w-full p-2 items-center" showsVerticalScrollIndicator={false}>
                        <Card className='border-gray-100'>
                            <CancelSubmitButton submitText='Save' onSubmit={onSubmit} onDelete={() => onDelete(note.id)} />
                        </Card>
                        <AddEditNote note={note} handleFormUpdate={handleFormUpdate} />
                    </ScrollView>
                ) : (
                    <Text className="text-zinc-500">Note not found.</Text>
                )}
            </ContainerContent>
        </ContainerView>
    );
}
