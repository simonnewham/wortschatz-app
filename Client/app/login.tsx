import { useAuthSession } from '@/providers/SessionProvider';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme, useTheme } from '@react-navigation/native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Card } from '../components/Card';

export default function Login() {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), []);

    const { signIn } = useAuthSession();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    const onSignUp = async () => {
        setError(false);
        try {
            await signIn(email, password);
            router.replace('/(app)');
        }
        catch (e) {
            setError(true);
        }
    }

    const onLogin = async () => {
        setError(false);
        try {
            await signIn(email, password);
            router.replace('/(app)');
        }
        catch (e) {
            setError(true);
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Image style={{ padding: 10, width: 400, height: 100 }} source={require('../assets/images/logo.jpg')} />
            <Text style={[styles.header, { fontStyle: 'italic', color: theme.colors.text }]}>
                Your personal German learning companion
            </Text>
            <Card>
                <View style={{ alignItems: 'center' }}>
                    <TextInput style={[styles.button, styles.textInput, { borderColor: error ? 'red' : 'gray' }]}
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
                    <Pressable style={[styles.button, { backgroundColor: 'yellow' }]} onPress={onSignUp}>
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
}

const getStyles = (theme: Theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: theme.colors.background,
            width: "100%",
        },
        header: {
            paddingBottom: 20
        },
        button: {
            height: 50,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: 'gray',
            width: '100%',
            maxWidth: 500,
            alignItems: 'center',
            flexDirection: 'row',
            margin: 5,
            justifyContent: 'center',
            gap: 10,
            paddingVertical: 20,
        },
        textInput: {
            backgroundColor: "#212125",
            color: "white",
            padding: 10
        }
    });
};