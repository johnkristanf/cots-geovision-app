import AppHeader from '@/components/shared/app-header';
import Sidebar from '@/components/shared/sidebar';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

// Example locations, maybe COTS spotting mock locations
const MOCK_MARKERS = [
    { id: '1', coordinate: { latitude: 37.78825, longitude: -122.4324 }, title: 'Observation 1', description: 'Possible COTS detected' },
    { id: '2', coordinate: { latitude: 37.78925, longitude: -122.4344 }, title: 'Observation 2', description: 'Investigated and cleared' },
];

export default function TrackScreen() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <View style={styles.container}>
            {/* Map Layer */}
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation
                showsMyLocationButton
                mapType="standard"
            >
                {MOCK_MARKERS.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                        pinColor="red"
                    />
                ))}
            </MapView>

            <AppHeader onMenuPress={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    map: {
        width: width,
        height: height,
        ...StyleSheet.absoluteFillObject,
    },
});
