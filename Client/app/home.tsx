import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Home() {
    const theme = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View>
                <Text style={[styles.header, { fontSize: 20, color: theme.colors.text }]}>
                    Welcome to Wortschatz! 🇩🇪
                </Text>
            </View>
            <View>
                <Text style={[styles.header, { fontStyle: 'italic', color: theme.colors.text }]}>
                    Your personal German learning companion
                </Text>
            </View>
            <View style={{ padding: 10, width: 540, maxWidth: '100%' }}>
                <Pressable style={[styles.button, { backgroundColor: 'black' }]} onPress={() => router.push('/add-word')}>
                    <Text style={[styles.buttonText, { color: 'white' }]}>
                        Add new word
                    </Text>
                </Pressable>
                <Pressable style={[styles.button, { backgroundColor: 'red' }]} onPress={() => router.push('/add-phrase')}>
                    <Text style={[styles.buttonText, { color: 'white' }]}>
                        Add a new phrase</Text>
                </Pressable>
                <Pressable style={[styles.button, { backgroundColor: 'yellow' }]} onPress={() => router.push('/(word-list-tabs)')}>
                    <Text style={[styles.buttonText, { color: 'black' }]}>
                        View your Wortschatz
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'column',
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
    }
});
