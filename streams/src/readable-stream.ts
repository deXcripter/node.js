import fs from "fs/promises";
import path from "path";
import { log } from "console";

/**
 * @param fileHandleRead
 * Create a readable stream that reads the text file in the data directory.
 */
const readingFromAStream = async (fileHandleRead: fs.FileHandle) => {
  const stream = fileHandleRead.createReadStream({
    // highWaterMark: 4000, // - in bytes - whatever value specified here overides the default 65KB on line 13
  });

  /**
   * when you create a stream, it does nothing. but the moment you add the stream.on("data") event,
   * it starts reading the file/data in chunks
   *
   * stream.on("end") gets exexuted when the data has been read completely.
   */
  stream.on("data", (chunk) => {
    console.log(chunk); // the size of the chunk is 65KB
  });

  stream.on("end", () => {
    fileHandleRead.close();
    log("closed the file handler");
  });
};

const readingFromAStreamAndWriteToAnotherFile = async (
  file: fs.FileHandle,
  path: string
) => {
  const readableStream = file.createReadStream();
  const distFile = await fs.open("writable.txt", "w+"); // opens the file for writing, or is created if it doesnt exist
  const writableStream = distFile.createWriteStream();

  readableStream.on("data", async (chunk) => {
    if (!writableStream.write(chunk)) {
      log("draining...");
      readableStream.pause();
    }
  });

  writableStream.on("drain", () => {
    log("drained!!!");
    readableStream.resume();
  });

  readableStream.on("end", () => {
    distFile.close();
    readableStream.resume();
  });
};

/** FUNCTION LOADER */
(async () => {
  const fileHandleRead = await fs.open(
    path.resolve(__dirname, "../data/text.txt")
  );

  // readingFromAStream(fileHandleRead);
  readingFromAStreamAndWriteToAnotherFile(
    fileHandleRead,
    "some path to a file"
  );
})();
