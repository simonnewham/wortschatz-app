import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import { Text, View } from "react-native";

interface ICardProps {
    className?: string,
    backgroundColour?: string,
    title?: string,
    icon?: any
}

export function Card(props: PropsWithChildren<ICardProps>) {
    const theme = useTheme();

    return <View className={props.className + " p-1 mt-2 mb-2 w-full rounded-lg bg-neutral-100 shadow-sm shadow-gray border-2"}>
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