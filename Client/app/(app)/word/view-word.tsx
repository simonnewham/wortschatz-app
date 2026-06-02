import { AddEditWord } from '@/components/AddEditWord';
import { CancelSubmitButton } from '@/components/CancelSubmitButton';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from '@/components/ContainerView';
import { PageToolbar } from '@/components/PageToolbar';
import { useBaseEntity } from '@/hooks/useBaseEntity';
import { Word } from '@/models/IWord';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Card } from '../../../components/Card';
import { ContainerContent } from '../../../components/ContainerContent';

export default function ViewWord() {
    const searchParams = useLocalSearchParams();

    const id = useMemo(() => Array.isArray(searchParams.id) ? searchParams.id[0] : searchParams.id, [searchParams.id]);

    const [word, setWord] = useState<Word | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { onUpdate, onDelete, onDetail, onEnhance } = useBaseEntity({
        entity: 'Word',
        viewRoute: '/(app)/word/view-word'
    });

    const handleFormUpdate = (value: string, field: string) => {
        setWord(prev => prev ? { ...prev, [field]: value } : null);
    }

    const fetchWord = useCallback(async (id?: string) => {
        if (id) {
            try {
                const data = await onDetail(id);
                if (data) {
                    setError(null);
                    setWord(data);
                } else {
                    setError('Failed to load word details.');
                }
            } catch {
                setError('An error occurred while loading the word.');
            }
        }
    }, [onDetail]);

    const onSubmit = useCallback(async () => {
        const result = await onUpdate(word);
        if (result.ok) {
            fetchWord(word?.id);
        }
    }, [onUpdate, word, fetchWord]);

    const onEnhanceWord = useCallback(async () => {
        setIsEnhancing(true);
        const result = await onEnhance({ wordId: word?.id, word: word?.nativeWord });
        setIsEnhancing(false);

        if (result.ok && result.data) {
            fetchWord(word?.id);
        }
    }, [onEnhance, word]);

    useEffect(() => {
        if (id) {
            fetchWord(id);
        }
    }, [id]);

    return (
        <ContainerView>
            <ContainerDrawer title='View Word' />
            <ContainerContent>
                <PageToolbar icon='menu-book' title='View Word' showBackButton={true} />
                {isLoading ? (
                    <ActivityIndicator className='p-10' size="large" color="#d4fd52" />
                ) : error ? (
                    <Text className="text-red-500 font-bold p-4">{error}</Text>
                ) : word ? (
                    <View className="w-full h-screen items-center">
                        <Card className='border-gray-100'>
                            <CancelSubmitButton submitText='Save' onSubmit={onSubmit} onDelete={() => onDelete(word.id)} onEnhance={onEnhanceWord} isEnhancing={isEnhancing} />
                        </Card>
                        <ScrollView className='w-full'>
                            <AddEditWord form={word} handleFormUpdate={handleFormUpdate} />
                        </ScrollView>
                    </View>
                ) : (
                    <Text className="text-zinc-500">Word not found.</Text>
                )}
            </ContainerContent>
        </ContainerView>
    );
}
