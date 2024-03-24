import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { auth } from '../firebase.config';
import { Image } from 'expo-image';
import { Card } from '../components/Card';
import { Footer } from '../components/Footer';
import { ScrollView } from 'react-native-gesture-handler';

export default function Home() {
    const theme = useTheme();
    const user = useMemo(() => auth.currentUser, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView>
                <Card backgroundColour='#121212'>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={{ width: 50, height: 50 }} source='../assets/images/favicon.png'></Image>
                        <Text style={[styles.header, { fontSize: 20, color: theme.colors.text }]}>
                            Welcome back {user?.email}
                        </Text>
                    </View>
                </Card>

                <Card backgroundColour='#121212'>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ padding: 10, width: 640, maxWidth: '100%' }}>
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

                </Card>

                {/* TODO: Move out */}
                <Card backgroundColour='#121212'>
                    <View style={{ flex: 2, flexDirection: 'row', width: '100%' }}>
                        <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
                            <Text style={styles.headerText}>Total Words</Text>
                            <Text style={styles.overviewText}>?</Text>
                            <Text style={styles.headerText}>Last Word</Text>
                            <Text style={styles.overviewText}>?</Text>
                        </View>
                        <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
                            <Text style={styles.headerText}>
                                Total Phrases
                            </Text>
                            <Text style={styles.overviewText}>
                                ?
                            </Text>
                            <Text style={styles.headerText}>
                                Last Phrase
                            </Text>
                            <Text style={styles.overviewText}>
                                ?
                            </Text>
                        </View>
                    </View>
                </Card>

                <Footer />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
        borderColor: 'gray',
        width: '100%',
        margin: 2,
    },
    buttonDisabled: {
        opacity: 0.5
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 5
    },
    overviewText: {
        color: 'white',
        fontSize: 24
    }
});
