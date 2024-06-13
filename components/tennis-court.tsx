import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from "@/constants/Colors";

const TennisCourt = () => {
    return (
        <View style={styles.card}>
            <Svg width="100%" height="100%" viewBox="0 0 512 512">
                <Path fill={Colors.dark.alertIcon} d="M120.8 55L87.58 199h18.52l29.1-126h18.2l-20.6 126h18.3l10.1-62H247v62h18v-62h85.8l10.1 62h18.3L358.6 73h18.2l29.1 126h18.5L391.2 55H120.8zm50.9 18h168.6l7.6 46H164.1l7.6-46zM73 217v30h366v-30H73zm-.64 48L20.69 489H491.3l-51.7-224h-18.5l47.6 206h-45L390 265h-18.3l14.2 87H265v-87h-18v87H126.1l14.2-87H122L88.35 471H43.31l47.56-206H72.36zm50.74 105h265.8l16.5 101H106.6l16.5-101z"/>
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 8,
        borderRadius: 8,
        backgroundColor: Colors.dark.headerBackground, // Replace with Colors.dark.headerBackground if defined
        width: '87%',
        height: '35%',
        paddingBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TennisCourt;
