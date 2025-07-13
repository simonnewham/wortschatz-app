import { useStyling } from "@/hooks/useStyling";
import { useTheme } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import { Text, View, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

interface ICardProps {
    backgroundColour?: string,
    title?: string
}

export function Card(props: PropsWithChildren<ICardProps>) {
    const colorScheme = useColorScheme();
    const theme = useTheme();
    const styles = useStyling();

    return <View style={[styles.cardContainer,
    { backgroundColor: props.backgroundColour ?? Colors[colorScheme ?? 'light'].card, shadowColor: Colors[colorScheme ?? 'light'].cardShadow }]}>
        {props.title &&
            <Text style={{ color: theme.colors.text, fontSize: 22, marginBottom: 5 }}>{props.title}</Text>
        }
        <View>
            {props.children}
        </View>
    </View>
};