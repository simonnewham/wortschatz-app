import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export function Logo(props: { textSize?: string }) {
    return (
        <View className='flex-row items-center'>
            <MaterialIcons className='rotate-45' name="school" size={24} color="#d4fd52" />
            <Text className={`pl-2 text-white text-${props.textSize ?? '3xl'} md:text-3xl font-extrabold tracking-tighter`}>
                Wort
            </Text>
            <Text className={`text-accent text-${props.textSize ?? '3xl'} md:text-3xl font-bold tracking-tighter`}>
                schatz
            </Text>
        </View>
    );
}