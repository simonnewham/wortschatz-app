import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Phrase } from "../models/IPhrase";
import { Card } from './Card';

export interface IPhraseListItemProps {
    item: Phrase,
    index: number
}

export function PhraseListItem(props: IPhraseListItemProps) {
    const { item } = props;

    return (
        <View className="w-full">
            <Card className="bg-white shadow-sm flex-col border-gray-200">
                <View>
                    <View className="flex-row justify-between ">
                        <View className="flex-row items-center gap-4">
                            <Text className="text-lg font-semibold">
                                {item.nativePhrase}
                            </Text>
                            <MaterialIcons name="arrow-right" size={20} color="black" />
                            <Text className="text-lg font-semibold text-gray-700">
                                {item.translatePhrase != null && item.translatePhrase != '' ? item.translatePhrase : '❔'}
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
                    <View className="flex-col items-end justify-between border-gray-100">
                        <MaterialIcons className='right-0 px-2' name="arrow-forward" size={24} color="black" />
                    </View>
                </View>
            </Card>
        </View>
    )
}
