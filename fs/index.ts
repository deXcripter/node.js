// https://nodejs.org/api/fs.html

import fs from "fs/promises";
import { resolve } from "path";

const commandFilePath = resolve(__dirname, "./command.txt");

(async () => {
  const watcher = fs.watch(commandFilePath);
  const commandFileHandler = await fs.open(commandFilePath);

  for await (const event of watcher) {
    if (event.eventType === "change") readFile(commandFileHandler);
  }
})();

async function readFile(commandFileHandler: fs.FileHandle) {
  const fileDetails = await commandFileHandler.stat(); // getting the details of the opened file
  const buff = Buffer.alloc(fileDetails.size); // filling the buffer from the size of the opened file
  const offset = 0; // the location of the buffer from which we want to start filling
  const length = buff.byteLength; // the number of bytes from the buffer to write
  const position = 0; // from what position we want to start reading the file from

  // we always want to read the whole content from the beginning to the end.
  await commandFileHandler.read(buff, offset, length, position);

  const instruction = buff.toString("utf8");
  if (instruction.includes("create a file")) {
    const filePath = instruction.substring("create a file".length + 1);
    console.log(filePath);
    createFile(filePath);
  }
}

const createFile = async (path: string) => {
  let existingFileHandler: fs.FileHandle;
  try {
    // throw an error if the file already exists.
    existingFileHandler = await fs.open(path, "r");
    existingFileHandler.close();
    return console.error("This file already exists");
  } catch (err) {
    console.log("creating a new file");
    const newFile = await fs.open(resolve(__dirname, path), "w");
    newFile.close();
  }
};
