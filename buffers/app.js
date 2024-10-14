const { Buffer } = require("buffer");

const memoryContainer = Buffer.from([0x48, 0x69, 0x21]); // allocating a 6 byte memory size

// memoryContainer[0] = 0x48;
// memoryContainer[1] = 0x69;
// memoryContainer[2] = 0x21;

console.log(memoryContainer.toString("utf-8")); //

/**
 *     NOTE TO SELF -
 *    Always try to feed the data in hexadecimal form
 * -- instead of 0100 0100 0110 1001 0010 0001 - use 0x48 0x69 0x21 --
 *
 */
