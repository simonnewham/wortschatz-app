import { Card } from '@/components/Card';
import { Logo } from '@/components/Logo';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Dimensions, Image, Pressable, ScrollView, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { height: windowHeight } = Dimensions.get('window');

// Navbar Component
const Navbar = () => (
    <View className="absolute top-0 w-full z-50 bg-background px-2">
        <View className="flex-row items-center justify-between px-4 py-4 w-full">
            <View className='flex-row gap-4'>
                <Logo />
            </View>
            <Pressable className="bg-[#d4fd52]/80 rounded-lg hover:bg-[#d4fd52] flex-row gap-3 border-2 border-[#d4fd52] items-center px-4 py-1" onPress={() => router.replace('/login')}>
                <Text className="text-secondary font-semibold">Get started</Text>
                <MaterialIcons className="text-secondary" name="arrow-right-alt" size={28} />
            </Pressable>
        </View>
    </View >
);

// Hero Section
const HeroSection = () => {
    return (
        <View style={{ minHeight: windowHeight * 0.8 }} className="relative w-full overflow-hidden flex-1 
            justify-center items-center px-4 bg-background">
            <View>
                <Logo />
                <Animated.View entering={FadeInUp.delay(100).duration(500).springify()}>
                    <Text className="text-primary text-2xl md:text-6xl font-extrabold tracking-tighter mb-2">
                        Stop forgetting words.
                    </Text>
                </Animated.View>
                <Animated.View entering={FadeInUp.delay(100).duration(800).springify()}>
                    <Text className="text-primary text-4xl md:text-8xl font-serif italic mb-8 transform origin-left md:scale-110">
                        Start mastering them.
                    </Text>
                </Animated.View>
                <Animated.View entering={FadeInUp.delay(700).duration(800).springify()}
                    className="flex-row w-full gap-4 justify-center">
                    <Pressable onPress={() => router.replace('/login')}
                        className="bg-[#d4fd52]/80 px-4 py-2 rounded-lg flex-row items-center gap-3 active:opacity-80
                     hover:bg-[#d4fd52] border-2 border-[#d4fd52] transition-colors shadow-lg shadow-accent/30">
                        <Text className="text-secondary text-xl font-semibold">Get started</Text>
                        <MaterialIcons className='text-secondary' name="arrow-right-alt" size={28} />
                    </Pressable>
                </Animated.View>
            </View>
        </View>
    );
};

// Features
const FeaturesSection = () => {
    return (
        <View className="pb-24 px-4 pt-4 w-full bg-background">
            <View className='justify-center items-center'>
                <Text className="text-sm font-bold tracking-widest text-primary uppercase mb-4">
                    Core Workflows</Text>
                <Text className="text-2xl md:text-3xl font-bold text-primary mb-8 tracking-tight">
                    Functional tools designed to accelerate your fluency.
                </Text>
                <View className="flex-col gap-2 max-w-3/4">
                    <Card className="md:flex-row bg-zinc-900 rounded-lg md:p-4 border border-zinc-800">
                        <View className="flex-row items-center gap-4 w-3/4">
                            <View className="w-12 h-12 rounded-full bg-indigo-600/20 items-center justify-center mb-4">
                                <MaterialIcons name="auto-awesome" size={24} color="#6366f1" />
                            </View>
                            <Text className="text-2xl font-bold text-primary mb-4">View your dashboard</Text>
                        </View>
                        <View className='justify-center items-center w-full pb-2'>
                            <Text className="text-zinc-400 text-md mb-4">
                                Review your learned words, track your progress, and stay motivated with your learning streak.
                            </Text>
                            <Image
                                source={require('../assets/images/dashboard.png')}
                                className="rounded-lg"
                                resizeMode='contain'
                                style={{ width: '100%', height: 400, opacity: 0.8 }} />
                        </View>
                    </Card>
                    <Card className="md:flex-row bg-zinc-900 rounded-lg md:p-4 border border-zinc-800">
                        <View className="flex-row items-center gap-4 w-3/4">
                            <View className="w-12 h-12 rounded-full bg-accent/20 items-center justify-center mb-4">
                                <MaterialIcons name="add-circle" size={24} color="#d4fd52" />
                            </View>
                            <Text className="text-2xl font-bold text-primary mb-4">Add words and phrases</Text>
                        </View>
                        <View className='justify-center items-center w-full pb-2'>
                            <Text className="text-zinc-400 text-md mb-4">
                                Context matters. Capture native expressions on the fly and immediately categorize them into your custom domain glossaries.
                            </Text>
                            <Image
                                source={require('../assets/images/view-word.png')}
                                className="rounded-lg"
                                resizeMode='contain'
                                style={{ width: '100%', height: 400, opacity: 0.8 }} />
                        </View>
                    </Card>
                    <Card className="md:flex-row bg-zinc-900 rounded-lg md:p-4 border border-zinc-800">
                        <View className="flex flex-row items-center gap-4">
                            <View className="w-12 h-12 rounded-full bg-emerald-600/20 items-center justify-center mb-6">
                                <MaterialIcons name="search" size={24} color="#10b981" />
                            </View>
                            <Text className="text-2xl font-bold text-white mb-4">Create lesson notes</Text>
                        </View>
                        <View className='justify-center items-center w-full p-2'>
                            <Text className="text-zinc-400 text-md mb-2">
                                Create comprehensive notes for each lesson, capturing key vocabulary, grammar points, and example sentences to reinforce your learning.
                            </Text>
                        </View>
                    </Card>
                </View>
            </View>
        </View>
    )
}


const FooterSection = () => {
    return (
        <View className="py-16 px-4 bg-zinc-900">
            <View className="flex-col gap-4 justify-center items-center">
                <View className="">
                    <Logo />
                    <Text className="text-primary mb-6 leading-relaxed">Your language learning companion. Master languages organically by saving what matters.</Text>
                    <Text className="text-primary font-medium">© {new Date().getFullYear()} Wortschatz All rights reserved.</Text>
                </View>
                {/* <View className="flex-row gap-4">
                    <Text className="text-zinc-400 hover:text-white transition-colors">Privacy Policy</Text>
                    <Text className="text-zinc-400 hover:text-white transition-colors">Terms of Service</Text>
                </View> */}
            </View>
        </View>

    );
};

export default function LandingPage() {
    return (
        <View className="flex-1 bg-background">
            <Navbar />
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                bounces={false}            >
                <HeroSection />
                <FeaturesSection />
                <FooterSection />
            </ScrollView>
        </View>
    );
}
