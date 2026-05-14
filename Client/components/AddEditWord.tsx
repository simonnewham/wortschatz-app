import { WordGender } from "@/constants/WordGender";
import { useStyling } from "@/hooks/useStyling";
import { Word } from "@/models/IWord";
import { Picker } from "@react-native-picker/picker";
import { Label } from "@react-navigation/elements";
import { useState } from "react";
import { Switch, Text, TextInput, View } from 'react-native';
import { Card } from "./Card";

export interface IAddWordComponentProps {
    form: Word;
    handleFormUpdate: (value: any, field: string) => void;
}

export function AddEditWord(props: IAddWordComponentProps) {
    const styles = useStyling();

    const { form, handleFormUpdate } = props;

    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <Card className='border-gray-200'>
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
            <TextInput style={styles.input}
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
        </Card>
    );
}
