import { useTheme } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { CancelSubmitButton } from '../components/CancelSubmitButton';
import { WordCategory } from '../constants/WordCategory';

const initialForm = {
    nativeWord: '',
    nativeWordGender: '',
    nativeWordCategory: WordCategory.Noun,
    translateWord: '',
    tags: '',
    usage: ''
}

export default function AddWord() {
    const theme = useTheme();

    const [isEnabled, setIsEnabled] = useState(false);
    const [form, setForm] = useState(initialForm);

    const handleFormUpdate = (text: string, value: string) => {
        setForm(prev => ({ ...prev, [value]: text }));
    }

    const onSubmit = async () => {
        try {

        } catch (e) {
            // saving error
        }
    }

    const styles = useMemo(() => {
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
                padding: 10,
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
    }, []);

    return (
        <View style={[styles.container]}>
            <ScrollView style={[styles.formContainer]}>

                <Text style={[styles.text, { paddingBottom: 5 }]}>Deutsch</Text>

                <View>
                    <Text style={[styles.text]}>noun</Text>
                    <Switch onValueChange={setIsEnabled} value={isEnabled}></Switch>
                    <Text style={[styles.text]}>verb</Text>
                </View>

                {!isEnabled &&
                    <TextInput style={[styles.input, { marginRight: 5 }]}
                        placeholder='der, die, das...' onChangeText={text => handleFormUpdate(text, 'nativeWordGender')}></TextInput>
                }
                <TextInput style={[styles.input]}
                    onChangeText={text => handleFormUpdate(text, 'nativeWord')}></TextInput>

                <Text style={[styles.text]}>English</Text>
                <TextInput style={styles.input}
                    onChangeText={text => handleFormUpdate(text, 'translateWord')}></TextInput>

                <Text style={[styles.text]}>Usage</Text>
                <TextInput style={styles.input} onChangeText={text => handleFormUpdate(text, 'usage')}></TextInput>

                <Text style={[styles.text]}>Tags</Text>
                <TextInput style={styles.input} onChangeText={text => handleFormUpdate(text, 'tags')}></TextInput>
            </ScrollView>

            <View style={{ flex: 1 }}>
                <CancelSubmitButton/>
            </View>
        </View>
    );
}


