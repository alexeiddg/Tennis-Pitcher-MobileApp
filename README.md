# Tennis Pitcher Control App

This project features a custom-built tennis pitcher designed and constructed by our team. The accompanying codebase includes a React Native app that allows users to control the tennis pitcher via Bluetooth Low Energy (BLE), communicating with a programmed ESP32 microprocessor. The system operates with 5 motors to control the feed, height, backspin, topspin, and direction of the tennis pitcher. Users can save configurations locally or execute them directly from their device for seamless and personalized training sessions.

## Key Features

- **Bluetooth Low Energy (BLE) Control**: Wirelessly manage the tennis pitcher using a React Native app.
- **ESP32 Microprocessor**: Programmed to handle communication and control of 5 motors.
- **Motor Functions**: Adjust feed, height, backspin, topspin, and direction for optimal training.
- **Local Storage**: Save and execute custom configurations directly from the user's device.

## Technologies Used

- **React Native**: Front-end mobile application development.
- **ESP32**: Microprocessor programming for motor control.
- **Bluetooth Low Energy (BLE)**: Wireless communication protocol.

## Getting Started

### Prerequisites

- Node.js and npm installed
- Expo CLI installed
- Android Studio (for Android development) or Xcode (for iOS development)
- An ESP32 development board
- React Native development environment set up

### Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/tennis-pitcher-control-app.git
    cd tennis-pitcher-control-app
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Start the App**:
    ```bash
    expo start
    ```

4. **Run on Android Device**:
    ```bash
    expo run:android
    ```

5. **Run on iOS Device**:
    ```bash
    expo run:ios
    ```

6. **Program the ESP32**:
   - Follow the instructions in the `esp32/README.md` to upload the firmware to the microprocessor.

## Usage

- **Connect to the Tennis Pitcher**: Open the app and connect to the tennis pitcher via Bluetooth.
- **Control Motors**: Adjust the feed, height, backspin, topspin, and direction using the app controls.
- **Save Configurations**: Save your custom configurations locally on your device.
- **Execute Configurations**: Directly execute saved configurations for your training sessions.


