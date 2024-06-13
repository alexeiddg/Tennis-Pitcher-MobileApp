import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useColorScheme, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "@/constants/types";
import { Colors } from '@/constants/Colors';
import {
    valuesFeed,
    valuesSpin,
    valuesHeight,
    valuesDirection,
} from "@/constants/pickerValues";
import PickerComponent from "@/components/picker/ValuePicker";
import DynamicButton from "@/components/dynamicButton";
import TennisCourt from "@/components/tennis-court";
import { config, saveConfigToFile, loadOrCreateConfig } from '@/connection/packgaeHeader';
import { sendJsonToEsp32, initializeBluetooth } from '@/connection/linker';
import thenElse from "ajv/lib/vocabularies/applicator/thenElse";

type ControllerScreenRouteProp = RouteProp<RootStackParamList, 'Controller'>;
type ControllerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Controller'>;

type Props = {
    route: ControllerScreenRouteProp;
    navigation: ControllerScreenNavigationProp;
};

export default function ControllerScreen({ route, navigation }: Props) {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'dark'];
    const { someProp } = route.params;
    let values = undefined;

    if (someProp === 'Feed') values = valuesFeed;
    else if (someProp === 'Height') values = valuesHeight;
    else if (someProp === 'Direction') values = valuesDirection;
    else values = valuesSpin;

    const [pickerValue, setPickerValue] = useState(0);

    useEffect(() => {
        const initialize = async () => {
            await loadOrCreateConfig();
            setPickerValue(config[someProp.toLowerCase() as keyof typeof config]);
            initializeBluetooth();
        };

        initialize();

        return () => {
            console.log("Initializing controller screen");
        };
    }, [someProp]);

    const handleButtonPress = async () => {
        config[someProp.toLowerCase() as keyof typeof config] = pickerValue;
        config.exec = 1;
        await saveConfigToFile();
        await sendJsonToEsp32();
        config.exec = 0;
    };

    const execConfig = async () => {
        config[someProp.toLowerCase() as keyof typeof config] = pickerValue;
        await saveConfigToFile();
        await sendJsonToEsp32()
        config.exec = 0;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                <Image source={require('../../assets/images/arrow-left.png')} style={styles.goBackImage} />
            </TouchableOpacity>
            <Text style={[styles.toptext, { color: themeColors.text }]}>Set New Drill: {someProp}</Text>
            <TennisCourt />
            <View style={styles.pickerContainer}>
                <PickerComponent
                    values={values}
                    defaultValue={config[someProp.toLowerCase() as keyof typeof config]}
                    propName={someProp.toLowerCase()}
                    onValueChange={setPickerValue}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <DynamicButton
                    outline={true}
                    fill={themeColors.tint}
                    textColor={themeColors.text}
                    text="Simulate Drill"
                    onPress={execConfig}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <DynamicButton
                    outline={true}
                    fill={themeColors.tint}
                    textColor={themeColors.text}
                    text="Save to Current Configuration"
                    onPress={handleButtonPress}
                />
            </View>
            <View style={styles.bottomFill} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#181818',
        paddingTop: 50,
        alignItems: 'center',
        paddingBottom: 20,
    },
    buttonsContainer: {
        width: '90%',
        marginVertical: 6,
        paddingHorizontal: 8,
    },
    goBackButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 79,
        left: 10,
        padding: 5,
    },
    goBackImage: {
        width: 15,
        height: 15,
        marginRight: 5,
        marginLeft: 20,
    },
    goBackText: {
        color: '#fff',
        fontSize: 18,
    },
    text: {
        fontSize: 18,
        marginTop: 30,
    },
    toptext: {
        marginTop: 30,
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 22,
    },
    pickerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    bottomFill: {
        backgroundColor: Colors.dark.background,
        height: 50,
    },
});
