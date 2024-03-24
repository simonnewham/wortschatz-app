import { View, Text } from "react-native";
import { Card } from "./Card";

export function Footer() {
    return (
        <Card>
            <View style={{ alignItems: 'center' }}>
                <Text style={[{ color: 'white', fontSize: 12, paddingBottom: 5 }]}>
                    About Wortschatz
                </Text>
                <Text style={[{ color: 'white', fontSize: 12 }]}>
                    Designed in Zürich 🇨🇭
                </Text>
            </View>
        </Card>)
}