import { AddEditNote } from '@/components/AddEditNote';
import { ContainerContent } from '@/components/ContainerContent';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from '@/components/ContainerView';
import { INote } from '@/models/INote';
import baseEntityDataService from '@/services/BaseEntityDataService';
import { Theme, useTheme } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { CancelSubmitButton } from '../../../components/CancelSubmitButton';
import { Card } from '../../../components/Card';

const initialForm: INote = {
    title: undefined,
    description: undefined,
    notes: undefined,
}

export default function AddNote() {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), []);

    const [form, setForm] = useState(initialForm);
    const [message, setMessage] = useState<{ success: boolean; message: string | null } | null>(null);

    const handleFormUpdate = (text: string, value: string) => {
        setForm(prev => ({ ...prev, [value]: text }));
    }

    const onSubmit = async () => {
        setMessage(null);
        try {
            const result = await baseEntityDataService.Create('Note', form);
            if (result?.ok) {
                setForm(initialForm);
                setMessage({ success: true, message: 'Note added successfully!' });
            } else {
                setMessage({ success: false, message: 'Failed to add note. Please try again.' });
            }
        } catch (error) {
            console.error(error, { logMessage: 'Error saving note' });
            setMessage({ success: false, message: 'An error occurred while saving the note.' });
        }
    }

    return (
        <ContainerView>
            <ContainerDrawer title='Add a new note' />
            <ContainerContent>
                <Card className='border-gray-100'>
                    <CancelSubmitButton onSubmit={onSubmit} />
                </Card>
                {message && <Text style={{ backgroundColor: message.success ? 'green' : 'red', padding: 5, borderRadius: 5, color: 'white', textAlign: 'center' }}>
                    {message.message}
                </Text>}
                <AddEditNote note={form} handleFormUpdate={handleFormUpdate} />
            </ContainerContent>
        </ContainerView>
    );
}

const getStyles = (theme: Theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            width: "100%",
        },
        formContainer: {
            flexDirection: 'column',
            width: '100%',
            height: '100%',
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
