/************************************************************************************************************************
 * USING STREAMS BUT IN A BAD WAY
 *----------------------------------------------------------------------
 * this is still a bad approach because it introduces memory issues. the stream has to be emptied once its full,
 * else it keeps storing more and more data into the memory - memory is a finite resource.
 *********************************************************************************************************************/

import fs from "fs/promises";
(async function () {
  const file = await fs.open("text.txt", "w");
  const stream = file.createWriteStream();
  /**
   * TIMING HOW LONG THIS CODE TOOK MY MACHINE TO RUN
   * 1.9 avg seconds -- 190MB (Time and Space)
   */
  console.time("timer");
  for (let i = 0; i < 1000000; i++) {
    stream.write(Buffer.from(`${i}`));
  }
  console.timeEnd("timer");
  file.close();
  process.exit(0);
})();
