import { useTheme, Theme } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CancelSubmitButton } from '../components/CancelSubmitButton';
import { FireStore } from '../services/FirestoreService';
import { IPhrase } from '../models/IPhrase';
import { Card } from '../components/Card';

const initialForm: IPhrase = {
    nativePhrase: '',
    translatePhrase: '',
    tags: '',
}

export default function AddPhrase() {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), []);
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState(false);

    const handleFormUpdate = (text: string, value: string) => {
        setForm(prev => ({ ...prev, [value]: text }));
    }

    const onSubmit = async () => {
        // todo: validation
        if (!form.nativePhrase) {
            setError(true);
        }
        else {
            await FireStore.AddPhrase(form);
            setForm(initialForm);
        }
    }

    return (
        <View style={[styles.container]}>
            <ScrollView style={[styles.formContainer]}>
                <Card>
                    <Text style={[styles.text, { paddingBottom: 5 }]}>Deutsch</Text>
                    <TextInput style={[styles.input, { borderColor: error ? 'red' : 'gray' }]}
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

                    <Text style={[styles.text]}>Tags</Text>
                    <TextInput style={styles.input}
                        value={form.tags}
                        placeholder='tags...'
                        placeholderTextColor={'gray'}
                        onChangeText={text => handleFormUpdate(text, 'tags')}></TextInput>
                </Card>
            </ScrollView>
            <View style={{ width: 720, maxWidth: '100%' }}>
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
            width: 720,
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
