import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from './Themed';

export function SignOut() {
    const theme = useTheme();

    const onSignOut = () => {
       // auth.signOut().then(() => router.replace('/'));
    }

    const styles = useMemo(() => {
        return StyleSheet.create({
            buttonContainer: {
                marginRight: 10
            },
            button: {
                width: '100%'
            },
            text: {
                fontSize: 15,
                color: theme.colors.text
            }
        });
    }, []);

    return (
        <View style={[styles.buttonContainer]}> 
                <Pressable style={[styles.button]}
                    onPress={onSignOut}>
                    <Text style={[styles.text, { margin: 'auto' }]}>Sign Out</Text>
                </Pressable>
        </View>
    )
}
