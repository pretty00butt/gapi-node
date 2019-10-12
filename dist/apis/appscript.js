"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
function run(auth, { scriptId, functionName, parameters = [] }) {
    const script = googleapis_1.google.script({ version: "v1", auth });
    return script.scripts.run({
        scriptId,
        requestBody: {
            function: functionName,
            parameters
        }
    });
}
exports.run = run;
//# sourceMappingURL=appscript.js.map