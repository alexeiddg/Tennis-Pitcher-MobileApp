import {BleManager, Device, BleError, Characteristic, State} from 'react-native-ble-plx';
import * as FileSystem from 'expo-file-system';
import base64 from 'base64-js';

const manager = new BleManager();
let connectedDevice: Device | null = null;
let retryCount = 0;
const maxRetries = 5;
let isConnected = false;

export const initializeBluetooth = (): void => {
    manager.onStateChange((state) => {
        if (state === State.PoweredOn) {
            scanAndConnect();
        }
    }, true);
};

export const scanAndConnect = (): void => {
    manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
            console.error('Device scan error:', error);
            return;
        }

        if (device?.name === 'ESP32_BLE') {
            manager.stopDeviceScan();
            device.connect()
                .then((device) => device.discoverAllServicesAndCharacteristics())
                .then((device) => {
                    connectedDevice = device;
                    retryCount = 0; // Reset retry count on successful connection
                    isConnected = true; // Set connection status to true
                    console.log('Connected to', device.name);
                })
                .catch((error: BleError) => {
                    console.error('Connection error:', error);
                    isConnected = false; // Set connection status to false
                    if (retryCount < maxRetries) {
                        retryCount++;
                        console.log(`Retrying connection... (${retryCount}/${maxRetries})`);
                        scanAndConnect();
                    } else {
                        console.error('Max retries reached. Could not connect to device.');
                    }
                });
        }
    });
};

export const sendValue = (value: string): void => {
    if (connectedDevice) {
        const base64Value = base64.fromByteArray(new TextEncoder().encode(value));
        connectedDevice.writeCharacteristicWithResponseForService(
            '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
            'beb5483e-36e1-4688-b7f5-ea07361b26a8',
            base64Value
        )
            .then((characteristic: Characteristic) => console.log('Value sent:', value))
            .catch((error) => console.error('Write characteristic error:', error));
    } else {
        console.error('No device connected');
    }
};

export const disconnectDevice = (): void => {
    if (connectedDevice) {
        connectedDevice.cancelConnection()
            .then(() => {
                connectedDevice = null;
                isConnected = false; // Set connection status to false
                console.log('Disconnected');
            })
            .catch((error) => console.error('Disconnection error:', error));
    }
};

// Export a function to return the connection status
export const isDeviceConnected = (): boolean => {
    return isConnected;
};

// Function to send the JSON file to the ESP32 via Bluetooth
export const sendJsonToEsp32 = async (): Promise<void> => {
    if (!connectedDevice) {
        console.error('No device connected');
        return;
    }

    const fileUri = FileSystem.documentDirectory + 'storage/package/currentConfig.json';

    try {
        // Read the JSON file content
        const jsonContent = await FileSystem.readAsStringAsync(fileUri);

        // Convert the JSON content to base64
        const base64Content = base64.fromByteArray(new TextEncoder().encode(jsonContent));

        // Write the base64 content to the ESP32 characteristic
        await connectedDevice.writeCharacteristicWithResponseForService(
            '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
            'beb5483e-36e1-4688-b7f5-ea07361b26a8',
            base64Content
        );

        console.log('JSON content sent to ESP32:', jsonContent);
    } catch (error) {
        console.error('Error sending JSON to ESP32:', error);
    }
};
