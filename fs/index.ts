import fs from "fs/promises";

const watchFile = async (path: string) => {
  // const commandFileHandler = await fs.open(path);
  const watch = fs.watch(path);

  for await (const event of watch) {
    if (event.eventType === "change") {
    }
  }
};
const readFile = async (path?: string) => {
  const file = await fs.readFile("./command.txt");
};
const main = async (path: string) => {
  watchFile("./command.txt");
  readFile();
};

main("./data.txt");

const checkExistingFile = async (path: string) => {};
