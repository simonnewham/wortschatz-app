import { Stack } from 'expo-router';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './home';

export default function App() {
    const colorScheme = useColorScheme();

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerTitle: "WortSchatz" }} />
            <View style={styles.container}>
                <Home />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
