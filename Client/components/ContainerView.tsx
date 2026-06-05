import { View } from "react-native";

export default function ContainerView({ children }: { children: React.ReactNode }) {
    return (
        <View className="bg-black w-full h-full">
            {children}
        </View>
    );
}