"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
function getThreadById(auth, id) {
    const gmail = googleapis_1.google.gmail({ version: "v1", auth });
    return new Promise((resolve, reject) => {
        gmail.users.threads.get({
            userId: "me",
            id
        }, (err, res) => {
            if (err)
                reject(err);
            else {
                resolve(res ? res.data : null);
            }
        });
    });
}
exports.getThreadById = getThreadById;
//# sourceMappingURL=threads.js.map