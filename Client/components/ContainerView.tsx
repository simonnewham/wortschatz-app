import { useStyling } from "@/hooks/useStyling";
import { View } from "react-native";

export default function ContainerView({ children }: { children: React.ReactNode }) {
    const styles = useStyling();
    return (
        <View className="bg-black" style={[styles.container]}>
            {children}
        </View>
    );
}