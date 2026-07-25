import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export function PageToolbar(props: {
    title: string,
    icon: string,
    showBackButton?: boolean,
    actionLabel?: string,
    actionIcon?: string,
    action?: () => void,
    onSearchChange?: ({ searchTerm, searchDate }: { searchTerm: string; searchDate: string }) => void,
    searchPlaceholder?: string,
    onDateChange?: (date: string) => void
}) {
    const [searchQuery, setSearchQuery] = useState<{ searchTerm: string; searchDate: string }>({ searchTerm: '', searchDate: '' });

    const handleSearchChange = (text: string) => {
        setSearchQuery(prev => ({ ...prev, searchTerm: text }));
        props.onSearchChange?.(searchQuery);
    };

    return (
        <View className="flex-row items-center justify-between w-full flex-wrap gap-2">
            {props.onSearchChange && (
                <View className="flex-row items-center flex-wrap gap-2">
                    <View className="flex-row items-center border border-zinc-200 rounded-md bg-input px-2 flex-grow max-w-xs">
                        <MaterialIcons className="pr-1 text-primary" name="search" size={20} />
                        <TextInput
                            className="py-2 text-primary flex-grow bg-input"
                            placeholder={props.searchPlaceholder ?? "Search..."}
                            placeholderTextColor="#888"
                            value={searchQuery.searchTerm}
                            onChangeText={handleSearchChange}
                            style={{ outline: 'none' }}
                        />
                        {searchQuery.searchTerm ? (
                            <Pressable className="pr-1" onPress={() => handleSearchChange('')}>
                                <MaterialIcons name="clear" size={18} color="#888" />
                            </Pressable>
                        ) : null}
                    </View>
                    {/* <View className="flex-row items-center border border-zinc-200 rounded-md bg-white px-2">
                        {Platform.OS === 'web' && (
                            <input
                                type="date"
                                value={searchQuery.searchDate}
                                onChange={(e) => handleDateChange(e.target.value)}
                                className="py-2 text-black flex-grow"
                                style={{
                                    border: 'none',
                                    outline: 'none',
                                    background: 'transparent',
                                    color: 'black'
                                }}
                            />
                        )}
                        {searchQuery.searchDate ? (
                            <Pressable className="pl-1" onPress={() => handleDateChange('')}>
                                <MaterialIcons name="clear" size={18} color="#888" />
                            </Pressable>
                        ) : null}
                    </View> */}
                </View>
            )}

            {props.actionLabel && (
                <View>
                    <Pressable onPress={props.action} className="p-2 rounded-md bg-[#d4fd52]/80 hover:bg-[#d4fd52] flex-row justify-center items-center" >
                        <MaterialIcons name={props.actionIcon as any} className="animate-pulse text-secondary" size={20} color="black" />
                        <Text className="font-semibold text-secondary ml-1">{props.actionLabel}</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}