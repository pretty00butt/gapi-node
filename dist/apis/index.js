"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const appscript = __importStar(require("./appscript"));
const auth = __importStar(require("./auth"));
const messages = __importStar(require("./messages"));
const sheets = __importStar(require("./sheets"));
const threads = __importStar(require("./threads"));
exports.default = {
    appscript,
    auth,
    messages,
    sheets,
    threads
};
//# sourceMappingURL=index.js.map