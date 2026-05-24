import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export function PageToolbar(props: { title: string, icon: string, showBackButton?: boolean, actionLabel?: string, actionIcon?: string, action?: () => void }) {
    return (
        <View className="flex-row justify-between w-full p-2 border-b-2 border-gray-200">
            <View className="flex-row gap-2 p-2 items-center">
                {props.showBackButton && <Pressable onPress={() => router.back()} >
                    <MaterialIcons name="arrow-back" size={20} color="black" />
                </Pressable>}
                <Text className="font-sans text-black text-xl">{props.title}</Text>
            </View>
            {props.actionLabel && <View>
                <Pressable onPress={props.action} className="p-2 rounded-md bg-accent flex-row justify-center items-center" >
                    <MaterialIcons name={props.actionIcon as any} size={20} color="black" />
                    <Text className="font-sans text-black">{props.actionLabel}</Text>
                </Pressable>
            </View>}
        </View>
    )
}