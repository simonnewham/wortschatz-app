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
                width: isDesktop ? 280 : "75%",
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
            headerTitle: () => <Logo textSize='2xl' />
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
                <View className='w-full items-center justify-center pb-4'>
                    <Logo textSize='xl' />
                </View>
                <Pressable className='pt-2 items-center' style={[styles.headerButton]} onPress={() => router.replace('/(app)')}>
                    <MaterialIcons name="home" size={24} color="white" />
                    <Text className='text-lg text-white'>Home</Text>
                </Pressable>
                {/* <Pressable className='items-center' style={[styles.headerButton]} onPress={() => router.replace('/word/add-word')}>
                    <MaterialIcons name="add" size={24} color="white" />
                    <Text className='text-lg text-white'>Add new word</Text>
                </Pressable> */}
                {/* <Pressable className='items-center' style={[styles.headerButton]} onPress={() => router.navigate('/phrase/add-phrase')}>
                    <MaterialIcons name="add" size={24} color="white" />
                    <Text className='text-lg text-white'>Add new phrase</Text>
                </Pressable> */}
                {/* <Pressable className='items-center/' style={[styles.headerButton]} onPress={() => router.replace('/note/add-note')}>
                    <MaterialIcons name="add" size={24} color="white" />
                    <Text className='text-lg text-white'>Add new note</Text>
                </Pressable> */}
                <Pressable className='items-center' style={[styles.headerButton]} onPress={() => router.replace('/word/word-list')}>
                    <MaterialIcons name="view-list" size={24} color="white" />
                    <Text className='text-lg text-white'>Wortschatz</Text>
                </Pressable>
                <Pressable className='items-center pb-4' style={[styles.headerButton]} onPress={() => router.replace('/note/note-list')}>
                    <MaterialIcons name="list-alt" size={24} color="white" />
                    <Text className='text-lg text-white'>Notes</Text>
                </Pressable>
                <Pressable className='items-center pt-4 border-t-2 border-accent' style={[styles.headerButton]} onPress={() => router.replace('/settings')}>
                    <MaterialIcons name="settings" size={24} color="white" />
                    <Text className='text-lg text-white'>Settings</Text>
                </Pressable>
                <Pressable className='items-center' style={[styles.headerButton]} onPress={onSignOut}>
                    <MaterialIcons name="logout" size={24} color="white" />
                    <Text className='text-lg text-white'>Sign Out</Text>
                </Pressable>
            </DrawerContentScrollView >
            <View>

                <Text className='text-center text-xs text-accent/50 p pb-4'>Version {process.env.EXPO_PUBLIC_VERSION}</Text>
            </View>
        </View>
    );
}
