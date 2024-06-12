import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface PickerComponentProps {
    values: { value: number; label: string }[];
    defaultValue: number;
    propName: string;
    onValueChange: (value: number) => void;
}

const PickerComponent = ({ values, defaultValue, propName, onValueChange }: PickerComponentProps) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    const handleValueChange = (itemValue: number) => {
        setSelectedValue(itemValue);
        onValueChange(itemValue);
    };

    return (
        <View style={styles.container}>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={selectedValue}
                    style={styles.picker}
                    onValueChange={handleValueChange}
                    itemStyle={styles.pickerItem}
                >
                    {values.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                    ))}
                </Picker>
                <View style={styles.selectedHighlight} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#181818',
        padding: 20,
    },
    pickerWrapper: {
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 5,
        overflow: 'hidden',
        position: 'relative',
    },
    picker: {
        height: 200,
        width: 150,
        color: '#FFFFFF',
    },
    pickerItem: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    selectedHighlight: {
        position: 'absolute',
        top: '54%',
        left: 2,
        right: 2,
        height: 50,
        marginTop: -25,
        borderWidth: 2,
        borderColor: '#bae718',
    },
});

export default PickerComponent;
