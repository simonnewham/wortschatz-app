import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

export interface ICancelSubmitButtonProps {
    onSubmit: () => Promise<void>;
    onSubmitAndNewAction?: () => Promise<void>;
    onCancel?: () => void;
    onDelete?: () => Promise<void>;
    onEnhance?: () => Promise<void>;
    submitText?: string;
    cancelText?: string;
    deleteText?: string;
    enhanceText?: string;
    submitIcon?: string;
    cancelIcon?: string;
    deleteIcon?: string;
    enhanceIcon?: string;
}

export function CancelSubmitButton(props: ICancelSubmitButtonProps) {
    const [submitting, setSubmitting] = useState(false);
    const [enhancing, setEnhancing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    return (
        <View className='flex-row gap-2 justify-between flex-wrap'>
            <View className="flex-row justify-between gap-2">
                <Pressable className=" flex-row gap-2 py-1 px-4 rounded-md items-center
                 border-2 border-gray-400 bg-gray-400/80 hover:bg-gray-400"
                    onPress={() => props.onCancel ? props.onCancel() : router.back()}>
                    <MaterialIcons name="cancel" size={20} color="white" />
                    <Text className="text-white font-semibold">{props.cancelText ?? 'Cancel'}</Text>
                </Pressable>
                {props.onDelete &&
                    <Pressable className="flex-row gap-2 px-4 rounded-md items-center
                     border-2 border-red-500 bg-red-500/80 hover:bg-red-500"
                        disabled={enhancing || submitting || deleting}
                        onPress={async () => {
                            setDeleting(true);
                            await props.onDelete?.();
                            setDeleting(false);
                        }}>
                        {deleting
                            ? <ActivityIndicator size={20} color="white" />
                            : <MaterialIcons name="delete" size={20} color="white" />
                        }
                        <Text className="text-white font-semibold">Delete</Text>
                    </Pressable>
                }
            </View>
            <View className="flex-row gap-2">
                {props.onEnhance &&
                    <Pressable
                        className={`flex-row gap-2 py-1 px-4 rounded-md border-2 border-blue-500 
                            bg-blue-500/80 items-center gap-1 hover:bg-blue-500`}
                        disabled={enhancing || submitting || deleting}
                        onPress={async () => {
                            setEnhancing(true);
                            await props.onEnhance?.();
                            setEnhancing(false);
                        }}>
                        {enhancing
                            ? <ActivityIndicator size={20} color="white" />
                            : <MaterialIcons name="auto-awesome" className="animate-pulse" size={20} color="white" />
                        }
                        <Text className="text-white font-semibold">{props.enhanceText ?? 'Discover'}</Text>
                    </Pressable>
                }
                {props.onSubmit &&
                    <Pressable className="flex-row gap-2 py-1 px-4 rounded-md text-secondary items-center 
                    border-2 border-[#d4fd52] bg-[#d4fd52]/80 hover:bg-[#d4fd52]"
                        disabled={enhancing || submitting || deleting}
                        onPress={async () => {
                            setSubmitting(true);
                            await props.onSubmit();
                            setSubmitting(false);
                        }}>
                        {submitting
                            ? <ActivityIndicator size={20} color="black" />
                            : <MaterialIcons name={(props.submitIcon ?? 'add') as any} size={20} color="black" />
                        }
                        <Text className="text-black font-semibold">{props.submitText ?? 'Add'}</Text>
                    </Pressable>
                }
                {props.onSubmitAndNewAction &&
                    <Pressable className="flex-row gap-2 py-1 px-4 rounded-md border-2 border-secondary bg-secondary/80 hover:bg-secondary items-center gap-1"
                        disabled={enhancing || submitting || deleting}
                        onPress={async () => {
                            setSubmitting(true);
                            await props.onSubmitAndNewAction?.();
                            setSubmitting(false);
                        }}>
                        {submitting
                            ? <ActivityIndicator size={20} color="white" />
                            : <MaterialIcons name="playlist-add" size={20} color="white" />
                        }
                        <Text className="text-white font-semibold">Add and New</Text>
                    </Pressable>
                }
            </View>
        </View>
    )
}