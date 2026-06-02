import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export function Logo(props: { textSize?: string }) {
    return (
        <View className='flex-row items-center'>
            <MaterialIcons className='pr-2' name="school" size={25} color="#d4fd52" />
            <Text className={`text-white text-${props.textSize ?? '3xl'} md:text-3xl font-semibold tracking-tighter`}>
                Wort
            </Text>
            <Text className={`text-accent text-${props.textSize ?? '3xl'} md:text-3xl font-bold tracking-tighter`}>
                ki
            </Text>
            <Text className={`text-white text-${props.textSize ?? '3xl'} md:text-3xl tracking-tighter`}>
                ste
            </Text>
        </View>
    );
}