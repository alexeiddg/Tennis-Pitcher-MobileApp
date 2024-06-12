import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

type SideButtonProps = {
    onPress: () => void;
    dTag: string;
};

export default function SideButton({ onPress, dTag }: SideButtonProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.outerSquare}>
                <View style={styles.innerCircle}>
                    <Text style={styles.text}>{dTag}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        marginRight: 8,
    },
    outerSquare: {
        width: 64,
        height: 64,
        borderRadius: 12,
        backgroundColor: Colors.dark.sortButtonBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.dark.background,
        borderWidth: 3,
        borderColor: Colors.light.alertIcon,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
