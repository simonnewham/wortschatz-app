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
            width: "100%"
        },
        headerContainer: {
            marginRight: 20
        },
        formContainer: {
            flexDirection: 'column',
            height: '100%',
            maxWidth: '100%'
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
            flexDirection: 'row',
            verticalAlign: 'middle',
            gap: 5,
            paddingHorizontal: 5,
            paddingVertical: 8,
        },
        button: {
            height: 50,
            borderWidth: 1,
            borderColor: 'gray',
            width: '100%',
            maxWidth: 450,
            flexDirection: 'row',
            gap: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
            paddingVertical: 20,
        },
        picker: {
            width: '100%',
            padding: 5,
            marginVertical: 10,
            backgroundColor: theme.colors.card,
            color: theme.colors.text,
            borderColor: theme.colors.text,
        }
    }), [theme]);

    return styles;
}
