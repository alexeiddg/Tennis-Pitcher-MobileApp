import * as FileSystem from 'expo-file-system';

interface Config {
    feed: number;
    height: number;
    backspin: number;
    topspin: number;
    direction: number;
    [key: string]: number; // Add index signature
}

const config: Config = {
    feed: 0,
    height: 0,
    backspin: 0,
    topspin: 0,
    direction: 0,
};

const fileUri = FileSystem.documentDirectory + 'currentConfig.json';

// Function to convert config object to JSON and save it to a file
export const saveConfigToFile = async (outputDir: string = '/storage/package'): Promise<void> => {
    try {
        // Ensure the output directory exists
        const dirInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + outputDir);
        if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + outputDir, { intermediates: true });
        }

        // Construct the full file path
        const fullPath = FileSystem.documentDirectory + outputDir + '/currentConfig.json';

        // Write the config object to the file
        await FileSystem.writeAsStringAsync(fullPath, JSON.stringify(config));
        console.log('Config saved to', fullPath);
    } catch (error) {
        console.error('Error saving config to file:', error);
    }
};

export { config };
