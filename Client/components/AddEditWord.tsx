import { useStyling } from "@/hooks/useStyling";
import { Word } from "@/models/IWord";
import { Text, TextInput, View } from 'react-native';
import { Card } from "./Card";

export interface IAddWordComponentProps {
    form: Word;
    handleFormUpdate: (value: any, field: string) => void;
}

export function AddEditWord(props: IAddWordComponentProps) {
    const styles = useStyling();

    const { form, handleFormUpdate } = props;

    return (
        <View>
            <Card className='border-gray-200'>
                <Text style={[styles.text]}>🇩🇪 Deutsch</Text>
                <TextInput style={styles.input}
                    value={form.nativeWord}
                    placeholder='Deutsches Wort...'
                    placeholderTextColor={'gray'}
                    onChangeText={text => handleFormUpdate(text, 'nativeWord')}></TextInput>
            </Card>
            <Card className='border-gray-200'>
                {/* <View style={{ flexDirection: 'row', gap: 10, marginVertical: 10 }}>
                    <Label style={[styles.text]}>noun</Label>
                    <Switch onValueChange={setIsEnabled} value={isEnabled}></Switch>
                    <Label style={[styles.text]}>verb</Label>
                </View>
                {!isEnabled &&
                    <Picker
                        selectedValue={form.nativeWordGender}
                        style={styles.picker}
                        onValueChange={value => handleFormUpdate(value, 'nativeWordGender')}>
                        {WordGender.GetList().map(option =>
                            <Picker.Item label={option.title} value={option.title} />
                        )}
                    </Picker>
                } */}
                <Text style={[styles.text]}>Translation</Text>
                <TextInput style={styles.input}
                    value={form.translateWord}
                    placeholder='translation...'
                    placeholderTextColor={'gray'}
                    onChangeText={text => handleFormUpdate(text, 'translateWord')}></TextInput>
                <Text style={[styles.text]}>Usage</Text>
                <TextInput style={styles.input}
                    placeholder='usage...'
                    placeholderTextColor={'gray'}
                    value={form.usage}
                    onChangeText={text => handleFormUpdate(text, 'usage')}></TextInput>
            </Card>
            {form.id &&
                <Card className='border-gray-200 w-full'>
                    <Text className="font-semibold">✨Wortkiste Result</Text>
                    <TextInput
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
