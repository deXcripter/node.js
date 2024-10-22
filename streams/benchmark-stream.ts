/************************************************************************************************************************
 * STREAMS IN ACTION
 *********************************************************************************************************************/

import fs from "fs/promises";
(async function () {
  const file = await fs.open("text.txt", "w");
  const stream = file.createWriteStream();
  console.time("timer");

  let i = 0;

  const writemany = () => {
    while (i <= 100000) {
      i++;
      const buffer = Buffer.from(` ${i} `, "utf8");
      if (!stream.write(buffer)) break;
    }
  };
  writemany();

  stream.on("drain", () => {
    writemany();
  });
  /**
   * TIMING HOW LONG THIS CODE TOOK MY MACHINE TO RUN
   * 3 seconds -- 200MB (Time and Space)S
   */

  stream.on("close", () => {
    console.timeEnd("timer");
    file.close();
  });
})();
