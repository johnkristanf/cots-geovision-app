import { CameraView, useCameraPermissions } from 'expo-camera';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import BottomCaptureBar from '@/components/detection/bottom-capture-bar';
import FloatingControls from '@/components/detection/floating-controls';
import MetadataDisplay from '@/components/detection/metadata-display';
import ObjectDetectionOverlay from '@/components/detection/object-detection-overlay';
import ViewfinderCorners from '@/components/detection/viewfinder-corners';
import AppHeader from '@/components/shared/app-header';

export default function DetectionScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View className="flex-1 bg-black" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white mb-4">We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} className="bg-primary px-4 py-2 rounded">
          <Text className="text-white">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      {/* Live Video Camera Feed */}
      <View style={StyleSheet.absoluteFill}>
        <CameraView style={StyleSheet.absoluteFill} facing="back" mode="video" />
      </View>

      <ViewfinderCorners />
      <ObjectDetectionOverlay />
      <AppHeader title="C.O.T.S. GeoVision" showStatus={true} statusLabel="Status" statusValue="Live Feed" />
      <FloatingControls />
      <MetadataDisplay />
      <BottomCaptureBar />

    </View>
  );
}
