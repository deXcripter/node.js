"use strict";
/************************************************************************************************************************
 * USING STREAMS BUT IN A BAD WAY
 *----------------------------------------------------------------------
 * this is still a bad approach because it introduces memory issues. the stream has to be emptied once its full,
 * else it keeps storing more and more data into the memory - memory is a finite resource.
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
    });
})();
