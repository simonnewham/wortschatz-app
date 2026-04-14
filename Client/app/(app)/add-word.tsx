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
        <View style={[styles.container]}>
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
            <AddWordComponent />
        </View>
    );
}