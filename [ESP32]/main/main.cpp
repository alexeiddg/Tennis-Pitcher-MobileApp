#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <ArduinoJson.h>

// BLE UUIDs
#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

// Pins
#define LED_PIN             2
#define MOTOR1_DAC_PIN      25
#define MOTOR2_DAC_PIN      26
#define MOTOR3_PWM_PIN      14
#define MOTOR4_PWM_PIN      27
#define MOTOR5_DIR_PIN1     32
#define MOTOR5_DIR_PIN2     33
#define ADC_CHANNEL3_PIN    34
#define ADC_CHANNEL4_PIN    35
#define ADC_CHANNEL5_PIN    36

// Variables
bool deviceConnected = false;
BLECharacteristic *pCharacteristic;
volatile unsigned int analogRead3;
volatile unsigned int analogRead4;
volatile unsigned int analogRead5;
volatile float dutycycle;
volatile float dutycycle2;

// BLE Server Callbacks
class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
        deviceConnected = true;
        digitalWrite(LED_PIN, HIGH);
        Serial.println("Device connected");
    }

    void onDisconnect(BLEServer* pServer) {
        deviceConnected = false;
        digitalWrite(LED_PIN, LOW);
        Serial.println("Device disconnected");
    }
};

// BLE Characteristic Callbacks
class MyCallbacks: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) {
        std::string value = pCharacteristic->getValue();
        if (value.length() > 0) {
            Serial.print("Received: ");
            for (int i = 0; i < value.length(); i++) {
                Serial.print(value[i]);
            }
            Serial.println();

            // Parse JSON and log each value
            DynamicJsonDocument doc(1024);
            deserializeJson(doc, value);

            const char* keys[] = {"feed", "height", "backspin", "topspin", "direction"};
            for (const char* key : keys) {
                if (doc.containsKey(key)) {
                    int motorValue = doc[key].as<int>();
                    Serial.printf("%s: %d\n", key, motorValue);

                    // Map values to motors and print mappings
                    if (strcmp(key, "feed") == 0) {
                        int mappedValue = map(motorValue, 0, 100, 0, 255);
                        dacWrite(MOTOR1_DAC_PIN, mappedValue);
                        Serial.printf("Mapped 'feed' to MOTOR1_DAC_PIN (GPIO %d): %d\n", MOTOR1_DAC_PIN, mappedValue);

                        // Turn LED on or off based on 'feed' value
                        if (motorValue > 50) { // Adjust threshold as needed
                            digitalWrite(LED_PIN, HIGH);
                            Serial.println("LED turned ON");
                        } else {
                            digitalWrite(LED_PIN, LOW);
                            Serial.println("LED turned OFF");
                        }
                    } else if (strcmp(key, "height") == 0) {
                        int mappedValue = map(motorValue, 0, 100, 0, 255);
                        dacWrite(MOTOR2_DAC_PIN, mappedValue);
                        Serial.printf("Mapped 'height' to MOTOR2_DAC_PIN (GPIO %d): %d\n", MOTOR2_DAC_PIN, mappedValue);
                    } else if (strcmp(key, "backspin") == 0) {
                        int mappedValue = map(motorValue, 0, 100, 0, 255);
                        ledcWrite(0, mappedValue); // PWM Motor 3
                        Serial.printf("Mapped 'backspin' to MOTOR3_PWM_PIN (GPIO %d): %d\n", MOTOR3_PWM_PIN, mappedValue);
                    } else if (strcmp(key, "topspin") == 0) {
                        int mappedValue = map(motorValue, 0, 100, 0, 255);
                        ledcWrite(1, mappedValue); // PWM Motor 4
                        Serial.printf("Mapped 'topspin' to MOTOR4_PWM_PIN (GPIO %d): %d\n", MOTOR4_PWM_PIN, mappedValue);
                    } else if (strcmp(key, "direction") == 0) {
                        if (motorValue <= 1100) {
                            digitalWrite(MOTOR5_DIR_PIN1, HIGH);
                            digitalWrite(MOTOR5_DIR_PIN2, LOW);
                            Serial.printf("Mapped 'direction' to MOTOR5_DIR_PIN1 (GPIO %d) HIGH, MOTOR5_DIR_PIN2 (GPIO %d) LOW\n", MOTOR5_DIR_PIN1, MOTOR5_DIR_PIN2);
                        } else if (motorValue >= 3500) {
                            digitalWrite(MOTOR5_DIR_PIN2, HIGH);
                            digitalWrite(MOTOR5_DIR_PIN1, LOW);
                            Serial.printf("Mapped 'direction' to MOTOR5_DIR_PIN2 (GPIO %d) HIGH, MOTOR5_DIR_PIN1 (GPIO %d) LOW\n", MOTOR5_DIR_PIN2, MOTOR5_DIR_PIN1);
                        } else {
                            digitalWrite(MOTOR5_DIR_PIN1, LOW);
                            digitalWrite(MOTOR5_DIR_PIN2, LOW);
                            Serial.printf("Mapped 'direction' to MOTOR5_DIR_PIN1 (GPIO %d) LOW, MOTOR5_DIR_PIN2 (GPIO %d) LOW\n", MOTOR5_DIR_PIN1, MOTOR5_DIR_PIN2);
                        }
                    }
                }
            }
        }
    }
};

