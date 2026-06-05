import { AddEditWord } from '@/components/AddEditWord';
import { CancelSubmitButton } from '@/components/CancelSubmitButton';
import { Card } from '@/components/Card';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from '@/components/ContainerView';
import { PageToolbar } from '@/components/PageToolbar';
import { useBaseEntity } from '@/hooks/useBaseEntity';
import { useEntityState } from '@/hooks/useEntityState';
import { Word } from '@/models/IWord';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ContainerContent } from '../../../components/ContainerContent';

export default function ViewWord() {
    const searchParams = useLocalSearchParams();

    const id = useMemo(() => Array.isArray(searchParams.id) ? searchParams.id[0] : searchParams.id, [searchParams.id]);

    const { entityState, handleFormUpdate, hasChanges, setEntity, clearEntity } = useEntityState<Word>();
    const [isEnhancing, setIsEnhancing] = useState(false);

    const { onUpdate, onDelete, onDetail, onEnhance } = useBaseEntity({
        entity: 'Word',
        viewRoute: '/(app)/word/view-word'
    });

    const fetchWord = useCallback(async (id?: string) => {
        if (id) {
            const data = await onDetail(id);
            if (data) setEntity(data);
        }
    }, [onDetail, setEntity]);

    const onSubmit = useCallback(async () => {
        const result = await onUpdate(entityState.current);
        if (result.ok) {
            fetchWord(entityState.current?.id);
        }
    }, [onUpdate, entityState.current, fetchWord]);

    const onEnhanceWord = useCallback(async () => {
        setIsEnhancing(true);
        const result = await onEnhance({ wordId: entityState.current?.id, word: entityState.current?.nativeWord });
        setIsEnhancing(false);

        if (result.ok && result.data) {
            fetchWord(entityState.current?.id);
        }
    }, [onEnhance, entityState.current, fetchWord]);

    useEffect(() => {
        if (id) {
            clearEntity();
            fetchWord(id);
        }
    }, [id, fetchWord, clearEntity]);

    return (
        <ContainerView>
            <ContainerDrawer title='View Word' />
            <ContainerContent>
                <PageToolbar icon='menu-book' title='View Word' showBackButton={true} />
                {entityState.current ? (
                    <View className="w-full h-screen items-center ">
                        <Card className='border-gray-100'>
                            <CancelSubmitButton submitText='Save'
                                onSubmit={onSubmit}
                                onDelete={() => onDelete(entityState?.current?.id)}
                                onEnhance={onEnhanceWord}
                                onCancel={() => router.replace('/word/word-list')}
                                isEnhancing={isEnhancing}
                                submitIcon='save' />
                        </Card>
                        <ScrollView className='w-full pb-20'>
                            <AddEditWord form={entityState.current} handleFormUpdate={handleFormUpdate} />
                        </ScrollView>
                    </View>
                ) : (
                    <Text className="text-zinc-500">Word not found.</Text>
                )}
            </ContainerContent>
        </ContainerView>
    );
}
