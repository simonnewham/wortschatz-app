import { Theme, useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { PhraseListItem } from "../../components/PhraseListItem";
import { IPhrase } from "../../models/IPhrase";


export default function PhraseList() {
    const theme = useTheme();
    const styles = useMemo(() => getStyles(theme), []);
    
    const data: IPhrase[] = useMemo(() => {
        return [
            {
                id: 1,
                nativePhrase: 'Guten Morgen',
                translatePhrase: 'Good Morning',
                tags: ['breakfast'],
                createdDate: new Date
            },
            {
                id: 2,
                nativePhrase: 'Schonen Abend',
                translatePhrase: 'Good evening',
                tags: ['evening'],
                createdDate: new Date
            }
        ]
    }, []);

    return (
        <View style={[styles.container]}>
            <View style={{flex: 1}}>
                <View style={styles.header}>
                    <View style={[styles.headerItem, {}]}>
                        <Text style={styles.text} >German</Text>
                    </View>
                    <View style={[styles.headerItem]}>
                        <Text style={styles.text} >English</Text>
                    </View>
                    <View style={[styles.headerItem]}>
                        <Text style={styles.text} >Info</Text>
                    </View>
                </View>
            </View>
            <View style={{flex: 9, flexGrow: 10}}>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) =>
                        <PhraseListItem item={item} index={index}  />
                    }
                />
            </View>
        </View>
    )
}

const getStyles = (theme: Theme) => {
    return StyleSheet.create({
        container: {
            padding: 10,
            flex: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: theme.colors.background
        },
        text: {
            fontSize: 15,
            color: theme.colors.text,
            fontWeight: 'bold'
        },
        header: {
            flexDirection: 'row',
            flex: 3,
            // borderBottomWidth: 1,
            // borderColor: theme.colors.text,
            padding: 10
        },
        headerItem: {
            flex: 1
        }
    });
};