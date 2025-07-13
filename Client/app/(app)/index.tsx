import { SettingsButton } from '@/components/SettingsButton';
import { SignOut } from '@/components/SignOut';
import { useStyling } from '@/hooks/useStyling';
import { useAuthSession } from '@/providers/AuthProvider';
import { useTheme } from '@react-navigation/native';
import { Image } from 'expo-image';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../../components/Card';

export default function Home() {
    const theme = useTheme();
    const { userInfo } = useAuthSession();
    const styles = useStyling();

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
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: () => <Image style={{ width: 200, height: 50 }} source={require('../../assets/images/logo.jpg')} />,
                    headerRight: () => <><SignOut /><SettingsButton /></>
                }}
            />
            <ScrollView style={{ width: 860, maxWidth: '100%', }}>
                <View style={{ alignItems: 'center' }}>
                    <Card>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={[customStyles.header, { fontSize: 20, color: theme.colors.text }]}>
                                Hallo {userInfo?.Username || 'Wortschatz'}!
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
                                    <Text style={[customStyles.buttonText, { color: 'white' }]}>
                                        Neues Wort Erstellen
                                    </Text>
                                </Pressable>
                                <Pressable style={[styles.button, { backgroundColor: 'red' }]}
                                    onPress={() => router.push('/add-phrase')}>
                                    <Text style={[customStyles.buttonText, { color: 'white' }]}>
                                        Add a new phrase</Text>
                                </Pressable>
                                <Pressable style={[styles.button, { backgroundColor: 'yellow' }]}>
                                    <Text style={[customStyles.buttonText, { color: 'black' }]}>
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
                                <Text style={customStyles.headerText}>Total Words</Text>
                                <Text style={customStyles.overviewText}>{word?.count}</Text>
                                <Text style={customStyles.headerText}>Last Word</Text>
                                <Text style={customStyles.overviewText}>{word?.word}</Text>
                            </View>
                            <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
                                <Text style={customStyles.headerText}>Total Phrases</Text>
                                <Text style={customStyles.overviewText}>{phrase?.count} </Text>
                                <Text style={customStyles.headerText}>Last Phrase</Text>
                                <Text style={customStyles.overviewText}>{phrase?.word}</Text>
                            </View>
                        </View>
                    </Card>
                </View>

            </ScrollView>
        </View>
    );
}

const customStyles = StyleSheet.create({
    header: {
        fontSize: 14,
        padding: 10
    },
     buttonText: {
        margin: 'auto'
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
