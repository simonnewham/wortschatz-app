import ContainerView from '@/components/ContainerView';
import { useStyling } from '@/hooks/useStyling';
import { IUserStatsSummaryDto } from '@/models/IUserStatsSummaryDto';
import { useAuthSession } from '@/providers/AuthProvider';
import baseEntityDataService from '@/services/BaseEntityDataService';
import dataService from '@/services/DataService';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Card } from '../../components/Card';
import { ContainerContent } from '../../components/ContainerContent';

export default function Home() {
    const { userInfo } = useAuthSession();
    const styles = useStyling();

    // loading states
    const [stats, setStats] = useState<IUserStatsSummaryDto | null>(null);

    const getStats = useCallback(async () => {
        const result = await dataService.Get('User/getStatsSummary');
        if (result.ok) {
            const stats = await result.json();
            setStats(stats);
        }
    }, [baseEntityDataService]);

    // onMount
    useEffect(() => {
        getStats();
    }, []);

    const getGreeting = () => {
        const hour = new Date().getHours();
        return hour < 12 ? 'Guten Morgen' : hour < 18 ? 'Guten Tag' : 'Guten Abend';
    };

    return (
        <ContainerView>
            <ContainerContent>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text className='font-sans text-black p-2' style={{ fontSize: 20 }}>
                            {getGreeting()}, {userInfo?.firstName}
                        </Text>
                    </View>

                </View>
                <View style={{ alignItems: 'center' }}>
                    <Card className='border-gray-200'>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ padding: 10, width: 640, maxWidth: '100%', alignItems: 'center' }}>
                                <Pressable className='border-2 border-zinc-800 rounded-md hover:border-accent' style={[styles.button]}
                                    onPress={() => router.navigate('/word/add-word')}>
                                    <MaterialIcons name="add" size={20} color="black" />
                                    <Text className='font-sans text-black'>
                                        Add a new Word
                                    </Text>
                                </Pressable>
                                <Pressable className='border-2 border-zinc-800 rounded-md hover:border-accent' style={[styles.button]}
                                    onPress={() => router.navigate('/phrase/add-phrase')}>
                                    <MaterialIcons name="add" size={20} color="black" />
                                    <Text className='font-sans text-black'>
                                        Add a new phrase</Text>
                                </Pressable>
                                <Pressable className='border-2 border-zinc-800 rounded-md hover:border-accent' style={[styles.button]}
                                    onPress={() => router.navigate('/note/add-note')}>
                                    <MaterialIcons name="add" size={20} color="black" />
                                    <Text className='font-sans text-black'>
                                        Add a new note</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Card>
                </View>
                <View style={{ alignItems: 'center' }}>
                    {/* TODO: Move out */}
                    <Card className='border-gray-100'>
                        <View style={{ flex: 2, flexDirection: 'row', width: '100%' }}>
                            <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
                                <Text className='p-2 text-gray-500'>Total Words</Text>
                                <Text className='text-sm'>{stats?.wordCount}</Text>
                                <Text className='p-2 text-gray-500'>Last Word</Text>
                                <Text className='text-sm'>{stats?.lastWord}</Text>
                            </View>
                            <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
                                <Text className='p-2 text-gray-500'>Total Phrases</Text>
                                <Text className='text-sm'>{stats?.phraseCount} </Text>
                                <Text className='p-2 text-gray-500'>Last Phrase</Text>
                                <Text className='text-sm text-align-center'>{stats?.lastPhrase}</Text>
                            </View>
                        </View>
                    </Card>
                </View>
            </ContainerContent>
        </ContainerView >
    );
}
