import Drawer from 'expo-router/drawer';

interface ContainerDrawerProps {
    title: string;
}

export function ContainerDrawer({ title }: ContainerDrawerProps) {
    return (
        <Drawer.Screen
            options={{
                headerTitle: title,

            }}
        />
    );
}
