import { AddEditPhrase } from '@/components/AddEditPhrase';
import { CancelSubmitButton } from '@/components/CancelSubmitButton';
import { Card } from '@/components/Card';
import { ContainerContent } from '@/components/ContainerContent';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from '@/components/ContainerView';
import { Status } from '@/constants/Status';
import { useBaseEntity } from '@/hooks/useBaseEntity';
import { Phrase } from '@/models/IPhrase';
import { useToast } from '@/providers/ToastProvider';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';

export default function AddPhrase() {
    const [form, setForm] = useState<Phrase>(new Phrase());
    const toast = useToast();

    const { onAdd } = useBaseEntity({
        entity: 'Phrase',
        viewRoute: '/phrase/view-phrase'
    });

    const handleFormUpdate = (text: string, value: string) => {
        setForm(prev => ({ ...prev, [value]: text }));
    }

    const onSubmit = useCallback(async (isAndNew: boolean) => {
        if (!form.nativePhrase) {
            toast.show('Please enter a native phrase.', Status.Error);
            return;
        }

        const result = await onAdd(form);

        if (result?.ok) {
            if (isAndNew) {
                setForm(new Phrase());
            }
            else {
                router.navigate(`/phrase/view-phrase?id=${result.data.id}`);
            }
        }
    }, [onAdd, form, setForm, toast]);

    useFocusEffect(
        useCallback(() => {
            setForm(new Phrase());
        }, [setForm])
    );

    return (
        <ContainerView>
            <ContainerDrawer title='Add a new phrase' />
            <ContainerContent>
                <Card>
                    <CancelSubmitButton onSubmit={() => onSubmit(false)} onSubmitAndNewAction={() => onSubmit(true)} />
                </Card>
                <ScrollView className="flex-col h-full p-2 max-w-full w-full">
                    <AddEditPhrase form={form} handleFormUpdate={handleFormUpdate} />
                </ScrollView>
            </ContainerContent>
        </ContainerView >
    );
}
