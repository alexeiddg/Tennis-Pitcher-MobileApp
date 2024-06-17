# ESP32 Programming for Tennis Pitcher

This project involves programming an ESP32 microprocessor to control a custom-built tennis pitcher. The code progressively adds functionality, starting with basic tests like blinking an LED, and advancing to complex operations such as controlling multiple motors via Bluetooth Low Energy (BLE).

## Progress Overview

### 1. Blinking LED

The first step was to ensure the ESP32 board was functioning correctly by blinking an LED. This basic test verified that the board was operational and could control output pins.

### 2. Basic BLE Setup

Next, we set up basic BLE functionality to establish communication between the ESP32 and a mobile device. This involved initializing the BLE server and defining a service and characteristic.

### 3. Controlling an LED via BLE

Building on the BLE setup, we implemented control of the LED using BLE commands. This demonstrated the ability to receive data over BLE and act upon it.

### 4. Motor Control

The next step was to implement control of motors using PWM and DAC outputs. We used pins to control the speed and direction of multiple motors.

### 5. Parsing JSON for Motor Commands

To enable more complex commands, we integrated ArduinoJson to parse JSON data received via BLE. This allowed us to control multiple motors simultaneously.

### 6. Full Implementation

Finally, we combined all the components into the main code, which includes BLE setup, motor control, and JSON parsing for comprehensive functionality.

## Tests

To ensure the ESP32 board functions correctly, we conducted the following tests:

1. **Blinking LED**: Confirmed that the LED blinks on and off at a set interval, verifying basic GPIO control.
2. **BLE Connectivity**: Established a BLE connection and verified communication between the ESP32 and a mobile device.
3. **LED Control via BLE**: Sent commands from the mobile device to turn the LED on and off, ensuring correct data reception and action.
4. **Motor Control**: Tested PWM and DAC outputs to control motor speed and direction.
5. **JSON Parsing**: Sent JSON commands via BLE and verified correct parsing and execution of motor commands.
6. **Full System Test**: Conducted comprehensive tests to ensure all components work together seamlessly.

By following this progressive approach, we ensured that each component of the system was tested and verified before integrating into the final solution. This methodical process helped us build a reliable and functional tennis pitcher controller.
