import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BottomCaptureBar() {
    return (
        <View className="absolute bottom-0 w-full pb-10 pt-12 px-10 bg-black/60 flex-row items-center justify-between z-40">
            <TouchableOpacity className="items-center gap-2">
                <View className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 overflow-hidden">
                    <Image
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBE9z3gCWAHtp2NBETw-E4U8nz8A8FSU6unNq0MvOZdOGkX4BYz_DiE9058UkrRmyNt3TXd8TicL47xjPyllCWDkGnjqCf2CEQfMicl8ApFiZ217tI60UfYeghc7h2MD32bw3QsD0ultGF8ISFboSybJpQ3nuR5f7liiJomyRkKS41Ph0iR1XVbPAkoDHuH5DClVix-XvUgOUEOye5zRdbAzmP798QCBy_Q84Q3hPym4BVCzz_sOsbOQiWCzxhHefzWNSJ6uV1wPE0T' }}
                        style={StyleSheet.absoluteFill}
                        contentFit="cover"
                    />
                </View>
                <Text className="text-[10px] font-bold text-white/70 tracking-widest">GALLERY</Text>
            </TouchableOpacity>

            <TouchableOpacity className="relative items-center justify-center">
                <View className="p-1.5 rounded-full border-2 border-white/30">
                    <View className="w-16 h-16 rounded-full bg-transparent items-center justify-center">
                        <View className="w-10 h-10 rounded-full bg-red-600" />
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity className="items-center gap-2">
                <View className="w-12 h-12 rounded-full bg-white/10 border border-white/20 items-center justify-center">
                    <MaterialIcons name="file-upload" size={24} color="#FFF" />
                </View>
                <Text className="text-[10px] font-bold text-white/70 tracking-widest">UPLOAD</Text>
            </TouchableOpacity>
        </View>
    );
}
