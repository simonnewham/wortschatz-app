import { Card } from "@/components/Card";
import { ContainerDrawer } from '@/components/ContainerDrawer';
import ContainerView from "@/components/ContainerView";
import { PageToolbar } from "@/components/PageToolbar";
import { INote } from '@/models/INote';
import baseEntityDataService from '@/services/BaseEntityDataService';
import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { ContainerContent } from '../../../components/ContainerContent';

export default function NoteList() {
    const [data, setData] = useState<INote[]>([]);

    const [isLoading, setIsLoading] = useState(false);

    const fetchNotes = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await baseEntityDataService.GetList('Note');
            if (result.ok) {
                const list = await result.json();
                setData(list);
            }
        } catch (e) {
            console.error(e, { logMessage: 'Error fetching notes' });
        }
        setIsLoading(false);
    }, [baseEntityDataService]);


    useFocusEffect(
        useCallback(() => {
            fetchNotes();
        }, [fetchNotes])
    );

    return (
        <ContainerView>
            <ContainerDrawer title='Wortschatz Notes' />
            <ContainerContent>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#d4fd52" />
                ) : (
                    <View className="w-full">
                        <PageToolbar
                            onSearchChange={() => { }}
                            icon="view-list"
                            title="Note List"
                            actionLabel="Add a new note"
                            actionIcon="add"
                            action={() => router.navigate('/note/add-note')} />
                        {data.map((note, index) => (
                            <Pressable key={note.id || index.toString()} onPress={() => note.id && router.navigate(`/note/view-note?id=${note.id}`)}>
                                <Card className="hover:bg-accent/20">
                                    <View className="flex-row justify-between items-start">
                                        <View className="flex">
                                            <Text className="text-xl font-bold text-primary mb-2">{note.title || 'Untitled Note'}</Text>
                                            {note.description ? (
                                                <Text className="text-md text-primary mb-2">{note.description}</Text>
                                            ) : null}
                                        </View>
                                        <View className="flex-col items-end justify-between border-gray-100">
                                            {note.createdDate && (
                                                <Text className="text-sm text-primary right-0">
                                                    Created: {new Date(note.createdDate).toLocaleDateString()}
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                    <View className="p-2 flex-row justify-end">
                                        <MaterialIcons className="text-primary" name="arrow-forward" size={24} />
                                    </View>
                                </Card>
                            </Pressable>
                        ))}
                        {data.length === 0 && (
                            <Text className="text-center text-primary mt-10">➕ No notes found. Add your first note!</Text>
                        )}
                    </View>
                )}
            </ContainerContent>
        </ContainerView >
    )
}
