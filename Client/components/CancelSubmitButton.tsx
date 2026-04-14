import { MaterialIcons } from "@expo/vector-icons";
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
                width: '100%',
                flexDirection: 'row',
                display: 'flex',
                gap: 2,
                justifyContent: 'flex-end'
            },
            button: {
                height: 35,
                minWidth: 100,
                width: '100%',
                flexDirection: 'row',
                gap: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }
        });
    }, []);

    return (
        <View style={[styles.buttonContainer]}>
            <View>
                <Pressable className="p-2 rounded-md" style={[styles.button, { backgroundColor: 'grey' }]}
                    onPress={() => router.replace('/(app)')}>
                    <MaterialIcons name="cancel" size={20} color="white" />
                    <Text className="font-sans text-white" style={[{ margin: 'auto' }]}>Cancel</Text>
                </Pressable>
            </View>
            <View>
                <Pressable className="p-2 rounded-md" style={[styles.button, { backgroundColor: 'green' }]}
                    onPress={props.onSubmit}>
                    <MaterialIcons name="add" size={20} color="white" />
                    <Text className="font-sans text-white" style={[{ margin: 'auto' }]}>Add</Text>
                </Pressable>
            </View>
        </View>
    )
}