void setup() {
    // Initialize serial communication
    Serial.begin(115200);
    pinMode(LED_PIN, OUTPUT);
    digitalWrite(LED_PIN, LOW);

    // Initialize DAC and PWM
    dacWrite(MOTOR1_DAC_PIN, 0);  // DAC1 (GPIO25)
    dacWrite(MOTOR2_DAC_PIN, 0);  // DAC2 (GPIO26)

    // Initialize GPIOs for linear motor control
    pinMode(MOTOR5_DIR_PIN1, OUTPUT); // GPIO32 for Motor direction control
    pinMode(MOTOR5_DIR_PIN2, OUTPUT); // GPIO33 for Motor direction control

    // Initialize PWM on GPIO14 and GPIO27
    ledcSetup(0, 1000, 8);  // Channel 0, 1kHz, 8-bit resolution
    ledcAttachPin(MOTOR3_PWM_PIN, 0);   // GPIO14 (PWM channel 1)

    ledcSetup(1, 1000, 8);  // Channel 1, 1kHz, 8-bit resolution
    ledcAttachPin(MOTOR4_PWM_PIN, 1);   // GPIO27 (PWM channel 2)

    // Initialize ADC
    analogReadResolution(12); // 12-bit resolution for ADC

    // Initialize BLE
    BLEDevice::init("ESP32_BLE");
    BLEServer *pServer = BLEDevice::createServer();
    pServer->setCallbacks(new MyServerCallbacks());

    BLEService *pService = pServer->createService(SERVICE_UUID);

    pCharacteristic = pService->createCharacteristic(
                        CHARACTERISTIC_UUID,
                        BLECharacteristic::PROPERTY_READ |
                        BLECharacteristic::PROPERTY_WRITE
                      );

    pCharacteristic->setCallbacks(new MyCallbacks());
    pCharacteristic->setValue("Hello World");
    pService->start();

    BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
    pAdvertising->addServiceUUID(SERVICE_UUID);
    pAdvertising->setScanResponse(true);
    pAdvertising->setMinPreferred(0x06);
    pAdvertising->setMinPreferred(0x12);
    BLEDevice::startAdvertising();
    Serial.println("Characteristic defined! Now you can read it on your phone!");
}

void loop() {
    // ADC Readings
    analogRead3 = analogRead(ADC_CHANNEL3_PIN);
    dutycycle = (analogRead3 / 4095.0f) * 255;
    dacWrite(MOTOR1_DAC_PIN, dutycycle); // Update DAC1 (GPIO25)

    analogRead4 = analogRead(ADC_CHANNEL4_PIN);
    dutycycle2 = (analogRead4 / 4095.0f) * 255;
    ledcWrite(1, dutycycle2); // Update PWM duty cycle for GPIO27

    analogRead5 = analogRead(ADC_CHANNEL5_PIN);

    // Motor direction control based on ADC value
    if (analogRead5 <= 1100) {
        digitalWrite(MOTOR5_DIR_PIN1, HIGH); // Set GPIO32
        digitalWrite(MOTOR5_DIR_PIN2, LOW);  // Reset GPIO33
    } else if (analogRead5 >= 3500) {
        digitalWrite(MOTOR5_DIR_PIN2, HIGH); // Set GPIO33
        digitalWrite(MOTOR5_DIR_PIN1, LOW);  // Reset GPIO32
    } else {
        digitalWrite(MOTOR5_DIR_PIN1, LOW); // Reset GPIO32
        digitalWrite(MOTOR5_DIR_PIN2, LOW); // Reset GPIO33
    }

    delay(100); // Adjust delay as needed
}
