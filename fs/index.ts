import fs from "fs/promises";

const readFile = async () => {
  const watcher = await fs.watch("data.txt");

  for await (const event of watcher) {
    if (event.eventType === "change") {
      const file = await fs.open(event.filename!, "r");
      const fileStats = await file.stat();
      const fileSize = fileStats.size;
      const buff = Buffer.alloc(fileSize);
      const length = buff.byteLength;
      const position = 0;

      const readFile = await file.read(buff, 0, length, position);
      console.log(readFile);
    }
    if (event.eventType === "rename") console.log("file was renamed");
  }
};

readFile();
