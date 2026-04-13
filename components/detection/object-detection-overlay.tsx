import React from 'react';
import { Text, View } from 'react-native';

export default function ObjectDetectionOverlay() {
    return (
        <View className="absolute top-[35%] left-[40%] w-[30%] h-[25%] z-20">
            <View className="flex-1 border-4 border-primary-container">
                <View className="absolute -top-6 -left-1 bg-primary-container px-2 py-1 rounded-t flex-row items-center gap-1.5">
                    <View className="w-1.5 h-1.5 bg-white rounded-full" />
                    <Text className="text-white text-[11px] font-bold">COTS: 98.4%</Text>
                </View>
            </View>
        </View>
    );
}
