import React, { useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, useColorScheme } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/constants/types';
import { Colors } from '@/constants/Colors';
import SideButton from '@/components/button/Side-Button';
import Button from '@/components/button/Button';
import ConnectionCard from "@/components/connectionStatus";
import { initializeBluetooth, disconnectDevice, sendValue } from "@/connection/linker";

type IndexScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Index'>;

type Props = {
    navigation: IndexScreenNavigationProp;
};

export default function Index({ navigation }: Props) {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'dark'];

    useEffect(() => {
        initializeBluetooth();

        return () => {
            disconnectDevice();
        };
    }, []);

    const handleDTagPress = () => {
        // Handle D1 button press
    };

    const handleButtonPress = (controller: string) => {
        navigation.navigate('Controller', { someProp: controller });
        sendValue('1')
    };

    return (
        <View style={[styles.container, { backgroundColor: themeColors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={[styles.text, { color: themeColors.text }]}>Tennis Pitcher S32</Text>
                <ConnectionCard />
                <View style={styles.buttonsWrapper}>
                    <View style={styles.buttonsContainer}>
                        <SideButton onPress={handleDTagPress} dTag={"D1"} />
                        <Button onPress={() => handleButtonPress("Speed")} title="Speed" />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <SideButton onPress={handleDTagPress} dTag={"D2"} />
                        <Button onPress={() => handleButtonPress("Height")} title="Height" />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <SideButton onPress={handleDTagPress} dTag={"D3"} />
                        <Button onPress={() => handleButtonPress("Backspin")} title="Backspin" />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <SideButton onPress={handleDTagPress} dTag={"D4"} />
                        <Button onPress={() => handleButtonPress("Topspin")} title="Topspin" />
                    </View>
                    <View style={styles.buttonsContainer}>
                        <SideButton onPress={handleDTagPress} dTag={"D5"} />
                        <Button onPress={() => handleButtonPress("???")} title="???" />
                    </View>
                </View>
                <View style={styles.bottomFill} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
    buttonsWrapper: {
        width: '100%',
        alignItems: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16,
        height: 64,
        marginTop: 6,
        marginBottom: 6,
    },
    bottomFill: {
        backgroundColor: Colors.dark.background,
        height: 100, // Adjust height as needed to cover the bottom space
    },
});
