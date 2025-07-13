import { useStyling } from '@/hooks/useStyling';
import { useAuthSession } from '@/providers/AuthProvider';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Card } from '../components/Card';

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
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Image style={{ padding: 10, width: 400, height: 100 }} source={require('../assets/images/logo.jpg')} />
            <Text style={[{ paddingBottom: 20, fontStyle: 'italic', color: theme.colors.text }]}>
                Your personal German learning companion
            </Text>
            <Card>
                <View style={{ alignItems: 'center' }}>
                    <TextInput style={[styles.button, styles.textInput, { marginBottom: 10, borderColor: error ? 'red' : 'gray' }]}
                        placeholder='Email'
                        placeholderTextColor='gray'
                        value={email}
                        onChangeText={setEmail} />
                    <TextInput style={[styles.button, styles.textInput, { borderColor: error ? 'red' : 'gray' }]}
                        placeholder='Password' placeholderTextColor='gray'
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword} />
                    {error && <Text style={{ padding: 10, color: 'red' }}>An error occurred, please try again.</Text>}
                    <Pressable style={[styles.button, { marginTop: 15, backgroundColor: 'red' }]} onPress={onLogin}>
                        <MaterialIcons name="login" size={24} color="white" />
                        <Text style={[{ color: 'white' }]}>
                            Login</Text>
                    </Pressable>
                    <Pressable style={[styles.button, { backgroundColor: 'yellow' }]} onPress={onRegister}>
                        <MaterialIcons name="person-add" size={24} color="black" />
                        <Text style={[{ color: 'black' }]}>
                            Anmelden
                        </Text>
                    </Pressable>
                    {/* <Text style={[styles.buttonText, { paddingTop: 50, color: 'white' }]}>
                        Forgot Password?
                    </Text> */}
                </View>
            </Card>
        </View>
    );
};