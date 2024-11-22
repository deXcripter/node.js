import fs from "fs/promises";

/**
 *  in the function below, i am iteratively writing to a file - trying to model streams.
 */

(async () => {
  console.time("writeMany");
  const file = await fs.open("text.txt", "w");

  for (let i = 0; i < 100000; i++) {
    await file.write(`${i} `);
  }

  console.timeEnd("writeMany");
})();
