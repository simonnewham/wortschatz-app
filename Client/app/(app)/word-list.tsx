import { WordListItem } from "@/components/WordListItem";
import { useStyling } from "@/hooks/useStyling";
import baseEntityDataService from '@/services/BaseEntityDataService';
import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import Drawer from "expo-router/drawer";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, View } from "react-native";
import { WordListDto } from "../../models/IWord";

export default function WordList() {
    const styles = useStyling();
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
        <View className="bg-gradient-to-r from-zinc-700 to-zinc-950" style={[styles.container]}>
            <Drawer.Screen
                options={{
                    headerTitle: 'Wortschatz',
                    headerLeft: () => (
                        <Pressable className='p-2' onPress={() => router.back()}>
                            <MaterialIcons name="arrow-back" size={20} color="black" />
                        </Pressable>
                    )
                }} />
            <View className="'rounded-md flex-1 w-full justify-center" style={{ width: '95%' }}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0284c7" />
                ) : (
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) =>
                            <WordListItem onDelete={onDelete} item={item} index={index} />
                        }
                    />
                )}
            </View>
        </View>
    )
}
