import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { IWordListItem } from "../models/IWordListItem";
import { WordCategory } from "../constants/WordCategory";
import { WordListItem } from "../components/WordListItem";

export default function WordList() {
    const theme = useTheme();

    const data: IWordListItem[] = useMemo(() => {
        return [
            {
                id: 1,
                nativeWord: 'entdecken',
                nativeWordGender: undefined,
                nativeWordCategory: WordCategory.Verb,
                tags: ['reisen'],
                translateWord: 'to discover',
                createdDate: new Date
            },
            {
                id: 2,
                nativeWord: 'Ausicht',
                nativeWordGender: 'die',
                nativeWordCategory: WordCategory.Noun,
                tags: ['reisen'],
                translateWord: 'View',
                createdDate: new Date
            }
        ]
    }, []);

    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                padding: 10,
                flex: 10,
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                backgroundColor: theme.colors.background
            },
            text: {
                fontSize: 14,
                color: theme.colors.text
            },
            header: {
                flexDirection: 'row',
                flex: 2,
                borderBottomWidth: 1,
                borderColor: theme.colors.text
            },
            headerItem: {
                flex: 1
            }
        });
    }, []);

    return (
        <View style={[styles.container]}>
            <View style={{flex: 1}}>
                <View style={styles.header}>
                    <View style={[styles.headerItem]}>
                        <Text style={styles.text} >German</Text>
                    </View>
                    <View style={[styles.headerItem]}>
                        <Text style={styles.text} >English</Text>
                    </View>
                </View>
            </View>
            <View style={{flex: 9, flexGrow: 10}}>
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                        <WordListItem  {...item} />
                    }
                />
            </View>
        </View>
    )

}