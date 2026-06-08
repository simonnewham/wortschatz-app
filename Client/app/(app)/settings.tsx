import { CancelSubmitButton } from '@/components/CancelSubmitButton';
import { ContainerContent } from '@/components/ContainerContent';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from '@/components/ContainerView';
import { Status } from '@/constants/Status';
import { useStyling } from '@/hooks/useStyling';
import { useAuthSession } from '@/providers/AuthProvider';
import { useToast } from '@/providers/ToastProvider';
import baseEntityDataService from '@/services/BaseEntityDataService';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput } from 'react-native';
import { Card } from '../../components/Card';

export default function SettingsButton() {
    const styles = useStyling();
    const { userInfo, refreshUserInfo } = useAuthSession();
    const toast = useToast();

    const [form, setForm] = useState({ ...userInfo, theme: 'dark' });

    const handleFormUpdate = (text: string, value: string) => {
        setForm(prev => ({ ...prev, [value]: text }));
    }

    const onSubmit = async () => {
        const result = await baseEntityDataService.Update('User', form);
        if (result.ok) {
            toast.show('Settings updated successfully!', Status.Success)
            refreshUserInfo();
        }
    }

    return (
        <ContainerView>
            <ContainerContent>
                <ContainerDrawer title='Settings' />
                <Card className='border-gray-200'>
                    <CancelSubmitButton onSubmit={onSubmit}
                        submitText='Save'
                        submitIcon='save'
                        cancelText='Back'
                        onCancel={() => router.replace('/(app)')} />
                </Card>
                <ScrollView className='w-full' style={[styles.formContainer]}>
                    <Card title='Settings' icon={'settings'} className='border-gray-200'>
                        <Text className='pb-2 font-semibold'>Username</Text>
                        <Text className='pb-2 text-md'>{form.userName}</Text>
                        <Text className='font-semibold'>First name</Text>
                        <TextInput style={styles.input}
                            value={form.firstName}
                            placeholder='First name...'
                            placeholderTextColor={'gray'}
                            onChangeText={text => handleFormUpdate(text, 'firstName')} />
                        <Text className='font-semibold'>Last name</Text>
                        <TextInput style={styles.input}
                            value={form.lastName}
                            placeholder='Last name...'
                            placeholderTextColor={'gray'}
                            onChangeText={text => handleFormUpdate(text, 'lastName')} />
                        <Text className='font-semibold'>Gemini API Key</Text>
                        <TextInput style={styles.input}
                            value={form.lastName}
                            secureTextEntry
                            placeholder='Gemini API Key...'
                            placeholderTextColor={'gray'}
                            onChangeText={text => handleFormUpdate(text, 'geminiApiKey')} />
                    </Card>
                </ScrollView>
            </ContainerContent>
        </ContainerView>
    );
};
