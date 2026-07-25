import { AddEditNote } from '@/components/AddEditNote';
import { CancelSubmitButton } from '@/components/CancelSubmitButton';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from '@/components/ContainerView';
import { PageToolbar } from '@/components/PageToolbar';
import { useBaseEntity } from '@/hooks/useBaseEntity';
import { INote } from '@/models/INote';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Card } from '../../../components/Card';
import { ContainerContent } from '../../../components/ContainerContent';

export default function ViewNote() {
    const searchParams = useLocalSearchParams();
    const id = useMemo(() => Array.isArray(searchParams.id) ? searchParams.id[0] : searchParams.id, [searchParams.id]);

    const [note, setNote] = useState<INote>(new INote());

    const { onUpdate, onDelete, onDetail } = useBaseEntity({
        entity: 'Note',
        viewRoute: '/note/view-note'
    });

    const handleFormUpdate = (text: any, value: string) => {
        setNote(prev => ({ ...prev, [value]: text }));
    }

    const fetchNote = useCallback(async (id?: string) => {
        if (id) {
            const data = await onDetail(id);
            if (data) {
                setNote(data);
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

    const onDeleteNote = useCallback(async () => {
        const result = await onDelete(note?.id);
        if (result) {
            router.replace('/note/note-list');
        }
    }, [note]);

    useFocusEffect(
        useCallback(() => {
            if (id) {
                fetchNote(id);
            }
        }, [id, fetchNote])
    );

    return (
        <ContainerView>
            <ContainerDrawer title='View Note' />
            <ContainerContent>
                <PageToolbar icon='note' title='View Note' showBackButton={true} />
                {note &&
                    <View className="w-full h-full items-center">
                        <Card>
                            <CancelSubmitButton submitText='Save'
                                submitIcon='save'
                                onSubmit={onSubmit}
                                onDelete={onDeleteNote}
                                onCancel={() => router.replace('/note/note-list')} />
                        </Card>
                        <ScrollView className='w-full'>
                            <AddEditNote note={note} handleFormUpdate={handleFormUpdate} />
                        </ScrollView>
                    </View>}
            </ContainerContent>
        </ContainerView>
    );
}
