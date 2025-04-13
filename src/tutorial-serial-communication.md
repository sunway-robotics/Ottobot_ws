# Serial communication

As we have seen before, we are able to send messages from Arduino to the computer to be displayed on serial monitor. Similarly, we can use the serial protocol to send messages from computer to Arduino.

## Computer

We need to do nothing from the computer as we will be using the serial monitor as our input.

## Arduino

The following code shows the basic message sending from computer to Arduino.

```c++ linenums="1"
char input;
 
void setup() {
  Serial.begin(9600); 
  delay(2000);  

  Serial.println("Type something!");
}
 
void loop() {
  if (Serial.available()) {
    input = Serial.read();
    Serial.print("You typed: " );
    Serial.println(input);
  }
}
```

1. `Serial.begin(...)` sets the baud rate of the serial communication between computer and Arduino, in this case, 9600. The baud rate on the computer and the Arduino has to be the same to ensure correct understanding of the transferred data.
2. `Serial.print(...)` and `Serial.println(...)` send characters from Arduino to computer through the serial protocol.
3. `Serial.available()` provides the information whether there is any incoming serial messages. If any message is waiting to be received, this will return `true` or else will be `false`.
4. `Serial.read()` reads one character of data from the incoming serial message. This one character is then saved into the variable `input` (defined with character `char` data type).

What happens when you provide a sentence instead of just one character?

### Sending a sentence

We can make Arduino to read more than one character by using `Serial.readStringUntil(...)`.

```c++ linenums="1"
String my_name;
 
void setup() {
  Serial.begin(9600);
  delay(2000);

  Serial.println("What is your name?");
}

void loop() {
  if (Serial.available()) {
    my_name = Serial.readStringUntil('\n');
    Serial.println("Nice to meet you, " + my_name + "!");
  }
}
```

This code will display the whole message until "`\n`", that is the newline character that's at the end of a string sent from the serial monitor.

### Sending command

The following code shows an example of sending a string to Arduino to start different tasks. Take note on the use of `.equals` which is a function to compare the `String` variable with another `String` object. If you are using `char` variable, you can use the `==` operator to compare with a single character.

```c++ linenums="1"
String command;
 
void setup() {
  Serial.begin(9600); 
}
 
void loop() {
  if (Serial.available()) {
    command = Serial.readStringUntil('\n');
      
    if (command.equals("init")) {
      Serial.println("initialising..");
    } else if (command.equals("send")) {
      Serial.println("sending..");
    } else if (command.equals("data")) {
      Serial.println("getting data..");
    } else if (command.equals("reboot")) {
      Serial.println("rebooting..");
    } else {
      Serial.println("Invalid command");
    }
  }
}
```

This tutorial is adapted from [https://www.norwegiancreations.com/2017/12/arduino-tutorial-serial-inputs/](https://www.norwegiancreations.com/2017/12/arduino-tutorial-serial-inputs/).