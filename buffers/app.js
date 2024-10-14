const { Buffer } = require("buffer");

const memoryContainer = Buffer.alloc(3); // allocating a 6 byte memory size

memoryContainer[0] = 0x48;
memoryContainer[1] = 0x69;
memoryContainer[2] = 0x21;

console.log(memoryContainer.toString("utf-8"));
