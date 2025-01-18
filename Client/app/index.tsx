import { Stack } from 'expo-router';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from './login';

export default function App() {
    const colorScheme = useColorScheme();

    // todo: check auth and route to home
    
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <Login />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    }
});
