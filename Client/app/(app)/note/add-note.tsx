import { AddEditNote } from '@/components/AddEditNote';
import { ContainerContent } from '@/components/ContainerContent';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from '@/components/ContainerView';
import { useBaseEntity } from '@/hooks/useBaseEntity';
import { INote } from '@/models/INote';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { CancelSubmitButton } from '../../../components/CancelSubmitButton';
import { Card } from '../../../components/Card';

export default function AddNote() {
    const [form, setForm] = useState(new INote());
    const [isLoading, setIsLoading] = useState(false);

    const { onAdd } = useBaseEntity({
        entity: 'Note',
        viewRoute: '/note/view-note'
    });

    const handleFormUpdate = (text: string, value: string) => {
        setForm(prev => ({ ...prev, [value]: text }));
    }

    const onSubmit = useCallback(async () => {
        const result = await onAdd(form);
        if (result?.ok) {
            setForm(new INote());
            router.navigate(`/note/view-note?id=${result.data.id}`);
        }
    }, [form, onAdd])

    useFocusEffect(
        useCallback(() => {
            setForm(new INote());
        }, [setForm]));

    return (
        <ContainerView>
            <ContainerDrawer title='Add a new note' />
            <ContainerContent>
                <Card className='border-gray-100'>
                    <CancelSubmitButton onSubmit={onSubmit} />
                </Card>
                <ScrollView className='w-full h-screen'>
                    <AddEditNote note={form} handleFormUpdate={handleFormUpdate} />
                </ScrollView>
            </ContainerContent>
        </ContainerView>
    );
}
