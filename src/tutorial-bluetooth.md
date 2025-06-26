## <h2 id="4.1-bluetooth-control-software">4.1 Bluetooth Control Software</h2>

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
#include <Otto.h>
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

```
