import { Theme, useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { ColorSchemeName, Pressable, StyleSheet, View, useColorScheme } from "react-native";
import { Colors } from "../constants/styles";
import { IPhrase } from "../models/IPhrase";
import { Text } from './Themed';

export interface IPhraseListItemProps {
    item: IPhrase,
    index: number
}

export function PhraseListItem(props: IPhraseListItemProps) {
    const colorScheme = useColorScheme();
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme, props.index, colorScheme), []);

    return (
        <View style={styles.rowContainer}>
            <Pressable onPress={() => alert('Test')}>
                <View style={styles.row}>
                    <View style={styles.rowItem}>
                        <Text style={styles.text}>{props.item.nativePhrase}</Text>
                    </View>
                    <View style={styles.rowItem}>
                        <Text style={styles.text}>{props.item.translatePhrase}</Text>
                    </View>
                    <View style={styles.rowItem}>
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
