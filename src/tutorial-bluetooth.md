??? abstract "Slides"
<div class="reveal deck1">
<div class="slides">
<section data-markdown>
<textarea data-template>

# OttoBot Bluetooth Control

---

## 1. Libraries and Initialisation
Includes required libraries and object instantiation:

<div style="display: flex; align-items: center; gap: 20px;">
<div style="width: 400px;">
```c++
#include <Arduino.h>
// #include <Wire.h>
#include <SoftwareSerial.h>
// #include <EEPROM.h>
#include <Otto.h>

Otto Otto;  // This is Otto!
SoftwareSerial BluetoothSerial(7, 6); // RX | TX
```
</div>
<div>
<img src="../img/library_setup.png" style="height:400px">
</div>
</div>

---

## 2. Command Mapping and Pin Definitions
Defines characters for Bluetooth control and pin assignments.

<div style="display: flex; align-items: center; gap: 20px;">
<div>
<img src="../img/pinout.png" style="height:400px">
</div>
<div style="width:400px;">
```c++
#define FORWARD 'F'
#define BACKWARD 'B'
#define LEFT 'L'
#define RIGHT 'R'
#define CIRCLE 'C'
#define CROSS 'X'
#define TRIANGLE 'T'
#define SQUARE 'S'
#define START 'A'
#define PAUSE 'P'

#define LeftLeg 2
#define RightLeg 3
#define LeftFoot 4
#define RightFoot 5
#define Buzzer 13
```
</div>
</div>

---

## 3. Bluetooth and Otto Setup
Initializes the Otto robot and starts Bluetooth communication.

```c++
void setup() {
  Otto.init(LeftLeg, RightLeg, LeftFoot, RightFoot, true, Buzzer); // Set servo and buzzer pins
  BluetoothSerial.begin(9600); // Begin Bluetooth connection
}
```

---

## 4. Main Loop
Continuously checks for Bluetooth input and delegates action.

```c++
void loop() {
  if (BluetoothSerial.available()) {
    char command = BluetoothSerial.read();
    executeCommand(command);
  }
}
```

---

## 5. Command Mapping
Defines the robot's actions in response to Bluetooth inputs.

```c++
void executeCommand(char command) {
  switch (command) {
    case FORWARD:
      Otto.walk(1, 1000, 1);
      break;
    case BACKWARD:
      Otto.walk(1, 1000, -1);
      break;
    case LEFT:
      Otto.turn(1, 1000, 1);
      break;
    case RIGHT:
      Otto.turn(1, 1000, -1);
      break;
    case SQUARE:
      Otto.bend(1, 1000, 1);
      break;
    case CIRCLE:
      Otto.bend(1, 1000, -1);
      break;
    case TRIANGLE:
      Otto.moonwalker(1, 1000, -1);
      break;
    case START:
      Otto.shakeLeg(1, 1000, 1);
      break;
    case CROSS:
      Otto.home();
      break;
    default:
      break;
  }
}
```

---

</textarea>
</section>
</div>
</div>

!!! info inline end ""
 <kbd>F</kbd> for fullscreen &middot; <kbd>O</kbd> for overview
