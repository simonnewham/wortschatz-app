import { useTheme } from "@react-navigation/native";
import { Text, View } from "react-native";
import { Card } from "./Card";

export function Footer() {
    const theme = useTheme();
    
    // useVersion

    return (
        <Card>
            <View style={{ alignItems: 'center' }}>
                {/* <Text style={[{ color: theme.colors.text, fontSize: 12, paddingBottom: 5 }]}>
                    About Wortschatz
                </Text> */}
                <Text style={[{ color: theme.colors.text, fontSize: 12 }]}>
                    Designed in Zürich 🇨🇭
                </Text>
                <Text style={[{ color: theme.colors.text, fontSize: 12 }]}>
                   Version 1.0.0
                </Text>
            </View>
        </Card>)
}