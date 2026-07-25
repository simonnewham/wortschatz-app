import { AddEditWord } from '@/components/AddEditWord';
import { CancelSubmitButton } from '@/components/CancelSubmitButton';
import { Card } from '@/components/Card';
import { ContainerContent } from '@/components/ContainerContent';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from '@/components/ContainerView';
import { Status } from '@/constants/Status';
import { useBaseEntity } from '@/hooks/useBaseEntity';
import { Word } from '@/models/IWord';
import { useToast } from '@/providers/ToastProvider';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';

export default function AddWord() {
    const [form, setForm] = useState(new Word());
    const toast = useToast();

    const { onAdd } = useBaseEntity({
        entity: 'Word',
        viewRoute: '/word/view-word'
    });

    const handleFormUpdate = (value: any, field: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    const onSubmit = useCallback(async (isAndNew: boolean) => {
        if (!form.nativeWord) {
            toast.show('Please enter a word', Status.Error);
            return;
        }

        const result = await onAdd(form);

        if (result?.ok) {
            if (isAndNew) {
                setForm(new Word());
            }
            else {
                router.navigate(`/word/view-word?id=${result.data.id}`);
            }
        }
    }, [onAdd, form, setForm, router])

    useFocusEffect(
        useCallback(() => {
            setForm(new Word());
        }, [setForm])
    )

    return (
        <ContainerView>
            <ContainerDrawer title='Add a new word' />
            <ContainerContent>
                <Card>
                    <CancelSubmitButton onSubmit={() => onSubmit(false)} onSubmitAndNewAction={() => onSubmit(true)} />
                </Card>
                <ScrollView className='w-full h-full'>
                    <AddEditWord form={form} handleFormUpdate={handleFormUpdate} />
                </ScrollView>
            </ContainerContent>
        </ContainerView>
    );
}