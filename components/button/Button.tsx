import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';

type ControllerButtonProps = {
    onPress: () => void;
    title: string;
};

export default function Button({ onPress, title }: ControllerButtonProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.innerButton}>
                <View style={styles.outerSquare}>
                </View>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.dark.headerBackground,
        borderRadius: 5,
        flex: 1,
        height: 64,
        justifyContent: 'center',
    },
    innerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        borderRadius: 5,
        paddingLeft: 8,
        paddingRight: 16,
    },
    outerSquare: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: Colors.dark.sortButtonBackground,
        marginRight: 12,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'left',
    },
});
