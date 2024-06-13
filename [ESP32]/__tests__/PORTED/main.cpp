#include <Arduino.h>

// Declaration of variables
volatile unsigned int analogRead3; // Stores the ADC reading
volatile unsigned int analogRead4; // Stores the ADC reading for channel 4
volatile unsigned int analogRead5; // Stores the ADC reading for channel 5
volatile float dutycycle; // Stores the duty cycle value
volatile float dutycycle2; // Stores the duty cycle value for PWM channel 2

void setup() {
    // Initialize serial communication
    Serial.begin(115200);

    // Initialize DAC and PWM
    dacWrite(25, 0);  // DAC1 (GPIO25)
    dacWrite(26, 0);  // DAC2 (GPIO26)

    // Initialize GPIOs for linear motor control
    pinMode(32, OUTPUT); // GPIO32 for Motor direction control
    pinMode(33, OUTPUT); // GPIO33 for Motor direction control

    // Initialize PWM on GPIO14 and GPIO27
    ledcSetup(0, 1000, 8);  // Channel 0, 1kHz, 8-bit resolution
    ledcAttachPin(14, 0);   // GPIO14 (PWM channel 1)

    ledcSetup(1, 1000, 8);  // Channel 1, 1kHz, 8-bit resolution
    ledcAttachPin(27, 1);   // GPIO27 (PWM channel 2)

    // Initialize ADC
    analogReadResolution(12); // 12-bit resolution for ADC
}

void loop() {
    // Read ADC value for channel 3 (GPIO34)
    analogRead3 = analogRead(34);
    dutycycle = (analogRead3 / 4095.0f) * 255;
    dacWrite(25, dutycycle); // Update DAC1 (GPIO25)

    // Read ADC value for channel 4 (GPIO35)
    analogRead4 = analogRead(35);
    dutycycle2 = (analogRead4 / 4095.0f) * 255;
    ledcWrite(1, dutycycle2); // Update PWM duty cycle for GPIO27

    // Read ADC value for channel 5 (GPIO36)
    analogRead5 = analogRead(36);

    // Motor direction control based on ADC value
    if (analogRead5 <= 1100) {
        // Move motor in one direction
        digitalWrite(32, HIGH); // Set GPIO32
        digitalWrite(33, LOW);  // Reset GPIO33
    } else if (analogRead5 >= 3500) {
        // Move motor in the opposite direction
        digitalWrite(33, HIGH); // Set GPIO33
        digitalWrite(32, LOW);  // Reset GPIO32
    } else {
        // Stop motor
        digitalWrite(32, LOW); // Reset GPIO32
        digitalWrite(33, LOW); // Reset GPIO33
    }

    delay(100); // Adjust delay as needed
}
