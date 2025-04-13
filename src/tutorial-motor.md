# Moving the robot

??? abstract "Slides"
    <div class="reveal deck1">
      <div class="slides">
        <section data-markdown>
          <textarea data-template>
            # Motors
            ---
            ## Motor connection 
            ![motor connection](https://wiki.keyestudio.com/images/2/2c/Ks0364_-_connection_5.png){ style="height:400px" }
            <br>Motor A is the left motor<br>and motor B is the right motor
            ---
            ## Control a motor
            In controlling a motor, we are controlling the **speed** and **direction** of the motor
            <br><br>A motor can move at different speeds at either forward or backward direction
            ---
            The speed and direction of the motors are controlled by the following pins
            <div style="display:flex;flex-direction:row">
              <div style="flex-grow:1">
                <table>
                  <tr>
                    <th style="text-align: center;">Motor</th>
                    <th style="text-align: center;">Parameter</th>
                    <th style="text-align: center;">Pin</th>
                  </tr>
                  <tr>
                    <td style="text-align: center;">A</td>
                    <td style="text-align: center;">speed</td>
                    <td style="text-align: center;">9</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td style="text-align: center;">direction</td>
                    <td style="text-align: center;">2</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;">B</td>
                    <td style="text-align: center;">speed</td>
                    <td style="text-align: center;">5</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;"></td>
                    <td style="text-align: center;">direction</td>
                    <td style="text-align: center;">4</td>
                  </tr>
                </table>
              </div>
              <div style="flex-grow:1;display:flex;flex-direction:column;align-items:stretch;justify-content:center;">
                ```c++
                int SA = 9;
                int DA = 2;
                int SB = 5;
                int DB = 4;
                ```
              </div>
            </div>
            ---
            As we are controlling the motor by sending signal through the pins `SA`, `SB`, `DA`, `DB`, we need to set them as output.
            ```c++
            pinMode(SA, OUTPUT);
            pinMode(SB, OUTPUT);
            pinMode(DA, OUTPUT);
            pinMode(DB, OUTPUT);
            ```
            ---
            Speed of a motor is controlled using `analogWrite(pin, value)`
            - `pin` is the pin number of the motor speed
            - `value` is a numerical value from 0 (stop) to 255 (full speed) to control the speed of the motor
            ---
            Direction of a motor is controlled using `digitalWrite(pin, level)`
            - `pin` is the pin number of the motor direction
            - `level` is either `HIGH` (forward) or `LOW` (backward) to denote the direction of the motor
            ---
            Therefore to set motor A to move forward with roughly half speed,
            ```c++
            digitalWrite(DA, HIGH);
            analogWrite(SA, 150);
            ```
            ---
            ```c++
            digitalWrite(DA, HIGH);
            analogWrite(SA, 150);
            ```
            We normally set the direction before setting the speed. This is to avoid the motor moving in unexpected direction when we give the speed.
            ---
            ## Moving the robot forward
            Let's put the code together to move the robot forward
            ```c++
            int SA = 9;
            int DA = 2;
            int SB = 5;
            int DB = 4;
            void setup() {
              pinMode(SA, OUTPUT);
              pinMode(SB, OUTPUT);
              pinMode(DA, OUTPUT);
              pinMode(DB, OUTPUT);
            }
            void loop() {
              digitalWrite(DA, HIGH);
              analogWrite(SA, 150);
              digitalWrite(DB, HIGH);
              analogWrite(SB, 150);
            }
            ```
            ---
            ## Moving the robot backward
            The robot can be moved backward easily by simply changing the direction of the motors from `HIGH` to `LOW`
            ```c++
            void loop() {
              digitalWrite(DA, LOW);
              analogWrite(SA, 150);
              digitalWrite(DB, LOW);
              analogWrite(SB, 150);
            }
            ```
            ---
            As moving forward and backward are common actions for robot, we would create functions that we can call easily whenever we need them.
            ```c++
            void moveForward() {
              digitalWrite(DA, HIGH);
              analogWrite(SA, 150);
              digitalWrite(DB, HIGH);
              analogWrite(SB, 150);
            }
            void moveBackward() {
              digitalWrite(DA, LOW);
              analogWrite(SA, 150);
              digitalWrite(DB, LOW);
              analogWrite(SB, 150);
            }
            ```
            ---
            After we have the `moveForward` and `moveBackward` functions, if we need the robot to move forward for 1 second and then move backward for 1 second, and repeat this process, we can
            ```c++
            void loop() {
              moveForward();
              delay(1000);
              moveBackward();
              delay(1000);
            }
            ```
            ---
            ## How do we stop the robot from moving?
            ---
            ## How do we turn left or right?
            <div style="display:flex;flex-direction:row">
              <svg viewBox="-200 -200 400 400" style="height:300px">
                <style>* { fill: var(--r-main-color) }</style>
                <rect x="-100" y="-100" width="200" height="200" rx="10" />
                <rect x="-140" y="-60" width="30" height="120" rx="15" />
                <rect x="110" y="-60" width="30" height="120" rx="15" />
                <circle cx="125" cy="0" r="5" style="fill:white;stroke:white" />
                <path d="M -125 -75 c 0,0 0,-60 50,-70 l 20,0" style="fill:none;stroke:black;stroke-width:5px" stroke-linecap="round" />
                <path d="M -55 -145 l -15,10 c 0,0 5,-10 0,-20 l 15,10 z" style="fill:black;stroke:black;stroke-width:5px" />        
              </svg>
              <svg viewBox="-200 -200 400 400" style="height:300px">
                <rect x="-100" y="-100" width="200" height="200" rx="10" />
                <rect x="-140" y="-60" width="30" height="120" rx="15" />
                <rect x="110" y="-60" width="30" height="120" rx="15" />
                <circle cx="0" cy="0" r="5" style="fill:white;stroke:white" />
                <path d="M -125 -75 c 0,0 0,-60 50,-70 l 20,0" style="fill:none;stroke:black;stroke-width:5px" stroke-linecap="round" />
                <path d="M -55 -145 l -15,10 c 0,0 5,-10 0,-20 l 15,10 z" style="fill:black;stroke:black;stroke-width:5px" />        
                <path d="M 125 75 c 0,0 0,60 -50,70 l -20,0" style="fill:none;stroke:black;stroke-width:5px" stroke-linecap="round" />
                <path d="M 55 145 l 15,-10 c 0,0 -5,10 0,20 l -15,-10 z" style="fill:black;stroke:black;stroke-width:5px" />        
              </svg>
              <svg viewBox="-200 -200 400 400" style="height:300px">
                <rect x="-100" y="-100" width="200" height="200" rx="10" />
                <rect x="-140" y="-60" width="30" height="120" rx="15" />
                <rect x="110" y="-60" width="30" height="120" rx="15" />
                <circle cx="175" cy="0" r="5" style="fill:white;stroke:black" />
                <path d="M -125 -75 c 0,0 0,-60 50,-70 l 20,0" style="fill:none;stroke:black;stroke-width:5px" stroke-linecap="round" />
                <path d="M -55 -145 l -15,10 c 0,0 5,-10 0,-20 l 15,10 z" style="fill:black;stroke:black;stroke-width:5px" />        
                <path d="M 125 -75 c 0,0 0,-60 50,-70 l 20,0" style="fill:none;stroke:black;stroke-width:5px" stroke-linecap="round" />
                <path d="M 195 -145 l -15,10 c 0,0 5,-10 0,-20 l 15,10 z" style="fill:black;stroke:black;stroke-width:5px" />
              </svg>
            </div>
          </textarea>
        </section>
      </div>
    </div>
    !!! info inline end ""
        <kbd>F</kbd> for fullscreen &middot;
        <kbd>O</kbd> for overview

## Motor connection
<figure markdown> 
![motor connection](https://wiki.keyestudio.com/images/2/2c/Ks0364_-_connection_5.png){ style="height:300px" }
<figcaption>Motor A is the left motor and motor B is the right motor</figcaption>
</figure>

## Control motor

In controlling a motor, we are controlling the **speed** and **direction** of the motor. A motor can move at different speeds at either forward or backward direction.

The speed and direction of the motors are controlled by the following pins
<div style="display:flex;flex-direction:row;align-items:space-around;">
  <div style="flex-grow:1;text-align:center">
    <table>
      <tr>
        <th style="text-align: center;">Motor</th>
        <th style="text-align: center;">Parameter</th>
        <th style="text-align: center;">Pin</th>
      </tr>
      <tr>
        <td style="text-align: center;">A</td>
        <td style="text-align: center;">speed</td>
        <td style="text-align: center;">9</td>
      </tr>
      <tr>
        <td></td>
        <td style="text-align: center;">direction</td>
        <td style="text-align: center;">2</td>
      </tr>
      <tr>
        <td style="text-align: center;">B</td>
        <td style="text-align: center;">speed</td>
        <td style="text-align: center;">5</td>
      </tr>
      <tr>
        <td style="text-align: center;"></td>
        <td style="text-align: center;">direction</td>
        <td style="text-align: center;">4</td>
      </tr>
    </table>
  </div>
  <div style="flex-grow:1;display:flex;flex-direction:column;align-items:stretch;justify-content:center;">
    ```c++
    int SA = 9;
    int DA = 2;
    int SB = 5;
    int DB = 4;
    ```
  </div>
</div>

As we are controlling the motor by sending signal through the pins `SA`, `SB`, `DA`, `DB`, we need to set them as output.
```c++
pinMode(SA, OUTPUT);
pinMode(SB, OUTPUT);
pinMode(DA, OUTPUT);
pinMode(DB, OUTPUT);
```

To set motor A to move forward with roughly half speed, we can use
```c++
digitalWrite(DA, HIGH); //(1)
analogWrite(SA, 150);   //(2)
```

1. Control direction of a motor
    ```
    digitalWrite(pin, level)
    ```

    - `pin` is the pin number of the motor direction
    - `level` is either `HIGH` (forward) or `LOW` (backward) to denote the direction of the motor

2. Control speed of a motor
    ```
    analogWrite(pin, value)
    ```

    - `pin` is the pin number of the motor speed
    - `value` is a numerical value from 0 (stop) to 255 (full speed) to control the speed of the motor

We normally set the direction before setting the speed. This is to avoid the motor moving in unexpected direction when we give the speed.

## Moving forward

```c++ linenums="1"
int SA = 9;
int DA = 2;
int SB = 5;
int DB = 4;
void setup() {
  pinMode(SA, OUTPUT);
  pinMode(SB, OUTPUT);
  pinMode(DA, OUTPUT);
  pinMode(DB, OUTPUT);
}
void loop() {
  digitalWrite(DA, HIGH);
  analogWrite(SA, 150);
  digitalWrite(DB, HIGH);
  analogWrite(SB, 150);
}
```

## Moving backward
The robot can be moved backward easily by changing the direction of the motors from `HIGH` to `LOW`
```c++ linenums="11"
void loop() {
  digitalWrite(DA, LOW);
  analogWrite(SA, 150);
  digitalWrite(DB, LOW);
  analogWrite(SB, 150);
}
```

## Combining forward and backward
As moving forward and backward are common actions for robot, we would create functions that we can call easily whenever we need them.
```c++ linenums="11"
void moveForward() {
  digitalWrite(DA, HIGH);
  analogWrite(SA, 150);
  digitalWrite(DB, HIGH);
  analogWrite(SB, 150);
}
void moveBackward() {
  digitalWrite(DA, LOW);
  analogWrite(SA, 150);
  digitalWrite(DB, LOW);
  analogWrite(SB, 150);
}
```

After we have the `moveForward` and `moveBackward` functions, if we need the robot to move forward for 1 second and then move backward for 1 second, and repeat this process, we can
```c++ linenums="23"
void loop() {
  moveForward();
  delay(1000);
  moveBackward();
  delay(1000);
}
```

## Bring it further

1. How do we stop the robot from moving?
2. How do we turn left or right?

<figure>
<div style="display:flex;flex-direction:row">
  <svg viewBox="-200 -200 400 400" style="height:300px">
    <style>* { fill: var(--r-main-color) }</style>
    <rect x="-100" y="-100" width="200" height="200" rx="10" />
    <rect x="-140" y="-60" width="30" height="120" rx="15" />
    <rect x="110" y="-60" width="30" height="120" rx="15" />
    <circle cx="125" cy="0" r="5" style="fill:white;stroke:white" />
    <path d="M -125 -75 c 0,0 0,-60 50,-70 l 20,0" style="fill:none;stroke:black;stroke-width:5px" stroke-linecap="round" />
    <path d="M -55 -145 l -15,10 c 0,0 5,-10 0,-20 l 15,10 z" style="fill:black;stroke:black;stroke-width:5px" />        
  </svg>
  <svg viewBox="-200 -200 400 400" style="height:300px">
    <rect x="-100" y="-100" width="200" height="200" rx="10" />
    <rect x="-140" y="-60" width="30" height="120" rx="15" />
    <rect x="110" y="-60" width="30" height="120" rx="15" />
    <circle cx="0" cy="0" r="5" style="fill:white;stroke:white" />
    <path d="M -125 -75 c 0,0 0,-60 50,-70 l 20,0" style="fill:none;stroke:black;stroke-width:5px" stroke-linecap="round" />
    <path d="M -55 -145 l -15,10 c 0,0 5,-10 0,-20 l 15,10 z" style="fill:black;stroke:black;stroke-width:5px" />        
    <path d="M 125 75 c 0,0 0,60 -50,70 l -20,0" style="fill:none;stroke:black;stroke-width:5px" stroke-linecap="round" />
    <path d="M 55 145 l 15,-10 c 0,0 -5,10 0,20 l -15,-10 z" style="fill:black;stroke:black;stroke-width:5px" />        
  </svg>
  <svg viewBox="-200 -200 400 400" style="height:300px">
    <rect x="-100" y="-100" width="200" height="200" rx="10" />
    <rect x="-140" y="-60" width="30" height="120" rx="15" />
    <rect x="110" y="-60" width="30" height="120" rx="15" />
    <circle cx="175" cy="0" r="5" style="fill:white;stroke:black" />
    <path d="M -125 -75 c 0,0 0,-60 50,-70 l 20,0" style="fill:none;stroke:black;stroke-width:5px" stroke-linecap="round" />
    <path d="M -55 -145 l -15,10 c 0,0 5,-10 0,-20 l 15,10 z" style="fill:black;stroke:black;stroke-width:5px" />        
    <path d="M 125 -75 c 0,0 0,-60 50,-70 l 20,0" style="fill:none;stroke:black;stroke-width:5px" stroke-linecap="round" />
    <path d="M 195 -145 l -15,10 c 0,0 5,-10 0,-20 l 15,10 z" style="fill:black;stroke:black;stroke-width:5px" />
  </svg>
</div>
<figcaption>Three types of turning right</figcaption>
</figure>