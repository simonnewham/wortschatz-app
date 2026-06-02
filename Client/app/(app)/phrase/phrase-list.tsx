import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from "@/components/ContainerView";
import { PageToolbar } from "@/components/PageToolbar";
import { PhraseListItem } from "@/components/PhraseListItem";
import baseEntityDataService from '@/services/BaseEntityDataService';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, View } from "react-native";
import { ContainerContent } from "../../../components/ContainerContent";
import { Phrase } from "../../../models/IPhrase";

export default function PhraseList() {
    const [data, setData] = useState<Phrase[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPhrases = useCallback(async () => {
        setIsLoading(true);
        const result = await baseEntityDataService.GetList('Phrase');
        if (result.ok) {
            const list = await result.json();
            setData(list);
        }
        setIsLoading(false);
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchPhrases();
        }, [fetchPhrases])
    );

    return (
        <ContainerView>
            <ContainerDrawer title='Phrase list' />
            <ContainerContent>
                {isLoading ? (
                    <ActivityIndicator className='p-10' size="large" color="#d4fd52" />
                ) : (
                    <View className="w-full h-screen">
                        <PageToolbar icon="view-list" title="Phrase List" actionLabel="Add a new phrase" actionIcon="add"
                            action={() => router.navigate('/phrase/add-phrase')} />
                        <FlatList
                            showsVerticalScrollIndicator={true}
                            scrollEnabled={true}
                            className="w-full pb-4"
                            data={data}
                            renderItem={({ item, index }) =>
                                <Pressable onPress={() => item.id && router.navigate(`/phrase/view-phrase?id=${item.id}`)}>
                                    <PhraseListItem item={item} index={index} />
                                </Pressable>
                            }
                        />
                    </View>
                )}
            </ContainerContent>
        </ContainerView>
    );
}
