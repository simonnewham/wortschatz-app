import { Theme, useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { StyleSheet, View, Pressable, useColorScheme, ColorSchemeName } from "react-native";
import { IWordListItem } from '../models/IWordListItem';
import { Text } from './Themed';
import { WordCategory } from "../constants/WordCategory";
import { Colors } from "../constants/styles";

export interface IWordListItemProps {
    item: IWordListItem,
    index: number
}

export function WordListItem(props: IWordListItemProps) {
    const colorScheme = useColorScheme();
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme, props.index, colorScheme), []);

    const formatItem = (word: string, gender?: string) => {
        return <Text style={styles.text} >{`${word} ${!!gender ? `(${gender})` : ''}`}</Text>
    }

    return (
        <View style={styles.rowContainer}>
            <Pressable onPress={() => alert('Test')}>
                <View style={styles.row}>
                    <View style={styles.rowItem}>
                        {formatItem(props.item.nativeWord, props.item.nativeWordGender)}
                    </View>
                    <View style={styles.rowItem}>
                        {formatItem(props.item.translateWord, props.item.translateWordGender)}
                    </View>
                    <View style={styles.rowItem}>
                        <View>
                            <Text style={styles.text}>{WordCategory.GetDescription(props.item.nativeWordCategory)}</Text>
                        </View>
                        <View>
                            <Text style={styles.text} >Tags: {props.item.tags}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
    )
}

const getStyles = (theme: Theme, index: number, colorScheme: ColorSchemeName) => {
    return StyleSheet.create({
        text: {
            fontSize: 14,
            color: theme.colors.text
        },
        rowContainer: {
            padding: 10,
            backgroundColor: index % 2 == 0 ? Colors[colorScheme ?? 'light'].listEven : Colors[colorScheme ?? 'light'].listOdd,
            borderBottomWidth: 1
        },
        row: {
            flexDirection: 'row',
            flex: 3
        },
        rowItem: {
            flex: 1
        }
    });
};
