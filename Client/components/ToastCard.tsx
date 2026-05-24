import React, { useEffect, useState } from 'react';
import { Animated, Platform, StyleSheet, Text } from 'react-native';
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

    let backgroundColor = '#3b82f6'; // blue-500
    if (props.status === Status.Success) backgroundColor = '#22c55e'; // green-500
    if (props.status === Status.Warning) backgroundColor = '#eab308'; // yellow-500
    if (props.status === Status.Error) backgroundColor = '#ef4444'; // red-500

    return (
        <Animated.View
            style={[
                styles.container,
                { opacity: fadeAnim, backgroundColor: backgroundColor }
            ]}
            pointerEvents="none">
            <Text className='text-white'>{props.message}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 40,
        left: '50%',
        padding: 16,
        borderRadius: 12,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 9999,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300
    }
});