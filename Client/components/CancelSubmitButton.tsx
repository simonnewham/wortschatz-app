import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { router } from 'expo-router';
import { useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from './Themed';

export interface ICancelSubmitButtonProps {
    onSubmit: () => void;
    onCancel?: () => void;
    onDelete?: () => void;
    submitText?: string;
    cancelText?: string;
    deleteText?: string;
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
                    onPress={() => router.back()}>
                    <MaterialIcons name="cancel" size={20} color="white" />
                    <Text className="text-white">{props.cancelText ?? 'Cancel'}</Text>
                </Pressable>
            </View>
            {props.onSubmit && <View>
                <Pressable className="p-2 rounded-md bg-accent/95 hover:bg-accent" style={[styles.button]}
                    onPress={props.onSubmit}>
                    <MaterialIcons name="add" size={20} color="black" />
                    <Text className="text-text_primary">{props.submitText ?? 'Add'}</Text>
                </Pressable>
            </View>}
            {props.onDelete && <View>
                <Pressable className="p-2 rounded-md bg-red-500" style={[styles.button]}
                    onPress={props.onDelete}>
                    <MaterialIcons name="delete" size={20} color="black" />
                    <Text className="text-text_primary">{'Delete'}</Text>
                </Pressable>
            </View>}
        </View>
    )
}
