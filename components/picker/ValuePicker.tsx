import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        setSelectedValue(defaultValue);
    }, [defaultValue]);

    return (
        <View style={styles.container}>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={selectedValue}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                        setSelectedValue(itemValue);
                        onValueChange(itemValue);
                    }}
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
        height: 250,
        width: 320,
        color: '#FFFFFF',
    },
    pickerItem: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    selectedHighlight: {
        position: 'absolute',
        top: '35%',
        left: 2,
        right: 2,
        height: 50,
        marginTop: -1,
        borderWidth: 2,
        borderColor: '#bae718',
    },
});

export default PickerComponent;
