import { INote } from '@/models/INote';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { Card } from './Card';

interface AddEditNoteProps {
    note: INote;
    handleFormUpdate: (text: string, value: string) => void;
}

export function AddEditNote({ note, handleFormUpdate }: AddEditNoteProps) {
    return (
        <View>
            <Card className='border-gray-100'>
                <Text className="font-sans text-black text-lg">🇩🇪 Title</Text>
                <TextInput className="border-2 bg-white border-gray-300 rounded-md p-2"
                    value={note?.title}
                    placeholder='Title...'
                    placeholderTextColor={'gray'}
                    onChangeText={text => handleFormUpdate(text, 'title')} />
                <Text className="font-sans text-black text-lg">Description</Text>
                <TextInput className="border-2 bg-white border-gray-300 rounded-md p-2" style={{ height: 80 }}
                    multiline={true}
                    value={note?.description}
                    placeholder='Description...'
                    placeholderTextColor={'gray'}
                    onChangeText={text => handleFormUpdate(text, 'description')} />
                <Text className="font-sans text-black text-lg">Notes</Text>
                <TextInput className="border-2 bg-white border-gray-300 rounded-md p-2 flex-grow h-auto"
                    multiline={true}
                    numberOfLines={25}
                    value={note?.notes}
                    placeholder='Notes...'
                    placeholderTextColor={'gray'}
                    onChangeText={text => handleFormUpdate(text, 'notes')} />
            </Card >
        </View>
    );
}
