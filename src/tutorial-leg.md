# Section 1: Leg Assembly and Calibration 

[//]: # ()
[//]: # (<figure>)

[//]: # (	<div style="display:flex;flex-direction:row">)

[//]: # (		<img src="../img/arduinoide.png" style="height:400px">)

[//]: # (		<svg viewBox="200 0 200 400" style="height:400px">)

[//]: # (			<text x="300" y="100" text-anchor="middle" dominant-baseline="middle" style="fill:var&#40;--r-main-color&#41;">Robot booted</text>)

[//]: # (			<text x="300" y="200" text-anchor="middle" dominant-baseline="middle" style="fill:var&#40;--r-main-color&#41;">setup&#40;&#41;</text>)

[//]: # (			<text x="300" y="300" text-anchor="middle" dominant-baseline="middle" style="fill:var&#40;--r-main-color&#41;">loop&#40;&#41;</text>)

[//]: # (			<path d="M 300,120 l 0,60 l -10,-20 c 0,0 10,15 20,0 l -10,20" style="stroke:var&#40;--r-main-color&#41;;fill:var&#40;--r-main-color&#41;"/>)

[//]: # (			<path d="M 300,220 l 0,60 l -10,-20 c 0,0 10,15 20,0 l -10,20" style="stroke:var&#40;--r-main-color&#41;;fill:var&#40;--r-main-color&#41;"/>)

[//]: # (			<path d="M 320,280 l 0,-10 60,0 0,60 -60,0 0,-20" style="stroke:var&#40;--r-main-color&#41;;fill:none"/>)

[//]: # (			<path d="M 320,310 l -10,20 c 0,0 10,-15 20,0 l -10,-20" style="stroke:var&#40;--r-main-color&#41;;fill:var&#40;--r-main-color&#41;"/>)

[//]: # (		</svg>)

[//]: # (	</div>)

[//]: # (<figcaption>Arduino IDE and program flowchart</figcaption>)

[//]: # (</figure>)

### 1.1 Lower Body and Leg Assembly
<figure>
	<div style="display:flex;flex-direction:row">
		<img src="/img/step4_5_Ottobot.png" style="height:300px"/>
	</div>
<figcaption><strong>Step 4.5 OttoBot Leg Assembly : </strong>
Place the servo in the OttoBot Body and secure them with the LONG screws
</figcaption>
</figure>

<figure>
	<div style="display:flex;flex-direction:row">
		<!-- <img src="/img/step8.1_Ottobot.png" style="height:300px"/> -->
        <img src="/img/step8_Ottobot.png" style="height:300px"/>
	</div>
<figcaption><strong>Step 5.1 OttoBot Leg Assembly : </strong>
Connect the servo to the arduino nano microcontroller
</figcaption>
</figure>
<figcaption><strong>After installing the servos, we will need to callibrate the servos. </strong></figcaption>

## Leg Callibration
<strong>Why ?</strong> It is for the accurate positioning of joints and movements. 
If the servo is uncalibrated, it might not move to the exact intended angle, causing errors in tasks like grabbing objects or walking.

Below is the following code designed to calibrate the servos of the Otto DIY robot. Ensure that all required libraries are installed from OttoDIY GitHub.
The following code is designed to calibrate the servos of the Otto DIY robot. Ensure that all required libraries are installed from OttoDIY GitHub.

We will do <strong>2 times</strong> of callibration <strong>each</strong> for legs and foot. 

1st time to set the servo to default angle before installing the frame, and the 2nd time after assembling the frame.

### 1. Basics 
You can go through the slides if its your first time setting up Arduino.
??? abstract "Slides"
    <div class="reveal deck1">
        <div class="slides">
            <section data-markdown>
                <textarea data-template>
                    # Arduino IDE
                    ---
                    ## OttoBot Library Installation
                    ![Library_TaskBar.png](img%2FLibrary_TaskBar.png){ style="height:350px" }
                    ![Library_Instructions.png](img%2FLibrary_Instructions.png){ style="height:400px" }
                    ---
                    ## Arduino IDE
                    <svg viewBox="0 0 486 593" style="height:500px">
                        <image href="../img/arduinoide.png"/>
                        <!-- <rect x="5" y="85" width="476" height="350" stroke-width="5" stroke="red" fill-opacity="0"/> -->
                    </svg>
                    ---
                    ## Arduino IDE
                    <svg viewBox="0 0 486 593" style="height:500px">
                        <image href="../img/arduinoide.png"/>
                        <rect x="5" y="85" width="476" height="350" stroke-width="5" stroke="red" fill-opacity="0"/>
                    </svg>
                    ---
                    <svg style="width:600px;height:600px">
                        <text x="300" y="100" text-anchor="middle" dominant-baseline="middle" style="fill:var(--r-main-color)">Robot booted</text>
                        <text x="300" y="300" text-anchor="middle" dominant-baseline="middle" style="fill:var(--r-main-color)">setup()</text>
                        <text x="300" y="500" text-anchor="middle" dominant-baseline="middle" style="fill:var(--r-main-color)">loop()</text>
                        <path d="M 300,150 l 0,100 l -10,-20 c 0,0 10,15 20,0 l -10,20" style="stroke:var(--r-main-color);fill:var(--r-main-color)"/>
                        <path d="M 300,350 l 0,100 l -10,-20 c 0,0 10,15 20,0 l -10,20" style="stroke:var(--r-main-color);fill:var(--r-main-color)"/>
                        <path d="M 350,460 l 0,-20 100,0 0,120 -100,0 0,-40" style="stroke:var(--r-main-color);fill:none"/>
                        <path d="M 350,520 l -10,20 c 0,0 10,-15 20,0 l -10,-20" style="stroke:var(--r-main-color);fill:var(--r-main-color)"/>
                    </svg>
                    ---
                    ## Required Libraries
                    Ensure these libraries are included for basic Arduino projects:
                    ```c++ 
                    #include <Arduino.h>
                    #include <Wire.h>
                    #include <EEPROM.h>
                    #include <SoftwareSerial.h>
                    ```
                    ---
                    ### Pin Definitions
                    Depending on the pins you have connected to the Arduino Shield, declare the pin numbers:
                    <div style="display: flex; align-items: center; gap: 20px;">
                    <div>
                    <img src="../img/step8_Ottobot.png" style="height:400px">
                    </div>
                    <div style="width:400px;">
                        ```c++
                        #define LeftLeg 2 
                        #define RightLeg 3 
                        #define LeftFoot 4 
                        #define RightFoot 5 
                        #define Buzzer 13 
                        ```
                    </div>
                    ---
                    ## Constants for Angle Conversion
                    ```c++ 
                    double angle_rad = PI / 180.0; 
                    double angle_deg = 180.0 / PI; 
                    ```
                    ---
                    ## Declaring Leg and Feet Variables
                    ```c++ 
                    int YL; //(1)
                    int YR; //(2)
                    int RL; //(3)
                    int RR; //(4)
                    ```
                    ---
                    ## Setup Function
                    ```c++ 
                    void setup() {
                    Otto.init(LeftLeg, RightLeg, LeftFoot, RightFoot, true, Buzzer); //(1)
                    Serial.begin(9600);
                    }
                    ```
                    ---
                    # Calibration
                    ---
                    ```c++ 
                    YL = EEPROM.read(0); 
                    if (YL > 128) YL -= 256;
                    ``` 
                    ---
                    ```c++ 
                    YR = EEPROM.read(1); 
                    if (YR > 128) YR -= 256;
                    RL = EEPROM.read(2); 
                    if (RL > 128) RL -= 256;
                    RR = EEPROM.read(3); 
                    if (RR > 128) RR -= 256;
                    Otto.home(); //(7)
                    Serial.println("OTTO CALIBRATION PROGRAM"); //(8)
                    Serial.println("PRESS a or z for adjusting Left Leg");
                    Serial.println("PRESS s or x for adjusting Left Foot");
                    Serial.println("PRESS k or m for adjusting Right Leg");
                    Serial.println("PRESS j or n for adjusting Right Foot");
                    Serial.println("PRESS f to test Otto walking");
                    Serial.println("PRESS h to return servos to home position");
                    ```
                </textarea>
            </section>
        </div>
    </div>

    !!! info inline end ""
        <kbd>F</kbd> for fullscreen &middot;
        <kbd>O</kbd> for overview


```c++ linenums="1"
#include <Arduino.h>
#include <Wire.h>
#include <SoftwareSerial.h>
#include <EEPROM.h>
#include <Otto.h>

Otto Otto;

#define LeftLeg 2
#define RightLeg 3
#define Buzzer 13

double angle_rad = PI / 180.0;
double angle_deg = 180.0 / PI;

int YL;
int YR;

void setup() {
	Otto.init(LeftLeg, RightLeg, true, Buzzer);
	Serial.begin(9600);

	YL = EEPROM.read(0);
	if (YL > 128) YL -= 256;

	YR = EEPROM.read(1);
	if (YR > 128) YR -= 256;

	Otto.home();

	Serial.println("OTTO CALIBRATION PROGRAM");
	Serial.println("PRESS a or z for adjusting Left Leg");
	Serial.println("PRESS k or m for adjusting Right Leg");
	Serial.println("PRESS f to test Otto walking");
	Serial.println("PRESS h to return servos to home position");
}

void loop() {
	int charRead = 0;

	if (Serial.available() > 0) {
		charRead = Serial.read();
	}

	switch (charRead) {
		case 'a': YL++; break;
		case 'z': YL--; break;
		case 'k': YR++; break;
		case 'm': YR--; break;
		case 'f': Otto.walk(1, 1000, 1); break;
		case 'h': Otto.home(); break;
	}

	Otto.setTrims(YL, YR);
	calib_homePos();
	Otto.saveTrimsOnEEPROM();
}

void calib_homePos() {
	int servoPos[2] = {90, 90};
	Otto._moveServos(500, servoPos);
	Otto.detachServos();
}

```


<strong>NOTE BEFORE PROCEEDING TO NEXT SECTION:

The next section will be a more long winded explaination of the code. 

To get a better understanding, hover on the plus sign next each line of code.</strong>


<div style="text-align: center; margin: 20px 0;">
<button onclick="document.getElementById('after-upload').scrollIntoView({behavior: 'smooth'})" 
        style="background-color: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
Jump to Post-Upload Instructions →
</button>
</div>


### 2. Required Libraries
```c++ linenums="1"
#include <Arduino.h> //(1)
#include <Wire.h> //(2)
#include <SoftwareSerial.h> //(3)
#include <EEPROM.h> //(4)
#include <Otto.h> //(5)
Otto Otto; //(6)
```

1. Arduino Core Library: Provides basic functions for Arduino programming.

2. Wire Library: Used for I2C communication between devices.

3. SoftwareSerial Library: Allows serial communication on other digital pins.

4. EEPROM Library: Allows reading and writing of data to the Arduino's EEPROM.

5. Otto Library: Specific library to control the Otto DIY robot.

6. Otto Object: Initializes the Otto robot instance.

### 3. Pin Definitions
```c++ linenums="1"
#define LeftLeg 2 //(1)
#define RightLeg 3 //(2)
#define Buzzer 13 //(3)
```

1. LeftLeg (Pin 2): Controls the left leg servo.

2. RightLeg (Pin 3): Controls the right leg servo.

3. Buzzer (Pin 13): Controls the buzzer for sound output.

### 4. Angle Conversion Constants
```c++ linenums="1"
double angle_rad = PI / 180.0; //(1)
double angle_deg = 180.0 / PI; //(2)
```

1. angle_rad: Converts degrees to radians.
2. angle_deg: Converts radians to degrees.

### 5. Declaring Global Variables
```c++ linenums="1"
int YL; //(1)
int YR; //(2)
```

1. YL: Stores the calibration value for the left leg.

2. YR: Stores the calibration value for the right leg.

### 6. Setup Function
```c++ linenums="1"
void setup() {
Otto.init(LeftLeg, RightLeg, true, Buzzer); //(1)
Serial.begin(9600); //(2)

    YL = EEPROM.read(0); //(3)
    if (YL > 128) YL -= 256;

    YR = EEPROM.read(1); //(4)
    if (YR > 128) YR -= 256;

    Otto.home(); //(5)

    Serial.println("OTTO CALIBRATION PROGRAM"); //(6)
    Serial.println("PRESS a or z for adjusting Left Leg");
    Serial.println("PRESS k or m for adjusting Right Leg");
    Serial.println("PRESS f to test Otto walking");
    Serial.println("PRESS h to return servos to home position");
}
```

1. Otto.init: Initializes the Otto robot with the defined servo and buzzer pins.

2. Serial.begin: Starts serial communication at 9600 baud rate.

3. EEPROM.read: Reads calibration data from EEPROM for the left leg.

4. EEPROM.read: Reads calibration data from EEPROM for the right leg.

5. Otto.home: Moves all servos to the home position.

6. Serial Output: Provides instructions for calibration via the serial monitor.

### 7. Loop Function
```c++ linenums="1"
void loop() {
int charRead = 0;

    if (Serial.available() > 0) {
        charRead = Serial.read(); //(1)
    }

    switch (charRead) {
        case 'a': YL++; break;
        case 'z': YL--; break;
        case 'k': YR++; break;
        case 'm': YR--; break;
        case 'f': Otto.walk(1, 1000, 1); break; //(2)
        case 'h': Otto.home(); break; //(3)
    }

    Otto.setTrims(YL, YR); //(4)
    calib_homePos(); //(5)
    Otto.saveTrimsOnEEPROM(); //(6)
}
```

1. Serial.read: Reads user input from the serial monitor.

2. Otto.walk: Makes Otto walk forward.

3. Otto.home: Returns servos to the home position.

4. Otto.setTrims: Applies the new calibration values.

5. calib_homePos: Moves servos to a calibration position.

6. Otto.saveTrimsOnEEPROM: Saves the new calibration values to EEPROM.

### 8. Calibration Helper Function
```c++ linenums="1"
void calib_homePos() {
int servoPos[2] = {90, 90}; //(1)
Otto._moveServos(500, servoPos); //(2)
Otto.detachServos(); //(3)
}
```

1. servoPos: Array holding servo positions (90 degrees for calibration).

2. Otto._moveServos: Moves the servos to specified positions over 500 ms.

3. Otto.detachServos: Detaches the servos to save power and prevent heating.


<div id="after-upload">
	<p>
		After you send the code to the microcontroller, you will hear faint noises of gear rotation.
		That's the sign of the servo moving to the default angle for all Ottobots [90deg]
	</p>
	<p>
		Next you can start installing the Ottobot's legs.
	</p>
</div>

<figure>
	<div style="display:flex;flex-direction:row">
		<img src="/img/step6_7_Ottobot.png" style="height:300px"/>
	</div>
<figcaption>
    <strong>Step 6.7 :</strong> Fix the left and right legs of the Ottobot, but do not screw them in yet. Ensure the legs are aligned properly (90°) before securing them.
  </figcaption>
</figure>

