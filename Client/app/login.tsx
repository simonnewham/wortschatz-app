import { useStyling } from '@/hooks/useStyling';
import { useAuthSession } from '@/providers/AuthProvider';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Card } from '../components/Card';
import '../global.css';

export default function Login() {
    const theme = useTheme();
    const styles = useStyling();

    const { login, register } = useAuthSession();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const onLogin = async () => {
        setError(false);
        login(email, password).then(() =>
            router.replace('/(app)')
        ).catch((e) => {
            setError(true);
        });
    }

    const onRegister = async () => {
        register(email, password).then(() =>
            // Call login on success
            void onLogin()
        ).catch((e) => {
            setError(true);
        });
    }

    return (
        <View className='bg-neutral' style={[styles.container]}>
            <Card className='bg-gradient-to-r from-cyan-500 to-blue-600'>
                <View className='items-center m-5'>
                    <Text className='font-sans font-bold text-4xl pb-2 text-white'>
                        Wortschatz
                    </Text>
                    <Text className='font-sans italic pb-2 text-white'>
                        Your personal German learning companion
                    </Text>
                </View>
            </Card>
            <Card>
                <View className='items-center m-5'>
                    <TextInput className='p-2 mb-4 rounded-md w-1/2 bg-white h-10  text-black border-2 border-stone-300'
                        placeholder='Email'
                        placeholderTextColor='gray'
                        value={email}
                        onChangeText={setEmail} />
                    <TextInput className='p-2 mb-4 rounded-md w-1/2 bg-white h-10 text-black border-2 border-stone-300'
                        placeholder='Password'
                        placeholderTextColor='gray'
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword} />
                    {error && <Text style={{ padding: 10, color: 'red' }}>An error occurred, please try again.</Text>}
                    <Pressable className='h-10 w-1/2 rounded-md mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 items-center flex-row gap-2 justify-center'
                        onPress={onLogin}>
                        <MaterialIcons name="login" size={24} color="white" />
                        <Text className='text-white'>
                            Login</Text>
                    </Pressable>
                    <Pressable className='h-10 w-1/2 rounded-md mt-2 bg-gradient-to-r from-cyan-600 to-blue-800 items-center flex-row gap-2 justify-center'
                        onPress={onRegister}>
                        <MaterialIcons name="person-add" size={24} color="white" />
                        <Text className='text-white'>
                            Register
                        </Text>
                    </Pressable>
                    <Text className='font-sans pt-5 italic text-black underline'>
                        Forgot Password?
                    </Text>
                </View>
            </Card>
        </View>
    );
};