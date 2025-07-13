import { useStyling } from '@/hooks/useStyling';
import { IUserSettings } from '@/models/IUserSettings';
import { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Card } from '../../components/Card';

const initialForm: IUserSettings = {
    firstName: '',
    lastName: '',
    theme: 'dark',
}

export default function SettingsButton() {
    const styles = useStyling();

    const [form, setForm] = useState(initialForm);

    const handleFormUpdate = (text: string, value: string) => {
        setForm(prev => ({ ...prev, [value]: text }));
    }

    const onSubmit = async () => {
        //
    }

    return (
        <View style={[styles.container]}>
            <ScrollView style={[styles.formContainer]}>
                <Card title='Settings'>
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
