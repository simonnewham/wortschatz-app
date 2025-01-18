import { Theme, useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { auth } from '../firebase.config';
import { Card } from '../components/Card';
import { Footer } from '../components/Footer';

export default function Login() {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // todo: trigger toast
    const [error, setError] = useState(false);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            if (user) {
                router.replace('/home');
            }
        })
        return unsub;
    }, []);

    const onSignUp = async () => {
        setError(false);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (userCredential) {
                const user = userCredential.user;
                // todo: store in session
            }
        }
        catch (e) {
            setError(true);
            // todo: show error
        }
    }

    const onLogin = () => {
        setError(false);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // todo: store in session
            })
            .catch((error) => {
                // alert(error);
                setError(true);
                // todo: show error
            });
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Card>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, paddingBottom: 5 }}>🇩🇪🇦🇹🇨🇭</Text>
                    <Text style={[styles.header, { fontSize: 20, color: theme.colors.text }]}>
                        Welcome to Wortschatz
                    </Text>

                    <Text style={[styles.header, { fontStyle: 'italic', color: theme.colors.text }]}>
                        Your personal German learning companion
                    </Text>
                    <TextInput style={[styles.button, styles.textInput, { borderColor: error ? 'red' : 'gray' }]}
                        placeholder='Email'
                        placeholderTextColor='gray'
                        value={email}
                        onChangeText={setEmail} />
                    <TextInput style={[styles.button, styles.textInput, { borderColor: error ? 'red' : 'gray' }]}
                        placeholder='Password' placeholderTextColor='gray'
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}/>

                    {error && <Text style={{ padding: 10, color: 'red' }}>An error occurred, please try again.</Text>}

                    <Pressable style={[styles.button, { backgroundColor: 'red' }]} onPress={onLogin}>
                        <Text style={[styles.buttonText, { color: 'white' }]}>
                            Login</Text>
                    </Pressable>
                    <Pressable style={[styles.button, { backgroundColor: 'yellow' }]} onPress={onSignUp}>
                        <Text style={[styles.buttonText, { color: 'black' }]}>
                            Register
                        </Text>
                    </Pressable>
                    <Text style={[styles.buttonText, { paddingTop: 10, color: 'white' }]}>
                            Forgot Password?
                        </Text>
                </View>
            </Card>
            <Footer />
        </View>
    );
}

const getStyles = (theme: Theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: 540,
            maxWidth: "100%",
            padding: 10
        },
        header: {
            paddingBottom: 20
        },
        buttonText: {
            margin: 'auto'
        },
        button: {
            height: 50,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: 'gray',
            width: '100%',
            margin: 2
        },
        textInput: {
            backgroundColor: "#212125",
            color: "white",
            padding: 10
        }
    });
};