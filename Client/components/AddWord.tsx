import { WordGender } from "@/constants/WordGender";
import { useStyling } from "@/hooks/useStyling";
import { Word } from "@/models/IWord";
import baseEntityDataService from "@/services/BaseEntityDataService";
import { Picker } from "@react-native-picker/picker";
import { Label } from "@react-navigation/elements";
import { useState } from "react";
import { ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { CancelSubmitButton } from "./CancelSubmitButton";
import { Card } from "./Card";

export function AddWordComponent() {
    const styles = useStyling();

    const [isEnabled, setIsEnabled] = useState(false);
    const [form, setForm] = useState(new Word());
    const [error, setError] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleFormUpdate = (value: any, field: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    const onSubmit = async () => {
        setMessage(null);

        if (!form.nativeWord) {
            setError(true);
        }
        else {
            const result = await baseEntityDataService.Create('Word', form);
            if (result.ok) {
                setForm(new Word());
                setMessage('Word added successfully!');
            }
            else {
                setMessage('Failed to add word. Please try again.');
            }
        }
    }

    return (
        <View style={[styles.container]}>
            <Card>
                <CancelSubmitButton onSubmit={onSubmit} />
            </Card>
            <ScrollView style={[styles.formContainer]}>
                {message && <Text style={{ color: 'green', textAlign: 'center' }}>{message}</Text>}
                <Card >
                    <Text style={[styles.text]}>Deutsch</Text>
                    <View style={{ flexDirection: 'row', gap: 10, marginVertical: 10 }}>
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
                    }
                    <TextInput style={[styles.input, { borderColor: error ? 'red' : 'gray' }]}
                        value={form.nativeWord}
                        placeholder='deutsches Wort...'
                        placeholderTextColor={'gray'}
                        onChangeText={text => handleFormUpdate(text, 'nativeWord')}></TextInput>
                    <Text style={[styles.text]}>Translation</Text>
                    <TextInput style={styles.input}
                        value={form.translateWord}
                        placeholder='translated word...'
                        placeholderTextColor={'gray'}
                        onChangeText={text => handleFormUpdate(text, 'translateWord')}></TextInput>
                    <Text style={[styles.text]}>Usage</Text>
                    <TextInput style={styles.input}
                        placeholder='usage example...'
                        placeholderTextColor={'gray'}
                        value={form.usage}
                        onChangeText={text => handleFormUpdate(text, 'usage')}></TextInput>

                    {/* <Text style={[styles.text]}>Tags</Text>
                    <TextInput style={styles.input}
                        placeholder='tags...'
                        placeholderTextColor={'gray'}
                        value={form.tags}
                        onChangeText={text => handleFormUpdate(text, 'tags')}></TextInput> */}
                </Card>
            </ScrollView>
        </View>
    );
}
