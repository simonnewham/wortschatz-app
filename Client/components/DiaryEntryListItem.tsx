import { DiaryEntryListDto } from "@/models/IDiaryEntry";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Card } from '../components/Card';

export interface IDiaryEntryListItemProps {
    item: DiaryEntryListDto,
    index: number,
}

export function DiaryEntryListItem(props: IDiaryEntryListItemProps) {
    const { item } = props;

    return (
        <View className="w-full">
            <Card className="bg-accent shadow-sm flex-col hover:bg-accent/20">
                <View className="flex-col items-end justify-between border-gray-100">
                    {item.createdDate && (
                        <Text className="text-sm text-gray-400 right-0">
                            {new Date(item.createdDate).toLocaleDateString()}
                        </Text>
                    )}
                </View>
                <View>
                    <View className="flex-row justify-between mb-2">
                        <Text className="text-lg font-semibold text-primary">
                            {item.title || 'Untitled'}
                        </Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-sm text-primary flex-1" numberOfLines={2}>
                            {item.entry}
                        </Text>
                        <MaterialIcons className='text-primary right-0 px-2' name="arrow-forward" size={24} />
                    </View>
                </View>
            </Card>
        </View>
    );
}
