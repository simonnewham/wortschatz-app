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
    ;

    const [isLoading, setIsLoading] = useState(false);

    const fetchWords = useCallback(async (currentSearch: string = '', currentDate: string | null = null) => {
        setIsLoading(true);
        const filters: string[] = [];

        const safeSearch = currentSearch.replace(/'/g, "''").toLowerCase();
        if (safeSearch) {
            filters.push(`contains(tolower(NativeWord), '${safeSearch}')`);
        }

        if (currentDate) {
            const next = new Date(currentDate);
            filters.push(`CreatedDate eq ${next.toISOString()}`);
        }

        const queryParams = filters.length > 0 ? `$filter=${filters.join(' and ')}` : undefined;

        const result = await baseEntityDataService.GetList('Word', queryParams);
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

    const handleSearchChange = (searchQuery: { searchTerm: string, searchDate: string }) => {
        fetchWords(searchQuery.searchTerm, searchQuery.searchDate);
    };

    return (
        <ContainerView>
            <ContainerDrawer title='Word list' />
            <ContainerContent>
                <View className="w-full h-full">
                    <PageToolbar
                        icon="view-list"
                        title="Word List"
                        actionLabel="Add a new word"
                        actionIcon="add"
                        action={() => router.navigate('/word/add-word')}
                        onSearchChange={handleSearchChange}
                    />
                    {isLoading ? (
                        <ActivityIndicator className='p-10' size="large" color="#d4fd52" />
                    ) : (
                        <FlatList
                            showsVerticalScrollIndicator={true}
                            scrollEnabled={true}
                            className="w-full"
                            data={data}
                            renderItem={({ item, index }) =>
                                <Pressable onPress={() => item.id && router.navigate(`/word/view-word?id=${item.id}`)}>
                                    <WordListItem item={item} index={index} />
                                </Pressable>
                            }
                        />
                    )}
                </View>
            </ContainerContent>
        </ContainerView >
    )
}

