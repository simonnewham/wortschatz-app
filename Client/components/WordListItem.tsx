import { WordListDto } from "@/models/IWord";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Card } from '../components/Card';

export interface IWordListItemProps {
    item: WordListDto,
    index: number,
}

export function WordListItem(props: IWordListItemProps) {
    const { item } = props;

    return (
        <View className="w-full">
            <Card className="bg-white shadow-sm flex-col border-gray-200">
                <View>
                    <View className="flex-row justify-between ">
                        <View className="flex-row items-center gap-4">
                            <Text className="text-lg font-bold font-sans">
                                {item.nativeWord}
                            </Text>
                            <MaterialIcons name="arrow-right" size={20} color="black" />
                            <Text className="text-lg text-gray-700">
                                {item.translateWord != null && item.translateWord != '' ? item.translateWord : '❔'}
                            </Text>
                        </View>
                        <View className="flex-col items-end justify-between border-gray-100">
                            {item.createdDate && (
                                <Text className="text-sm text-gray-400 right-0">
                                    Created: {new Date(item.createdDate).toLocaleDateString()}
                                </Text>
                            )}
                        </View>
                    </View>
                    <Text className="text-sm text-gray-600">
                        <Text className="font-bold">Usage:</Text> {item.usage}
                    </Text>
                    <View className="flex-col items-end justify-between border-gray-100">
                        <MaterialIcons className='right-0' name="arrow-forward" size={24} color="black" />
                    </View>
                </View>
            </Card>
        </View>
    )
}
