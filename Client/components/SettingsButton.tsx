import { useStyling } from "@/hooks/useStyling";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

export function SettingsButton() {
    const styles = useStyling();

    return (
        <View style={[styles.headerContainer]}>
            <Pressable style={[styles.headerButton]} onPress={() => router.push('/settings')}>
                <MaterialIcons name="settings" size={24} color="gray" />
            </Pressable>
        </View>
    )
}
