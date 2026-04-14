import { WordListItem } from "@/components/WordListItem";
import { useStyling } from "@/hooks/useStyling";
import bseEntityDataService from '@/services/BaseEntityDataService';
import { Stack } from 'expo-router';
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { WordListDto } from "../../models/IWord";

export default function WordList() {
    const styles = useStyling();
    const [data, setData] = useState<WordListDto[]>([]);

    useEffect(() => {
        const fetchWords = async () => {
            const result = await bseEntityDataService.GetList('Word');
            if (result.ok) {
                const list = await result.json();
                setData(list);
            }
            else {

            }
        }
        fetchWords();
    }, []);


    return (
        <View style={[styles.container]}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: 'Wortschatz'
                }}
            />
            <View style={{ flex: 9, flexGrow: 10 }}>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) =>
                        <WordListItem item={item} index={index} />
                    }
                />
            </View>
        </View>
    )
}
