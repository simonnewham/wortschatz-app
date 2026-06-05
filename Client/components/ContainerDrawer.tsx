import Drawer from 'expo-router/drawer';
import React from 'react';

interface ContainerDrawerProps {
    title: string;
}

export function ContainerDrawer({ title }: ContainerDrawerProps) {
    return (
        <Drawer.Screen
            options={{
                headerTitle: title,

            }}
        />
    );
}
