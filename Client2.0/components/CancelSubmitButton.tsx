import { useTheme } from "@react-navigation/native";
import { router } from 'expo-router';
import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from './Themed';

export interface ICancelSubmitButtonProps {
    onSubmit: () => void;
    onCancel?: () => void;
}

export function CancelSubmitButton(props: ICancelSubmitButtonProps) {
    const theme = useTheme();

    const styles = useMemo(() => {
        return StyleSheet.create({
            buttonContainer: {
                flex: 2,
                flexDirection: 'row',
                alignItems: 'flex-end',
                maxWidth: '100%'
            },
            button: {
                height: 50,
                borderRadius: 4,
                padding: 5,
                width: '100%'
            },
            text: {
                fontSize: 14,
                color: theme.colors.text
            }
        });
    }, []);

    return (
        <View style={[styles.buttonContainer]}>
            <View style={{ flex: 1, padding: 2 }}>
                <Pressable style={[styles.button, { backgroundColor: 'grey' }]}
                    onPress={() => router.replace('/home')}>
                    <Text style={[styles.text, { margin: 'auto' }]}>Cancel</Text>
                </Pressable>
            </View>
            <View style={{ flex: 1,padding: 2 }}>
                <Pressable style={[styles.button, { backgroundColor: 'green' }]}
                    onPress={props.onSubmit}>
                    <Text style={[styles.text, { color: 'white', margin: 'auto' }]}>Add</Text>
                </Pressable>
            </View>
        </View>
    )
}
