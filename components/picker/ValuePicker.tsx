import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface PickerComponentProps {
    values: { value: number; label: string }[];
    defaultValue: number;
}

const PickerComponent = ({ values, defaultValue }: PickerComponentProps) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Select a Value:</Text>
            <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
                {values.map((item) => (
                    <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#181818',
    },
    label: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: 150,
        color: '#FFFFFF',
    },
});

export default PickerComponent;
