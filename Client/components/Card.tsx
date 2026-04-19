import { useStyling } from "@/hooks/useStyling";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import { Text, View, useColorScheme } from "react-native";

interface ICardProps {
    className?: string,
    backgroundColour?: string,
    title?: string,
    icon?: any
}

export function Card(props: PropsWithChildren<ICardProps>) {
    const colorScheme = useColorScheme();
    const theme = useTheme();
    const styles = useStyling();

    return <View className={props.className + " rounded-md bg-neutral-50 shadow-md shadow-gray"} 
    style={[styles.cardContainer]}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            {props.icon && <MaterialIcons name={props.icon} size={24} color={theme.colors.text} />}
            {props.title &&
                <Text style={{ color: theme.colors.text, fontSize: 24, marginBottom: 5 }}>{props.title}</Text>
            }</View>
        <View>
            {props.children}
        </View>
    </View>
};