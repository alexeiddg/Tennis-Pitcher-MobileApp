import React from 'react';
import { ScrollView, View, Text, StyleSheet, useColorScheme } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/constants/types';
import { Colors } from '@/constants/Colors';
import { config } from '@/connection/packgaeHeader';
import { sendJsonToEsp32 } from '@/connection/linker'
import SideButton from '@/components/button/Side-Button';
import Button from '@/components/button/Button';
import ConnectionCard from "@/components/connectionStatus";
import DynamicButton from "@/components/dynamicButton";

type IndexScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Index'>;

type Props = {
    navigation: IndexScreenNavigationProp;
};

export default function Index({ navigation }: Props) {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'dark'];

    const handleDTagPress = () => {
        // Handle D tag button press
    };

    const loadCurrentCOnfig = async () => {
        config.exec = 1;
        await sendJsonToEsp32()
    }

    const handleButtonPress = (controller: string) => {
        navigation.navigate('Controller', { someProp: controller });
    };

    return (
        <View style={[styles.container, { backgroundColor: themeColors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={[styles.text, { color: themeColors.text }]}>Tennis Pitcher S32</Text>
                <ConnectionCard />
                <View style={styles.buttonsWrapper}>
                    <View style={styles.buttonsContainer}>
                        <SideButton onPress={handleDTagPress} dTag={"D1"} />
                        <Button onPress={() => handleButtonPress("Feed")} title="Feed" />
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
                        <Button onPress={() => handleButtonPress("Direction")} title="Direction" />
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <DynamicButton
                        outline={true}
                        fill={themeColors.tint}
                        textColor={themeColors.text}
                        text="Load Saved Configuration"
                        onPress={loadCurrentCOnfig}
                    />
                </View>
                <View style={styles.bottomFill} />
                <View style={styles.bottomFill} />
                <View style={styles.bottomFill} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 35,
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 20,
    },
    text: {
        fontSize: 22,
        marginBottom: 20,
        fontWeight: 'bold',
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
        height: 100,
    },
});
