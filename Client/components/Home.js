import { Text, StyleSheet, View, Pressable } from 'react-native';

export default function Home({ navigation, route }) {

    return (
        <View style={styles.container}>

            <Text style={[styles.header, {fontSize: '20px'}]}>Welcome to Wortschatz! 🇩🇪</Text>
            <Text style={[styles.header, {fontSize: 'italic'}]}>Your personal German learning companion</Text>

            <Pressable style={[styles.button, styles.newWordButton]} onPress={() => navigation.navigate('AddWord')}>
                <Text style={[styles.buttonText, {color: 'white'}]}>Add new word</Text></Pressable>
            <Pressable style={[styles.button, styles.newPhraseButton]} onPress={() => navigation.navigate('AddPhrase')}>
                <Text style={[styles.buttonText, {color: 'white'}]}>Add a new phrase</Text></Pressable>
            <Pressable style={[styles.button, styles.dictionaryButton]} onPress={() => navigation.navigate('Dictionary')}>
                <Text style={[styles.buttonText, {color: 'black'}]}>View your word list</Text></Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        paddingBottom: '20px',
        fontFamily: 'verdana'
    },
    buttonText: {
        fontSize: '14px',
        fontFamily: 'verdana',
        margin: 'auto' 
    },
    button: {
        padding: '2px',
        margin: '4px',
        minWidth: '200px',
        width: '30vw',
        height: '45px',
        textAlign: 'center',
        borderRadius: 4
    },
    newWordButton: {
        backgroundColor: 'black',
    },
    newPhraseButton: {
        backgroundColor: 'red',
    },
    dictionaryButton: {
        backgroundColor: 'yellow',
    }
});
