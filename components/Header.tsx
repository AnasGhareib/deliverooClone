import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import BottomSheet from './BottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const SearchBar = () => (
    <View style={styles.searchContainer} >
        <View style={styles.searchSection}>
            <View style={styles.searchField}>
                <Ionicons style={styles.searchIcon} name='search-outline' size={20} color={Colors.medium} />
                <TextInput style={styles.inputField} placeholder='KOSHARY DISHES, SWEETS, EXTRA' />
            </View>
            <Link href={'/(modal)/filter'} asChild>
                <TouchableOpacity style={styles.optionButton}>
                    <Ionicons name='options-outline' size={20} color={Colors.primary} />
                </TouchableOpacity>
            </Link>
        </View>
    </View>

);


const Header = () => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const openModal = () => {
        // console.log('opened!');
        bottomSheetRef.current?.present();
    };
    return (
        <SafeAreaView style={styles.theSafeArea}>
            <BottomSheet ref={bottomSheetRef} />
            <View style={styles.container}>
                <TouchableOpacity onPress={openModal}>
                    <Image style={styles.bikeIcon} source={require('../assets/images/bike.png')} />
                </TouchableOpacity>

                <TouchableOpacity onPress={openModal} style={styles.titleContainer}>
                    <Text style={styles.title}>Delivery Now</Text>
                    <View style={styles.theLocation}>
                        <Text style={styles.subtitle}>Cairo, Egypt</Text>
                        <Ionicons name='chevron-down' size={20} color={Colors.primary} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.profileButton}>
                    <Ionicons name='person-outline' size={22} color={Colors.primary} />
                </TouchableOpacity>
            </View>
            <SearchBar />
        </SafeAreaView>
    );
};

export default Header;

const styles = StyleSheet.create({
    theSafeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap: 20,
        // alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    bikeIcon: {
        width: 30,
        height: 30,
    },
    titleContainer: {
        flex: 1,

    },
    title: {
        fontSize: 14,
        color: Colors.medium,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',

    },
    profileButton: {
        backgroundColor: Colors.lightGrey,
        padding: 13,
        borderRadius: 60,
    },
    theLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    searchContainer: {
        height: 60,
        backgroundColor: '#fff',
    },
    searchSection: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 20,

    },
    searchField: {
        flex: 1,
        backgroundColor: Colors.lightGrey,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionButton: {
        padding: 10,
        borderRadius: 50,
    },
    inputField: {
        padding: 10,
        color: Colors.mediumDark,
    },
    searchIcon: {
        paddingLeft: 8,
    },
});