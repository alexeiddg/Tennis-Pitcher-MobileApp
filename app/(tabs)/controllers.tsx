import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "@/constants/types";
import { Colors } from '@/constants/Colors';
import { valuesSpeedHeight, valuesSpin } from "@/constants/pickerValues";
import PickerComponent from "@/components/picker/ValuePicker";


type ControllerScreenRouteProp = RouteProp<RootStackParamList, 'Controller'>;
type ControllerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Controller'>;

type Props = {
    route: ControllerScreenRouteProp;
    navigation: ControllerScreenNavigationProp;
};

export default function ControllerScreen({ route, navigation }: Props) {
    const { someProp } = route.params;
    let values = undefined

    if (someProp === 'Speed' || someProp === 'Height') {
        values = valuesSpeedHeight;
    } else {
        values = valuesSpin;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                <Text style={styles.goBackText}>Go Back</Text>
            </TouchableOpacity>
            <Text style={[styles.text, { color: Colors.dark.text }]}>{someProp}</Text>
            <View style={styles.container}>
                <PickerComponent values={values} defaultValue={1} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818',
        paddingTop: 50, // Adjust as needed to position the button at the top
        alignItems: 'center',
    },
    goBackButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        padding: 10,
    },
    goBackText: {
        color: '#fff',
        fontSize: 18,
        textDecorationLine: 'underline',
    },
    pickerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#181818',
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
});
