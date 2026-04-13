import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface AppHeaderProps {
    title?: string;
    showStatus?: boolean;
    statusLabel?: string;
    statusValue?: string;
    onMenuPress?: () => void;
    rightElement?: React.ReactNode;
}

export default function AppHeader({
    title = 'C.O.T.S. Detection',
    showStatus = false,
    statusLabel = 'Status',
    statusValue = 'Active',
    onMenuPress,
    rightElement
}: AppHeaderProps) {
    return (
        <SafeAreaView className="pt-2 z-50">
            <View className="flex-row justify-between items-center bg-white/85 px-4 py-3 mx-2.5 rounded-2xl">
                <View className="flex-row items-center gap-2 flex-1">
                    <TouchableOpacity onPress={onMenuPress} className="p-1 rounded-full">
                        <MaterialIcons name="menu" size={24} color="#64748B" />
                    </TouchableOpacity>
                    <Text className="text-base font-extrabold text-[#1E3A8A] shrink">{title}</Text>
                </View>
                <View className="flex-row items-center gap-3">
                    {showStatus && (
                        <View className="items-end">
                            <Text className="text-[9px] font-bold uppercase tracking-widest text-[#64748B]">{statusLabel}</Text>
                            <Text className="text-[11px] font-semibold text-[#1D4ED8]">{statusValue}</Text>
                        </View>
                    )}
                    {rightElement || (
                        <View className="w-9 h-9 rounded-full border-2 border-primary/10 overflow-hidden">
                            <Image
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAN5L4LFWNZkXls6V1cGBUm0W6l-hR87SRjXZsJeMjkpT-IjxtfM594XGhK72pMeqyTCmp7MytNz2PFjeDLG0Ut1DHQfkxwModOKJ-2ouxkS_WKOjT8QFntqbBYT4WsBomyjYHtOx9U0lptcGRUVhnalyI7U5_jIS19-NDVoZ8OPMGyVXPoAz--gPWbhfFjDrx8lqIs5UNDVRGGCFGVcx7sBWHyAhrFCW_hNslXZ7GL5A4wghAJfpp4eKj7eXFrRnyP38eCtsn5cfwD' }}
                                style={StyleSheet.absoluteFill}
                                contentFit="cover"
                            />
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}
