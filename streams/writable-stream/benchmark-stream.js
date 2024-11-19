"use strict";
/************************************************************************************************************************
 * STREAMS IN ACTION
 *********************************************************************************************************************/
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
const promises_1 = __importDefault(require("fs/promises"));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const file = yield promises_1.default.open("text.txt", "w");
        const stream = file.createWriteStream();
        console.time("timer");
        // 1 secs avg -
        let i = 0;
        let val = 1000000;
        const writemany = () => {
            while (i <= val) {
                i++;
                const buffer = Buffer.from(` ${i} `, "utf8");
                if (i === val) {
                    return stream.end();
                }
                if (!stream.write(buffer))
                    break;
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
        stream.on("finish", () => {
            console.timeEnd("timer");
            file.close();
        });
    });
})();
