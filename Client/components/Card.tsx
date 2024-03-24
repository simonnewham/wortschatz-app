import { PropsWithChildren } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface ICardProps {
    backgroundColour?: string,
    title?: string
}

export function Card(props: PropsWithChildren<ICardProps>) {
    return <View style={[styles.container, { backgroundColor: props.backgroundColour ?? '#121212' }]}>
        {props.title && <>
            <Text style={{color: 'white', fontSize: 14, margin: 5}}>{props.title}</Text>
           
            </>}
        <View style={styles.contentContainer}>
            {props.children}
        </View>

    </View>
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        padding: 10,
        width: 720,
        maxWidth: '100%',
        marginVertical: 10,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: '#1a1919'
    },
    contentContainer: {
       
    }
});