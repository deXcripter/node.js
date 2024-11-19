"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("node:fs/promises"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const fileHandleRead = yield promises_1.default.open("text.txt", "r");
    const fileHandleWrite = yield promises_1.default.open("dest.txt", "w");
    const streamRead = fileHandleRead.createReadStream(); // the default highWaterMark value is 64 bytes - unlike the 16 bytes for writable stream
    const streamWrite = fileHandleWrite.createWriteStream();
    streamRead.on("data", (chunk) => {
        // the pressure on the memory is going to be very high considering the fact that the read speed is
        // 64kbps and the write speed is 16kbps - this would cause nodejs to buffer most of the data which
        // ends up occupying the memory space. not ideal!!!
        if (!streamWrite.write(chunk))
            streamRead.pause(); // this pauses reading the data and emits a drain event
    });
    streamWrite.on("drain", () => {
        streamRead.resume(); // resumes the read event after the write stream has been drained
    });
}))();
