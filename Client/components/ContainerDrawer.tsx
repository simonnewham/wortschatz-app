import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Drawer from 'expo-router/drawer';
import React from 'react';
import { Pressable } from 'react-native';

interface ContainerDrawerProps {
    title: string;
}

export function ContainerDrawer({ title }: ContainerDrawerProps) {
    return (
        <Drawer.Screen
            options={{
                headerTitle: title,
                headerLeft: () => (
                    <Pressable className='p-2' onPress={() => router.back()}>
                        <MaterialIcons name="arrow-back" size={20} color="white" />
                    </Pressable>
                ),
            }}
        />
    );
}
