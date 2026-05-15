import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from "@/components/ContainerView";
import { PageToolbar } from "@/components/PageToolbar";
import { WordListItem } from "@/components/WordListItem";
import baseEntityDataService from '@/services/BaseEntityDataService';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
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

    const onDelete = useCallback(async (item: WordListDto) => {
        if (item.id) {
            const result = await baseEntityDataService.Delete('Word', item.id);
            if (result.ok) {
                fetchWords()
            }
        }
    }, [baseEntityDataService]);

    useEffect(() => {
        fetchWords();
    }, []);

    return (
        <ContainerView>
            <ContainerDrawer title='Wortschatz' />
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
                                <WordListItem onDelete={onDelete} item={item} index={index} />
                            }
                        />
                    </View>
                )
                }
            </ContainerContent>
        </ContainerView >
    )
}
