import { useStyling } from "@/hooks/useStyling";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import { Text, View, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

interface ICardProps {
    backgroundColour?: string,
    title?: string,
    icon?: any
}

export function Card(props: PropsWithChildren<ICardProps>) {
    const colorScheme = useColorScheme();
    const theme = useTheme();
    const styles = useStyling();

    return <View style={[styles.cardContainer,
    { backgroundColor: props.backgroundColour ?? Colors[colorScheme ?? 'light'].card, shadowColor: Colors[colorScheme ?? 'light'].cardShadow }]}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            {props.icon && <MaterialIcons name={props.icon} size={30} color={theme.colors.text} />}
            {props.title &&
                <Text style={{ color: theme.colors.text, fontSize: 30, marginBottom: 5 }}>{props.title}</Text>
            }</View>
        <View>
            {props.children}
        </View>
    </View>
};