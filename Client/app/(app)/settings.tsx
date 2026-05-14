import { CancelSubmitButton } from '@/components/CancelSubmitButton';
import ContainerView from '@/components/ContainerView';
import { useStyling } from '@/hooks/useStyling';
import { useAuthSession } from '@/providers/AuthProvider';
import baseEntityDataService from '@/services/BaseEntityDataService';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Card } from '../../components/Card';

export default function SettingsButton() {
    const styles = useStyling();
    const { userInfo, refreshUserInfo } = useAuthSession();

    const [form, setForm] = useState({ ...userInfo, theme: 'dark' });

    const handleFormUpdate = (text: string, value: string) => {
        setForm(prev => ({ ...prev, [value]: text }));
    }

    const onSubmit = async () => {
        const result = await baseEntityDataService.Update('User', form);
        if (result.ok) {
            refreshUserInfo();
        }
    }

    return (
        <ContainerView>
            <ContainerDrawer title='Settings' />
            <View className="rounded-md bg-white justify-center items-center" style={{ width: '95%', height: '95%' }}>
                <Card className='border-gray-200'>
                    <CancelSubmitButton onSubmit={onSubmit} submitText='Save' cancelText='Back' />
                </Card>
                <ScrollView style={[styles.formContainer]}>
                    <Card title='Settings' icon={'settings'} className='border-gray-200'>
                        <Text style={[styles.text]}>Username</Text>
                        <TextInput readOnly={true}
                            style={styles.input}
                            value={form.userName} />
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
        </ContainerView>
    );
};
