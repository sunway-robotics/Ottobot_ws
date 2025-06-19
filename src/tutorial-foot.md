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

## 2.0 Assembly of Servos
<figure>
        <div style="display:flex;flex-direction:row">
            <img src="/img/step16_17_Ottobot.png" style="height:300px"/>
        </div>
    <figcaption>
        <strong>Step 8.9 :</strong> Ignore the frame of the robot's feet. Poke the tip of the servo's wire into the top hole [OttoBot's Lower Body].
    </figcaption>
</figure>

<figure>
        <div style="display:flex;flex-direction:row">
            <img src="/img/step20_Ottobot.png" style="height:300px"/>
        </div>
    <figcaption>
        <strong>Step 10.11 :</strong> Connect the servo for left and right foot to the microcontroller. Pins refer to the picture above. 
    </figcaption>
</figure>

<figcaption><strong>After installing the servos for the foot, we will need to callibrate the servos. </strong></figcaption>

## 2.1 Foot Callibration
```c++ linenums="1"
    #include <Arduino.h>
    #include <Wire.h>
    #include <SoftwareSerial.h>
    #include <EEPROM.h>
    #include <Otto.h> //-- Otto Library
    Otto Otto;  //This is Otto!

    #define LeftLeg 2 
    #define RightLeg 3
    #define LeftFoot 4 
    #define RightFoot 5 
    #define Buzzer  13 

    double angle_rad = PI/180.0;
    double angle_deg = 180.0/PI;
    int YL;
    int YR;
    int RL;
    int RR;

    void setup(){
        Otto.init(LeftLeg, RightLeg, LeftFoot, RightFoot, true, Buzzer); //Set the servo pins and Buzzer pin
        Serial.begin(9600);
        YL = EEPROM.read(0);
        if (YL > 128) YL -= 256;
        YR = EEPROM.read(1);
        if (YR > 128) YR -= 256;
        RL = EEPROM.read(2);
        if (RL > 128) RL -= 256;
        RR = EEPROM.read(3);
        if (RR > 128) RR -= 256;
        Otto.home();
        Serial.println("OTTO CALIBRATION PROGRAM");
        Serial.println("PRESS a or z for adjusting Left Leg");
        Serial.println("PRESS s or x for adjusting Left Foot");
        Serial.println("PRESS k or m for adjusting Right Leg");
        Serial.println("PRESS j or n for adjusting Right Foot");
        Serial.println();
        Serial.println("PRESS f to test Otto walking");
        Serial.println("PRESS h to return servos to home position"); 
    }

    void loop(){
        int charRead = 0;

        if((Serial.available()) > (0)){
            charRead = Serial.read();
        }
        if(((charRead)==('a' ))){
            YL++;
            Otto.setTrims(YL,YR,RL,RR);
            calib_homePos();
            Otto.saveTrimsOnEEPROM();
        }else{
            if(((charRead)==( 'z' ))){
                YL--;
                Otto.setTrims(YL,YR,RL,RR);
                calib_homePos();
                Otto.saveTrimsOnEEPROM();
            }else{
                if(((charRead)==( 's' ))){
                    RL++;
                    Otto.setTrims(YL,YR,RL,RR);
                    calib_homePos();
                    Otto.saveTrimsOnEEPROM();
                }else{
                    if(((charRead)==( 'x' ))){
                        RL--;
                        Otto.setTrims(YL,YR,RL,RR);
                        calib_homePos();
                        Otto.saveTrimsOnEEPROM();
                    }else{
                        if(((charRead)==( 'k' ))){
                            YR++;
                            Otto.setTrims(YL,YR,RL,RR);
                            calib_homePos();
                            Otto.saveTrimsOnEEPROM();
                        }else{
                            if(((charRead)==( 'm' ))){
                                YR--;
                                Otto.setTrims(YL,YR,RL,RR);
                                calib_homePos();
                                Otto.saveTrimsOnEEPROM();
                            }else{
                                if(((charRead)==( 'j' ))){
                                    RR++;
                                    Otto.setTrims(YL,YR,RL,RR);
                                    calib_homePos();
                                    Otto.saveTrimsOnEEPROM();
                                }else{
                                    if(((charRead)==( 'n' ))){
                                        RR--;
                                        Otto.setTrims(YL,YR,RL,RR);
                                        calib_homePos();
                                        Otto.saveTrimsOnEEPROM();
                                    }else{
                                        if(((charRead)==( 'f' ))){
                                            Otto.walk(1,1000,1);
                                        }else{
                                            if(((charRead)==( 'h' ))){
                                                Otto.home();
                                            }else{
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } 
    }

    void calib_homePos() {
    int servoPos[4];
    servoPos[0]=90;
    servoPos[1]=90;
    servoPos[2]=90;
    servoPos[3]=90;
    Otto._moveServos(500, servoPos);
    Otto.detachServos();
    }
```

<div style="text-align: center; margin: 20px 0;">
    <button onclick="document.getElementById('after-upload').scrollIntoView({behavior: 'smooth'})" 
            style="background-color: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
    Jump to Post-Upload Instructions →
    </button>
</div>

###  2.1.1 Required Libraries
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

### 2.1.2 Pin Definitions
```c++ linenums="1"
#define LeftLeg 2 //(1)
#define RightLeg 3 //(2)
#define LeftFoot 4 //(3)
#define RightFoot 5 //(4)
#define Buzzer 13 //(5)
```

1. LeftLeg (Pin 2): Controls the left leg servo.

2. RightLeg (Pin 3): Controls the right leg servo.

3. LeftFoot (Pin 4): Controls the left foot servo.

4. RightFoot (Pin 5): Controls the right foot servo.

5. Buzzer (Pin 13): Controls the buzzer for sound output.

### 2.1.3 Angle Conversion Constants
```c++ linenums="1"
double angle_rad = PI / 180.0; //(1)
double angle_deg = 180.0 / PI; //(2)
```

1. angle_rad: Converts degrees to radians.
2. angle_deg: Converts radians to degrees.

### 2.1.4  Declaring Global Variables
```c++ linenums="1"
int YL; //(1)
int YR; //(2)
int RL; //(3)
int RR; //(4)
```

1. YL: Stores the calibration value for the left leg.

2. YR: Stores the calibration value for the right leg.

3. RL: Stores the calibration value for the left foot.

4. RR: Stores the calibration value for the right foot.

5. 
### 2.1.5 Setup Function
```c++ linenums="1"
void setup() {
Otto.init(LeftLeg, RightLeg, LeftFoot, RightFoot, true, Buzzer); //(1)
Serial.begin(9600); //(2)

    YL = EEPROM.read(0); //(3)
    if (YL > 128) YL -= 256;

    YR = EEPROM.read(1); //(4)
    if (YR > 128) YR -= 256;

    RL = EEPROM.read(2); //(5)
    if (RL > 128) RL -= 256;

    RR = EEPROM.read(3); //(6)
    if (RR > 128) RR -= 256;

    Otto.home(); //(7)

    Serial.println("OTTO CALIBRATION PROGRAM"); //(8)
    Serial.println("PRESS a or z for adjusting Left Leg");
    Serial.println("PRESS s or x for adjusting Left Foot");
    Serial.println("PRESS k or m for adjusting Right Leg");
    Serial.println("PRESS j or n for adjusting Right Foot");
    Serial.println("PRESS f to test Otto walking");
    Serial.println("PRESS h to return servos to home position");
}
```

1. Otto.init: Initializes the Otto robot with the defined servo and buzzer pins.

2. Serial.begin: Starts serial communication at 9600 baud rate.

3. EEPROM.read: Reads calibration data from EEPROM for the left leg.

4. EEPROM.read: Reads calibration data from EEPROM for the right leg.

5. EEPROM.read: Reads calibration data from EEPROM for the left foot.

6. EEPROM.read: Reads calibration data from EEPROM for the right foot.

7. Otto.home: Moves all servos to the home position.

8. Serial Output: Provides instructions for calibration via the serial monitor.

### 2.1.6 Loop Function
```c++ linenums="1"
void loop() {
int charRead = 0;

    if (Serial.available() > 0) {
        charRead = Serial.read(); //(1)
    }

    switch (charRead) {
        case 'a': YL++; break;
        case 'z': YL--; break;
        case 's': RL++; break;
        case 'x': RL--; break;
        case 'k': YR++; break;
        case 'm': YR--; break;
        case 'j': RR++; break;
        case 'n': RR--; break;
        case 'f': Otto.walk(1, 1000, 1); break; //(2)
        case 'h': Otto.home(); break; //(3)
    }

    Otto.setTrims(YL, YR, RL, RR); //(4)
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

### 2.1.7 Calibration Helper Function
```c++ linenums="1"
void calib_homePos() {
int servoPos[4] = {90, 90, 90, 90}; //(1)
Otto._moveServos(500, servoPos); //(2)
Otto.detachServos(); //(3)
}
```

1. servoPos: Array holding servo positions (90 degrees for calibration).

2. Otto._moveServos: Moves the servos to specified positions over 500 ms.

3. Otto.detachServos: Detaches the servos to save power and prevent heating.
<br>
-----------------------------------------------------------------
<div id="after-upload">
	<p>
		After you send the code to the microcontroller, you will hear faint noises of gear rotation.
		That's the sign of the servo moving to the default angle for all Ottobots [90deg]
	</p>
	<p>
		Next you can start installing the frame for Ottobot's feet.
	</p>
</div>

## 2.2  Continuation of Foot Assembly

<figure>
        <div style="display:flex;flex-direction:row">
            <img src="/img/step13_14_Ottobot.png" style="height:300px"/>
        </div>
    <figcaption>
        <strong>Step 13.14 : </strong> DO NOT ROTATE THE SERVO. Gently fix the servo onto the servo horn untill you hear a click and it feels secure. If there is any rotation of the servo, remove the servo and recallibrate the servo.
    </figcaption>
</figure>

<figure>
        <div style="display:flex;flex-direction:row">
            <img src="/img/step15_Ottobot.png" style="height:300px"/>
        </div>
    <figcaption>
        <strong>Step 15 :</strong> Using the small screw, secure the servo onto the frame of the foot. 
    </figcaption>
</figure>

<figure>
        <div style="display:flex;flex-direction:row">
            <img src="/img/step18_19_Ottobot.png" style="height:300px"/>
            <img src="/img/step20_Ottobot.png" style="height:300px"/>
        </div>
    <figcaption>
        <strong>Step 18.19.20 :</strong> After fixing everything in place, screw the feets to the legs. 
        Make sure the servo is still connected to the microcontroller.
    </figcaption>
</figure>

