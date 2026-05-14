import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from '@/components/ContainerView';
import { IPhrase } from '@/models/IPhrase';
import baseEntityDataService from '@/services/BaseEntityDataService';
import { Theme, useTheme } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CancelSubmitButton } from '../../../components/CancelSubmitButton';
import { Card } from '../../../components/Card';

const initialForm: IPhrase = {
    nativePhrase: undefined,
    translatePhrase: undefined,
    usage: undefined,
}

export default function AddPhrase() {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), []);

    const [form, setForm] = useState(initialForm);
    const [message, setMessage] = useState<{ success: boolean; message: string | null } | null>(null);

    const handleFormUpdate = (text: string, value: string) => {
        setForm(prev => ({ ...prev, [value]: text }));
    }

    const onSubmit = async () => {
        setMessage(null);
        const result = await baseEntityDataService.Create('Phrase', form);
        if (result.ok) {
            setForm(initialForm);
            setMessage({ success: true, message: 'Phrase added successfully!' });
        }
        else {
            setMessage({ success: false, message: 'Failed to add phrase. Please try again.' });
        }
    }

    return (
        <ContainerView>
            <ContainerDrawer title='Add a new phrase' />
            <View className="rounded-md bg-white justify-center items-center" style={{ width: '95%', height: '95%' }}>
                <Card className='border-gray-100'>
                    <CancelSubmitButton onSubmit={onSubmit} />
                </Card>
                <ScrollView style={[styles.formContainer]}>
                    {message && <Text style={{ backgroundColor: message.success ? 'green' : 'red', padding: 5, borderRadius: 5, color: 'white', textAlign: 'center' }}>
                        {message.message}
                    </Text>}
                    <Card className='border-gray-100'>
                        <Text style={[styles.text, { paddingBottom: 5 }]}>Deutsch</Text>
                        <TextInput style={[styles.input]}
                            multiline={true}
                            value={form.nativePhrase}
                            placeholder='deutsch...'
                            placeholderTextColor={'gray'}
                            onChangeText={text => handleFormUpdate(text, 'nativePhrase')}></TextInput>
                    </Card>
                    <Card className='border-gray-100'>
                        <Text style={[styles.text]}>English</Text>
                        <TextInput style={styles.input}
                            multiline={true}
                            value={form.translatePhrase}
                            placeholder='english...'
                            placeholderTextColor={'gray'}
                            onChangeText={text => handleFormUpdate(text, 'translatePhrase')}></TextInput>

                        <Text style={[styles.text]}>Tags</Text>
                        <TextInput style={styles.input}
                            value={form.usage}
                            placeholder='usage...'
                            placeholderTextColor={'gray'}
                            onChangeText={text => handleFormUpdate(text, 'usage')}></TextInput>
                    </Card>
                </ScrollView>
            </View>
        </ContainerView >
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
            color: theme.colors.text,
            borderColor: 'gray'
        },
        text: {
            fontSize: 14,
            color: theme.colors.text
        }
    });
};
