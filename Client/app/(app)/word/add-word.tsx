import { AddEditWord } from '@/components/AddEditWord';
import { CancelSubmitButton } from '@/components/CancelSubmitButton';
import { Card } from '@/components/Card';
import { ContainerContent } from '@/components/ContainerContent';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from '@/components/ContainerView';
import { Status } from '@/constants/Status';
import { Word } from '@/models/IWord';
import { useToast } from '@/providers/ToastProvider';
import baseEntityDataService from '@/services/BaseEntityDataService';
import React, { useState } from 'react';

export default function AddWord() {
    const [form, setForm] = useState(new Word());
    const toast = useToast();

    const handleFormUpdate = (value: any, field: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    const onSubmit = async () => {
        if (!form.nativeWord) {
            toast.show('Please enter a native word.', Status.Error);
        }
        else {
            const result = await baseEntityDataService.Create('Word', form);
            if (result.ok) {
                setForm(new Word());
                toast.show('Word added successfully!', Status.Success);
            }
            else {
                toast.show('Failed to add word. Please try again.', Status.Error);
            }
        }
    }

    return (
        <ContainerView>
            <ContainerDrawer title='Add a new word' />
            <ContainerContent>
                <Card className='border-gray-200'>
                    <CancelSubmitButton onSubmit={onSubmit} />
                </Card>
                <AddEditWord form={form} handleFormUpdate={handleFormUpdate} />
            </ContainerContent>
        </ContainerView>
    );
}