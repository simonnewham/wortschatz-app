import React from 'react';
import { View } from 'react-native';

export function ContainerContent({ children }: { children: React.ReactNode }) {
    return (
        <View className="rounded-md bg-slate-100 items-center w-full h-full">
            {children}
        </View>
    )
}