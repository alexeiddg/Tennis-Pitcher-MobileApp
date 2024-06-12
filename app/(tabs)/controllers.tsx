import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useColorScheme, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as FileSystem from 'expo-file-system';
import { RootStackParamList } from "@/constants/types";
import { Colors } from '@/constants/Colors';
import { valuesSpeedHeight, valuesSpin } from "@/constants/pickerValues";
import PickerComponent from "@/components/picker/ValuePicker";
import DynamicButton from "@/components/dynamicButton";
import { config, saveConfigToFile } from '@/storage/packgaeHeader';

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

    if (someProp === 'Speed' || someProp === 'Height') {
        values = valuesSpeedHeight;
    } else {
        values = valuesSpin;
    }

    const [pickerValue, setPickerValue] = useState(0);

    useEffect(() => {
        const loadConfig = async () => {
            const fileUri = FileSystem.documentDirectory + 'currentConfig.json';
            try {
                const configFile = await FileSystem.readAsStringAsync(fileUri);
                Object.assign(config, JSON.parse(configFile));
                console.log('Loaded config:', config);
            } catch (error) {
                console.error('Error reading config file:', error);
            }
        };
        loadConfig();
    }, []);

    const handleButtonPress = async () => {
        config[someProp.toLowerCase() as keyof typeof config] = pickerValue;
        await saveConfigToFile();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                <Image source={require('../../assets/images/arrow-left.png')} style={styles.goBackImage} />
                <Text style={styles.goBackText}>Back</Text>
            </TouchableOpacity>
            <Text style={[styles.toptext, { color: themeColors.text }]}>Set New Drill: {someProp}</Text>
            <View style={styles.pickerContainer}>
                <PickerComponent values={values} defaultValue={0} propName={someProp.toLowerCase()} onValueChange={setPickerValue} />
            </View>
            <View style={styles.buttonsContainer}>
                <DynamicButton
                    outline={true}
                    fill={themeColors.tint}
                    textColor={themeColors.text}
                    text="Simulate Drill"
                    onPress={handleButtonPress}
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
        </ScrollView>
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
        top: 10,
        left: 10,
        padding: 5,
    },
    goBackImage: {
        width: 15,
        height: 15,
        marginRight: 5,
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
