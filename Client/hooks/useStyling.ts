import { useTheme } from '@react-navigation/native';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export function useStyling() {
    const theme = useTheme();

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            width: "100%",
        },
        headerContainer: {
            marginRight: 20
        },
        formContainer: {
            flexDirection: 'column',
            height: '100%',
            padding: 10,
            width: 860,
            maxWidth: '100%'
        },
        cardContainer: {
            borderRadius: 4,
            padding: 10,
            width: 800,
            maxWidth: '100%',
            marginVertical: 10,
            shadowOffset: { width: 5, height: 5 }
        },
        input: {
            height: 40,
            borderWidth: 1,
            marginVertical: 10,
            padding: 5,
            width: '100%',
            borderRadius: 4,
            backgroundColor: theme.colors.card,
            color: theme.colors.text,
            borderColor: theme.colors.text,
        },
        text: {
            fontSize: 14,
            color: theme.colors.text
        },
         textInput: {
            backgroundColor: "#212125",
            color: "white",
            padding: 10,
             margin: 'auto'
        },
        headerButton: {
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 4,
            flexDirection: 'row',
            gap: 10,
            paddingHorizontal: 20,
            paddingVertical: 7,
        },
                button: {
            height: 50,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: 'gray',
            width: '100%',
            maxWidth: 500,
            alignItems: 'center',
            flexDirection: 'row',
            margin: 5,
            justifyContent: 'center',
            gap: 10,
            paddingVertical: 20,
        },
    }), [theme]);

    return styles;
}
