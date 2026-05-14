import { WordGender } from "@/constants/WordGender";
import { WordListDto } from "@/models/IWord";
import { Text, View } from "react-native";
import { Card } from '../components/Card';

export interface IWordListItemProps {
    item: WordListDto,
    index: number,
    onDelete: (item: WordListDto) => void
}

export function WordListItem(props: IWordListItemProps) {
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
            <Card className="bg-white shadow-sm flex-col w-full border-gray-200">
                <View className="flex-row justify-between min-h-20">
                    <View className="flex-col">
                        <Text className="text-lg font-bold font-sans pb-1">
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
