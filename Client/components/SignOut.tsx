import { useAuthSession } from "@/providers/SessionProvider";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from './Themed';

export function SignOut() {
    const theme = useTheme();

    const { signOut } = useAuthSession();

    const onSignOut = async () => {
        await signOut();
    }

    const styles = useMemo(() => {
        return StyleSheet.create({
            buttonContainer: {
                marginRight: 20
            },
            button: {
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 4,
                flexDirection: 'row',
                gap: 10,
                paddingHorizontal: 20,
                paddingVertical: 7,
            },
            text: {
                fontSize: 15,
                color: theme.colors.text
            }
        });
    }, []);

    return (
        <View style={[styles.buttonContainer]}>
            <Pressable style={[styles.button]} onPress={onSignOut}>
                <MaterialIcons name="logout" size={24} color="gray" />
                <Text style={[styles.text, { margin: 'auto' }]}>Sign Out</Text>
            </Pressable>
        </View>
    )
}
