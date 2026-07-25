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
            <Card className="bg-accent shadow-sm flex-col hover:bg-accent/20">
                <View>
                    <View className="flex-row justify-between ">
                        <View className="flex-row items-center gap-4">
                            <Text className="text-lg text-primary font-semibold">
                                {item.nativePhrase}
                            </Text>
                            <MaterialIcons className="text-primary" name="arrow-right" size={20} />
                            <Text className="text-lg font-semibold text-primary">
                                {item.translatePhrase != null && item.translatePhrase != '' ? item.translatePhrase : '❔'}
                            </Text>
                        </View>
                        <View className="flex-col items-end justify-between border-gray-100">
                            {item.createdDate && (
                                <Text className="text-sm text-primary right-0">
                                    {new Date(item.createdDate).toLocaleDateString()}
                                </Text>
                            )}
                        </View>
                    </View>
                    <View className="flex-col items-end justify-between border-gray-100">
                        <MaterialIcons className='right-0 px-2 text-primary' name="arrow-forward" size={24} />
                    </View>
                </View>
            </Card>
        </View>
    )
}
