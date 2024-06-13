import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Colors } from "@/constants/Colors";
import { scanAndConnect, isDeviceConnected } from "@/connection/linker";

const ConnectionCard = () => {
    const [connectionStatus, setConnectionStatus] = useState<boolean | undefined>(undefined);

    const handleRetryButton = () => {
        scanAndConnect();
    };

    useEffect(() => {
        const checkConnection = () => {
            const status = isDeviceConnected();
            setConnectionStatus(status);
        };

        // Check connection status periodically
        const interval = setInterval(checkConnection, 1000);

        return () => clearInterval(interval);
    }, []);

    if (connectionStatus) {
        return (
            <View style={[styles.card]}>
                <View style={[styles.center]}>
                    <Image style={[styles.image1]} source={require('../assets/images/connection.png')} />
                </View>
                <Text style={[styles.text, { paddingTop: 8 }]}>Connected To Pitcher</Text>
            </View>
        );
    } else {
        return (
            <TouchableOpacity style={[styles.card]} onPress={handleRetryButton}>
                <View style={[styles.center]}>
                    <Image style={[styles.image2]} source={require('../assets/images/no-connection.png')} />
                </View>
                <Text style={styles.text}>No Connection</Text>
                <Text style={styles.textSmall}>Tap to Retry</Text>
            </TouchableOpacity>
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
        paddingBottom: 8,
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
    },
    textSmall: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF',
        margin: 4,
    }
});

export default ConnectionCard;
