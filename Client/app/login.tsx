import { Logo } from '@/components/Logo';
import { useStyling } from '@/hooks/useStyling';
import { useAuthSession } from '@/providers/AuthProvider';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Card } from '../components/Card';
import '../global.css';

export default function Login() {
    const styles = useStyling();

    const { login, register } = useAuthSession();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onLogin = async () => {
        setError(false);
        setIsLoading(true);
        login(email, password).then(() => {
            setIsLoading(false);
            router.replace('/(app)');
        }).catch((e) => {
            setIsLoading(false);
            setError(true);
        });
    }

    const onRegister = async () => {
        setError(false);
        setIsLoading(true);
        register(email, password).then(() =>
            // Call login on success
            onLogin()
        ).catch((e) => {
            setIsLoading(false);
            setError(true);
        });
    }

    return (
        <View className='bg-background_primary' style={[styles.container]}>
            <Card className='bg-zinc-900 border border-zinc-800'>
                <View className='items-center m-5'>
                    <Logo />
                    <Text className='tracking-tighter italic pb-2 text-white'>
                        Your personal German learning companion
                    </Text>
                </View>
            </Card>
            <Card className='bg-zinc-900 border border-zinc-800'>
                <View className='items-center m-5 min-w-lg'>
                    <TextInput className='p-2 mb-4 w-min-xs w-full max-w-sm rounded-md bg-white h-10 text-black border-2 border-stone-300'
                        placeholder='Username'
                        placeholderTextColor='gray'
                        value={email}
                        onChangeText={setEmail} />
                    <TextInput className='p-2 mb-4 w-min-xs w-full max-w-sm rounded-md bg-white h-10 text-black border-2 border-stone-300'
                        placeholder='Password'
                        placeholderTextColor='gray'
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword} />
                    {error && <Text className='text-red-500 font-bold p-2 font-sans'>Invalid login, please try again.</Text>}
                    <Pressable
                        className={`h-10 w-min-xs w-full max-w-sm rounded-md mt-2 bg-accent/95 hover:bg-accent
                           border-b-2 border-accent items-center flex-row gap-2 justify-center ${isLoading ? 'opacity-70' : ''}`}
                        onPress={onLogin}
                        disabled={isLoading}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color="black" />
                        ) : (
                            <>
                                <MaterialIcons name="login" size={24} color="black" />
                                <Text className='text-text'>Login</Text>
                            </>
                        )}
                    </Pressable>
                    <Pressable
                        className={`h-10 w-min-xs w-full max-w-sm rounded-md mt-2 bg-accent/95 hover:bg-accent border-b-2 border-accent
                            items-center flex-row gap-2 justify-center ${isLoading ? 'opacity-70' : ''}`}
                        onPress={onRegister}
                        disabled={isLoading}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color="black" />
                        ) : (
                            <>
                                <MaterialIcons name="person-add" size={24} color="black" />
                                <Text className='text-text'>
                                    Register
                                </Text>
                            </>
                        )}
                    </Pressable>
                    <Text className='font-sans pt-5 italic text-white underline'>
                        Forgot Password?
                    </Text>
                </View>
            </Card>
        </View>
    );
};