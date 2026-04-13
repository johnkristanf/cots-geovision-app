import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function FloatingControls() {
    return (
        <View className="absolute right-6 top-1/2 -mt-10 z-30 gap-6">
            <TouchableOpacity className="w-12 h-12 rounded-full bg-black/30 items-center justify-center">
                <MaterialIcons name="flash-on" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 rounded-full bg-black/30 items-center justify-center">
                <MaterialIcons name="flip-camera-ios" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 rounded-full bg-black/30 items-center justify-center flex-col">
                <Text className="text-white text-[10px] font-bold">1.5x</Text>
                <MaterialIcons name="zoom-in" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
    );
}
