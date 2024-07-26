import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Colors from '@/constants/Colors';
import { Link, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// process.env.EXPO_PUBLIC_GOOGLE_API_KEY

const LocationSelect = () => {
    const navigation = useNavigation();
    const [hometown, setHometown] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });



    return (
        <View style={{ flex: 1 }}>
            <GooglePlacesAutocomplete
                placeholder='Search or move the map'
                fetchDetails={true}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    // console.log(data, details);
                    const point = details?.geometry?.location;
                    if (!point) return;
                    setHometown({
                        ...hometown, // i want to use the same structure up there 
                        latitude: point.lat,
                        longitude: point.lng,
                    });
                }}
                query={{
                    key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
                    language: 'en',
                }}
                renderLeftButton={() => (
                    <View style={styles.boxIcon}>
                        <Ionicons name="search-outline" size={24} color={Colors.medium} />
                    </View>
                )}
                styles={{
                    container: {
                        flex: 0,
                    },
                    textInput: {
                        backgroundColor: Colors.grey,
                        paddingLeft: 35,
                        borderRadius: 10,
                    },
                    textInputContainer: {
                        padding: 8,
                        backgroundColor: '#fff',
                    },
                }}
            />
            <MapView style={styles.map}
            // region={hometown}
            />

            <View style={styles.islandBox}>
                {/* <Link href={'/(modal)/location-select'} asChild>

                </Link> */}
                <TouchableOpacity style={styles.islandBoxButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.islandBoxButtonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LocationSelect;

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
    islandBox: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
    },
    islandBoxButton: {
        backgroundColor: Colors.primary,
        padding: 16,
        margin: 16,
        alignItems: 'center',
        borderRadius: 8,

    },
    islandBoxButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    boxIcon: {
        position: 'absolute',
        left: 15,
        top: 18,
        zIndex: 1,  // wtf
    },
});