import { BleManager, Device, State, Characteristic } from 'react-native-ble-plx';

const manager = new BleManager();
let connectedDevice: Device | null = null;

export const initializeBluetooth = (): void => {
    manager.onStateChange((state) => {
        if (state === State.PoweredOn) {
            scanAndConnect();
        }
    }, true);
};

const scanAndConnect = (): void => {
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
                    console.log('Connected to', device.name);
                })
                .catch((error) => console.error('Connection error:', error));
        }
    });
};

export const sendValue = (value: string): void => {
    if (connectedDevice) {
        connectedDevice.writeCharacteristicWithResponseForService(
            '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
            'beb5483e-36e1-4688-b7f5-ea07361b26a8',
            Buffer.from(value).toString('base64')
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
                console.log('Disconnected');
            })
            .catch((error) => console.error('Disconnection error:', error));
    }
};
