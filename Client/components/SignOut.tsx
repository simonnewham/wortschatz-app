import { useStyling } from "@/hooks/useStyling";
import { useAuthSession } from "@/providers/AuthProvider";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { Text } from './Themed';

export function SignOut() {
    const { logout } = useAuthSession();
    const styles = useStyling();

    const onSignOut = async () => {
        logout().then(() => router.replace('/login'));
    }

    return (
        <View style={[styles.headerContainer]}>
            <Pressable style={[styles.headerButton]} onPress={onSignOut}>
                <MaterialIcons name="logout" size={24} color="gray" />
                <Text style={[styles.text, { margin: 'auto' }]}>Sign Out</Text>
            </Pressable>
        </View>
    )
}
