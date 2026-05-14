import { AddEditWord } from '@/components/AddEditWord';
import { CancelSubmitButton } from '@/components/CancelSubmitButton';
import { Card } from '@/components/Card';
import { ContainerContent } from '@/components/ContainerContent';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from '@/components/ContainerView';
import { Word } from '@/models/IWord';
import baseEntityDataService from '@/services/BaseEntityDataService';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';

export default function AddWord() {
    const [form, setForm] = useState(new Word());
    const [error, setError] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleFormUpdate = (value: any, field: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    const onSubmit = async () => {
        setMessage(null);

        if (!form.nativeWord) {
            setError(true);
        }
        else {
            const result = await baseEntityDataService.Create('Word', form);
            if (result.ok) {
                setForm(new Word());
                setMessage('Word added successfully!');
            }
            else {
                setMessage('Failed to add word. Please try again.');
            }
        }
    }

    return (
        <ContainerView>
            <ContainerDrawer title='Add a new word' />
            <ContainerContent>
                <ScrollView>
                    <Card className='border-gray-200'>
                        <CancelSubmitButton onSubmit={onSubmit} />
                    </Card>
                    <AddEditWord form={form} handleFormUpdate={handleFormUpdate} />
                </ScrollView>

            </ContainerContent>
        </ContainerView>
    );
}