import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "@/constants/types";

type IndexScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Index'>;

type Props = {
    navigation: IndexScreenNavigationProp;
};

export default function Index({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to the Index Page</Text>
            <Button
                title="Go to Controller"
                onPress={() => navigation.navigate('Controller', { someProp: 'Some Value' })}
            />
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
