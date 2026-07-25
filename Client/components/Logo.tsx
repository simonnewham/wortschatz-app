import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export function Logo(props: { textSize?: string; logoSize?: number }) {
    return (
        <View className='flex-row items-center'>
            <MaterialIcons className='pr-2' name="school" size={props.logoSize ?? 25} color="#d4fd52" />
            <Text className={`text-white text-${props.textSize ?? '4xl'} font-semibold tracking-tighter`}>
                Wort
            </Text>
            <Text className={`text-[#d4fd52] text-${props.textSize ?? '4xl'} font-bold tracking-tighter`}>
                ki
            </Text>
            <Text className={`text-white text-${props.textSize ?? '4xl'} tracking-tighter`}>
                ste
            </Text>
        </View>
    );
}