import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

export default function AddWord() {
    const theme = useTheme();

    const [isEnabled, setIsEnabled] = useState(false);

    const initialForm = {
        gender: '',
        germanWord: '',
        englishWord: '',
        usage: '',
        tags: ''
    }

    const [form, setForm] = useState(initialForm);

    const handleFormUpdate = (text: string, value: string) => {
        setForm(prev => ({ ...prev, [value]: text }));
    }

    const styles = useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '100%',
                backgroundColor: theme.colors.background
            },
            input: {
                height: 40,
                borderWidth: 1,
                marginVertical: 10,
                padding: 5,
                width: 640,
                minWidth: 40,
                maxWidth: '100%',
                borderRadius: 4,
                backgroundColor: theme.colors.card,
                color: theme.colors.text
            },
            text: {
                fontSize: 14,
                color: theme.colors.text
            },
            button: {
                height: 50,
                borderRadius: 4,
                padding: 5,
                width: '100%'
            }
        });
    }, []);

    return (
        <View style={[styles.container]}>
            <View style={[{ width: '100%', padding: 5 }]}>
                <Text style={[styles.text, { paddingBottom: 5 }]}>Deutsch</Text>

                <View>
                    <Text style={[styles.text]}>noun</Text>
                    <Switch onValueChange={setIsEnabled} value={isEnabled}></Switch>
                    <Text style={[styles.text]}>verb</Text>
                </View>

                {!isEnabled &&
                    <TextInput style={[styles.input, { marginRight: 5 }]}
                        placeholder='der, die, das...' onChangeText={text => handleFormUpdate(text, 'gender')}></TextInput>
                }
                <TextInput style={[styles.input]}
                    onChangeText={text => handleFormUpdate(text, 'germanWord')}></TextInput>

                <Text style={[styles.text]}>English</Text>
                <TextInput style={styles.input}
                    onChangeText={text => handleFormUpdate(text, 'englishWord')}></TextInput>

                <Text style={[styles.text]}>Usage</Text>
                <TextInput style={styles.input} onChangeText={text => handleFormUpdate(text, 'usage')}></TextInput>

                <Text style={[styles.text]}>Tags</Text>
                <TextInput style={styles.input} onChangeText={text => handleFormUpdate(text, 'tags')}></TextInput>

                <View style={{ width: 640, minWidth: 40, maxWidth: '100%', padding: 2 }}>
                    <Pressable style={[styles.button, { backgroundColor: 'grey' }]}
                        onPress={() => router.replace('/home')}>
                        <Text style={[styles.text, { margin: 'auto' }]}>Cancel</Text>
                    </Pressable>
                </View>
                <View style={{ width: 640, minWidth: 40, maxWidth: '100%', padding: 2 }}>
                    <Pressable style={[styles.button, { backgroundColor: 'green' }]}
                        onPress={() => alert(`Added ${JSON.stringify(form)}`)}>
                        <Text style={[styles.text, { color: 'white', margin: 'auto' }]}>Add</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}


