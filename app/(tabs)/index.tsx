import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

import BottomCaptureBar from '@/components/detection/bottom-capture-bar';
import FloatingControls from '@/components/detection/floating-controls';
import AppHeader from '@/components/shared/app-header';
import Sidebar from '@/components/shared/sidebar';

export default function DetectionScreen() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [cameraPosition, setCameraPosition] = useState<'back' | 'front'>('back');
  const [isRecording, setIsRecording] = useState(false);
  const [lastVideoUri, setLastVideoUri] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const device = useCameraDevice(cameraPosition);
  const cameraRef = useRef<Camera>(null);

  const startRecording = useCallback(() => {
    if (!cameraRef.current || isRecording) return;
    setIsRecording(true);
    cameraRef.current.startRecording({
      onRecordingFinished: (video) => {
        setLastVideoUri(video.path);
        setIsRecording(false);
      },
      onRecordingError: (error) => {
        console.error('Recording error:', error);
        setIsRecording(false);
      },
    });
  }, [isRecording]);

  const stopRecording = useCallback(async () => {
    if (!cameraRef.current || !isRecording) return;
    await cameraRef.current.stopRecording();
  }, [isRecording]);

  const flipCamera = useCallback(() => {
    setCameraPosition(prev => (prev === 'back' ? 'front' : 'back'));
  }, []);

  if (!hasPermission) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white mb-4 text-center px-6">
          Camera permission is required to use this feature.
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-red-600 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white">No camera device found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      {/* Live Video Camera Feed */}
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        video={true}
        audio={false}
      />

      <AppHeader onMenuPress={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <FloatingControls />
      <BottomCaptureBar
        isRecording={isRecording}
        lastVideoUri={lastVideoUri}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        onFlipCamera={flipCamera}
      />
    </View>
  );
}
  