// https://nodejs.org/api/fs.html

import fs from "fs/promises";
import { resolve } from "path";

// should be able to create a file
// should be able to rename a file
// should be able to delete a file
// should be able to append to a file

let existingFile = false;
let dir = resolve(__dirname, "./folder");

const readCommand = async () => {
  const commandFileHandler = await fs.open(resolve(__dirname, "./command.txt"));
  const size = (await commandFileHandler.stat()).size;
  const buffer = Buffer.alloc(size);
  await commandFileHandler.read(buffer, 0, size, 0);

  if (buffer.includes("create")) createFile(buffer);

  // closing the file to avoid memory leaks
  commandFileHandler.close();
};
const createFile = async (instruction: Buffer) => {
  const index = instruction.indexOf("/");
  const path = dir + instruction.toString().substring(index);

  return new Promise(async (resolve, reject) => {});
};
const renameFile = async () => {};
const deleteFile = async () => {};
const appendToFile = async () => {};

readCommand();

(async function () {
  const watcher = fs.watch("command.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      /**
       * READING THE COMMAND
       */
      console.log("reading command");
      readCommand();
    }
  }
})();

process.on("uncaughtException", (err) => console.log(err.message + "🔥"));
process.on("unhandledRejection", (reason, promise) => console.log(reason));
