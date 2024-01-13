import { Text, StyleSheet, View, Pressable, Dimensions, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';

export default function Home() {
    const colorScheme = useColorScheme();

    const theme = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.header, { fontSize: 20, color: theme.colors.text }]}>Welcome to Wortschatz! 🇩🇪</Text>
            <Text style={[styles.header, { fontStyle: 'italic', color: theme.colors.text }]}>Your personal German learning companion</Text>

            <View style={{ padding: 10, width: 540, maxWidth: '100%' }}>
                <Pressable style={[styles.button, { backgroundColor: 'black' }]} onPress={() => router.push('/add-word')}>
                    <Text style={[styles.buttonText, { color: 'white' }]}>Add new word</Text>
                </Pressable>

                <Pressable style={[styles.button, { backgroundColor: 'red' }]} >
                    <Text style={[styles.buttonText, { color: 'white' }]}>Add a new phrase</Text></Pressable>
                <Pressable style={[styles.button, { backgroundColor: 'yellow' }]} >
                    <Text style={[styles.buttonText, { color: 'black' }]}>View your word list</Text></Pressable>
                {/* <Pressable style={[styles.button, { borderWidth: 1, borderColor: theme.colors.text }]} >
                    <Text style={[styles.buttonText, { color: theme.colors.text }]}>Vocab quiz</Text></Pressable> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
