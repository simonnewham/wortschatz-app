import { WordGender } from "@/constants/WordGender";
import { useStyling } from "@/hooks/useStyling";
import { WordListDto } from "@/models/IWord";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Pressable, Text, useColorScheme, View } from "react-native";
import { Card } from '../components/Card';

export interface IWordListItemProps {
    item: WordListDto,
    index: number,
    onDelete: (item: WordListDto) => void
}

export function WordListItem(props: IWordListItemProps) {
    const colorScheme = useColorScheme();
    const theme = useTheme();
    const styles = useStyling();
    const { item } = props;

    // Helper to format gender text. nativeWordGender could be an enum value or string like "Der (masculine)", based on the Picker.
    const formatGender = (val: any) => {
        if (val === undefined || val === null || val === '') return '';
        // If it's a number (enum), get string map. Otherwise just return string.
        const mapped = typeof val === 'number' && WordGender[val] ? WordGender[val] : val;
        // Format to simple article if possible (rudimentary cleanup)
        if (typeof mapped === 'string') {
            const match = mapped.match(/^(Der|Die|Das)/i);
            if (match) return match[0];
        }
        return mapped;
    };

    const nGender = formatGender(item.nativeWordGender);
    const tGender = formatGender(item.translateWordGender);

    return (
        <View className="w-full">
            <Card className="bg-white shadow-sm flex-col w-full">
                <View className="flex-row justify-between">
                    <View className="flex-col">
                        <Text className="text-lg font-bold font-sans text-blue-900 pb-1">
                            {nGender ? `${nGender} ` : ''}{item.nativeWord}
                        </Text>
                        <Text className="text-md text-gray-700 italic">
                            {tGender ? `${tGender} ` : ''}{item.translateWord}
                        </Text>
                    </View>

                    <View className="flex-col items-end justify-between border-gray-100">
                        {/* {!!item.createdDate && (
                            <Text className="text-xs text-gray-400 right-0">
                                {new Date(item.createdDate).toLocaleDateString()}
                            </Text>
                        )} */}
                        <View className="flex-row gap-4">
                            <Pressable onPress={() => console.log('Edit word', item.id)} className="p-1 bg-blue-50 rounded-full hover:bg-blue-100">
                                <MaterialIcons name="edit" size={18} color="#0284c7" />
                            </Pressable>
                            <Pressable onPress={() => props.onDelete(item)}
                                className="p-1 bg-red-50 rounded-full hover:bg-red-100">
                                <MaterialIcons name="delete" size={18} color="#971330ff" />
                            </Pressable>
                        </View>
                    </View>
                </View>

                {!!item.usage && (
                    <Text className="text-sm text-gray-600 mt-2">
                        <Text className="font-bold">Usage:</Text> {item.usage}
                    </Text>
                )}

                {!!item.tags && (
                    <Text className="text-sm text-gray-500 mt-1">
                        <Text className="font-bold">Tags:</Text> {item.tags}
                    </Text>
                )}

                {item.nativeWordCategory !== undefined && (
                    <Text className="text-xs text-gray-400 mt-2 uppercase tracking-wide">
                        Category ID: {item.nativeWordCategory}
                    </Text>
                )}
            </Card>
        </View>
    )
}
