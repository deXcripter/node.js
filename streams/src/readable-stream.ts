import fs from "fs/promises";
import path from "path";

/**
 * 1st Goal:
 * Create a readable stream that reads the text file in the data directory.
 */

(async () => {
  const fileHandleRead = await fs.open(
    path.resolve(__dirname, "../data/text.txt")
  );
  const stream = fileHandleRead.createReadStream({
    // highWaterMark: 4000, // whatever value specified here overides the default 65KB on line 13
  });

  stream.on("data", (chunk) => {
    console.log(chunk); // the size of the chunk is 65KB
  });

  stream.on("end", () => {
    fileHandleRead.close();
  });
})();
