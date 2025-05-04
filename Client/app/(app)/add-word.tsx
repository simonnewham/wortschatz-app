import { Theme, useTheme } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { CancelSubmitButton } from '../../components/CancelSubmitButton';
import { Card } from '../../components/Card';
import { WordCategory } from '../../constants/WordCategory';
import { IWord } from '../../models/IWord';


const initialForm: IWord = {
    nativeWord: '',
    nativeWordGender: '',
    nativeWordCategory: WordCategory.Noun,
    translateWord: '',
    translateWordGender: '',
    tags: '',
    usage: ''
}

export default function AddWord() {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), []);
    const [isEnabled, setIsEnabled] = useState(false);
    const [form, setForm] = useState(initialForm);

    const [error, setError] = useState(false);

    const handleFormUpdate = (text: string, value: string) => {
        setForm(prev => ({ ...prev, [value]: text }));
    }

    const onSubmit = async () => {
        // todo: validation
        if (!form.nativeWord) {
            setError(true);
        }
        else {
            // await FireStore.AddWord(form)
            // setForm(initialForm);
        }
    }

    return (
        <View style={[styles.container]}>
            <ScrollView style={[styles.formContainer]}>
                <Card >
                    <Text style={[styles.text]}>Deutsch</Text>
                    <View>
                        <Text style={[styles.text]}>noun</Text>
                        <Switch onValueChange={setIsEnabled} value={isEnabled}></Switch>
                        <Text style={[styles.text]}>verb</Text>
                    </View>
                    {!isEnabled &&
                        <TextInput style={[styles.input, { marginRight: 5 }]}
                            value={form.nativeWordGender}
                            placeholderTextColor={'gray'}
                            placeholder='der, die, das...'
                            onChangeText={text => handleFormUpdate(text, 'nativeWordGender')}></TextInput>
                    }
                    <TextInput style={[styles.input, { borderColor: error ? 'red' : 'gray' }]}
                        value={form.nativeWord}
                        placeholder='deutsch wort...'
                        placeholderTextColor={'gray'}
                        onChangeText={text => handleFormUpdate(text, 'nativeWord')}></TextInput>
                </Card>

                <Card>
                    <Text style={[styles.text]}>English</Text>
                    <TextInput style={styles.input}
                        value={form.translateWord}
                        placeholder='english word...'
                        placeholderTextColor={'gray'}
                        onChangeText={text => handleFormUpdate(text, 'translateWord')}></TextInput>
                    <Text style={[styles.text]}>Usage</Text>
                    <TextInput style={styles.input}
                        placeholder='usages...'
                        placeholderTextColor={'gray'}
                        value={form.usage}
                        onChangeText={text => handleFormUpdate(text, 'usage')}></TextInput>

                    <Text style={[styles.text]}>Tags</Text>
                    <TextInput style={styles.input}
                        placeholder='tags...'
                        placeholderTextColor={'gray'}
                        value={form.tags}
                        onChangeText={text => handleFormUpdate(text, 'tags')}></TextInput>
                </Card>

            </ScrollView>

            <View style={{ width: 710, maxWidth: '100%' }}>
                <CancelSubmitButton onSubmit={onSubmit} />
            </View>
        </View>
    );
}

const getStyles = (theme: Theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: theme.colors.background,
            width: "100%",
        },
        formContainer: {
            flexDirection: 'column',
            height: '100%',
            padding: 10,
            width: 710,
            maxWidth: '100%'
        },
        input: {
            height: 40,
            borderWidth: 1,
            marginVertical: 10,
            padding: 5,
            width: '100%',
            borderRadius: 4,
            backgroundColor: theme.colors.card,
            color: theme.colors.text
        },
        text: {
            fontSize: 14,
            color: theme.colors.text
        }
    });
};
