import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const initialForm = {
    nativePhrase: '',
    translatePhrase: '',
    tags: '',
}

export default function AddPhrase() {
    const theme = useTheme();

    const [form, setForm] = useState(initialForm);

    const handleFormUpdate = (text: string, value: string) => {
        setForm(prev => ({ ...prev, [value]: text }));
    }

    const onSubmit = async () => {
        try {
            alert(JSON.stringify(form));
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
                padding: 5,
                minWidth: 40,
                flexGrow: 3
            },
            buttonContainer: {
                flex: 2,
                flexDirection: 'row',
                alignItems: 'flex-end'
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
            <ScrollView style={[styles.formContainer]}>
                <Text style={[styles.text, { paddingBottom: 5 }]}>Deutsch</Text>
                <TextInput style={[styles.input]} multiline={true}
                    onChangeText={text => handleFormUpdate(text, 'nativePhrase')}></TextInput>

                <Text style={[styles.text]}>English</Text>
                <TextInput style={styles.input} multiline={true}
                    onChangeText={text => handleFormUpdate(text, 'translatePhrase')}></TextInput>

                <Text style={[styles.text]}>Tags</Text>
                <TextInput style={styles.input} onChangeText={text => handleFormUpdate(text, 'tags')}></TextInput>
            </ScrollView>
            <View style={{ flex: 1 }}>
                <View style={[styles.buttonContainer]}>
                    <View style={{ flex: 1, width: '100%', padding: 2 }}>
                        <Pressable style={[styles.button, { backgroundColor: 'grey' }]}
                            onPress={() => router.replace('/home')}>
                            <Text style={[styles.text, { margin: 'auto' }]}>Cancel</Text>
                        </Pressable>
                    </View>
                    <View style={{ flex: 1, width: '100%', padding: 2 }}>
                        <Pressable style={[styles.button, { backgroundColor: 'green' }]}
                            onPress={onSubmit}>
                            <Text style={[styles.text, { color: 'white', margin: 'auto' }]}>Add</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}


