import userService from '@/services/UserService';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from './Card';

const ActivityTracker = () => {
    const [activityDates, setActivityDates] = useState<string[]>([]);
    const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
    const [currentMonthName, setCurrentMonthName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const activity = await userService.getActivity();
            setActivityDates(activity.map(date => new Date(date).toDateString()));

            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth();
            const numDays = new Date(year, month + 1, 0).getDate();

            const days = Array.from({ length: numDays }, (_, i) => i + 1);
            setDaysInMonth(days);
            setCurrentMonthName(now.toLocaleString('default', { month: 'long' }));
        };

        fetchData();
    }, []);

    const hasActivity = (day: number) => {
        const now = new Date();
        const dateToCheck = new Date(now.getFullYear(), now.getMonth(), day).toDateString();
        return activityDates.includes(dateToCheck);
    };

    return (
        <Card className="h-full">
            <Text className="text-lg text-primary font-sans mb-4 text-center"> 🔥{currentMonthName} Activity</Text>
            <View style={styles.grid}>
                {daysInMonth.map(day => (
                    <View
                        key={day}
                        style={[
                            styles.daySquare,
                            hasActivity(day) ? styles.activeDay : styles.inactiveDay
                        ]}
                    >
                        <Text style={styles.dayText}>{day}</Text>
                    </View>
                ))}
            </View>
            {/* <View className="flex-row justify-center m-4">
                <View className="flex-row items-center mr-4">
                    <View style={[styles.daySquare, styles.activeDay, { width: 12, height: 12, marginRight: 4 }]} />
                    <Text className="text-xs text-gray-500">Note Added</Text>
                </View>
                <View className="flex-row items-center">
                    <View style={[styles.daySquare, styles.inactiveDay, { width: 12, height: 12, marginRight: 4 }]} />
                    <Text className="text-xs text-gray-500">No Activity</Text>
                </View>
            </View> */}
        </Card>
    );
};

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    daySquare: {
        width: 30,
        height: 30,
        margin: 2,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeDay: {
        backgroundColor: '#4ade80', // green-400
    },
    inactiveDay: {
        backgroundColor: '#f3f4f6', // gray-100
    },
    dayText: {
        fontSize: 10,
        color: '#374151', // gray-700
    }
});

export default ActivityTracker;
