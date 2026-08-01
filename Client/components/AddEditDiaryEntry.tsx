import { DiaryEntry } from "@/models/IDiaryEntry";
import { Text, TextInput, View } from 'react-native';
import { Card } from "./Card";

export interface IAddDiaryEntryComponentProps {
    form: DiaryEntry;
    handleFormUpdate: (value: any, field: string) => void;
}

export function AddEditDiaryEntry(props: IAddDiaryEntryComponentProps) {
    const { form, handleFormUpdate } = props;

    return (
        <View>
            <Card>
                {form.createdDate && (
                    <View className="mb-4 border-b border-gray-100 pb-2">
                        <Text className="text-primary font-semibold mb-1">Created On</Text>
                        <Text className="text-zinc-500">{new Date(form.createdDate).toLocaleDateString()}</Text>
                    </View>
                )}
                <Text className="text-primary font-semibold mb-1">Title</Text>
                <TextInput
                    className="bg-input p-2 rounded-md mb-4"
                    value={form.title}
                    placeholder='Enter title...'
                    placeholderTextColor={'gray'}
                    onChangeText={text => handleFormUpdate(text, 'title')}
                />

                <Text className="text-primary font-semibold mb-1">Entry</Text>
                <TextInput
                    className="bg-input p-2 rounded-md min-h-[150px]"
                    value={form.entry}
                    placeholder='Write your entry...'
                    placeholderTextColor={'gray'}
                    multiline={true}
                    textAlignVertical="top"
                    onChangeText={text => handleFormUpdate(text, 'entry')}
                />
            </Card>
        </View>
    );
}
