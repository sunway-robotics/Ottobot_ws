# Micro servo for ultrasonic sensor

??? abstract "Slides"
    <div class="reveal deck1">
      <div class="slides">
        <section data-markdown>
          <textarea data-template>
            # Micro servo for ultrasonic sensor
            ---
            ## What is a servo motor
            Servo motor is a rotary actuator that allows precise rotational position.
            <figure markdown>
              ![servo](https://wiki.keyestudio.com/images/b/be/Ks0194-_servo.png){ style="height:300px" }
            </figure>
            ---
            In the turtle robot, the servo motor is attached to the ultrasonic sensor to change the direction of the ultrasonic sensor
            <figure markdown>
              ![turtle robot](https://wiki.keyestudio.com/images/2/25/%E5%9B%BE%E7%89%871_-_ks0364.png){ style="height:300px" }
            </figure>
            ---
            ## How do we control a servo motor
            <figure markdown>
              ![servo cables](https://wiki.keyestudio.com/images/0/0c/Ks0194-2.png){ style="height:200px" }
            </figure>
            The position of the servo (angle) is controlled with the PWM signal.
            ---
            <svg viewBox="0 0 1430 850">
              <style>path{ stroke:black;fill:none;stroke-width:3px;stroke-linecap:round }</style>
              <image href="../img/servodirection0.png" height="300px" x="0" y="0"/>
              <image href="../img/servodirection45.png" height="300px" x="500" y="0"/>
              <image href="../img/servodirection180.png" height="300px" x="1000" y="0"/>
              <text x="200" y="350" text-anchor="middle">0&deg;</text>
              <text x="700" y="350" text-anchor="middle">45&deg;</text>
              <text x="1230" y="350" text-anchor="middle">180&deg;</text>
              <path d="M 105 480 L 1350 480" stroke-dasharray="3 5" style="stroke-width:2px;stroke:gray"/>
              <path d="M 105 380 L 1350 380" stroke-dasharray="3 5" style="stroke-width:2px;stroke:gray"/>
              <path d="M 150 480 l 0,-100 50,0 0,100 100,0"/>
              <path d="M 650 480 l 0,-100 70,0 0,100 80,0"/>
              <path d="M 1180 480 l 0,-100 100,0 0,100 50,0"/>
              <text x="100" y="380" text-anchor="end" dominant-baseline="middle">HIGH</text>
              <text x="100" y="480" text-anchor="end" dominant-baseline="middle">LOW</text>
              <path d="M 150 500 l 10,-5 m -10,5 l 10,5 m -10,-5 l 50,0 l -10,5 m 10,-5 l -10,-5 m 10,5"/>
              <path d="M 650 500 l 10,-5 m -10,5 l 10,5 m -10,-5 l 70,0 l -10,5 m 10,-5 l -10,-5 m 10,5"/>
              <path d="M 1180 500 l 10,-5 m -10,5 l 10,5 m -10,-5 l 100,0 l -10,5 m 10,-5 l -10,-5 m 10,5"/>
              <text x="175" y="550" text-anchor="middle" dominant-baseline="middle">500&micro;s</text>
              <text x="685" y="550" text-anchor="middle" dominant-baseline="middle">1000&micro;s</text>
              <text x="1230" y="550" text-anchor="middle" dominant-baseline="middle">2500&micro;s</text>
              <text x="175" y="600" text-anchor="middle" dominant-baseline="middle">min</text>
              <text x="1230" y="600" text-anchor="middle" dominant-baseline="middle">max</text>
              <path d="M 650 750 l 0,-100 70,0 0,100 80,0"/>
              <path d="M 650 780 l 10,-5 m -10,5 l 10,5 m -10,-5 l 150,0 l -10,5 m 10,-5 l -10,-5 m 10,5"/>
              <text x="685" y="830" text-anchor="middle" dominant-baseline="middle">20ms</text>
            </svg>
            ---
            ## Set the servo pin to be output
            ```c++
            int servopin = 3;
            void setup() {
              pinMode(servopin, OUTPUT);
            }
            ```
            ---
            ## Create a function
            so we can send the command for the servo to rotate at the angle we want
            ```c++
            void servopulse(int s_pin, int s_angle) {
            } 
            ```
            ---
            In the function `servopulse`, our purpose is to move the servo connected to `s_pin` to the angle `s_angle`
            <figure>
              <svg viewBox="-400 0 800 600" style="height:500px">
                <style>.block { fill: var(--r-main-color); } .line { fill: var(--r-main-color); stroke: var(--r-main-color); }</style>
                <text x="0" y="100" text-anchor="middle" dominant-baseline="middle" class="block">Calculate pulsewidth from angle</text>
                <text x="0" y="300" text-anchor="middle" dominant-baseline="middle" class="block">Send the HIGH signal based on pulsewidth</text>
                <text x="0" y="500" text-anchor="middle" dominant-baseline="middle" class="block">Send the LOW signal to complete 20ms cycle</text>
                <path d="M 0,150 l 0,100 l -10,-20 c 0,0 10,15 20,0 l -10,20" class="line"/>
                <path d="M 0,350 l 0,100 l -10,-20 c 0,0 10,15 20,0 l -10,20"  class="line"/>
              </svg>
            </figure>
            ---
            <div style="display:flex;flex-direction:row">
              <div style="flex-grow:1">
                <svg viewBox="-400 0 800 600" style="height:300px">
                  <style>.block { fill: var(--r-main-color); } .line { fill: var(--r-main-color); stroke: var(--r-main-color); }</style>
                  <rect x="-400" y="50" width="800" height="100" fill="yellow"/>
                  <text x="0" y="100" text-anchor="middle" dominant-baseline="middle" class="block">Calculate pulsewidth from angle</text>
                  <text x="0" y="300" text-anchor="middle" dominant-baseline="middle" class="block">Send the HIGH signal based on pulsewidth</text>
                  <text x="0" y="500" text-anchor="middle" dominant-baseline="middle" class="block">Send the LOW signal to complete 20ms cycle</text>
                  <path d="M 0,150 l 0,100 l -10,-20 c 0,0 10,15 20,0 l -10,20" class="line"/>
                  <path d="M 0,350 l 0,100 l -10,-20 c 0,0 10,15 20,0 l -10,20"  class="line"/>
                </svg>
              </div>
              <div style="flex-grow:1;display:flex;flex-direction:column;align-items:stretch;justify-content:center;font-size:22px">
                <div style="display:flex;flex-direction:row;justify-content:center;">
                  <div style="display:flex;flex-direction:column;justify-content:space-evenly"><p>0</p><p>500</p></div>
                  <div style="display:flex;flex-direction:column;justify-content:center"><hr style="min-width:200px;border-width:5px;border-color:var(--r-main-color);margin-top:-35px"></div>
                  <div style="display:flex;flex-direction:column;justify-content:space-evenly"><p>180</p><p>2500</p></div>
                  <div style="display:flex;flex-direction:column;justify-content:space-evenly;margin-left:10px"><p>angle</p><p>pulsewidth</p></div>
                </div>
                \\[\begin{aligned}
                \text{pulsewidth}-500 &amp; = \frac{\text{angle}}{180}\times(2500-500)\\\\
                \text{pulsewidth} &amp; = \text{angle}\times\frac{2000}{180}+500\\\\
                &amp; \approx \text{angle}\times11 + 500
                \end{aligned}\\]
              </div>
            </div>
            ---
            <div style="display:flex;flex-direction:row">
              <div style="flex-grow:1">
                <svg viewBox="-400 0 800 600" style="height:300px">
                  <style>.block { fill: var(--r-main-color); } .line { fill: var(--r-main-color); stroke: var(--r-main-color); }</style>
                  <rect x="-400" y="50" width="800" height="100" fill="yellow"/>
                  <text x="0" y="100" text-anchor="middle" dominant-baseline="middle" class="block">Calculate pulsewidth from angle</text>
                  <text x="0" y="300" text-anchor="middle" dominant-baseline="middle" class="block">Send the HIGH signal based on pulsewidth</text>
                  <text x="0" y="500" text-anchor="middle" dominant-baseline="middle" class="block">Send the LOW signal to complete 20ms cycle</text>
                  <path d="M 0,150 l 0,100 l -10,-20 c 0,0 10,15 20,0 l -10,20" class="line"/>
                  <path d="M 0,350 l 0,100 l -10,-20 c 0,0 10,15 20,0 l -10,20"  class="line"/>
                </svg>
              </div>
              <div style="flex-grow:1;display:flex;flex-direction:column;align-items:stretch;justify-content:center">
                ```c++ hl_lines="2"
                void servopulse(int s_pin, int s_angle) {
                  int pulsewidth = s_angle * 11 + 500;
                }
                ```
              </div>
            </div>
            ---
            <div style="display:flex;flex-direction:row">
              <div style="flex-grow:1">
                <svg viewBox="-400 0 800 600" style="height:300px">
                  <style>.block { fill: var(--r-main-color); } .line { fill: var(--r-main-color); stroke: var(--r-main-color); }</style>
                  <rect x="-400" y="250" width="800" height="100" fill="yellow"/>
                  <text x="0" y="100" text-anchor="middle" dominant-baseline="middle" class="block">Calculate pulsewidth from angle</text>
                  <text x="0" y="300" text-anchor="middle" dominant-baseline="middle" class="block">Send the HIGH signal based on pulsewidth</text>
                  <text x="0" y="500" text-anchor="middle" dominant-baseline="middle" class="block">Send the LOW signal to complete 20ms cycle</text>
                  <path d="M 0,150 l 0,100 l -10,-20 c 0,0 10,15 20,0 l -10,20" class="line"/>
                  <path d="M 0,350 l 0,100 l -10,-20 c 0,0 10,15 20,0 l -10,20"  class="line"/>
                </svg>
              </div>
              <div style="flex-grow:1;display:flex;flex-direction:column;align-items:stretch;justify-content:center">
                ```c++ hl_lines="3-4"
                void servopulse(int s_pin, int s_angle) {
                  int pulsewidth = s_angle * 11 + 500;
                  digitalWrite(s_pin, HIGH);
                  delayMicroseconds(pulsewidth);
                }
                ```
              </div>
            </div>
            ---
            <div style="display:flex;flex-direction:row">
              <div style="flex-grow:1">
                <svg viewBox="-400 0 800 600" style="height:300px">
                  <style>.block { fill: var(--r-main-color); } .line { fill: var(--r-main-color); stroke: var(--r-main-color); }</style>
                  <rect x="-400" y="250" width="800" height="100" fill="yellow"/>
                  <text x="0" y="100" text-anchor="middle" dominant-baseline="middle" class="block">Calculate pulsewidth from angle</text>
                  <text x="0" y="300" text-anchor="middle" dominant-baseline="middle" class="block">Send the HIGH signal based on pulsewidth</text>
                  <text x="0" y="500" text-anchor="middle" dominant-baseline="middle" class="block">Send the LOW signal to complete 20ms cycle</text>
                  <path d="M 0,150 l 0,100 l -10,-20 c 0,0 10,15 20,0 l -10,20" class="line"/>
                  <path d="M 0,350 l 0,100 l -10,-20 c 0,0 10,15 20,0 l -10,20"  class="line"/>
                </svg>
              </div>
              <div style="flex-grow:1;display:flex;flex-direction:column;align-items:stretch;justify-content:center">
                ```c++ hl_lines="5-6"
                void servopulse(int s_pin, int s_angle) {
                  int pulsewidth = s_angle * 11 + 500;
                  digitalWrite(s_pin, HIGH);
                  delayMicroseconds(pulsewidth);
                  digitalWrite(s_pin, LOW);
                  delay(20-pulsewidth/1000);
                }
                ```
              </div>
            </div>
            ---
            Here is the complete code to turn the servo to 90&deg;
            ```c++
            int servopin = 3;
            void setup() {
              pinMode(servopin, OUTPUT);
            }
            void servopulse(int s_pin, int s_angle) {
              int pulsewidth = s_angle * 11 + 500;
              digitalWrite(s_pin, HIGH);
              delayMicroseconds(pulsewidth);
              digitalWrite(s_pin, LOW);
              delay(20-pulsewidth/1000);
            }
            void loop() {
              servopulse(servopin, 90);
            }
            ```
            ---
            ### If we want to check the calculation, we can use the serial monitor to display the values
            ```c++ hl_lines="4-5 8-9 11-12"
            int servopin = 3;
            void setup() {
              pinMode(servopin, OUTPUT);
              Serial.begin(9600);
              Serial.println("servo program initiated");
            }
            void servopulse(int s_pin, int s_angle) {
              Serial.print("angle = ");
              Serial.print(s_angle);
              int pulsewidth = s_angle * 11 + 500;
              Serial.print(" pulsewidth = ");
              Serial.println(pulsewidth);
              digitalWrite(s_pin, HIGH);
              delayMicroseconds(pulsewidth);
              digitalWrite(s_pin, LOW);
              delay(20-pulsewidth/1000);
            }
            void loop() {
              servopulse(servopin, 90);
            }
            ```
          </textarea>
        </section>
      </div>
    </div>
    !!! info inline end ""
        <kbd>F</kbd> for fullscreen &middot;
        <kbd>O</kbd> for overview


## What is a servo motor
Servo motor is a rotary actuator that allows precise rotational position. In the turtle robot, the servo motor is attached to the ultrasonic sensor to change the direction of the ultrasonic sensor
<figure markdown>
  ![servo](https://wiki.keyestudio.com/images/b/be/Ks0194-_servo.png){ style="height:300px" }
</figure>

## How do we control a servo motor
<figure markdown>
  ![servo cables](https://wiki.keyestudio.com/images/0/0c/Ks0194-2.png){ style="height:200px" }
</figure>
The position of the servo (angle) is controlled with the PWM signal.

<figure>
<svg viewBox="0 0 1430 850" width="80%">
  <image href="../img/servodirection0.png" height="300px" x="0" y="0"/>
  <image href="../img/servodirection45.png" height="300px" x="500" y="0"/>
  <image href="../img/servodirection180.png" height="300px" x="1000" y="0"/>
  <text x="200" y="350" text-anchor="middle" font-size="30px">0&deg;</text>
  <text x="700" y="350" text-anchor="middle" font-size="30px">45&deg;</text>
  <text x="1230" y="350" text-anchor="middle" font-size="30px">180&deg;</text>
  <path d="M 105 480 L 1350 480" stroke-dasharray="3 5" style="stroke-width:2px;stroke:gray"/>
  <path d="M 105 380 L 1350 380" stroke-dasharray="3 5" style="stroke-width:2px;stroke:gray"/>
  <path d="M 150 480 l 0,-100 50,0 0,100 100,0"/>
  <path d="M 650 480 l 0,-100 70,0 0,100 80,0"/>
  <path d="M 1180 480 l 0,-100 100,0 0,100 50,0"/>
  <text x="100" y="380" text-anchor="end" dominant-baseline="middle" font-size="30px">HIGH</text>
  <text x="100" y="480" text-anchor="end" dominant-baseline="middle" font-size="30px">LOW</text>
  <path d="M 150 500 l 10,-5 m -10,5 l 10,5 m -10,-5 l 50,0 l -10,5 m 10,-5 l -10,-5 m 10,5"/>
  <path d="M 650 500 l 10,-5 m -10,5 l 10,5 m -10,-5 l 70,0 l -10,5 m 10,-5 l -10,-5 m 10,5"/>
  <path d="M 1180 500 l 10,-5 m -10,5 l 10,5 m -10,-5 l 100,0 l -10,5 m 10,-5 l -10,-5 m 10,5"/>
  <text x="175" y="550" text-anchor="middle" dominant-baseline="middle" font-size="30px">500&micro;s</text>
  <text x="685" y="550" text-anchor="middle" dominant-baseline="middle" font-size="30px">1000&micro;s</text>
  <text x="1230" y="550" text-anchor="middle" dominant-baseline="middle" font-size="30px">2500&micro;s</text>
  <text x="175" y="600" text-anchor="middle" dominant-baseline="middle" font-size="30px">min</text>
  <text x="1230" y="600" text-anchor="middle" dominant-baseline="middle" font-size="30px">max</text>
  <path d="M 650 750 l 0,-100 70,0 0,100 80,0"/>
  <path d="M 650 780 l 10,-5 m -10,5 l 10,5 m -10,-5 l 150,0 l -10,5 m 10,-5 l -10,-5 m 10,5"/>
  <text x="685" y="830" text-anchor="middle" dominant-baseline="middle" font-size="30px">20ms</text>
</svg>
</figure>

## Set the servo pin to be output
```c++ linenums="1"
int servopin = 3;
void setup() {
  pinMode(servopin, OUTPUT);
}
```

## Create a function
To make it easier to send the command for the servo to rotate at the angle we want, we will create a function called `servopulse`.
```c++ linenums="5"
void servopulse(int s_pin, int s_angle) {
} 
```

In the function `servopulse`, our purpose is to move the servo connected to `s_pin` to the angle `s_angle`
<figure>
  <svg viewBox="-400 50 800 300" style="height:300px">
    <style>.block { fill: var(--r-main-color); } .line { fill: var(--r-main-color); stroke: var(--r-main-color); }</style>
    <text x="0" y="100" text-anchor="middle" dominant-baseline="middle" class="block">Calculate pulsewidth from angle</text>
    <text x="0" y="200" text-anchor="middle" dominant-baseline="middle" class="block">Send the HIGH signal based on pulsewidth</text>
    <text x="0" y="300" text-anchor="middle" dominant-baseline="middle" class="block">Send the LOW signal to complete 20ms cycle</text>
    <path d="M 0,125 l 0,50 l -10,-20 c 0,0 10,15 20,0 l -10,20" class="line"/>
    <path d="M 0,225 l 0,50 l -10,-20 c 0,0 10,15 20,0 l -10,20"  class="line"/>
  </svg>
</figure>

```c++ linenums="5"
void servopulse(int s_pin, int s_angle) {
  int pulsewidth = s_angle * 11 + 500;    //(1)
  digitalWrite(s_pin, HIGH);              //(2)
  delayMicroseconds(pulsewidth);
  digitalWrite(s_pin, LOW);               //(3)
  delay(20-pulsewidth/1000);
}
```

1. Calculate pulsewidth

    Derivation of calculation for pulsewidth
    <div style="flex-grow:1;display:flex;flex-direction:column;align-items:stretch;justify-content:center;">
      <div style="display:flex;flex-direction:row;justify-content:center;">
        <div style="display:flex;flex-direction:column;justify-content:space-evenly"><p>0</p><p>500</p></div>
        <div style="display:flex;flex-direction:column;justify-content:center"><hr style="min-width:200px;border-width:5px;border-color:var(--r-main-color);margin-top:-28px"></div>
        <div style="display:flex;flex-direction:column;justify-content:space-evenly"><p>180</p><p>2500</p></div>
        <div style="display:flex;flex-direction:column;justify-content:space-evenly;margin-left:10px"><p>angle</p><p>pulsewidth</p></div>
      </div>
    \(\begin{aligned}
    \text{pulsewidth}-500 &amp; = \frac{\text{angle}}{180}\times(2500-500)\\\\
    \text{pulsewidth} &amp; = \text{angle}\times\frac{2000}{180}+500\\\\
    &amp; \approx \text{angle}\times11 + 500
    \end{aligned}\)
    </div>

2. Send HIGH signal
3. Send LOW signal

## Complete code
Here is the complete code to turn the servo to 90&deg;
```c++
int servopin = 3;
void setup() {
  pinMode(servopin, OUTPUT);
}
void servopulse(int s_pin, int s_angle) {
  int pulsewidth = s_angle * 11 + 500;
  digitalWrite(s_pin, HIGH);
  delayMicroseconds(pulsewidth);
  digitalWrite(s_pin, LOW);
  delay(20-pulsewidth/1000);
}
void loop() {
  servopulse(servopin, 90);
}
```

If we want to check the calculation, we can use the serial monitor to display the values
```c++ hl_lines="4-5 8-9 11-12"
int servopin = 3;
void setup() {
  pinMode(servopin, OUTPUT);
  Serial.begin(9600);
  Serial.println("servo program initiated");
}
void servopulse(int s_pin, int s_angle) {
  Serial.print("angle = ");
  Serial.print(s_angle);
  int pulsewidth = s_angle * 11 + 500;
  Serial.print(" pulsewidth = ");
  Serial.println(pulsewidth);
  digitalWrite(s_pin, HIGH);
  delayMicroseconds(pulsewidth);
  digitalWrite(s_pin, LOW);
  delay(20-pulsewidth/1000);
}
void loop() {
  servopulse(servopin, 90);
}
```