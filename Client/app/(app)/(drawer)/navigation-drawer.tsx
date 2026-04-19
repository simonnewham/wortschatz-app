import { useStyling } from '@/hooks/useStyling';
import { useAuthSession } from '@/providers/AuthProvider';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { Image } from 'expo-image';
import { router } from "expo-router";
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';

export function NavigationDrawer() {
    const { userInfo } = useAuthSession();

    const dimensions = useWindowDimensions();
    const isDesktop = dimensions.width >= 1024; // using common desktop breakpoint

    return (
        <Drawer screenOptions={{
            drawerType: isDesktop ? 'permanent' : 'front',
            drawerPosition: 'left',
            drawerStyle: {
                width: 220,
                borderRightWidth: 0
            },
            headerShown: !isDesktop,
            headerShadowVisible: true,
            headerTitleStyle: { color: 'black' },
            headerStyle: { backgroundColor: 'white' },
            title: 'Wortschatz',
            headerRight: () => (
                <Text className='p-2 font-sans text-lg'>
                    {userInfo?.userName}
                </Text>
            )
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
        <View className='bg-zinc-700' style={{ flex: 1, }}>
            <DrawerContentScrollView {...props}>
                <View className='items-center' style={[styles.headerButton]}>
                    <Image source={require('@/assets/images/favicon.png')} style={{ width: 50, height: 50 }} />
                    <Text className='text-xl text-white'>Wortschatz</Text>
                </View>
                <Pressable className='items-center' style={[styles.headerButton]} onPress={() => router.push('/(app)')}>
                    <MaterialIcons name="home" size={24} color="white" />
                    <Text className='font-sans text-lg text-white'>Home</Text>
                </Pressable>
                <Pressable className='items-center' style={[styles.headerButton]} onPress={() => router.push('/(app)/add-word')}>
                    <MaterialIcons name="add" size={24} color="white" />
                    <Text className='font-sans text-lg text-white'>Add new word</Text>
                </Pressable>
                <Pressable className='items-center' style={[styles.headerButton]} onPress={() => router.push('/(app)/add-phrase')}>
                    <MaterialIcons name="add" size={24} color="white" />
                    <Text className='font-sans text-lg text-white'>Add new phrase</Text>
                </Pressable>
                <Pressable className='items-center' style={[styles.headerButton]} onPress={() => router.push('/(app)/word-list')}>
                    <MaterialIcons name="view-list" size={24} color="white" />
                    <Text className='font-sans text-lg text-white'>View Wortschatz</Text>
                </Pressable>
                <Pressable className='items-center' style={[styles.headerButton]} onPress={() => router.push('/(app)')}>
                    <MaterialIcons name="book" size={24} color="white" />
                    <Text className='font-sans text-lg text-white'>Lessons</Text>
                </Pressable>
                <Pressable className='items-center' style={[styles.headerButton]} onPress={() => router.push('/settings')}>
                    <MaterialIcons name="settings" size={24} color="white" />
                    <Text className='font-sans text-lg text-white'>Settings</Text>
                </Pressable>
            </DrawerContentScrollView >
            <View>
                <Pressable className='items-center p-2' style={[styles.headerButton]} onPress={onSignOut}>
                    <MaterialIcons name="logout" size={24} color="white" />
                    <Text className='font-sans text-lg text-white'>Sign Out</Text>
                </Pressable>
                <Text className='text-center text-xs text-white p'>Version {process.env.EXPO_PUBLIC_VERSION}</Text>
            </View>
        </View>
    );
}
