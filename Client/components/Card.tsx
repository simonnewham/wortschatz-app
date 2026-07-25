import { MaterialIcons } from "@expo/vector-icons";
//import { useTheme } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import { Text, View } from "react-native";

interface ICardProps {
    className?: string,
    backgroundColour?: string,
    title?: string,
    icon?: any
}

export function Card(props: PropsWithChildren<ICardProps>) {
    return <View className={"p-1 mt-2 mb-2 w-full rounded-lg bg-card border-accent shadow-sm shadow-accent border-2 " + props.className}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            {props.icon && <MaterialIcons className="text-primary" name={props.icon} size={24} />}
            {props.title &&
                <Text className="text-primary" style={{ fontSize: 24, marginBottom: 5 }}>{props.title}</Text>
            }</View>
        <View className="w-full">
            {props.children}
        </View>
    </View>
};