import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { IWordListItem } from '../models/IWordListItem';
import { Text } from './Themed';
import { WordCategory } from "../constants/WordCategory";

export function WordListItem(props: IWordListItem) {
    const theme = useTheme();

    const styles = useMemo(() => {
        return StyleSheet.create({
            text: {
                fontSize: 14,
                color: theme.colors.text
            },
            rowContainer: {
                padding: 10
            },
            row: {
                flexDirection: 'row',
                flex: 2,
            },
            rowItem: {
                flex: 1,
            }
        });
    }, []);

    const title = (word: string, gender?: string) => {
        return <Text style={styles.text} >{`${word} ${!!gender ? `(${gender})` : ''}`}</Text>
    }

    return (
        <View style={styles.rowContainer}>
            <Pressable onPress={() => alert('Test')}>
                <View style={styles.row}>
                    <View style={styles.rowItem}>
                        {title(props.nativeWord, props.nativeWordGender)}
                    </View>
                    <View style={styles.rowItem}>
                        {title(props.translateWord, props.translateWordGender)}
                    </View>

                </View>
                <View>
                    <Text style={styles.text}>{WordCategory.GetDescription(props.nativeWordCategory)}</Text>
                </View>
                <View>
                    <Text style={styles.text} >Tags: {props.tags}</Text>
                </View>
            </Pressable>
        </View>
    )
}
