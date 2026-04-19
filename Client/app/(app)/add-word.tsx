import { AddWordComponent } from '@/components/AddWord';
import { useStyling } from '@/hooks/useStyling';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React from 'react';
import { Pressable, View } from 'react-native';

export default function AddWord() {
    const styles = useStyling();

    return (
        <View className="bg-gradient-to-r from-zinc-700 to-zinc-950" style={[styles.container]}>
            <Drawer.Screen
                options={{
                    headerTitle: 'Add a new word',
                    headerLeft: () => (
                        <Pressable className='p-2' onPress={() => router.back()}>
                            <MaterialIcons name="arrow-back" size={20} color="black" />
                        </Pressable>
                    ),
                }}
            />
            <View className="rounded-md bg-white" style={{ width: '95%', height: '95%' }}>
                <AddWordComponent />
            </View>
        </View>
    );
}