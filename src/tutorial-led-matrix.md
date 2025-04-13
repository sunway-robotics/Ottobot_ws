# Display on dot matrix

## What is dot matrix?

Dot matrix is a matrix of LEDs in which the LEDs are arranged in rows and columns.

<figure markdown>
<<<<<<< HEAD
  ![dotmatrix](https://wiki.keyestudio.com/images/thumb/b/b0/Ks0364_-_connection_11.png/800px-Ks0364_-_connection_11.png){ style="height:300px" }
  <figcaption>Connection of dot matrix on the turtle robot</figcaption>
=======
  ![dotmatrix](https://wiki.keyestudio.com/images/thumb/b/b0/Ks0364_-connection_11.png/800px-Ks0364-_connection_11.png){ style="height:300px" }
    <p style="text-align: center;">Connection of dot matrix on the turtle robot</p>
>>>>>>> f0e5d95e7252cafd0009fd2b6c30ba4fb767e43c
</figure>

## Control LED matrix

1. Install the Adafruit LED backpack library
<<<<<<< HEAD

    Sketch > Include Library > Manage Libraries...

    Search for "adafruit led" > Install "Adafruit LED Backpack Library" > Install all libraries

2. Include the necessary libraries in the code and create an object to control the dot matrix.

    ```c++ linenums="1"
    #include <Wire.h>
    #include "Adafruit_LEDBackpack.h"   
    #include "Adafruit_GFX.h"
    Adafruit_LEDBackpack matrix = Adafruit_LEDBackpack();
    ```

3. Initialise the dot matrix by notify the address of the dot matrix.

    ```c++ linenums="6"
    void setup() {
        matrix.begin(0x70);
    }
    ```

4. The dot matrix is controlled with the `displaybuffer` array. Each item in the array represents a column counting from right to left starting from 0.

    We use binary code for each item in the array with 1 being on and 0 being off for the LEDs. To set the middle two columns to light up, we will have
    
    ```c++
    void loop() {
        matrix.displaybuffer[0] = B00000000;
        matrix.displaybuffer[1] = B00000000;
        matrix.displaybuffer[2] = B00000000;
        matrix.displaybuffer[3] = B11111111;
        matrix.displaybuffer[4] = B11111111;
        matrix.displaybuffer[5] = B00000000;
        matrix.displaybuffer[6] = B00000000;
        matrix.displaybuffer[7] = B00000000;
        matrix.writeDisplay(); //(1)
    }
    ```

    1. Send the display pattern to the dot matrix

5. We can create different patterns as custom functions. With this we can directly call the function if we want a certain pattern to show on the dot matrix. 

    !!! info
        These functions should be declared outside the `setup` and `loop` functions.

    ```c++
    void dm_startup() {
        matrix.displaybuffer[0] = B00000011;
        matrix.displaybuffer[1] = B10000000;
        matrix.displaybuffer[2] = B00010011;
        matrix.displaybuffer[3] = B00100000;
        matrix.displaybuffer[4] = B00100000;
        matrix.displaybuffer[5] = B00010011;
        matrix.displaybuffer[6] = B10000000;
        matrix.displaybuffer[7] = B00000011;
        matrix.writeDisplay();
    }
    void dm_forward()
    {
        matrix.displaybuffer[3] = B11111111;     
        matrix.displaybuffer[4] = B11111111;
        matrix.displaybuffer[2] = B00000001;
        matrix.displaybuffer[1] = B00000010;
        matrix.displaybuffer[0] = B00000100;
        matrix.displaybuffer[5] = B00000001;
        matrix.displaybuffer[6] = B00000010;
        matrix.displaybuffer[7] = B00000100;
        matrix.writeDisplay();
    }
    void dm_backward()
    {
        matrix.displaybuffer[3] = B11111111;
        matrix.displaybuffer[4] = B11111111;
        matrix.displaybuffer[2] = B00100000;
        matrix.displaybuffer[1] = B00010000;
        matrix.displaybuffer[0] = B00001000;
        matrix.displaybuffer[5] = B00100000;
        matrix.displaybuffer[6] = B00010000;
        matrix.displaybuffer[7] = B00001000;
        matrix.writeDisplay();
    }
    void dm_right()
    {
        for(int i=0;i<8;i++)
        {
        matrix.displaybuffer[i] = B00001100;
        }
        matrix.displaybuffer[6] = B00011110;
        matrix.displaybuffer[5] = B00101101;
        matrix.displaybuffer[4] = B11001100;
        matrix.writeDisplay();
    }
    void dm_left()
    {
        for(int i=0;i<8;i++)
        {
        matrix.displaybuffer[i] = B00001100;
        }
        matrix.displaybuffer[1] = B00011110;
        matrix.displaybuffer[2] = B00101101;
        matrix.displaybuffer[3] = B11001100;
        matrix.writeDisplay();
    }
    void dm_stop()
    {
        matrix.displaybuffer[0] = B11000000;
        matrix.displaybuffer[1] = B00100001;
        matrix.displaybuffer[2] = B00010010;
        matrix.displaybuffer[3] = B00001100;
        matrix.displaybuffer[4] = B00001100;
        matrix.displaybuffer[5] = B00010010;
        matrix.displaybuffer[6] = B00100001;
        matrix.displaybuffer[7] = B11000000;
        matrix.writeDisplay();
    }
    ```

    Then in the `loop` function, we can call the functions to display the patterns on the dot matrix.

    ```c++
    void loop() {
        dm_forward();
        delay(1500);
        dm_backward();
        delay(1500);
        dm_left();
        delay(1500);
        dm_right();
        delay(1500);
    }
    ```
=======
    
        Sketch > Include Library > Manage Libraries...
        Search for "adafruit led" > Install "Adafruit LED Backpack Library" > Install all libraries
    
2. Include the necessary libraries in the code and create an object to control the dot matrix.

        #include <Wire.h>
        #include "Adafruit_LEDBackpack.h"   
        #include "Adafruit_GFX.h"
        Adafruit_LEDBackpack matrix = Adafruit_LEDBackpack();
    

    
3. Initialise the dot matrix by notify the address of the dot matrix.


           void setup() {
           matrix.begin(0x70);
           }
    
      


  
4. The dot matrix is controlled with the displaybuffer array. Each item in the array represents a column counting from right to left starting from 0.
    
    We use binary code for each item in the array with 1 being on and 0 being off for the LEDs. To set the middle two columns to light up, we will have to send the display pattern to the dot matrix
    
       
           void loop() {
           matrix.displaybuffer[0] = B00000000;
           matrix.displaybuffer[1] = B00000000;
           matrix.displaybuffer[2] = B00000000;
           matrix.displaybuffer[3] = B11111111;
           matrix.displaybuffer[4] = B11111111;
           matrix.displaybuffer[5] = B00000000;
           matrix.displaybuffer[6] = B00000000;
           matrix.displaybuffer[7] = B00000000;
           matrix.writeDisplay(); //(1)
           }
    
    

    
   5. We can create different patterns as custom functions. With this we can directly call the function if we want a certain pattern to show on the dot matrix.

       **!!! Info**
       These functions should be declared outside the setup and loop functions.
        
           
           void dm_startup() {
           matrix.displaybuffer[0] = B00000011;
           matrix.displaybuffer[1] = B10000000;
           matrix.displaybuffer[2] = B00010011;
           matrix.displaybuffer[3] = B00100000;
           matrix.displaybuffer[4] = B00100000;
           matrix.displaybuffer[5] = B00010011;
           matrix.displaybuffer[6] = B10000000;
           matrix.displaybuffer[7] = B00000011;
           matrix.writeDisplay();
           }
           void dm_forward()
           {
           matrix.displaybuffer[3] = B11111111;     
           matrix.displaybuffer[4] = B11111111;
           matrix.displaybuffer[2] = B00000001;
           matrix.displaybuffer[1] = B00000010;
           matrix.displaybuffer[0] = B00000100;
           matrix.displaybuffer[5] = B00000001;
           matrix.displaybuffer[6] = B00000010;
           matrix.displaybuffer[7] = B00000100;
           matrix.writeDisplay();
           }
           void dm_backward()
           {
           matrix.displaybuffer[3] = B11111111;
           matrix.displaybuffer[4] = B11111111;
           matrix.displaybuffer[2] = B00100000;
           matrix.displaybuffer[1] = B00010000;
           matrix.displaybuffer[0] = B00001000;
           matrix.displaybuffer[5] = B00100000;
           matrix.displaybuffer[6] = B00010000;
           matrix.displaybuffer[7] = B00001000;
           matrix.writeDisplay();
           }
           void dm_right()
           {
           for(int i=0;i<8;i++)
           {
           matrix.displaybuffer[i] = B00001100;
           }
           matrix.displaybuffer[6] = B00011110;
           matrix.displaybuffer[5] = B00101101;
           matrix.displaybuffer[4] = B11001100;
           matrix.writeDisplay();
           }
           void dm_left()
           {
           for(int i=0;i<8;i++)
           {
           matrix.displaybuffer[i] = B00001100;
           }
           matrix.displaybuffer[1] = B00011110;
           matrix.displaybuffer[2] = B00101101;
           matrix.displaybuffer[3] = B11001100;
           matrix.writeDisplay();
           }
           void dm_stop()
           {
           matrix.displaybuffer[0] = B11000000;
           matrix.displaybuffer[1] = B00100001;
           matrix.displaybuffer[2] = B00010010;
           matrix.displaybuffer[3] = B00001100;
           matrix.displaybuffer[4] = B00001100;
           matrix.displaybuffer[5] = B00010010;
           matrix.displaybuffer[6] = B00100001;
           matrix.displaybuffer[7] = B11000000;
           matrix.writeDisplay();
           }


Then in the loop function, we can call the functions to display the patterns on the dot matrix.


        void loop() {
            dm_forward();
            delay(1500);
            dm_backward();
            delay(1500);
            dm_left();
            delay(1500);
            dm_right();
            delay(1500);
        }

>>>>>>> f0e5d95e7252cafd0009fd2b6c30ba4fb767e43c

# Bring it further
1. How can we display an animation of arrow moving?