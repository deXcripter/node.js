import fs from "node:fs/promises";

(async () => {
  const fileHandleRead = await fs.open("text.txt", "r");
  const fileHandleWrite = await fs.open("dest.txt", "w");

  const streamRead = fileHandleRead.createReadStream(); // the default highWaterMark value is 64 bytes - unlike the 16 bytes for writable stream
  const streamWrite = fileHandleWrite.createWriteStream();

  streamRead.on("data", (chunk) => {
    // the pressure on the memory is going to be very high considering the fact that the read speed is
    // 64kbps and the write speed is 16kbps - this would cause nodejs to buffer most of the data which
    // ends up occupying the memory space. not ideal!!!
    streamWrite.write(chunk);
  });

  streamWrite.on("drain", () => {});
})();
