import { useStyling } from '@/hooks/useStyling';
import { useAuthSession } from '@/providers/AuthProvider';
import { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Card } from '../../components/Card';

export default function SettingsButton() {
    const styles = useStyling();
    const { userInfo } = useAuthSession();

    const [form, setForm] = useState({...userInfo, theme: 'dark'});

    const handleFormUpdate = (text: string, value: string) => {
        setForm(prev => ({ ...prev, [value]: text }));
    }

    const onSubmit = async () => {
        //
    }

    return (
        <View style={[styles.container]}>
            <ScrollView style={[styles.formContainer]}>
                <Card title='Settings' icon={'settings'}>
                    <Text style={[styles.text]}>Theme: {form.theme}</Text>
                    <Text style={[styles.text]}>First name</Text>
                    <TextInput style={styles.input}
                        value={form.firstName}
                        placeholder='First name...'
                        placeholderTextColor={'gray'}
                        onChangeText={text => handleFormUpdate(text, 'firstName')} />
                    <Text style={[styles.text]}>Last name</Text>
                    <TextInput style={styles.input}
                        value={form.lastName}
                        placeholder='Last name...'
                        placeholderTextColor={'gray'}
                        onChangeText={text => handleFormUpdate(text, 'lastName')} />

                </Card>
            </ScrollView>
        </View>
    );
};
