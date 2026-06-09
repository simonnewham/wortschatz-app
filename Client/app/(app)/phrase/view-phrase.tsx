import { AddEditPhrase } from '@/components/AddEditPhrase';
import { CancelSubmitButton } from '@/components/CancelSubmitButton';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from '@/components/ContainerView';
import { PageToolbar } from '@/components/PageToolbar';
import { useBaseEntity } from '@/hooks/useBaseEntity';
import { Phrase } from '@/models/IPhrase';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { Card } from '../../../components/Card';
import { ContainerContent } from '../../../components/ContainerContent';

export default function ViewPhrase() {
    const searchParams = useLocalSearchParams();

    const id = useMemo(() => Array.isArray(searchParams.id) ? searchParams.id[0] : searchParams.id, [searchParams.id]);

    const [phrase, setPhrase] = useState<Phrase | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { onUpdate, onDelete, onDetail, onEnhance } = useBaseEntity({
        entity: 'Phrase',
        viewRoute: '/(app)/phrase/view-phrase'
    });

    const handleFormUpdate = (value: string, field: string) => {
        setPhrase(prev => prev ? { ...prev, [field]: value } : null);
    }

    const fetchPhrase = useCallback(async (id?: string) => {
        if (id) {
            setIsLoading(true);
            try {
                const data = await onDetail(id);
                if (data) {
                    setError(null);
                    setPhrase(data);
                } else {
                    setError('Failed to load phrase details.');
                }
            } catch {
                setError('An error occurred while loading the phrase.');
            } finally {
                setIsLoading(false);
            }
        }
    }, [onDetail]);

    const onSubmit = useCallback(async () => {
        const result = await onUpdate(phrase);
        if (result.ok) {
            fetchPhrase(phrase?.id);
        }
    }, [onUpdate, phrase, fetchPhrase]);

    const onEnhancePhrase = useCallback(async () => {
        const result = await onEnhance({ wordId: phrase?.id, word: phrase?.nativePhrase });
        if (result.ok && result.data) {
            fetchPhrase(phrase?.id);
        }
    }, [onEnhance, phrase, fetchPhrase]);

    const onDeletePhrase = useCallback(async () => {
        const result = await onDelete(phrase?.id);
        if (result) {
            router.replace('/phrase/phrase-list');
        }
    }, [phrase, onDelete]);

    useFocusEffect(
        useCallback(() => {
            if (id) {
                fetchPhrase(id);
            }
        }, [id, fetchPhrase])
    );

    return (
        <ContainerView>
            <ContainerDrawer title='View Phrase' />
            <ContainerContent>
                <PageToolbar icon='menu-book' title='View Phrase' showBackButton={true} />
                {isLoading ? (
                    <ActivityIndicator className='p-10' size="large" color="#d4fd52" />
                ) : error ? (
                    <Text className="text-red-500 font-bold p-4">{error}</Text>
                ) : phrase ? (
                    <View className="w-full h-full items-center">
                        <Card className='border-gray-100'>
                            <CancelSubmitButton
                                submitText='Save'
                                submitIcon='save' onSubmit={onSubmit}
                                onDelete={onDeletePhrase}
                                onEnhance={onEnhancePhrase}
                                onCancel={() => router.replace('/phrase/phrase-list')} />
                        </Card>
                        <ScrollView className='w-full'>
                            <AddEditPhrase form={phrase} handleFormUpdate={handleFormUpdate} />
                        </ScrollView>
                    </View>
                ) : (
                    <Text className="text-zinc-500">Phrase not found.</Text>
                )}
            </ContainerContent>
        </ContainerView>
    );
}
