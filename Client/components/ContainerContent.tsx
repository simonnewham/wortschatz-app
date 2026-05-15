import React from 'react';
import { View } from 'react-native';

export function ContainerContent({ children }: { children: React.ReactNode }) {
    return (
        <View className="p-2 rounded-md bg-white items-center w-full h-full">
            {children}
        </View>
    )
}