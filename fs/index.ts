// https://nodejs.org/api/fs.html

import fs from "fs/promises";
import path from "path";

const commandFilePath = path.resolve(__dirname, "./command.txt");

(async () => {
  const watcher = fs.watch(commandFilePath);
  const commandFileHandler = await fs.open(commandFilePath);

  for await (const event of watcher) {
    if (event.eventType === "change") {
      const fileDetails = await commandFileHandler.stat();
      const buff = Buffer.alloc(fileDetails.size);
      const offset = 0; // the location of the buffer from which we want to start filling
      const length = buff.byteLength; // the number of bytes from the buffer to write
      const position = 0; // from what position we want to start reading the file from

      const content = await commandFileHandler.read(
        buff,
        offset,
        length,
        position
      );
      console.log(content);
    }
  }
})();
