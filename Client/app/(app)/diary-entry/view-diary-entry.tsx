import { AddEditDiaryEntry } from '@/components/AddEditDiaryEntry';
import { CancelSubmitButton } from '@/components/CancelSubmitButton';
import { Card } from '@/components/Card';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from '@/components/ContainerView';
import { PageToolbar } from '@/components/PageToolbar';
import { useBaseEntity } from '@/hooks/useBaseEntity';
import { useEntityState } from '@/hooks/useEntityState';
import { DiaryEntry } from '@/models/IDiaryEntry';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ContainerContent } from '../../../components/ContainerContent';

export default function ViewDiaryEntry() {
    const searchParams = useLocalSearchParams();

    const id = useMemo(() => Array.isArray(searchParams.id) ? searchParams.id[0] : searchParams.id, [searchParams.id]);

    const { entityState, handleFormUpdate, setEntity, clearEntity } = useEntityState<DiaryEntry>();

    const { onUpdate, onDelete, onDetail } = useBaseEntity({
        entity: 'DiaryEntry',
        viewRoute: '/(app)/diary-entry/view-diary-entry'
    });

    const fetchEntry = useCallback(async (id?: string) => {
        if (id) {
            const data = await onDetail(id);
            if (data) setEntity(data);
        }
    }, [onDetail, setEntity]);

    const onSubmit = useCallback(async () => {
        const result = await onUpdate(entityState.current);
        if (result.ok) {
            fetchEntry(entityState.current?.id);
        }
    }, [onUpdate, entityState.current, fetchEntry]);

    const onDeleteEntry = useCallback(async () => {
        const result = await onDelete(entityState.current?.id);
        if (result) {
            clearEntity();
            router.replace('/diary-entry/diary-entry-list');
        }
    }, [entityState.current]);

    useFocusEffect(
        useCallback(() => {
            if (id) {
                clearEntity();
                fetchEntry(id);
            }
        }, [id, fetchEntry, clearEntity])
    );

    return (
        <ContainerView>
            <ContainerDrawer title='View Diary Entry' />
            <ContainerContent>
                <PageToolbar icon='book' title='View Diary Entry' showBackButton={true} />
                {entityState.current ? (
                    <View className="w-full h-full items-center ">
                        <Card>
                            <CancelSubmitButton submitText='Save'
                                onSubmit={onSubmit}
                                onDelete={onDeleteEntry}
                                onCancel={() => router.replace('/diary-entry/diary-entry-list')}
                                submitIcon='save' />
                        </Card>
                        <ScrollView className='w-full'>
                            <AddEditDiaryEntry form={entityState.current} handleFormUpdate={handleFormUpdate} />
                        </ScrollView>
                    </View>
                ) : (
                    <Text className="text-zinc-500">Diary entry not found.</Text>
                )}
            </ContainerContent>
        </ContainerView>
    );
}
