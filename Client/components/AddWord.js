import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function AddWord({ navigation }) {
    const [word, setWord] = useState('');

    return (
        <View style={[styles.container]}>
            <View style={[{ flex: 1, width: 'auto' }]}>
                <Text style={[styles.text]}>Deutsch</Text>
                <View style={[{ flexDirection: 'row', width: 'auto' }]}>
                    <TextInput style={[styles.input, { marginRight: '5px' }]} type="text" placeholder='der, die, das'></TextInput>
                    <TextInput style={[styles.input]} type="text" placeholder=''
                        value={word} onChangeText={setWord}></TextInput>
                </View>

                <Text style={[styles.text]}>English</Text>
                <TextInput style={styles.input} type="text" placeholder=''></TextInput>

                <Text style={[styles.text]}>Usage</Text>
                <TextInput style={styles.input} type="text" placeholder=''
                ></TextInput>

                <Text style={[styles.text]}>Tags</Text>
                <TextInput style={styles.input} type="text" placeholder=''>
                </TextInput>

                <View style={[{ margin: 'auto', flexDirection: 'row' }]}>
                    <Pressable style={[styles.button, { backgroundColor: 'grey' }]} onPress={() => navigation.navigate('Home')}>
                        <Text style={[styles.text, { margin: 'auto' }]}>Cancel</Text>
                    </Pressable>
                    <Pressable style={[styles.button, { backgroundColor: 'green' }]} onPress={() => alert(`Added ${word}`)}>
                        <Text style={[styles.text, { color: 'white', margin: 'auto' }]}>Add</Text>
                    </Pressable>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '10px',
        overflow: 'scroll',
        margin: 'auto',
        padding: '10px',
        width: 'auto'
    },
    input: {
        height: 40,
        borderWidth: 1,
        width: 'auto',
        marginVertical: '10px',
        padding: '5px'
    },
    text: {
        fontSize: '14px',
        fontFamily: 'verdana'
    },
    button: {
        height: '40px',
        borderRadius: 4,
        margin: '2px',
        minWidth: '160px',
        marginBottom: '4px'
    }
});
