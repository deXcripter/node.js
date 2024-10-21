// https://nodejs.org/api/fs.html

import fs from "fs/promises";
import { resolve } from "path";

// should be able to create a file
// should be able to rename a file
// should be able to delete a file
// should be able to append to a file

let existingFile = false;

const readCommand = async () => {
  const commandFileHandler = await fs.open(resolve(__dirname, "./command.txt"));
  commandFileHandler.close();
};
const createFile = async () => {};
const renameFile = async () => {};
const deleteFile = async () => {};
const appendToFile = async () => {};

readCommand();

process.on("uncaughtException", (err) => console.log(err.message + "🔥"));
