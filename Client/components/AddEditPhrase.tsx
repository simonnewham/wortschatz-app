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
                <Text className="text-primary mb-2">🇩🇪 Deutsch</Text>
                <TextInput className="bg-input"
                    style={styles.input}
                    multiline={true}
                    value={form.nativePhrase}
                    placeholder='deutsch...'
                    placeholderTextColor={'gray'}
                    onChangeText={text => handleFormUpdate(text, 'nativePhrase')}></TextInput>
            </Card>
            <Card>
                <Text className="text-primary mb-2">English</Text>
                <TextInput className="bg-input"
                    style={styles.input}
                    multiline={true}
                    value={form.translatePhrase}
                    placeholder='english...'
                    placeholderTextColor={'gray'}
                    onChangeText={text => handleFormUpdate(text, 'translatePhrase')}></TextInput>
            </Card>
            {form.id && form.enhanceResult &&
                <Card className='w-full'>
                    <Text className="text-primary font-semibold mb-2">✨ Wortkiste Result</Text>
                    <TextInput className="bg-input h-full"
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
