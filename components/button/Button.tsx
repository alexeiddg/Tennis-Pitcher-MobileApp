import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
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
                    <Image style={[styles.image]} source={require('../../assets/images/tennis-ball.png')}></Image>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'left',
    },
    image: {
        width: '70%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
    }
});
