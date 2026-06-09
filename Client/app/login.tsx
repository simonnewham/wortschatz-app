import { Logo } from '@/components/Logo';
import { useAuthSession } from '@/providers/AuthProvider';
import authService from '@/services/AuthService';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Card } from '../components/Card';
import '../global.css';

export default function Login() {
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

    useFocusEffect(() => {
        const onLogin = async () => {
            try {
                if (await authService.isAuthenticated()) {
                    router.replace('/(app)');
                }
            } catch {
                //
            }
        }
        onLogin();
    });

    return (
        <View className='bg-gray-900 h-screen w-full items-center justify-center'>
            <View className='max-w-lg w-full'>
                <Card className='bg-zinc-900 shadow-gray-900'>
                    <View className='items-center p-4'>
                        <Logo />
                        <Text className='tracking-tighter italic pb-2 text-white'>
                            Your personal German learning companion
                        </Text>
                    </View>
                    <View className='items-center m-5 min-w-lg'>
                        <TextInput className='p-2 mb-4 w-min-xs w-full max-w-sm rounded-md bg-white h-10 text-black border-2 border-stone-300'
                            placeholder='Username'
                            placeholderTextColor='gray'
                            value={email}
                            onChangeText={setEmail} />
                        <TextInput className='p-2 mb-4 w-min-xs w-full max-w-sm rounded-md bg-white h-10 text-black border-2 border-stone-300'
                            placeholder='Password'
                            placeholderTextColor='gray'
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword} />
                        <Text className='text-center text-xs text-accent/50 p pb-4'>* Min 8 characters, uppercase, alphanumeric</Text>
                        {error && <Text className='text-red-500 font-bold p-2 font-sans'>Invalid login, please try again.</Text>}
                        <Pressable
                            className={`h-10 w-min-xs w-full max-w-sm rounded-md mt-2 bg-accent/80 hover:bg-accent
                           items-center flex-row gap-2 justify-center ${isLoading ? 'opacity-70' : ''}`}
                            onPress={onLogin}
                            disabled={isLoading}>
                            {isLoading ? (
                                <ActivityIndicator size="small" color="black" />
                            ) : (
                                <>
                                    <MaterialIcons name="login" size={24} color="black" />
                                    <Text className='text-black'>Login</Text>
                                </>
                            )}
                        </Pressable>
                        <Pressable
                            className={`h-10 w-min-xs w-full max-w-sm rounded-md mt-2 border-accent/50 border-2 hover:border-accent
                                items-center flex-row gap-2 justify-center ${isLoading ? 'opacity-70' : ''}`}
                            onPress={onRegister}
                            disabled={isLoading}>
                            {isLoading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <>
                                    <MaterialIcons name="person-add" size={24} color="white" />
                                    <Text className='text-white'>Register</Text>
                                </>
                            )}
                        </Pressable>
                        {/* <Text className='font-sans pt-5 italic text-white underline'>
                            Forgot Password?
                        </Text> */}
                    </View>
                    <View>
                        <Text className='text-center text-xs text-white/50 p pb-4'>Version {process.env.EXPO_PUBLIC_VERSION}</Text>
                    </View>
                </Card>
            </View>
        </View>
    );
};