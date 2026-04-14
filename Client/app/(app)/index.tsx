import { useStyling } from '@/hooks/useStyling';
import { useAuthSession } from '@/providers/AuthProvider';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
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
            <ScrollView style={{ width: 860, maxWidth: '100%', }}>
                <View style={{ alignItems: 'center' }}>
                    <Card className='bg-gradient-to-r from-cyan-600 to-blue-800'>
                        <View style={{ alignItems: 'center' }}>
                            <Text className='font-sans text-white' style={[customStyles.header, { fontSize: 20 }]}>
                                {userInfo?.userName || '<<username>>'}
                            </Text>
                        </View>
                    </Card>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Card>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ padding: 10, width: 640, maxWidth: '100%', alignItems: 'center' }}>
                                <Pressable className='bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md' style={[styles.button]}
                                    onPress={() => router.push('/add-word')}>
                                    <MaterialIcons name="add" size={20} color="white" />
                                    <Text className='font-sans' style={[customStyles.buttonText, { color: 'white' }]}>
                                        Add a new Word
                                    </Text>
                                </Pressable>
                                <Pressable className='bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md' style={[styles.button]}
                                    onPress={() => router.push('/add-phrase')}>
                                    <MaterialIcons name="add" size={20} color="white" />
                                    <Text className='font-sans' style={[customStyles.buttonText, { color: 'white' }]}>
                                        Add a new phrase</Text>
                                </Pressable>
                                <Pressable className='bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md' style={[styles.button]}
                                    onPress={() => router.push('/word-list')}>
                                    <MaterialIcons name="view-list" size={20} color="white" />
                                    <Text className='font-sans' style={[customStyles.buttonText, { color: 'white' }]}>
                                        View your Wortschatz
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </Card>
                </View>
                {/* <View style={{ alignItems: 'center' }}>
                    <AddWordComponent />
                </View> */}
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
