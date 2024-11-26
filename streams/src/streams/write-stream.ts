import fs from "fs/promises";

/**
 *  in the function below, i am iteratively writing to a file - trying to model streams.
 *
 */

// writeMany: 4.614s - using fs/promises

// (async () => {
//   console.time("writeMany");
//   const file = await fs.open("text.txt", "w");

//   for (let i = 0; i < 100000; i++) {
//     await file.write(`${i} `);
//   }

//   console.timeEnd("writeMany");
// })();

/**
 * USING STREAMS
 *
 * -----------------
 *  1st Approach
 * -----------------
 *  this approach has a memory issue in the sense that we continue to buffer data into the memory
 *  without stopping to empty the buffer. this can cause severe memory issues and is not advisable as it can 100% result
 *  in a crash.
 */
async function notIdealStreams() {
  console.time("writeMany");
  const file = await fs.open("text.txt", "w");
  const stream = file.createWriteStream();

  for (let i = 0; i < 100000; i++) {
    const buffer = Buffer.from(` ${i}`, "utf-8");
    stream.write(buffer);
  }

  console.timeEnd("writeMany");
}
// notIdealStreams();

async function idealStreamUsage() {
  console.time("idealStreamTest");
  const file = await fs.open("text.txt", "w");
  const stream = file.createWriteStream();

  // console.log(stream.writableLength); // indicated how much of the buffer is filled
  // console.log(stream.writableHighWaterMark); // indicates the amount of data that a stream can hold at a time

  let i = 0;
  const loopValue = 100000;

  while (i < loopValue) {
    const buffer = Buffer.from(` ${i}`, "utf-8");
    if (!stream.write(buffer)) {
      await new Promise((resolve) => stream.on("drain", resolve)); // this drains the stream data
      console.log("drained at", i);
    }
    i++;

    if (i === loopValue) {
      // this should be the last write operation, so i should close the file here.
      stream.end(); // this emits a finish event
    }
  }
  stream.on("finish", () => {
    file.close();
    console.timeEnd("idealStreamTest");
  });

  // console.log(stream.writableLength, stream.write(buff));
}

idealStreamUsage();
