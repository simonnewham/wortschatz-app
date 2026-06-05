import { MaterialIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";

export function PageToolbar(props: { title: string, icon: string, showBackButton?: boolean, actionLabel?: string, actionIcon?: string, action?: () => void }) {
    const dimensions = useWindowDimensions();
    const isDesktop = useMemo(() => dimensions.width >= 1024, [dimensions.width]);

    return (
        <View className="flex-row justify-between w-full">
            {/* {isDesktop && <View className="flex-row gap-2 p-2 items-center">
                {props.showBackButton && <Pressable onPress={() => router.back()} >
                    <MaterialIcons name="arrow-back" size={18} color="black" />
                </Pressable>}
                <Text className="text-black text-lg font-semibold">{props.title}</Text>
            </View>} */}
            {props.actionLabel && <View>
                <Pressable onPress={props.action} className="p-2 rounded-md bg-accent flex-row justify-center items-center" >
                    <MaterialIcons name={props.actionIcon as any} className="animate-pulse" size={20} color="black" />
                    <Text className="font-semibold text-black">{props.actionLabel}</Text>
                </Pressable>
            </View>}
        </View>
    )
}