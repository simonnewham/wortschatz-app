import ContainerView from '@/components/ContainerView';
import { StreakCard } from '@/components/StreakCard';
import { useStyling } from '@/hooks/useStyling';
import { IUserStatsSummaryDto } from '@/models/IUserStatsSummaryDto';
import { useAuthSession } from '@/providers/AuthProvider';
import baseEntityDataService from '@/services/BaseEntityDataService';
import dataService from '@/services/DataService';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
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
                <ScrollView className='w-full'>
                    <View className='h-screen'>
                        <View className='justify-center items-center'>
                            <Text className='font-semibold text-black p-2' style={{ fontSize: 20 }}>
                                {getGreeting()} {userInfo?.firstName} 👋
                            </Text>
                        </View>
                        <View className='w-full p-2'>
                            <Card className='border-gray-200'>
                                <View style={{ alignItems: 'center' }}>
                                    <View className="w-full max-w-lg p-2 items-center">
                                        <Pressable className='border-2 border-zinc-300 rounded-md hover:bg-accent/25' style={[styles.button]}
                                            onPress={() => router.navigate('/word/add-word')}>
                                            <MaterialIcons name="add" size={20} color="black" />
                                            <Text className='font-semibold text-black'>Add a new Word</Text>
                                        </Pressable>
                                        <Pressable className='border-2 border-zinc-300 rounded-md hover:bg-accent/25' style={[styles.button]}
                                            onPress={() => router.navigate('/phrase/add-phrase')}>
                                            <MaterialIcons name="add" size={20} color="black" />
                                            <Text className='font-semibold text-black'>Add a new phrase</Text>
                                        </Pressable>
                                        <Pressable className='border-2 border-zinc-300 rounded-md hover:bg-accent/25' style={[styles.button]}
                                            onPress={() => router.navigate('/note/add-note')}>
                                            <MaterialIcons name="add" size={20} color="black" />
                                            <Text className='font-semibold text-black'>Add a new note</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Card>
                        </View>
                        <View className='w-full p-2'>
                            <StreakCard />
                        </View>
                        {/* <View className='w-full p-2'>
                            <ActivityTracker />
                        </View> */}
                        <View className='w-full p-2'>
                            {/* TODO: Move out */}
                            <Card className='border-gray-100'>
                                <View className="flex-row w-full py-2">
                                    <View className="flex-1 px-2 items-center justify-between">
                                        <Text className='pb-1 text-gray-500 font-sans text-xs'>Total Words</Text>
                                        <Text className='text-md font-bold text-zinc-800 mb-2'>{stats?.wordCount ?? 0}</Text>
                                        <Text className='pb-1 text-gray-500 font-sans text-xs'>Last Word</Text>
                                        <Text className='text-sm font-sans text-center text-zinc-700 w-full' numberOfLines={2} ellipsizeMode="tail">
                                            {stats?.lastWord || '-'}
                                        </Text>
                                    </View>
                                    <View className="flex-1 px-2 items-center justify-between border-l border-gray-200">
                                        <Text className='pb-1 text-gray-500 font-sans text-xs'>Total Phrases</Text>
                                        <Text className='text-md font-bold text-zinc-800 mb-2'>{stats?.phraseCount ?? 0}</Text>
                                        <Text className='pb-1 text-gray-500 font-sans text-xs'>Last Phrase</Text>
                                        <Text className='text-sm font-sans text-center text-zinc-700 w-full' numberOfLines={2} ellipsizeMode="tail">
                                            {stats?.lastPhrase || '-'}
                                        </Text>
                                    </View>
                                </View>
                            </Card>
                        </View>
                    </View>
                </ScrollView>
            </ContainerContent>
        </ContainerView >
    );
}
