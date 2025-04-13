# Infrared sensor

??? abstract "Slides"
    <div class="reveal deck1">
      <div class="slides">
        <section data-markdown>
          <textarea data-template>
            # Infrared sensor
            ![infrared sensor](https://wiki.keyestudio.com/images/8/82/KS0313_2-1-1.png){ style="height:200px" }
            ---
            ## Connection of infrared sensor to the board
            ![infrared connection](https://wiki.keyestudio.com/images/b/b6/Ks0364_-_connection_4.png){ style="height:300px" }
            ---
            <div style="display:flex;flex-direction:row">
              <div style="flex-grow:1">
                <table>
                  <tr>
                    <th style="text-align: left;">Purpose</th>
                    <th style="text-align: center;">Mode</th>
                    <th style="text-align: center;">Pin on board</th>
                  </tr>
                  <tr>
                    <td style="text-align: left;">Left sensor</td>
                    <td style="text-align: center;">Input</td>
                    <td style="text-align: center;">6</td>
                  </tr>
                  <tr>
                    <td style="text-align: left;">Middle sensor</td>
                    <td style="text-align: center;">Input</td>
                    <td style="text-align: center;">7</td>
                  </tr>
                  <tr>
                    <td style="text-align: left;">Right sensor</td>
                    <td style="text-align: center;">Input</td>
                    <td style="text-align: center;">8</td>
                  </tr>
                </table>
              </div>
            </div>
            ---
            Light up LED to reflect the state of left sensor
            ```c++ 
            int sensor1 = 6;
            int ledPin = 11; 
            void setup() {
              pinMode(sensor1, INPUT);
              pinMode(ledPin, OUTPUT);
            }

            void loop() {
              if (digitalRead(sensor1) == LOW) { 
                digitalWrite(ledPin, HIGH);
              } else {
                digitalWrite(ledPin, LOW);
              }
            }
            ```
            ---
            Light up LED to reflect the state of middle sensor
            ```c++ 
            int sensor2 = 7;
            int ledPin = 11; 
            void setup() {
              pinMode(sensor2, INPUT);
              pinMode(ledPin, OUTPUT);
            }

            void loop() {
              if (digitalRead(sensor2) == LOW) { 
                digitalWrite(ledPin, HIGH);
              } else {
                digitalWrite(ledPin, LOW);
              }
            }
            ```
            ---
            Light up LED to reflect the state of right sensor
            ```c++ 
            int sensor3 = 8;
            int ledPin = 11; 
            void setup() {
              pinMode(sensor3, INPUT);
              pinMode(ledPin, OUTPUT);
            }

            void loop() {
              if (digitalRead(sensor3) == LOW) { 
                digitalWrite(ledPin, HIGH);
              } else {
                digitalWrite(ledPin, LOW);
              }
            }
            ```
          </textarea>
        </section>
      </div>
    </div>
    !!! info inline end ""
        <kbd>F</kbd> for fullscreen &middot;
        <kbd>O</kbd> for overview

## What is infrared sensor?
<div style="display:flex;flex-direction:row;align-items:center">
<figure markdown>
<img src="https://wiki.keyestudio.com/images/8/82/KS0313_2-1-1.png" style="height:200px" />
<figcaption>Infrared sensors on the turtle robot</figcaption>
</figure>
<figure markdown>
<img src="https://wiki.keyestudio.com/images/b/b6/Ks0364_-_connection_4.png" style="height:200px" />
<figcaption>Infrared sensors connection</figcaption>
</figure>
</div>

## How does infrared sensor work?
Infrared sensors come in pairs of a transmitter and a receiver. The transmitter emits infrared wave/light, and the receiver will receive the infrared wave if the infrared wave is reflected by the surface. If the infrared wave is not reflected by the surface, the receiver will not receive any infrared wave. This is normally used to detect if the surface is white (LOW) or black/dark (HIGH) in colour. 

## Reading from infrared sensors
### Pin mode definition
<div style="display:flex;flex-direction:row">
  <div style="flex-grow:1">
    <table>
      <tr>
        <th style="text-align: left;">Purpose</th>
        <th style="text-align: center;">Mode</th>
        <th style="text-align: center;">Pin on board</th>
      </tr>
      <tr>
        <td style="text-align: left;">Left sensor</td>
        <td style="text-align: center;">Input</td>
        <td style="text-align: center;">6</td>
      </tr>
      <tr>
        <td style="text-align: left;">Middle sensor</td>
        <td style="text-align: center;">Input</td>
        <td style="text-align: center;">7</td>
      </tr>
      <tr>
        <td style="text-align: left;">Right sensor</td>
        <td style="text-align: center;">Input</td>
        <td style="text-align: center;">8</td>
      </tr>
    </table>
  </div>
</div>

### Light up LED to reflect the state of left sensor
```c++ linenums="1"
int sensor1 = 6; //(1)
int ledPin = 11; //(2)
void setup() {
  pinMode(sensor1, INPUT); //(3)
  pinMode(ledPin, OUTPUT); //(4)
}

void loop() {
  if (digitalRead(sensor1) == LOW) {  //(5)
    digitalWrite(ledPin, HIGH);  //(6)
  } else {
    digitalWrite(ledPin, LOW); //(7)
  }
}
```

1. Define the pin of left sensor as pin D6
2. Define LEDpin as Digital 11
3. Define the sensor as INPUT
4. Define LED as OUTPUT
5. Read the state of sensor, if detect the white paper, it is at LOW level
6. Light the LED
7. Turn off the LED

### Light up LED to reflect the state of middle sensor
```c++ linenums="1"
int sensor2 = 7; //(1)
int ledPin = 11; //(2)
void setup() {
  pinMode(sensor2, INPUT); //(3)
  pinMode(ledPin, OUTPUT); //(4)
}

void loop() {
  if (digitalRead(sensor2) == LOW) {  //(5)
    digitalWrite(ledPin, HIGH);  //(6)
  } else {
    digitalWrite(ledPin, LOW); //(7)
  }
}
```

1. Define the pin of middle sensor as pin D7
2. Define LEDpin as Digital 11
3. Define the sensor as INPUT
4. Define LED as OUTPUT
5. Read the state of sensor, if detect the white paper, it is at LOW level
6. Light the LED
7. Turn off the LED

### Light up LED to reflect the state of right sensor
```c++ linenums="1"
int sensor3 = 8; //(1)
int ledPin = 11; //(2)
void setup() {
  pinMode(sensor3, INPUT); //(3)
  pinMode(ledPin, OUTPUT); //(4)
}

void loop() {
  if (digitalRead(sensor3) == LOW) {  //(5)
    digitalWrite(ledPin, HIGH);  //(6)
  } else {
    digitalWrite(ledPin, LOW); //(7)
  }
}
```

1. Define the pin of right sensor as pin D8
2. Define LEDpin as Digital 11
3. Define the sensor as INPUT
4. Define LED as OUTPUT
5. Read the state of sensor, if detect the white paper, it is at LOW level
6. Light the LED
7. Turn off the LED

# Bring it further
1. How do we detect if the robot stays at the middle of a black line on a white background? How about the robot is slightly to the left or right of the black line?