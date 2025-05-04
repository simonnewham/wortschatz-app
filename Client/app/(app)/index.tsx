import { useTheme } from '@react-navigation/native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../components/Card';

export default function Home() {
    const theme = useTheme();
    //const user = useMemo(() => auth.currentUser, []);

    // loading states
    const [word, setWord] = useState<{ count: number, word: string }>({ count: 0, word: '?' });
    const [phrase, setPhrase] = useState<{ count: number, word: string }>({ count: 0, word: '?' });

    // onMount
    useEffect(() => {
        const fetchWords = async () => {
            const wordList: string | any[] = [];
            const phraseList: string | any[] = [];

            setWord({ count: wordList?.length, word: wordList[0]?.nativeWord });
            setPhrase({ count: phraseList?.length, word: phraseList[0]?.nativePhrase });
        }
        fetchWords();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView style={{ width: 720, maxWidth: '100%', }}>
                <View style={{ alignItems: 'center' }}>
                    <Card>
                        <View style={{ alignItems: 'center' }}>
                            <Image style={{ width: 50, height: 50 }} source='../../assets/images/favicon.png' />
                            <Text style={[styles.header, { fontSize: 20, color: theme.colors.text }]}>
                                Hello
                            </Text>
                        </View>
                    </Card>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Card>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ padding: 10, width: 640, maxWidth: '100%' }}>
                                <Pressable style={[styles.button, { backgroundColor: 'black' }]}
                                    onPress={() => router.push('/add-word')}>
                                    <Text style={[styles.buttonText, { color: 'white' }]}>
                                        Neues Wort Erstellen / Add new word
                                    </Text>
                                </Pressable>
                                <Pressable style={[styles.button, { backgroundColor: 'red' }]}
                                    onPress={() => router.push('/add-phrase')}>
                                    <Text style={[styles.buttonText, { color: 'white' }]}>
                                        Add a new phrase</Text>
                                </Pressable>
                                <Pressable style={[styles.button, { backgroundColor: 'yellow' }]}>
                                    <Text style={[styles.buttonText, { color: 'black' }]}>
                                        View your Wortschatz
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </Card>
                </View>

                <View style={{ alignItems: 'center' }}>
                    {/* TODO: Move out */}
                    <Card>
                        <View style={{ flex: 2, flexDirection: 'row', width: '100%' }}>
                            <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
                                <Text style={styles.headerText}>Total Words</Text>
                                <Text style={styles.overviewText}>{word?.count}</Text>
                                <Text style={styles.headerText}>Last Word</Text>
                                <Text style={styles.overviewText}>{word?.word}</Text>
                            </View>
                            <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
                                <Text style={styles.headerText}>Total Phrases</Text>
                                <Text style={styles.overviewText}>{phrase?.count} </Text>
                                <Text style={styles.headerText}>Last Phrase</Text>
                                <Text style={styles.overviewText}>{phrase?.word}</Text>
                            </View>
                        </View>
                    </Card>
                </View>

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
        justifyContent: 'center',
    },
    header: {
        fontSize: 14,
        padding: 10
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
        marginVertical: 2
        //margin: 2,
    },
    headerText: {
        color: 'gray',
        fontSize: 14,
        padding: 5
    },
    overviewText: {
        color: 'white',
        fontSize: 18
    }
});
