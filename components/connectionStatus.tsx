import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Colors } from "@/constants/Colors";

const ConnectionCard = ({}) => {
    const ConnectionStatus = true
    if (ConnectionStatus) {
        return (
            <View style={[styles.card]}>
                <View style={[styles.center]}>
                    <Image style={[styles.image1]} source={require('../assets/images/connection.png')} />
                </View>
                <Text style={styles.text}>Connected To Pitcher</Text>
            </View>
        );
    } else {
        return (
            <View style={[styles.card]}>
                <View style={[styles.center]}>
                    <Image style={[styles.image2]} source={require('../assets/images/no-connection.png')} />
                </View>
                <Text style={styles.text}>No Connection</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    card: {
        margin: 8,
        borderRadius: 8,
        backgroundColor: Colors.dark.sortButtonBackground,
        width: '90%',
        height: '35%',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF',
    },
    image2: {
        width: '80%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
    },
    image1: {
        width: '70%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
        marginTop: 8,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ConnectionCard;
