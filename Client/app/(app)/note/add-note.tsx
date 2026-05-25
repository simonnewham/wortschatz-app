import { AddEditNote } from '@/components/AddEditNote';
import { ContainerContent } from '@/components/ContainerContent';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from '@/components/ContainerView';
import { useBaseEntity } from '@/hooks/useBaseEntity';
import { INote } from '@/models/INote';
import { useState } from 'react';
import { CancelSubmitButton } from '../../../components/CancelSubmitButton';
import { Card } from '../../../components/Card';

const initialForm: INote = {
    title: undefined,
    description: undefined,
    notes: undefined,
}

export default function AddNote() {
    const [form, setForm] = useState(initialForm);
    const [isLoading, setIsLoading] = useState(false);

    const { onAdd } = useBaseEntity({
        entity: 'Note',
        viewRoute: '/note/view-note'
    });

    const handleFormUpdate = (text: string, value: string) => {
        setForm(prev => ({ ...prev, [value]: text }));
    }

    const onSubmit = async () => {
        const result = await onAdd(form);
        if (result?.ok) {
            setForm(initialForm);
        }
    }

    return (
        <ContainerView>
            <ContainerDrawer title='Add a new note' />
            <ContainerContent>
                <Card className='border-gray-100'>
                    <CancelSubmitButton onSubmit={onSubmit} />
                </Card>
                <AddEditNote note={form} handleFormUpdate={handleFormUpdate} />
            </ContainerContent>
        </ContainerView>
    );
}
