import { useColorScheme } from '@/hooks/use-color-scheme';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.75;

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const isDark = colorScheme === 'dark';

    const translateX = useSharedValue(-SIDEBAR_WIDTH);
    const backdropOpacity = useSharedValue(0);

    useEffect(() => {
        if (isOpen) {
            translateX.value = withTiming(0, { duration: 300 });
            backdropOpacity.value = withTiming(1, { duration: 300 });
        } else {
            translateX.value = withTiming(-SIDEBAR_WIDTH, { duration: 300 }, (finished) => {
                // We keep the modal visible during animation, but onClose should only unmount/hide AFTER animation
                // Actually the simplest React Native Modal doesn't unmount until `isOpen` is false.
                // To animate out smoothly with a Modal, we usually need a local visibility state.
                // But let's handle the timing here simply.
            });
            backdropOpacity.value = withTiming(0, { duration: 300 });
        }
    }, [isOpen]);

    // Internal state for modal visibility to let animation finish before unmounting
    const [modalVisible, setModalVisible] = React.useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setModalVisible(true);
        } else {
            // Animate out, then set modal visible to false
            translateX.value = withTiming(-SIDEBAR_WIDTH, { duration: 300 });
            backdropOpacity.value = withTiming(0, { duration: 300 }, (finished) => {
                if (finished) {
                    runOnJS(setModalVisible)(false);
                }
            });
        }
    }, [isOpen]);

    const handleClose = () => {
        onClose();
    };

    const animatedSidebarStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const animatedBackdropStyle = useAnimatedStyle(() => {
        return {
            opacity: backdropOpacity.value,
        };
    });

    const bgColor = isDark ? 'bg-neutral-900' : 'bg-white';
    const textColor = isDark ? 'text-white' : 'text-neutral-900';
    const subTextColor = isDark ? 'text-neutral-400' : 'text-neutral-500';
    const hoverBg = isDark ? 'bg-neutral-800' : 'bg-neutral-100';

    return (
        <Modal
            transparent
            visible={modalVisible}
            animationType="none"
            onRequestClose={handleClose}
        >
            <View className="flex-1 flex-row">
                {/* Backdrop Layer */}
                <TouchableWithoutFeedback onPress={handleClose}>
                    <Animated.View
                        style={[animatedBackdropStyle]}
                        className="absolute inset-0 bg-black/50"
                    />
                </TouchableWithoutFeedback>

                {/* Sidebar Drawer */}
                <Animated.View
                    style={[animatedSidebarStyle, { width: SIDEBAR_WIDTH }]}
                    className={`h-full ${bgColor} shadow-2xl pt-16 px-6 relative z-10 flex flex-col justify-between`}
                >
                    <View>
                        {/* Profile Section */}
                        <View className="mb-8">
                            <View className="w-16 h-16 rounded-full bg-blue-500 justify-center items-center mb-4">
                                <Text className="text-white text-2xl font-bold">BA</Text>
                            </View>
                            <Text className={`text-2xl font-bold ${textColor}`}>Bardia Adibi</Text>
                            <Text className={`${subTextColor} text-sm mt-1`}>Bardiaadb@gmail.com</Text>
                        </View>

                        {/* Divider */}
                        <View className={`h-[1px] w-full ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'} mb-6`} />

                        {/* Menu Options */}
                        <TouchableOpacity
                            onPress={() => { onClose(); router.replace('/'); }}
                            className="flex-row items-center py-4"
                        >
                            <FontAwesome name="video-camera" size={24} color={isDark ? '#e5e5e5' : '#404040'} />
                            <Text className={`ml-4 text-base font-semibold ${textColor}`}>Detect</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { onClose(); router.replace('/track'); }}
                            className="flex-row items-center py-4"
                        >
                            <FontAwesome5 name="map-marked-alt" size={24} color={isDark ? '#e5e5e5' : '#404040'} />
                            <Text className={`ml-4 text-base font-semibold ${textColor}`}>Track</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Bottom Section */}
                    <View className="mb-10">
                        {/* Sign out button customized with blue-500 theme context */}
                        <TouchableOpacity
                            className={`w-full py-4 rounded-3xl items-center justify-center ${isDark ? 'bg-neutral-800' : 'bg-neutral-100'}`}
                        >
                            <Text className={`font-semibold tracking-wide text-blue-500`}>Sign out</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}
