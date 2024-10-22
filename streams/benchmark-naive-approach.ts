/************************************************************************************************************************
 * NAIVE APPROACH INSTEAD OF STREAMS TO TEST THE SPACE AND TIME REQUIRED -
 *********************************************************************************************************************/

import fs from "fs/promises";
(async function () {
  const file = await fs.open("text.txt", "w");
  /**
   * TIMING HOW LONG THIS CODE TOOK MY MACHINE TO RUN
   * 3 seconds -- 200MB (Time and Space)S
   */
  console.time("timer");
  for (let i = 0; i < 100000; i++) {
    file.write(Buffer.from(`${i}`));
  }
  console.timeEnd("timer");
  file.close();
  process.exit(0);
})();
