import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from "@/components/ContainerView";
import { PageToolbar } from "@/components/PageToolbar";
import { DiaryEntryListItem } from "@/components/DiaryEntryListItem";
import baseEntityDataService from '@/services/BaseEntityDataService';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, View } from "react-native";
import { ContainerContent } from "../../../components/ContainerContent";
import { DiaryEntryListDto } from "../../../models/IDiaryEntry";

export default function DiaryEntryList() {
    const [data, setData] = useState<DiaryEntryListDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchEntries = useCallback(async (currentSearch: string = '', currentDate: string | null = null) => {
        setIsLoading(true);
        const filters: string[] = [];

        const safeSearch = currentSearch.replace(/'/g, "''").toLowerCase();
        if (safeSearch) {
            filters.push(`contains(tolower(title), '${safeSearch}') or contains(tolower(entry), '${safeSearch}')`);
        }

        if (currentDate) {
            const next = new Date(currentDate);
            filters.push(`CreatedDate eq ${next.toISOString()}`);
        }

        const queryParams = filters.length > 0 ? `$filter=${filters.join(' and ')}` : undefined;

        const result = await baseEntityDataService.GetList('DiaryEntry', queryParams);
        if (result.ok) {
            const list = await result.json();
            setData(list);
        }
        setIsLoading(false);
    }, [baseEntityDataService]);

    useFocusEffect(
        useCallback(() => {
            fetchEntries();
        }, [fetchEntries])
    );

    const handleSearchChange = (searchQuery: { searchTerm: string, searchDate: string }) => {
        fetchEntries(searchQuery.searchTerm, searchQuery.searchDate);
    };

    return (
        <ContainerView>
            <ContainerDrawer title='Diary Entries' />
            <ContainerContent>
                <View className="w-full h-full">
                    <PageToolbar
                        icon="book"
                        title="Diary Entries"
                        actionLabel="New Entry"
                        actionIcon="add"
                        action={() => router.navigate('/diary-entry/add-diary-entry')}
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
                                <Pressable onPress={() => item.id && router.navigate(`/diary-entry/view-diary-entry?id=${item.id}`)}>
                                    <DiaryEntryListItem item={item} index={index} />
                                </Pressable>
                            }
                        />
                    )}
                </View>
            </ContainerContent>
        </ContainerView >
    )
}
