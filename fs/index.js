"use strict";
// https://nodejs.org/api/fs.html
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = require("path");
const commandFilePath = (0, path_1.resolve)(__dirname, "./command.txt");
const fileDir = (0, path_1.resolve)(__dirname, "./files");
const commands = {
    create_file: "create a file",
    delete_file: "delete a file",
    rename_file: "rename the file",
    add_to_file: "add to file",
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    try {
        yield promises_1.default.opendir("./files").then((val) => __awaiter(void 0, void 0, void 0, function* () { return yield val.close(); }));
    }
    catch (err) {
        yield promises_1.default.mkdir("./files");
    }
    const watcher = promises_1.default.watch(commandFilePath);
    const commandFileHandler = yield promises_1.default.open(commandFilePath);
    try {
        for (var _d = true, watcher_1 = __asyncValues(watcher), watcher_1_1; watcher_1_1 = yield watcher_1.next(), _a = watcher_1_1.done, !_a; _d = true) {
            _c = watcher_1_1.value;
            _d = false;
            const event = _c;
            if (event.eventType === "change")
                readFile(commandFileHandler);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = watcher_1.return)) yield _b.call(watcher_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}))();
function readFile(commandFileHandler) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileDetails = yield commandFileHandler.stat(); // getting the details of the opened file
        const buff = Buffer.alloc(fileDetails.size); // filling the buffer from the size of the opened file
        const offset = 0; // the location of the buffer from which we want to start filling
        const length = buff.byteLength; // the number of bytes from the buffer to write
        const position = 0; // from what position we want to start reading the file from
        // we always want to read the whole content from the beginning to the end.
        yield commandFileHandler.read(buff, offset, length, position);
        const instruction = buff.toString("utf8");
        if (instruction.includes(commands.create_file)) {
            const filePath = instruction.substring(commands.create_file.length + 1);
            createFile(filePath);
        }
        else if (instruction.includes(commands.delete_file)) {
            const filePath = instruction.substring(commands.delete_file.length + 1);
            deleteFile(filePath);
        }
        else if (instruction.includes(commands.rename_file)) {
            const split = instruction.split(" ");
            const src = split.at(3);
            const dest = split.at(5);
            renameFile(src, dest);
        }
        else if (instruction.includes(commands.add_to_file)) {
            const path = "";
            const data = "data";
            addToFile(path, data);
        }
    });
}
const deleteFile = (path) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Deleting the file from ${path}`);
    const filePath = fileDir + path;
    try {
        const file = yield promises_1.default.open(filePath);
        file.close();
        yield promises_1.default.rm(filePath);
        console.log("File deleted");
    }
    catch (er) {
        console.log("File already deleted");
    }
});
const renameFile = (oldPath, newPath) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`renaming the file from ${fileDir + oldPath} to ${fileDir + newPath}`);
    yield promises_1.default
        .rename(oldPath, newPath)
        .then(() => { })
        .catch((err) => console.log("error renaming file", err.message));
});
const addToFile = (path, data) => {
    console.log(`Adding content to ${path}`);
};
const createFile = (path) => __awaiter(void 0, void 0, void 0, function* () {
    let existingFileHandler;
    try {
        // throw an error if the file already exists.
        existingFileHandler = yield promises_1.default.open(path, "r");
        existingFileHandler.close();
        return console.error("This file already exists");
    }
    catch (err) {
        console.log("creating a new file...");
        const newFile = yield promises_1.default.open(fileDir + path, "w");
        newFile.close();
    }
});
process.on("uncaughtException", (err) => console.log("An uncaught exception occured", err.message));
