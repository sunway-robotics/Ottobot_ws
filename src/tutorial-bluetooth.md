## <h2 id="4.1-bluetooth-control-software">4.1 Bluetooth Control Software</h2>

### Changing the Name of your Ottobot
```c++ linenums="1"
#include <SoftwareSerial.h>

SoftwareSerial Bluetooth(6, 7);

void setup() {
  Serial.begin(38400);
  Bluetooth.begin(38400);

  Serial.println("Bluetooth AT Mode Test");
  Serial.println("Type AT commands below.");
}

void loop() {

  if (Bluetooth.available()) {
    Serial.write(Bluetooth.read());
  }

  if (Serial.available()) {
    Bluetooth.write(Serial.read());
  }
}
```
<p>
  1. In Arduino IDE, click on Tools then Serial Monitor. 
  2. Select Baud (Serial Baud Rate) as 9600. Baud Rate is basically bits per second, telling the MCU how often to read the signal the computer sent.
  3. Then, select Line ending as No Line Ending. 
  4. Type AT into serial monitor and press enter. AT command mode allows you to set parameters such as device name, PIN name, baud rate and tole of the module. 
  5. You should get an OK response. Type AT+NAME(yourname) for e.g. AT+NAMEOTTOBOT.

  The default PIN for the HC-06 is "1234", you do not need to change this unless necessary. 
</p>


<figure>
  <div style="display:flex;flex-direction:row; gap: 80px">
      <img src="../img/stepone_Bluetooth.jpg" style="height:500px"/>
      <img src="../img/steptwo_Bluetooth.jpg" style="height:500px"/>
  </div>
</figure>

<figure>
  <div style="display:flex;flex-direction:row; gap: 80px">
      <img src="../img/step3_Bluetooth.jpg" style="height:400px"/>
      <img src="../img/step4_Bluetooth.jpg" style="height:390px"/>
  </div>
</figure>

<figure>
  <div style="display:flex;flex-direction:row; gap: 80px">
      <img src="../img/step5_Bluetooth.jpg" style="height:420px"/>
      <img src="../img/step6_Bluetooth.jpg" style="height:480px"/>
  </div>
</figure>

<figure>
  <div style="display:flex;flex-direction:row; gap: 80px">
      <img src="../img/Bluetooth_LAST.png" style="height:420px"/>
  </div>
</figure>

---

### 📟 Arduino Code for Bluetooth-Controlled Otto

This Arduino sketch lets you control your Otto DIY robot via Bluetooth using an HC-05 module. Each movement is triggered by sending a single character command from a Bluetooth-enabled device. 

```c++ linenums="1"
#include <Arduino.h>
#include <Wire.h>
#include <SoftwareSerial.h>
#include <EEPROM.h>
#include <Otto.h>
```
  This section are all the libraries we're using, the 1st 3 are downloaded by default but the last two we have to download by ourselves. The EEPROM library is named ATMAC_EEPROM by FACTS Engineering on Arduino and the ottobot library is named OttoDIYLib by Otto DIY, Camilo Parra Palacio. Please install both before uploading the code. 

