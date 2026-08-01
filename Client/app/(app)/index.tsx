import ActivityTracker from '@/components/ActivityTracker';
import ContainerView from '@/components/ContainerView';
import { StreakCard } from '@/components/StreakCard';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
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
                    <View className='h-full'>
                        <View className='justify-center items-center flex-row gap-2'>
                            <Avatar>
                                <AvatarFallbackText>WS</AvatarFallbackText>
                            </Avatar>
                            <Text className='font-semibold text-primary p-2' style={{ fontSize: 20 }}>
                                {getGreeting()} {userInfo?.firstName} 👋
                            </Text>
                        </View>
                        <View className='flex-col gap-2'>
                            {/* Row */}
                            <View className='w-full p-2 flex-row gap-2'>
                                <View className='w-1/2'>
                                    <Card className='h-full'>
                                        <View className="w-full p-2 flex-col gap-2">
                                            <Pressable className='border-2 flex-row justify-center p-2 border-primary/25 rounded-md hover:bg-accent/25'
                                                onPress={() => router.navigate('/word/add-word')}>
                                                <MaterialIcons name="add" size={20} color="white" />
                                                <Text className='font-semibold text-primary'>Add a new Word</Text>
                                            </Pressable>
                                            <Pressable className='border-2 flex-row justify-center p-2 border-primary/25 rounded-md hover:bg-accent/25'
                                                onPress={() => router.navigate('/phrase/add-phrase')}>
                                                <MaterialIcons name="add" size={20} color="white" />
                                                <Text className='font-semibold text-primary'>Add a new phrase</Text>
                                            </Pressable>
                                            <Pressable className='border-2 flex-row justify-center p-2 border-primary/25 rounded-md hover:bg-accent/25'
                                                onPress={() => router.navigate('/note/add-note')}>
                                                <MaterialIcons name="add" size={20} color="white" />
                                                <Text className='font-semibold text-primary'>Add a new note</Text>
                                            </Pressable>
                                        </View>
                                    </Card>
                                </View>
                                <View className='w-1/2'>
                                    <StreakCard />
                                </View>
                            </View>
                            <View className='w-full p-2 flex-row gap-2'>
                                <View className='w-1/2'>
                                    {/* TODO: Move out */}
                                    <Card className='h-full'>
                                        <View className="flex-row w-full py-2">
                                            <View className="flex-1 px-2 items-center justify-between">
                                                <Text className='pb-1 text-primary font-sans text-xs'>Total Words</Text>
                                                <Text className='text-md font-bold text-primary mb-2'>{stats?.wordCount ?? 0}</Text>
                                                <Text className='pb-1 text-primary font-sans text-xs'>Last Word</Text>
                                                <Text className='text-sm font-sans text-center text-primary w-full' numberOfLines={2} ellipsizeMode="tail">
                                                    {stats?.lastWord || '-'}
                                                </Text>
                                            </View>
                                            <View className="flex-1 px-2 items-center justify-between border-l border-gray-200">
                                                <Text className='pb-1 text-primary font-sans text-xs'>Total Phrases</Text>
                                                <Text className='text-md font-bold text-primary mb-2'>{stats?.phraseCount ?? 0}</Text>
                                                <Text className='pb-1 text-primary font-sans text-xs'>Last Phrase</Text>
                                                <Text className='text-sm font-sans text-center text-primary w-full' numberOfLines={2} ellipsizeMode="tail">
                                                    {stats?.lastPhrase || '-'}
                                                </Text>
                                            </View>
                                        </View>
                                    </Card>
                                </View>
                                <View className='w-1/2'>
                                    <ActivityTracker />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ContainerContent>
        </ContainerView >
    );
}
