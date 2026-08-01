import { CancelSubmitButton } from '@/components/CancelSubmitButton';
import { ContainerContent } from '@/components/ContainerContent';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from '@/components/ContainerView';
import { Status } from '@/constants/Status';
import { useAuthSession } from '@/providers/AuthProvider';
import { useToast } from '@/providers/ToastProvider';
import baseEntityDataService from '@/services/BaseEntityDataService';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TextInput } from 'react-native';
import { Card } from '../../components/Card';

export default function SettingsButton() {
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
                <Card className='border-accent'>
                    <CancelSubmitButton onSubmit={onSubmit}
                        submitText='Save'
                        submitIcon='save'
                        cancelText='Back'
                        onCancel={() => router.replace('/(app)')} />
                </Card>
                <ScrollView className='w-full'>
                    <Card title='Settings' icon={'settings'} className='border-accent'>
                        <Text className='py-2 font-semibold text-primary'>Username</Text>
                        <Text className='text-md text-primary'>{form.userName}</Text>
                        <Text className='py-2 font-semibold text-primary'>First name</Text>
                        <TextInput className='bg-input p-2 rounded-md'
                            value={form.firstName}
                            placeholder='First name...'
                            placeholderTextColor={'gray'}
                            onChangeText={text => handleFormUpdate(text, 'firstName')} />
                        <Text className='py-2 font-semibold text-primary'>Last name</Text>
                        <TextInput className='bg-input p-2 rounded-md'
                            value={form.lastName}
                            placeholder='Last name...'
                            placeholderTextColor={'gray'}
                            onChangeText={text => handleFormUpdate(text, 'lastName')} />
                        <Text className='py-2 font-semibold text-primary'>Gemini API Key</Text>
                        <TextInput className='bg-input p-2 rounded-md'
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
