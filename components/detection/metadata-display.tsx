import React from 'react';
import { Text, View } from 'react-native';

export default function MetadataDisplay() {
    return (
        <View className="absolute bottom-[150px] left-6 z-30 gap-1">
            <View className="flex-row items-center gap-2">
                <Text className="text-[10px] font-bold text-white/60 w-8">Lat</Text>
                <Text className="text-xs text-white" style={{ fontFamily: 'monospace' }}>18.2871° S</Text>
            </View>
            <View className="flex-row items-center gap-2">
                <Text className="text-[10px] font-bold text-white/60 w-8">Lon</Text>
                <Text className="text-xs text-white" style={{ fontFamily: 'monospace' }}>147.6992° E</Text>
            </View>
            <View className="mt-2 bg-black/40 px-3 py-1 rounded-full border border-white/10 self-start">
                <Text className="text-[9px] font-bold text-primary-fixed-dim uppercase">CV-Model-Research</Text>
            </View>
        </View>
    );
}
