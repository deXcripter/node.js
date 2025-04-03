First, it is important to understand everything in Computers is made up of 0s and 1s.

### Why Buffers?

Buffers are here in node to help up deal with these 0s and 1s. It help's nodejs able to understand and communicate with computer and other computer devices that use these 0s and 1s like `network requests`, `sending requests to other process`, `communicating with other processes`, etc. It gives us so much power.
If we dont have anway to deal with these 0s and 1, then we would be unable to create a file, connect to a databse, or even listen to a network request.

### Prerequisites

1. Understanding Binary Numbers
   - Base 2 and Base 2 conversion
   - LSB (Least Significant Bit) & LSD (Least Significant Digit)
   - MSB (Most Significant Bit) & MSD Most Significant Digit
2. Understand Base 16 (HexaDecimal) Numbers
   - Representing hexadecimals (with the 0x-prefix)
   - Symbols used in representing hexadecimal
   - Converting Hexadecimal to Base2 and vice-versa
   - Usage of hexadecimals (Color hex numbers - #ffffff, % in url for indicating space, &#x for expressing unicode characters in HTML, XTM, and XML).
3. Understanding Character Encodings.
   - UTF-8 Character encoding

### What is a Buffer.

A buffer is a location in memory. Basically a container that has been allocated to you to do whatever you want to do to it.
You can read or write data to the buffer.
