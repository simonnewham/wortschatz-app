import React from 'react';
import { View } from 'react-native';

export function ContainerContent({ children }: { children: React.ReactNode }) {
    return (
        <View className="rounded-md bg-white items-center w-[95%] h-[95%]">
            {children}
        </View>
    )
}