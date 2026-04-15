import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface AppHeaderProps {
    onMenuPress?: () => void;
    onSettingsPress?: () => void;
}

export default function AppHeader({
    onMenuPress,
    onSettingsPress
}: AppHeaderProps) {
    return (
        <SafeAreaView className="bg-transparent z-50 w-full" edges={['top', 'left', 'right']}>
            <View className="flex-row justify-between items-center px-5 py-3 w-full" style={{ zIndex: 10 }}>
                <TouchableOpacity
                    onPress={onMenuPress}
                    className="p-2 rounded-full border border-gray-300 bg-gray-400/50 backdrop-blur-md"
                >
                    <MaterialIcons name="menu" size={24} color="#ffffff" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onSettingsPress}
                    className="p-2 rounded-full border border-gray-300 bg-gray-400/50 backdrop-blur-md"
                >
                    <MaterialIcons name="settings" size={24} color="#ffffff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
