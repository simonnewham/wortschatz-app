import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Status } from "../constants/Status";

export interface IToastCardProps {
    visible: boolean;
    status: Status;
    message: string;
}

export function ToastCard(props: IToastCardProps) {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: props.visible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [props.visible]);

    let backgroundColor = '#3b82f6';
    switch (props.status) {
        case Status.Success:
            backgroundColor = '#22c55e';
            break;
        case Status.Warning:
            backgroundColor = '#eab308';
            break;
        case Status.Error:
            backgroundColor = '#ef4444';
            break;
    }

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]} pointerEvents="none">
            <View className='w-full justify-center flex-1'>
                <View className='p-2 px-8 rounded-lg w-full' style={[
                    { minWidth: 120, maxWidth: 500, alignSelf: 'center', backgroundColor: backgroundColor }]}>
                    <Text className='text-white text-center' >{props.message}</Text>
                </View>
            </View>
        </Animated.View >
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        zIndex: 9999,
        width: '100%',
    }
});