import fs from "fs/promises";

// 3 seconds
(async function () {
  const file = await fs.open("text.txt", "w");

  console.time("timer");

  const lap = 100000; // one million
  for (let i = 0; i < lap; i++) {
    file.write(Buffer.from(`${i}`));
  }
  console.timeEnd("timer");

  file.close();
})();