```c++ linenums="1"
#include <Arduino.h>
#include <Wire.h>
#include <SoftwareSerial.h>
#include <EEPROM.h>
#include <Otto.h>

Otto Otto;


// ==================================================
// SERVO PINS
// ==================================================

#define LeftLeg   2
#define RightLeg  3
#define LeftFoot  4
#define RightFoot 5

#define Buzzer 13


// ==================================================
// BLUETOOTH
// ==================================================

// HC-06 TXD -> Nano D6
// HC-06 RXD -> Nano D7

SoftwareSerial Bluetooth(6, 7);


// ==================================================
// ULTRASONIC
// ==================================================

// Ultrasonic TRIG -> D8
// Ultrasonic ECHO -> D9

#define TRIG_PIN 8
#define ECHO_PIN 9

#define OBSTACLE_DISTANCE 20


// ==================================================
// MODES
// ==================================================

#define MANUAL_MODE 0
#define AUTO_MODE   1

int currentMode = MANUAL_MODE;


// ==================================================
// CALIBRATION
// ==================================================

int YL = 45;
int YR = -21;
int RL = 36;
int RR = 33;


// ==================================================
// TURN DIRECTIONS
// ==================================================

// Official Otto direction:
//  1  = left
// -1  = right

// If your physical robot turns the wrong way,
// change these two values.

#define LEFT_TURN_DIR   1
#define RIGHT_TURN_DIR -1


// ==================================================
// FUNCTION DECLARATIONS
// ==================================================

void handleCommand(char command);

void automaticMode();

long getDistance();

void avoidObstacle();

void dance();

void stopOtto();


// ==================================================
// SETUP
// ==================================================

void setup() {

  // ------------------------------
  // Otto initialization
  // ------------------------------

  Otto.init(
    LeftLeg,
    RightLeg,
    LeftFoot,
    RightFoot,
    true,
    Buzzer
  );


  // ------------------------------
  // USB Serial
  // ------------------------------

  Serial.begin(9600);


  // ------------------------------
  // Bluetooth
  // ------------------------------

  Bluetooth.begin(9600);


  // ------------------------------
  // Ultrasonic
  // ------------------------------

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);


  // ------------------------------
  // Calibration
  // ------------------------------

  Otto.setTrims(
    YL,
    YR,
    RL,
    RR
  );


  // ------------------------------
  // Starting position
  // ------------------------------

  Otto.home();


  // ------------------------------
  // Random seed
  // ------------------------------

  randomSeed(analogRead(A0));


  // ------------------------------
  // Startup message
  // ------------------------------

  Serial.println("==============================");
  Serial.println("        OTTOBOT READY");
  Serial.println("==============================");

  Serial.println("F = Forward");
  Serial.println("B = Backward");
  Serial.println("L = Left");
  Serial.println("R = Right");
  Serial.println("S = STOP");
  Serial.println("M = Manual");
  Serial.println("A = Auto");
  Serial.println("D = Dance");
  Serial.println("W = Moonwalk");
  Serial.println("H = Home");

  Serial.println("==============================");

  Bluetooth.println("OTTOBOT READY");
}


// ==================================================
// MAIN LOOP
// ==================================================

void loop() {


  // =================================================
  // BLUETOOTH
  // =================================================

  if (Bluetooth.available()) {

    char command = Bluetooth.read();

    handleCommand(command);
  }


  // =================================================
  // USB SERIAL
  // =================================================

  if (Serial.available()) {

    char command = Serial.read();

    handleCommand(command);
  }


  // =================================================
  // AUTO MODE
  // =================================================

  if (currentMode == AUTO_MODE) {

    automaticMode();
  }
}


// ==================================================
// COMMAND HANDLER
// ==================================================

void handleCommand(char command) {


  // ------------------------------------------------
  // Ignore newline
  // ------------------------------------------------

  if (command == '\n' || command == '\r') {
    return;
  }


  // ------------------------------------------------
  // Bluetooino sends an extra "5"
  // ------------------------------------------------

  if (command == '5') {
    return;
  }


  // ------------------------------------------------
  // Convert lowercase to uppercase
  // ------------------------------------------------

  if (command >= 'a' && command <= 'z') {

    command -= 32;
  }


  // ------------------------------------------------
  // Display command
  // ------------------------------------------------

  Serial.print("Command received: ");
  Serial.println(command);


  // =================================================
  // COMMAND SWITCH
  // =================================================

  switch (command) {


    // ===============================================
    // MANUAL MODE
    // ===============================================

    case 'M':

      currentMode = MANUAL_MODE;

      Serial.println("MANUAL MODE");

      Bluetooth.println("MANUAL MODE");

      Otto.home();

      break;


    // ===============================================
    // AUTO MODE
    // ===============================================

    case 'A':

      currentMode = AUTO_MODE;

      Serial.println("AUTO MODE");

      Bluetooth.println("AUTO MODE");

      break;


    // ===============================================
    // FORWARD
    // ===============================================

    case 'F':

      if (currentMode == MANUAL_MODE) {

        Serial.println("FORWARD");

        Bluetooth.println("FORWARD");

        Otto.walk(
          1,
          1000,
          1
        );
      }

      break;


    // ===============================================
    // BACKWARD
    // ===============================================

    case 'B':

      if (currentMode == MANUAL_MODE) {

        Serial.println("BACKWARD");

        Bluetooth.println("BACKWARD");

        Otto.walk(
          1,
          1000,
          -1
        );
      }

      break;


    // ===============================================
    // LEFT
    // ===============================================

    case 'L':

      if (currentMode == MANUAL_MODE) {

        Serial.println("LEFT");

        Bluetooth.println("LEFT");

        Otto.turn(
          1,
          1000,
          LEFT_TURN_DIR
        );
      }

      break;


    // ===============================================
    // RIGHT
    // ===============================================

    case 'R':

      if (currentMode == MANUAL_MODE) {

        Serial.println("RIGHT");

        Bluetooth.println("RIGHT");

        Otto.turn(
          1,
          1000,
          RIGHT_TURN_DIR
        );
      }

      break;


    // ===============================================
    // STOP
    // ===============================================

    case 'S':

      Serial.println("STOP");

      Bluetooth.println("STOP");

      currentMode = MANUAL_MODE;

      stopOtto();

      break;


    // ===============================================
    // DANCE
    // ===============================================

    case 'D':

      if (currentMode == MANUAL_MODE) {

        Serial.println("DANCE");

        Bluetooth.println("DANCE");

        dance();
      }

      break;


    // ===============================================
    // MOONWALK
    // ===============================================

    case 'W':

      if (currentMode == MANUAL_MODE) {

        Serial.println("MOONWALK");

        Bluetooth.println("MOONWALK");

        Otto.moonwalker(
          3,
          1000,
          25,
          1
        );
      }

      break;


    // ===============================================
    // HOME
    // ===============================================

    case 'H':

      Serial.println("HOME");

      Bluetooth.println("HOME");

      stopOtto();

      break;


    // ===============================================
    // UNKNOWN COMMAND
    // ===============================================

    default:

      Serial.print("ERROR: Unknown command '");
      Serial.print(command);
      Serial.println("'");

      Bluetooth.print("ERROR: Unknown command '");
      Bluetooth.print(command);
      Bluetooth.println("'");

      break;
  }
}


// ==================================================
// STOP OTTO
// ==================================================

void stopOtto() {

  Otto.home();

  Serial.println("OTTO STOPPED");
}


// ==================================================
// AUTOMATIC MODE
// ==================================================

void automaticMode() {


  // =================================================
  // Check Bluetooth commands
  // =================================================

  if (Bluetooth.available()) {

    char command = Bluetooth.read();


    // Ignore Bluetooino's extra 5
    if (command == '5') {

      return;
    }


    // -----------------------------------------------
    // STOP
    // -----------------------------------------------

    if (command == 'S' || command == 's') {

      currentMode = MANUAL_MODE;

      stopOtto();

      Serial.println("AUTO STOPPED");

      return;
    }


    // -----------------------------------------------
    // MANUAL MODE
    // -----------------------------------------------

    if (command == 'M' || command == 'm') {

      currentMode = MANUAL_MODE;

      stopOtto();

      Serial.println("MANUAL MODE");

      return;
    }
  }


  // =================================================
  // Measure ultrasonic distance
  // =================================================

  long distance = getDistance();


  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");


  // =================================================
  // OBSTACLE DETECTED
  // =================================================

  if (distance <= OBSTACLE_DISTANCE) {

    Serial.println("!!! OBSTACLE DETECTED !!!");

    Bluetooth.println("OBSTACLE DETECTED");

    avoidObstacle();

    return;
  }


  // =================================================
  // PATH CLEAR
  // =================================================

  Otto.walk(
    1,
    700,
    1
  );
}


// ==================================================
// OBSTACLE AVOIDANCE
// ==================================================

void avoidObstacle() {


  // ------------------------------------------------
  // Stop
  // ------------------------------------------------

  Serial.println("STOPPING");

  Otto.home();

  delay(200);


  // ------------------------------------------------
  // Back away
  // ------------------------------------------------

  Serial.println("BACKING UP");

  Bluetooth.println("BACKING UP");

  Otto.walk(
    1,
    700,
    -1
  );

  delay(200);


  // ------------------------------------------------
  // Choose random direction
  // ------------------------------------------------

  int direction = random(0, 2);


  // ------------------------------------------------
  // Turn left
  // ------------------------------------------------

  if (direction == 0) {

    Serial.println("AUTO: TURN LEFT");

    Bluetooth.println("TURN LEFT");

    Otto.turn(
      1,
      1000,
      LEFT_TURN_DIR
    );
  }


  // ------------------------------------------------
  // Turn right
  // ------------------------------------------------

  else {

    Serial.println("AUTO: TURN RIGHT");

    Bluetooth.println("TURN RIGHT");

    Otto.turn(
      1,
      1000,
      RIGHT_TURN_DIR
    );
  }


  delay(300);
}


// ==================================================
// ULTRASONIC SENSOR
// ==================================================

long getDistance() {


  // ------------------------------------------------
  // Trigger LOW
  // ------------------------------------------------

  digitalWrite(
    TRIG_PIN,
    LOW
  );

  delayMicroseconds(2);


  // ------------------------------------------------
  // Trigger pulse
  // ------------------------------------------------

  digitalWrite(
    TRIG_PIN,
    HIGH
  );

  delayMicroseconds(10);

  digitalWrite(
    TRIG_PIN,
    LOW
  );


  // ------------------------------------------------
  // Read echo
  // ------------------------------------------------

  long duration = pulseIn(
    ECHO_PIN,
    HIGH,
    30000
  );


  // ------------------------------------------------
  // No echo
  // ------------------------------------------------

  if (duration == 0) {

    return 999;
  }


  // ------------------------------------------------
  // Convert to centimeters
  // ------------------------------------------------

  return duration / 58;
}


// ==================================================
// DANCE
// ==================================================

void dance() {


  Otto.updown(
    2,
    700,
    20
  );

  delay(200);


  Otto.swing(
    2,
    700,
    20
  );

  delay(200);


  Otto.shakeLeg(
    2,
    800,
    1
  );

  delay(200);


  Otto.home();
}
```
[//]: # Previous code #include <Otto.h>
#include <SoftwareSerial.h>

Otto Otto;  //This is Otto!

#define LeftLeg 2 
#define RightLeg 3
#define LeftFoot 4 
#define RightFoot 5 
#define Buzzer  13 


SoftwareSerial BT(11, 12); // HC-05 Bluetooth module: TX to pin 11, RX to pin 12

///////////////////////////////////////////////////////////////////
//-- Setup ------------------------------------------------------//
///////////////////////////////////////////////////////////////////
void setup() {
  Serial.begin(9600);      // USB Serial Monitor
  BT.begin(9600);          // HC-05 Bluetooth communication

  Otto.init(LeftLeg, RightLeg, LeftFoot, RightFoot, true, Buzzer); 

  Otto.home();
  delay(50);
  Serial.println("Otto ready. Waiting for Bluetooth command...");
}

///////////////////////////////////////////////////////////////////
//-- Loop -------------------------------------------------------//
///////////////////////////////////////////////////////////////////
void loop() {
  if (BT.available()) {
    char command = BT.read();
    Serial.print("Received: ");
    Serial.println(command);

    switch (command) {
      case 'F': // Forward
        Otto.walk(2, 900, 1);
        break;
      case 'B': // Backward
        Otto.walk(2, 900, -1);
        break;
      case 'L': // Turn Left
        Otto.turn(2, 1000, 1);
        break;
      case 'R': // Turn Right
        Otto.turn(2, 1000, -1);
        break;
      case 'H': // Home position
        Otto.home();
        break;
      case 'J': // Jump
        Otto.jump(1, 500);
        break;
      case 'S': // Shake leg
          // Otto.shakeLeg (1,1500, 1);
          Otto.home();
          delay(100);
          Otto.shakeLeg (1,2000,-1);
        break;
      case 'M': // Moonwalk
        Otto.moonwalker(3, 1000, 25, 1);
        break;
      default:
        Serial.println("Unknown command");
        break;
    }
    Otto.home();
  }
}

