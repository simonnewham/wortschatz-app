import { useStyling } from '@/hooks/useStyling';
import { useAuthSession } from '@/providers/AuthProvider';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { router } from "expo-router";
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Pressable, Text } from 'react-native';

export function NavigationDrawer() {
    return (
        <Drawer screenOptions={{
            drawerPosition: 'left',
            headerShown: true,
            headerShadowVisible: true,
            headerTitleStyle: { color: 'black' },
            headerStyle: { backgroundColor: 'white' },
            title: 'Wortschatz'
        }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
        </Drawer>
    );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
    const styles = useStyling();

    const { logout } = useAuthSession();

    const onSignOut = async () => {
        logout().then(() => router.replace('/login'));
    }


    return (
        <DrawerContentScrollView {...props}>
            <Pressable style={[styles.headerButton]} onPress={() => router.push('/(app)')}>
                <MaterialIcons name="home" size={24} color="gray" />
                <Text className='font-sans text-xl'>Home</Text>
            </Pressable>
            <Pressable style={[styles.headerButton]} onPress={() => router.push('/(app)/add-word')}>
                <MaterialIcons name="add" size={24} color="gray" />
                <Text className='font-sans text-xl'>Add new word</Text>
            </Pressable>
            <Pressable style={[styles.headerButton]} onPress={() => router.push('/(app)/add-phrase')}>
                <MaterialIcons name="add" size={24} color="gray" />
                <Text className='font-sans text-xl'>Add new phrase</Text>
            </Pressable>
            <Pressable style={[styles.headerButton]} onPress={() => router.push('/(app)/word-list')}>
                <MaterialIcons name="view-list" size={24} color="gray" />
                <Text className='font-sans text-xl'>View Wortschatz</Text>
            </Pressable>
            <Pressable style={[styles.headerButton]} onPress={() => router.push('/(app)')}>
                <MaterialIcons name="book" size={24} color="gray" />
                <Text className='font-sans text-xl'>Lessons</Text>
            </Pressable>
            <Pressable style={[styles.headerButton]} onPress={() => router.push('/settings')}>
                <MaterialIcons name="settings" size={24} color="gray" />
                <Text className='font-sans text-xl'>Settings</Text>
            </Pressable>
            <Pressable style={[styles.headerButton]} onPress={onSignOut}>
                <MaterialIcons name="logout" size={24} color="gray" />
                <Text className='font-sans text-xl'>Sign Out</Text>
            </Pressable>
        </DrawerContentScrollView >
    );
}
