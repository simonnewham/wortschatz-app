import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { Pressable, Text, View } from "react-native";

export interface ICancelSubmitButtonProps {
    onSubmit: () => void;
    onCancel?: () => void;
    onDelete?: () => void;
    submitText?: string;
    cancelText?: string;
    deleteText?: string;
}

export function CancelSubmitButton(props: ICancelSubmitButtonProps) {
    return (
        <View className='flex-row gap-2 justify-end'>
            <Pressable className=" flex-row p-2 rounded-md bg-gray-100 items-center"
                onPress={() => router.back()}>
                <MaterialIcons name="cancel" size={20} color="black" />
                <Text className="text-black">{props.cancelText ?? 'Cancel'}</Text>
            </Pressable>
            {props.onSubmit &&
                <Pressable className="flex-row p-2 rounded-md bg-accent/95 hover:bg-accent"
                    onPress={props.onSubmit}>
                    <MaterialIcons name="add" size={20} color="black" />
                    <Text className="text-black">Add</Text>
                </Pressable>
            }
            {props.onDelete &&
                <Pressable className="flex-row p-2 rounded-md bg-red-500 items-center"
                    onPress={props.onDelete}>
                    <MaterialIcons name="delete" size={20} color="black" />
                    <Text className="text-black">Delete</Text>
                </Pressable>
            }
        </View>
    )
}
