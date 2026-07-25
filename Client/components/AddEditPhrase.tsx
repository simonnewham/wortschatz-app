import { useStyling } from "@/hooks/useStyling";
import { Phrase } from "@/models/IPhrase";
import { Text, TextInput, View } from 'react-native';
import { Card } from "./Card";

export interface IAddPhraseComponentProps {
    form: Phrase;
    handleFormUpdate: (value: any, field: string) => void;
}

export function AddEditPhrase(props: IAddPhraseComponentProps) {
    const styles = useStyling();

    const { form, handleFormUpdate } = props;

    return (
        <View>
            <Card>
                <Text style={[styles.text, { paddingBottom: 5 }]}>🇩🇪 Deutsch</Text>
                <TextInput style={styles.input}
                    multiline={true}
                    value={form.nativePhrase}
                    placeholder='deutsch...'
                    placeholderTextColor={'gray'}
                    onChangeText={text => handleFormUpdate(text, 'nativePhrase')}></TextInput>
            </Card>
            <Card>
                <Text style={[styles.text]}>English</Text>
                <TextInput style={styles.input}
                    multiline={true}
                    value={form.translatePhrase}
                    placeholder='english...'
                    placeholderTextColor={'gray'}
                    onChangeText={text => handleFormUpdate(text, 'translatePhrase')}></TextInput>
            </Card>
            {form.id &&
                <Card className='border-gray-200 w-full'>
                    <Text className="font-semibold">✨ Wortkiste Result</Text>
                    <TextInput className="h-full"
                        numberOfLines={form.enhanceResult ? 25 : 4}
                        value={form.enhanceResult}
                        scrollEnabled={true}
                        multiline={true}
                        editable={false}
                        textAlignVertical="top"
                    />
                </Card>}
        </View>
    );
}
