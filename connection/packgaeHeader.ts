import * as FileSystem from 'expo-file-system';

interface Config {
    feed: number;
    height: number;
    backspin: number;
    topspin: number;
    direction: number;
    [key: string]: number;
}

const config: Config = {
    feed: 0,
    height: 0,
    backspin: 0,
    topspin: 0,
    direction: 0,
};

const fileUri = FileSystem.documentDirectory + 'storage/package/currentConfig.json';

const loadOrCreateConfig = async (): Promise<void> => {
    try {
        const fileInfo = await FileSystem.getInfoAsync(fileUri);

        if (!fileInfo.exists) {
            await saveConfigToFile();
        } else {
            const configFile = await FileSystem.readAsStringAsync(fileUri);
            Object.assign(config, JSON.parse(configFile));
            console.log('Loaded config:', config);
        }
    } catch (error) {
        console.error('Error loading or creating config file:', error);
    }
};

// Function to convert config object to JSON and save it to a file
export const saveConfigToFile = async (): Promise<void> => {
    try {
        const dirInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'storage/package');
        if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'storage/package', { intermediates: true });
        }

        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(config));
        console.log('Config saved to', fileUri);

        const savedContent = await FileSystem.readAsStringAsync(fileUri);
        console.log('Saved config content:', savedContent);
    } catch (error) {
        console.error('Error saving config to file:', error);
    }
};

export { config, loadOrCreateConfig };
