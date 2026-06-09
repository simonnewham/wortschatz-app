import { Logo } from '@/components/Logo';
import { useStyling } from '@/hooks/useStyling';
import { useAuthSession } from '@/providers/AuthProvider';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { router } from "expo-router";
import { Drawer } from 'expo-router/drawer';
import React, { useMemo } from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';

export function NavigationDrawer() {
    const dimensions = useWindowDimensions();
    const isDesktop = useMemo(() => dimensions.width >= 1024, [dimensions])

    return (
        <Drawer backBehavior="history" screenOptions={{
            drawerType: isDesktop ? 'permanent' : 'front',
            drawerPosition: 'left',
            drawerStyle: {
                width: isDesktop ? 280 : "85%",
                borderRightWidth: 0,
                backgroundColor: '#1f2937'
            },
            sceneStyle: {
                backgroundColor: '#1f2937'
            },
            headerShown: !isDesktop,
            headerShadowVisible: true,
            headerTintColor: 'white',
            headerTitleStyle: { color: 'white' },
            headerStyle: { backgroundColor: '#1f2937' },
            headerTitle: () => <Logo textSize='2xl' />
        }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
        </Drawer >
    );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
    const styles = useStyling();
    const dimensions = useWindowDimensions();
    const { logout } = useAuthSession();

    const isDesktop = useMemo(() => dimensions.width >= 1024, [dimensions])

    const onSignOut = async () => {
        logout().then(() => router.replace('/login'));
    }

    return (
        <View className='bg-gray-800 flex-1 h-full'>
            <DrawerContentScrollView {...props}>
                <View className='flex-row w-full items-center justify-between pb-4'>
                    <Logo textSize='2xl' />
                    {!isDesktop &&
                        <Pressable className='pr-4 items-center' onPress={props.navigation.closeDrawer}>
                            <MaterialIcons name="close" size={28} color="white" />
                        </Pressable>}
                </View>
                <Pressable className='pt-2 items-center rounded-lg hover:bg-accent/20' style={[styles.headerButton]} onPress={() => router.replace('/(app)')}>
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
                <Pressable className='items-center mt-2 rounded-lg hover:bg-accent/20' style={[styles.headerButton]} onPress={() => router.replace('/word/word-list')}>
                    <MaterialIcons name="abc" size={24} color="white" />
                    <Text className='text-lg text-white'>Wörter</Text>
                </Pressable>
                <Pressable className='items-center rounded-lg hover:bg-accent/20' style={[styles.headerButton]} onPress={() => router.replace('/phrase/phrase-list')}>
                    <MaterialIcons name="list" size={24} color="white" />
                    <Text className='text-lg text-white'>Phrasen</Text>
                </Pressable>
                <Pressable className='items-center pb-4 rounded-lg hover:bg-accent/20' style={[styles.headerButton]} onPress={() => router.replace('/note/note-list')}>
                    <MaterialIcons name="list-alt" size={24} color="white" />
                    <Text className='text-lg text-white'>Notizen</Text>
                </Pressable>
                <Pressable className='items-center mt-2 rounded-lg hover:bg-accent/20' style={[styles.headerButton]} onPress={() => router.replace('/settings')}>
                    <MaterialIcons name="settings" size={24} color="white" />
                    <Text className='text-lg text-white'>Einstellungen</Text>
                </Pressable>
                <Pressable className='items-center rounded-lg hover:bg-accent/20' style={[styles.headerButton]} onPress={onSignOut}>
                    <MaterialIcons name="logout" size={24} color="white" />
                    <Text className='text-lg text-white'>Ausloggen</Text>
                </Pressable>
            </DrawerContentScrollView >
            <View>
                <Text className='text-center text-xs text-accent/50 p pb-4'>🇩🇪 Version {process.env.EXPO_PUBLIC_VERSION}</Text>
            </View>
        </View>
    );
}
