import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ViewfinderCorners() {
    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <View className="absolute w-12 h-12 border-white top-[60px] left-2 border-t-4 border-l-4" />
            <View className="absolute w-12 h-12 border-white top-[60px] right-2 border-t-4 border-r-4" />
            <View className="absolute w-12 h-12 border-white bottom-[100px] left-2 border-b-4 border-l-4" />
            <View className="absolute w-12 h-12 border-white bottom-[100px] right-2 border-b-4 border-r-4" />
        </View>
    );
}
