import { useTheme } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { Colors } from "../constants/styles";

interface ICardProps {
    backgroundColour?: string,
    title?: string
}

export function Card(props: PropsWithChildren<ICardProps>) {
    const colorScheme = useColorScheme();
    const theme = useTheme();

    return <View style={[styles.container,
    { backgroundColor: props.backgroundColour ?? Colors[colorScheme ?? 'light'].card, shadowColor: Colors[colorScheme ?? 'light'].cardShadow }]}>
        {props.title &&
            <Text style={{ color: theme.colors.text, fontSize: 14, margin: 5 }}>{props.title}</Text>
        }
        <View>
            {props.children}
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        padding: 10,
        width: 720,
        maxWidth: '100%',
        marginVertical: 10,
        shadowOffset: { width: 5, height: 5 }
    }
});