import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from "@/constants/types";

type ControllerScreenRouteProp = RouteProp<RootStackParamList, 'Controller'>;

type Props = {
    route: ControllerScreenRouteProp;
};

export default function ControllerScreen({ route }: Props) {
    const { someProp } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to the Controller Page</Text>
            <Text style={styles.text}>Prop Value: {someProp}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#181818',
    },
    text: {
        color: '#fff',
        fontSize: 18,
    },
});
