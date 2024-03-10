import { useTheme, Theme } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CancelSubmitButton } from '../components/CancelSubmitButton';
import { FireStore } from '../services/FirestoreService';
import { IPhrase } from '../models/IPhrase';

const initialForm: IPhrase = {
    nativePhrase: '',
    translatePhrase: '',
    tags: '',
}

export default function AddPhrase() {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), []);
    const [form, setForm] = useState(initialForm);

    const handleFormUpdate = (text: string, value: string) => {
        setForm(prev => ({ ...prev, [value]: text }));
    }

    const onSubmit = async () => {
        await FireStore.AddPhrase(form);
        setForm(initialForm);
    }

    return (
        <View style={[styles.container]}>
            <ScrollView style={[styles.formContainer]}>
                <Text style={[styles.text, { paddingBottom: 5 }]}>Deutsch</Text>
                <TextInput style={[styles.input]} multiline={true} value={form.nativePhrase}
                    onChangeText={text => handleFormUpdate(text, 'nativePhrase')}></TextInput>

                <Text style={[styles.text]}>English</Text>
                <TextInput style={styles.input} multiline={true} value={form.translatePhrase}
                    onChangeText={text => handleFormUpdate(text, 'translatePhrase')}></TextInput>

                <Text style={[styles.text]}>Tags</Text>
                <TextInput style={styles.input} value={form.tags} onChangeText={text => handleFormUpdate(text, 'tags')}></TextInput>
            </ScrollView>
            <View style={{ flex: 1 }}>
                <CancelSubmitButton onSubmit={onSubmit} />
            </View>
        </View>
    );
}

const getStyles = (theme: Theme) => {
    return StyleSheet.create({
        container: {
            flex: 3,
            flexDirection: 'column',
            flexGrow: 1,
            backgroundColor: theme.colors.background
        },
        formContainer: {
            flex: 2,
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            padding: 5,
            minWidth: 40,
            flexGrow: 3
        },
        input: {
            height: 40,
            borderWidth: 1,
            marginVertical: 10,
            padding: 5,
            width: '100%',
            maxWidth: '100%',
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



