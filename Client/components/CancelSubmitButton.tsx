import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { ActivityIndicator, Pressable, Text, View } from "react-native";

export interface ICancelSubmitButtonProps {
    onSubmit: () => void;
    onSubmitAndNewAction?: () => void;
    onCancel?: () => void;
    onDelete?: () => void;
    onEnhance?: () => void;
    isEnhancing?: boolean;
    submitText?: string;
    cancelText?: string;
    deleteText?: string;
    enhanceText?: string;
}

export function CancelSubmitButton(props: ICancelSubmitButtonProps) {
    return (
        <View className='flex-row gap-2 justify-between flex-wrap'>
            <View className="flex-row gap-2">
                <Pressable className=" flex-row py-2 px-4 rounded-md bg-gray-100 items-center"
                    onPress={() => router.back()}>
                    <MaterialIcons name="cancel" size={20} color="black" />
                    <Text className="text-black font-semibold">{props.cancelText ?? 'Cancel'}</Text>
                </Pressable>
                {props.onEnhance &&
                    <Pressable
                        className={`flex-row py-2 px-4 rounded-md bg-blue-500 items-center gap-1 hover:bg-blue-400 ${props.isEnhancing ? 'opacity-60' : ''}`}
                        onPress={props.onEnhance}
                        disabled={props.isEnhancing}>
                        {props.isEnhancing
                            ? <ActivityIndicator size={20} color="white" />
                            : <MaterialIcons name="auto-awesome" className="animate-pulse" size={20} color="white" />
                        }
                        <Text className="text-white font-semibold">{props.enhanceText ?? 'Enhance'}</Text>
                    </Pressable>
                }
            </View>
            <View className="flex-row gap-2">
                {props.onDelete &&
                    <Pressable className="flex-row py-2 px-4 rounded-md bg-red-500 items-center"
                        onPress={props.onDelete}>
                        <MaterialIcons name="delete" size={20} color="white" />
                        <Text className="text-white font-semibold">Delete</Text>
                    </Pressable>
                }
                {props.onSubmit &&
                    <Pressable className="flex-row py-2 px-4 rounded-md bg-accent/90 items-center hover:bg-accent"
                        onPress={props.onSubmit}>
                        <MaterialIcons name="add" size={20} color="black" />
                        <Text className="text-black font-semibold">{props.submitText ?? 'Add'}</Text>
                    </Pressable>
                }
                {props.onSubmitAndNewAction &&
                    <Pressable className="flex-row py-2 px-4 rounded-md bg-secondary/90 hover:bg-secondary items-center gap-1"
                        onPress={props.onSubmitAndNewAction}>
                        <MaterialIcons name="playlist-add" size={20} color="white" />
                        <Text className="text-white font-semibold">Add and New</Text>
                    </Pressable>
                }
            </View>
        </View>
    )
}