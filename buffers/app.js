const { Buffer } = require("buffer");

const memoryContainer = Buffer.alloc(4); // specifying a value in bytes (4 bytes || 32 bits)
memoryContainer[2] = 0xc4;
memoryContainer[1] = 0xf4;
memoryContainer[0] = 0xf1;
memoryContainer[3] = 0x00;

console.log(memoryContainer); // <Buffer 00 00 00 00>
