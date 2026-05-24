import { Logo } from '@/components/Logo';
import { useStyling } from '@/hooks/useStyling';
import { useAuthSession } from '@/providers/AuthProvider';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { router } from "expo-router";
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';

export function NavigationDrawer() {
    const dimensions = useWindowDimensions();
    const isDesktop = dimensions.width >= 1024; // using common desktop breakpoint

    return (
        <Drawer backBehavior="history" screenOptions={{
            drawerType: isDesktop ? 'permanent' : 'front',
            drawerPosition: 'left',
            drawerStyle: {
                width: 250,
                borderRightWidth: 0,
                backgroundColor: 'black'
            },
            sceneStyle: {
                backgroundColor: 'black'
            },
            headerShown: !isDesktop,
            headerShadowVisible: true,
            headerTintColor: 'white',
            headerTitleStyle: { color: 'white' },
            headerStyle: { backgroundColor: 'black' },
            title: 'Wortschatz'
        }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
        </Drawer >
    );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
    const styles = useStyling();

    const { logout } = useAuthSession();

    const onSignOut = async () => {
        logout().then(() => router.replace('/login'));
    }


    return (
        <View className='bg-black flex-1'>
            <DrawerContentScrollView {...props}>
                <Logo textSize='2xl' />
                <Pressable className='pt-2 items-center' style={[styles.headerButton]} onPress={() => router.replace('/(app)')}>
                    <MaterialIcons name="home" size={24} color="white" />
                    <Text className='font-sans text-md text-white'>Home</Text>
                </Pressable>
                <Pressable className='items-center' style={[styles.headerButton]} onPress={() => router.replace('/word/add-word')}>
                    <MaterialIcons name="add" size={24} color="white" />
                    <Text className='font-sans text-md text-white'>Add new word</Text>
                </Pressable>
                {/* <Pressable className='items-center' style={[styles.headerButton]} onPress={() => router.navigate('/phrase/add-phrase')}>
                    <MaterialIcons name="add" size={24} color="white" />
                    <Text className='font-sans text-md text-white'>Add new phrase</Text>
                </Pressable> */}
                <Pressable className='items-center/' style={[styles.headerButton]} onPress={() => router.replace('/note/add-note')}>
                    <MaterialIcons name="add" size={24} color="white" />
                    <Text className='font-sans text-md text-white'>Add new note</Text>
                </Pressable>
                <Pressable className='items-center' style={[styles.headerButton]} onPress={() => router.replace('/word/word-list')}>
                    <MaterialIcons name="view-list" size={24} color="white" />
                    <Text className='font-sans text-md text-white'>View Wortschatz</Text>
                </Pressable>
                <Pressable className='items-center border-b-2 border-accent' style={[styles.headerButton]} onPress={() => router.replace('/note/note-list')}>
                    <MaterialIcons name="list-alt" size={24} color="white" />
                    <Text className='font-sans text-md text-white'>View Notes</Text>
                </Pressable>
                <Pressable className='items-center pt-2' style={[styles.headerButton]} onPress={() => router.replace('/settings')}>
                    <MaterialIcons name="settings" size={24} color="white" />
                    <Text className='font-sans text-md text-white'>Settings</Text>
                </Pressable>
                <Pressable className='items-center' style={[styles.headerButton]} onPress={onSignOut}>
                    <MaterialIcons name="logout" size={24} color="white" />
                    <Text className='font-sans text-md text-white'>Sign Out</Text>
                </Pressable>
            </DrawerContentScrollView >
            <View>

                <Text className='text-center text-xs text-accent/50 p mb-2'>Version {process.env.EXPO_PUBLIC_VERSION}</Text>
            </View>
        </View>
    );
}
