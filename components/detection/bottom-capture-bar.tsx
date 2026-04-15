import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface BottomCaptureBarProps {
    isRecording: boolean;
    lastVideoUri: string | null;
    onStartRecording: () => void;
    onStopRecording: () => void;
    onFlipCamera: () => void;
}

export default function BottomCaptureBar({
    isRecording,
    lastVideoUri,
    onStartRecording,
    onStopRecording,
    onFlipCamera,
}: BottomCaptureBarProps) {
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const ringAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (isRecording) {
            // Pulse the red dot
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, { toValue: 0.4, duration: 600, useNativeDriver: true }),
                    Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
                ])
            ).start();
            // Scale the outer ring
            Animated.loop(
                Animated.sequence([
                    Animated.timing(ringAnim, { toValue: 1.12, duration: 700, useNativeDriver: true }),
                    Animated.timing(ringAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
                ])
            ).start();
        } else {
            pulseAnim.stopAnimation();
            ringAnim.stopAnimation();
            pulseAnim.setValue(1);
            ringAnim.setValue(1);
        }
    }, [isRecording, pulseAnim, ringAnim]);

    const handleCapturePress = () => {
        if (isRecording) {
            onStopRecording();
        } else {
            onStartRecording();
        }
    };

    return (
        <View className="absolute bottom-0 w-full pb-10 pt-8 px-10 bg-black/60 flex-row items-center justify-between z-40">
            {/* Gallery / Last Recording Thumbnail */}
            <TouchableOpacity className="items-center gap-2">
                <View className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 overflow-hidden">
                    {lastVideoUri ? (
                        <Image
                            source={{ uri: lastVideoUri }}
                            style={StyleSheet.absoluteFill}
                            contentFit="cover"
                        />
                    ) : (
                        <View className="flex-1 items-center justify-center">
                            <MaterialIcons name="video-library" size={22} color="rgba(255,255,255,0.5)" />
                        </View>
                    )}
                </View>
                <Text className="text-[10px] font-bold text-white/70 tracking-widest">GALLERY</Text>
            </TouchableOpacity>

            {/* Record / Stop Button */}
            <TouchableOpacity
                className="relative items-center justify-center"
                onPress={handleCapturePress}
                activeOpacity={0.8}
            >
                <Animated.View
                    style={[
                        styles.outerRing,
                        {
                            transform: [{ scale: ringAnim }],
                            borderColor: isRecording ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.3)',
                        },
                    ]}
                >
                    <View style={styles.innerCircle}>
                        <Animated.View
                            style={[
                                styles.recordDot,
                                {
                                    opacity: pulseAnim,
                                    backgroundColor: isRecording ? '#dc2626' : '#ef4444',
                                    borderRadius: isRecording ? 6 : 40,
                                },
                            ]}
                        />
                    </View>
                </Animated.View>
            </TouchableOpacity>

            {/* Flip Camera */}
            <TouchableOpacity className="items-center gap-2" onPress={onFlipCamera}>
                <View className="w-12 h-12 rounded-full bg-white/10 border border-white/20 items-center justify-center">
                    <MaterialIcons name="flip-camera-ios" size={24} color="#FFF" />
                </View>
                <Text className="text-[10px] font-bold text-white/70 tracking-widest">FLIP</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    outerRing: {
        padding: 6,
        borderRadius: 50,
        borderWidth: 2,
    },
    innerCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    recordDot: {
        width: 44,
        height: 44,
    },
});
