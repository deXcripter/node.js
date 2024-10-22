/************************************************************************************************************************
 * STREAMS IN ACTION
 *********************************************************************************************************************/

import fs from "fs/promises";
(async function () {
  const file = await fs.open("text.txt", "w");
  const stream = file.createWriteStream();

  const buff = Buffer.alloc(16383, "x");
  console.log(stream.write(buff));
  console.log(stream.write(Buffer.alloc(2, "y")));

  console.time("timer");

  stream.on("drain", () => {
    console.log(stream.writableLength);
  });

  /**
   * TIMING HOW LONG THIS CODE TOOK MY MACHINE TO RUN
   * 3 seconds -- 200MB (Time and Space)S
   */

  console.timeEnd("timer");
  // file.close();
  // process.exit(0);
  stream.on("finish", () => file.close());
})();
