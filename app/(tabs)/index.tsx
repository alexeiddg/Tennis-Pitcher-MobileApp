import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/constants/types';
import { Colors } from '@/constants/Colors';
import SideButton from '@/components/button/Side-Button';
import Button from '@/components/button/Button';

type IndexScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Index'>;

type Props = {
    navigation: IndexScreenNavigationProp;
};

export default function Index({ navigation }: Props) {
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'dark'];

    const handleDTagPress = () => {
        // Handle D1 button press
    };

    const handleButtonPress = () => {
        navigation.navigate('Controller', { someProp: 'Some Value' });
    };

    return (
        <View style={[styles.container, { backgroundColor: themeColors.background }]}>
            <Text style={[styles.text, { color: themeColors.text }]}>Tennis Pitcher S32</Text>
            <View style={styles.buttonsContainer}>
                <SideButton onPress={ handleDTagPress } dTag={"D1"} />
                <Button onPress={ handleButtonPress } title="Speed" />
            </View>
            <View style={styles.buttonsContainer}>
                <SideButton onPress={ handleDTagPress } dTag={"D2"} />
                <Button onPress={ handleButtonPress } title="Height" />
            </View>
            <View style={styles.buttonsContainer}>
                <SideButton onPress={ handleDTagPress } dTag={"D3"} />
                <Button onPress={ handleButtonPress } title="Backspin" />
            </View>
            <View style={styles.buttonsContainer}>
                <SideButton onPress={ handleDTagPress } dTag={"D4"} />
                <Button onPress={ handleButtonPress } title="Topspin" />
            </View>
            <View style={styles.buttonsContainer}>
                <SideButton onPress={ handleDTagPress } dTag={"D5"} />
                <Button onPress={ handleButtonPress } title="???" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
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
});
