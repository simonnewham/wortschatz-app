//import { useTheme } from '@react-navigation/native';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export function useStyling() {
    //    const theme = useTheme();

    const styles = useMemo(() => StyleSheet.create({
        container: {

        },
        headerContainer: {
            marginRight: 20
        },
        formContainer: {

        },
        input: {
            marginVertical: 10,
            padding: 5,
            borderRadius: 4,
        },
        text: {
            fontSize: 14,
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
            paddingHorizontal: 8,
            paddingVertical: 10,
        },
        button: {
            height: 50,

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
            marginVertical: 10
        }
    }), []);

    return styles;
}
