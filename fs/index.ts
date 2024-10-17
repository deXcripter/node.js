// https://nodejs.org/api/fs.html

import fs from "fs/promises";
import { resolve } from "path";

const commandFilePath = resolve(__dirname, "./command.txt");
const fileDir = resolve(__dirname, "./files");

const commands = {
  create_file: "create a file",
  delete_file: "delete a file",
  rename_file: "rename the file",
  add_to_file: "add to file",
};

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
  if (instruction.includes(commands.create_file)) {
    const filePath = instruction.substring(commands.create_file.length + 1);
    createFile(filePath);
  } else if (instruction.includes(commands.delete_file)) {
    const filePath = instruction.substring(commands.delete_file.length + 1);
    deleteFile(filePath);
  } else if (instruction.includes(commands.rename_file)) {
    const split = instruction.split(" ");
    const src = split.at(3)!;
    const dest = split.at(5)!;

    renameFile(src, dest);
  } else if (instruction.includes(commands.add_to_file)) {
    const path = "";
    const data = "data";
    addToFile(path, data);
  }
}

const deleteFile = async (path: string) => {
  console.log(`Deleting the file from ${path}`);
  const filePath = fileDir + path;
  try {
    const file = await fs.open(filePath);
    file.close();
    await fs.rm(filePath);
    console.log("File deleted");
  } catch (er) {
    console.log("File already deleted");
  }
};
const renameFile = async (oldPath: string, newPath: string) => {
  console.log(
    `renaming the file from ${fileDir + oldPath} to ${fileDir + newPath}`
  );

  await fs
    .rename(oldPath, newPath)
    .then(() => {})
    .catch((err) => console.log("error renaming file", err.message));
};
const addToFile = (path: string, data: string) => {
  console.log(`Adding content to ${path}`);
};
const createFile = async (path: string) => {
  let existingFileHandler: fs.FileHandle;
  try {
    // throw an error if the file already exists.
    existingFileHandler = await fs.open(path, "r");
    existingFileHandler.close();
    return console.error("This file already exists");
  } catch (err) {
    console.log("creating a new file...");
    const newFile = await fs.open(fileDir + path, "w");
    newFile.close();
  }
};
