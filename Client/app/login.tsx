import { Theme, useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { auth } from '../firebase.config';

export default function Login() {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            if (user) {
                router.replace('/home');
            }
        })
        return unsub;
    }, []);

    const onSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // todo: store in session
            })
            .catch((error) => {
                alert(error);
                // todo: show error
            });
    }

    const onLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // todo: store in session
            })
            .catch((error) => {
                alert(error);
                // todo: show error
            });
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.header, { fontSize: 20, color: theme.colors.text }]}>
                Welcome to Wortschatz! 🇩🇪
            </Text>
            <Text style={[styles.header, { fontStyle: 'italic', color: theme.colors.text }]}>
                Your personal German learning companion
            </Text>

            <TextInput style={[styles.button, styles.textInput]} placeholder='Email' value={email}
                onChangeText={setEmail} ></TextInput>
            <TextInput style={[styles.button, styles.textInput]} placeholder='Password'
                secureTextEntry value={password} onChangeText={setPassword}></TextInput>

            <Pressable style={[styles.button, { backgroundColor: 'red' }]} onPress={onLogin}>
                <Text style={[styles.buttonText, { color: 'white' }]}>
                    Login</Text>
            </Pressable>
            <Pressable style={[styles.button, { backgroundColor: 'yellow' }]} onPress={onSignUp}>
                <Text style={[styles.buttonText, { color: 'black' }]}>
                    Register
                </Text>
            </Pressable>
        </View>
    );
}

const getStyles = (theme: Theme) => {
    return StyleSheet.create({
        container: {
            flex: 2,
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
            borderColor: 'white',
            width: '100%',
            margin: 2
        },
        textInput: {
            color: theme.colors.text,
        }
    });
};