import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

type DynamicButtonProps = {
    outline: boolean;
    fill: string;
    textColor: string;
    text: string;
    onPress: () => void;
};

const DynamicButton: React.FC<DynamicButtonProps> = ({ outline, fill, textColor, text, onPress }) => {
    const buttonStyle: ViewStyle = outline
        ? { ...styles.button, borderColor: fill, borderWidth: 1, backgroundColor: 'transparent' }
        : { ...styles.button, backgroundColor: fill };

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Text style={[styles.text, { color: textColor }]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DynamicButton;
