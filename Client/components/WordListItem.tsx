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
        <View className="w-full ">
            <Card className="bg-accent shadow-sm flex-col hover:bg-accent/20">
                <View className="flex-col items-end justify-between border-gray-100">
                    {item.createdDate && (
                        <Text className="text-sm text-gray-400 right-0">
                            {new Date(item.createdDate).toLocaleDateString()}
                        </Text>
                    )}
                </View>
                <View>
                    <View className="flex-row justify-between ">
                        <View className="flex-row items-center gap-4">
                            <Text className="text-lg font-semibold text-primary">
                                {item.nativeWord}
                            </Text>
                            <MaterialIcons className="text-primary" name="arrow-right" size={20} />
                            <Text className="text-lg font-semibold text-primary">
                                {item.translateWord != null && item.translateWord != '' ? item.translateWord : '❔'}
                            </Text>
                        </View>

                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-sm text-primary">
                            <Text className="font-bold text-primary">Usage:</Text> {item.usage}
                        </Text>
                        <MaterialIcons className='right-0 px-2' name="arrow-forward" size={24} color="black" />
                    </View>
                </View>
            </Card>
        </View>
    )
}
