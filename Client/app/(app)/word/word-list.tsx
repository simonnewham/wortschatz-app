import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from "@/components/ContainerView";
import { PageToolbar } from "@/components/PageToolbar";
import { WordListItem } from "@/components/WordListItem";
import baseEntityDataService from '@/services/BaseEntityDataService';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, View } from "react-native";
import { ContainerContent } from "../../../components/ContainerContent";
import { WordListDto } from "../../../models/IWord";

export default function WordList() {
    const [data, setData] = useState<WordListDto[]>([]);

    const [isLoading, setIsLoading] = useState(false);

    const fetchWords = useCallback(async () => {
        setIsLoading(true);
        const result = await baseEntityDataService.GetList('Word');
        if (result.ok) {
            const list = await result.json();
            setData(list);
        }
        setIsLoading(false);
    }, [baseEntityDataService]);

    useFocusEffect(
        useCallback(() => {
            fetchWords();
        }, [fetchWords])
    );

    return (
        <ContainerView>
            <ContainerDrawer title='Word list' />
            <ContainerContent>
                {isLoading ? (
                    <ActivityIndicator className='p-10' size="large" color="#d4fd52" />
                ) : (
                    <View className="w-full">
                        <PageToolbar icon="view-list" title="Word List" actionLabel="Add a new word" actionIcon="add"
                            action={() => router.navigate('/word/add-word')} />
                        <FlatList
                            className="w-full"
                            data={data}
                            renderItem={({ item, index }) =>
                                <Pressable onPress={() => item.id && router.navigate(`/word/view-word?id=${item.id}`)}>
                                    <WordListItem item={item} index={index} />
                                </Pressable>
                            }
                        />
                    </View>
                )
                }
            </ContainerContent>
        </ContainerView >
    )
}
