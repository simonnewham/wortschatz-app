import { INote } from '@/models/INote';
import React from 'react';
import { Text, TextInput } from 'react-native';
import { Card } from './Card';

interface AddEditNoteProps {
    note: INote;
    handleFormUpdate: (text: string, value: string) => void;
}

export function AddEditNote({ note, handleFormUpdate }: AddEditNoteProps) {
    return (
        <Card className='border-gray-100'>
            <Text className="font-sans text-black text-lg">Title</Text>
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
            <TextInput className="border-2 bg-white border-gray-300 rounded-md p-2" style={{ height: 200 }}
                multiline={true}
                value={note?.notes}
                placeholder='Notes...'
                placeholderTextColor={'gray'}
                onChangeText={text => handleFormUpdate(text, 'notes')} />
        </Card>
    );
}
