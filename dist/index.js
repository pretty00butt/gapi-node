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
const apis_1 = __importDefault(require("./apis"));
class GoogleApi {
    constructor() {
        this.tokens = {};
    }
    checkAuth(app) {
        if (this.tokens[app]) {
            return this.tokens[app];
        }
        throw new Error("Need to authorize");
    }
    appendToSheet(app, { spreadsheetId, values }) {
        const auth = this.checkAuth(app);
        return apis_1.default.sheets.append(auth, spreadsheetId, values);
    }
    auth(app, { credentialPath, scope, tokenPath }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`🔑🔑🔑 trying to authorize 👉🏼 ${app}\n`);
            this.tokens[app] = yield apis_1.default.auth.authorize(credentialPath, {
                scope,
                tokenPath
            });
        });
    }
    isAuthorized(app) {
        return !!this.tokens[app];
    }
    getMessageById(app, id) {
        const auth = this.checkAuth(app);
        return apis_1.default.messages.getById(auth, { id });
    }
    getMessages(app, queryOptions) {
        this.checkAuth(app);
        return apis_1.default.messages.fetchMessages(this.tokens[app], queryOptions);
    }
    getLabelByName(app, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = this.checkAuth(app);
            const labels = yield apis_1.default.messages.fetchLabels(auth);
            if (!labels) {
                return undefined;
            }
            return labels.find(label => label.name === name);
        });
    }
    getLabelById(app, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = this.checkAuth(app);
            const labels = yield apis_1.default.messages.fetchLabels(auth);
            if (!labels) {
                return undefined;
            }
            return labels.find(label => label.id === id);
        });
    }
    getThread(app, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = this.checkAuth(app);
            return apis_1.default.threads.getThreadById(auth, id);
        });
    }
    runAppScript(app, scriptId, functionName, { parameters }) {
        const auth = this.checkAuth(app);
        return apis_1.default.appscript.run(auth, {
            scriptId,
            functionName,
            parameters
        });
    }
}
exports.default = new GoogleApi();
//# sourceMappingURL=index.js.map