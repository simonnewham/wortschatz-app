import { View } from "react-native";

export default function ContainerView({ children }: { children: React.ReactNode }) {
    return (
        <View className="bg-slate-100 py-4 px-2 w-full h-full">
            {children}
        </View>
    );
}