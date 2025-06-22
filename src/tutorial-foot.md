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

## Feet Calibration 
Send the callibrate code to the ide
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
