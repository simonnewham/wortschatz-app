import { AddEditDiaryEntry } from '@/components/AddEditDiaryEntry';
import { CancelSubmitButton } from '@/components/CancelSubmitButton';
import { Card } from '@/components/Card';
import { ContainerContent } from '@/components/ContainerContent';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from '@/components/ContainerView';
import { Status } from '@/constants/Status';
import { useBaseEntity } from '@/hooks/useBaseEntity';
import { DiaryEntry } from '@/models/IDiaryEntry';
import { useToast } from '@/providers/ToastProvider';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';

export default function AddDiaryEntry() {
    const [form, setForm] = useState(new DiaryEntry());
    const toast = useToast();

    const { onAdd } = useBaseEntity({
        entity: 'DiaryEntry',
        viewRoute: '/diary-entry/view-diary-entry'
    });

    const handleFormUpdate = (value: any, field: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    const onSubmit = useCallback(async (isAndNew: boolean) => {
        if (!form.title) {
            toast.show('Please enter a title', Status.Error);
            return;
        }

        const result = await onAdd(form);

        if (result?.ok) {
            if (isAndNew) {
                setForm(new DiaryEntry());
            }
            else {
                router.navigate(`/diary-entry/view-diary-entry?id=${result.data.id}`);
            }
        }
    }, [onAdd, form, setForm, router]);

    useFocusEffect(
        useCallback(() => {
            setForm(new DiaryEntry());
        }, [setForm])
    );

    return (
        <ContainerView>
            <ContainerDrawer title='Add a new diary entry' />
            <ContainerContent>
                <Card>
                    <CancelSubmitButton onSubmit={() => onSubmit(false)} />
                </Card>
                <ScrollView className='w-full h-full'>
                    <AddEditDiaryEntry form={form} handleFormUpdate={handleFormUpdate} />
                </ScrollView>
            </ContainerContent>
        </ContainerView>
    );
}
