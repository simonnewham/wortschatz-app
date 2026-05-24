import userService from '@/services/UserService';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Card } from './Card';

export function StreakCard() {
    const [streaks, setStreaks] = useState<{ wordStreak: number; noteStreak: number; wordTarget: number; noteTarget: number } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchStreaks = useCallback(async () => {
        try {
            setIsLoading(true);
            const result = await userService.getStreaks();
            setStreaks(result);
        } catch (error) {
            console.error(error, { logMessage: 'Error fetching streaks in StreakCard' });
        } finally {
            setIsLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchStreaks();
        }, [fetchStreaks])
    );

    const handleReset = useCallback(async () => {
        fetchStreaks();
    }, [fetchStreaks]);

    if (isLoading) {
        return (
            <Card className='border-gray-200 p-4'>
                <ActivityIndicator size="small" color="#ea580c" />
            </Card>
        );
    }

    return (
        <Card className='border-gray-200 p-4'>
            <Text className="text-lg font-sans mb-2 text-center text-zinc-900">⚡ Activity Streaks</Text>
            <View className="flex-row justify-around w-full py-2">
                <View className="items-center flex-1">
                    <Text className="text-gray-500 mb-1 font-sans">Word Streak</Text>
                    <Text className="text-xl mb-1">
                        {streaks?.wordStreak && streaks.wordStreak > 0 ? '🔥' : '❄️'}
                    </Text>
                    <Text className="text-lg font-semibold text-zinc-800">
                        {streaks?.wordStreak ?? 0} / {streaks?.wordTarget ?? 10} days
                    </Text>
                </View>
                <View className="items-center flex-1 border-l border-gray-200">
                    <Text className="text-gray-500 mb-1 font-sans">Note Streak</Text>
                    <Text className="text-xl mb-1">
                        {streaks?.noteStreak && streaks.noteStreak > 0 ? '🔥' : '❄️'}
                    </Text>
                    <Text className="text-lg font-semibold text-zinc-800">
                        {streaks?.noteStreak ?? 0} / {streaks?.noteTarget ?? 5} days
                    </Text>
                </View>
            </View>
            <View className="flex-row justify-center gap-4 border-t border-gray-100">
                <Pressable onPress={() => router.navigate('/settings')} className="flex-row items-center bg-zinc-800 p-2 rounded-md">
                    <MaterialIcons name="settings" size={16} color="white" />
                </Pressable>
                <Pressable onPress={handleReset} className="flex-row items-center bg-gray-200 p-2 rounded-md">
                    <MaterialIcons name="refresh" size={16} color="black" />
                </Pressable>
            </View>
        </Card>
    );
}
