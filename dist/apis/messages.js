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
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
function fetchAllMessages(auth, query) {
    return __awaiter(this, void 0, void 0, function* () {
        const { q = "" } = query;
        let messages = [];
        let nextPageToken = "";
        const firstPageResult = yield fetchMessagesWithPage(auth, {
            q
        });
        if (!firstPageResult) {
            return [];
        }
        messages = messages.concat(firstPageResult.messages);
        nextPageToken = firstPageResult.nextPageToken;
        while (nextPageToken) {
            const result = yield fetchMessagesWithPage(auth, {
                q,
                pageToken: nextPageToken
            });
            if (!result) {
                nextPageToken = null;
            }
            else {
                nextPageToken = result.nextPageToken;
                messages = messages.concat(result.messages);
            }
        }
        return messages;
    });
}
function fetchMessagesWithPage(auth, query) {
    const { q = "", pageToken } = query;
    const gmail = googleapis_1.google.gmail({ version: "v1", auth });
    return new Promise((resolve, reject) => {
        gmail.users.messages.list({
            userId: "me",
            q,
            pageToken
        }, (err, res) => {
            if (err)
                reject(err);
            else {
                resolve(res ? res.data : null);
            }
        });
    });
}
function fetchMessages(auth, query) {
    return fetchAllMessages(auth, query);
}
exports.fetchMessages = fetchMessages;
function getById(auth, { id }) {
    const gmail = googleapis_1.google.gmail({ version: "v1", auth });
    return new Promise((resolve, reject) => {
        gmail.users.messages.get({
            userId: "me",
            id
        }, (err, res) => {
            if (err)
                reject(err);
            else {
                resolve(res && res.data);
            }
        });
    });
}
exports.getById = getById;
function fetchLabels(auth) {
    const gmail = googleapis_1.google.gmail({ version: "v1", auth });
    return new Promise((resolve, reject) => {
        gmail.users.labels.list({
            userId: "me"
        }, (err, res) => {
            if (err)
                reject(err);
            else {
                resolve(res && res.data.labels);
            }
        });
    });
}
exports.fetchLabels = fetchLabels;
//# sourceMappingURL=messages.js.map