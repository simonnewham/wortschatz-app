import { Logo } from '@/components/Logo';
import { useAuthSession } from '@/providers/AuthProvider';
import authService from '@/services/AuthService';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useState } from 'react';
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
        <View className='bg-background h-full w-full items-center justify-center'>
            <View className='max-w-lg w-full'>
                <Card className='shadow-gray-900'>
                    <View className='items-center p-4'>
                        <Logo logoSize={30} />
                        <Text className='tracking-tighter italic pb-2 text-white'>
                            Your personal German learning companion
                        </Text>
                    </View>
                    <View className='items-center'>
                        <TextInput className='p-2 mb-4 w-min-xs w-full max-w-sm rounded-md bg-input text-primary'
                            placeholder='Username'
                            placeholderTextColor='gray'
                            value={email}
                            onChangeText={setEmail} />
                        <TextInput className='p-2 mb-4 w-min-xs w-full max-w-sm rounded-md bg-input text-primary'
                            placeholder='Password'
                            placeholderTextColor='gray'
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword} />
                        <Text className='text-center text-xs text-primary/50 p pb-4'>* Min 8 characters, uppercase, alphanumeric</Text>
                        {error && <Text className='text-red-500 font-bold p-2 font-sans'>Invalid login, please try again.</Text>}
                        <Pressable
                            className={`h-10 w-min-xs w-full max-w-sm rounded-md mt-2 items-center flex-row gap-2 justify-center
                                border-2 border-[#d4fd52] bg-[#d4fd52]/80 hover:bg-[#d4fd52]
                           ${isLoading ? 'opacity-70' : ''}`}
                            onPress={onLogin}
                            disabled={isLoading}>
                            {isLoading ? (
                                <ActivityIndicator className='text-secondary' size="small" />
                            ) : (
                                <>
                                    <MaterialIcons className='text-secondary' name="login" size={24} />
                                    <Text className='text-secondary'>Login</Text>
                                </>
                            )}
                        </Pressable>
                        <Pressable
                            className={`h-10 w-min-xs w-full max-w-sm rounded-md mt-2 items-center flex-row gap-2 justify-center
                                border-primary/50 border-2 bg-primary/80 hover:bg-primary
                           ${isLoading ? 'opacity-70' : ''}`}
                            onPress={onRegister}
                            disabled={isLoading}>
                            {isLoading ? (
                                <ActivityIndicator className='text-secondary' size="small" />
                            ) : (
                                <>
                                    <MaterialIcons className='text-secondary' name="person-add" size={24} />
                                    <Text className='text-secondary'>Register</Text>
                                </>
                            )}
                        </Pressable>
                        {/* <Text className='font-sans pt-5 italic text-white underline'>
                            Forgot Password?
                        </Text> */}
                        <View className='items-center mt-4'>
                            <Text className='text-center text-xs text-primary/50 p pb-4'>Version {process.env.EXPO_PUBLIC_VERSION}</Text>
                        </View>
                    </View>

                </Card>
            </View>
        </View>
    );
};