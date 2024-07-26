import { Button, StyleSheet, Text, View } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
    const snapPoints = useMemo(() => ['50%'], []);
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []);
    const { dismiss } = useBottomSheetModal(); // we are using useBottomSheetModal hoock and we destructure it to use it's dismiss functionality
    return (
        <BottomSheetModal ref={ref}
            snapPoints={snapPoints}
            overDragResistanceFactor={0}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ borderRadius: 0, backgroundColor: Colors.lightGrey }}
            handleIndicatorStyle={{ display: 'none' }} >
            <View style={styles.mainBottomSheetContainer}>
                <View style={styles.toggleButtons}>
                    <TouchableOpacity style={styles.toggleButtonActive}>
                        <Text style={styles.toggleActiveButtonText}>Delivery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toggleButtonInactive}>
                        <Text style={styles.toggleInactiveButtonText}>Pickup</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subHeader}>Your Location</Text>
                <Link href={'/(modal)/location-select'} asChild>
                    <TouchableOpacity onPress={() => dismiss()}>
                        <View style={styles.item}>
                            <Ionicons name='location-outline' size={20} color={Colors.medium} />
                            <Text style={{ flex: 1 }}>Current location</Text>
                            <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
                        </View>
                    </TouchableOpacity>
                </Link>
                <Text style={styles.subHeader}>Arrival Time</Text>
                <TouchableOpacity>
                    <View style={styles.item}>
                        <Ionicons name='stopwatch-outline' size={20} color={Colors.medium} />
                        <Text style={{ flex: 1 }}>Now</Text>
                        <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonBody} onPress={() => dismiss()}>
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    );
});
export default BottomSheet;

const styles = StyleSheet.create({
    mainBottomSheetContainer: {
        flex: 1,
    },
    buttonBody: {
        backgroundColor: Colors.primary,
        padding: 16,
        margin: 16,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    toggleButtons: {
        flexDirection: "row",
        gap: 8,
        justifyContent: 'center',
        marginBottom: 32,
    },
    toggleButtonActive: {
        backgroundColor: Colors.primary,
        padding: 8,
        borderRadius: 32,
        width: 110,
        alignItems: "center",
    },
    toggleActiveButtonText: {
        color: '#fff',
        fontWeight: '700',
    },
    toggleButtonInactive: {
        // backgroundColor: Colors.mediumDark,
        padding: 8,
        borderRadius: 32,
        width: 110,
        alignItems: "center",
    },
    toggleInactiveButtonText: {
        color: Colors.primary,
        // fontWeight: '700',
    },
    subHeader: {
        fontSize: 16,
        fontWeight: '600',
        margin: 16,
    },
    item: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderWidth: 1,
        borderColor: Colors.grey,

    },
});