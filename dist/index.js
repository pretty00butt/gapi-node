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
    checkAuth() {
        if (this.token) {
            return this.token;
        }
        throw new Error("Need to authorize");
    }
    appendToSheet(app, { spreadsheetId, values }) {
        const auth = this.checkAuth();
        return apis_1.default.sheets.append(auth, spreadsheetId, values);
    }
    auth({ credentialPath, scope, tokenPath }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`🔑🔑🔑 trying to authorize 👉🏼 \n`);
            this.token = yield apis_1.default.auth.authorize(credentialPath, {
                scope,
                tokenPath
            });
        });
    }
    isAuthorized() {
        return !!this.token;
    }
    getMessageById(id) {
        const auth = this.checkAuth();
        return apis_1.default.messages.getById(auth, { id });
    }
    getMessages(queryOptions) {
        const auth = this.checkAuth();
        return apis_1.default.messages.fetchMessages(auth, queryOptions);
    }
    getLabelByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = this.checkAuth();
            const labels = yield apis_1.default.messages.fetchLabels(auth);
            if (!labels) {
                return undefined;
            }
            return labels.find(label => label.name === name);
        });
    }
    getLabelById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = this.checkAuth();
            const labels = yield apis_1.default.messages.fetchLabels(auth);
            if (!labels) {
                return undefined;
            }
            return labels.find(label => label.id === id);
        });
    }
    getLabels(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = this.checkAuth();
            return yield apis_1.default.messages.fetchLabels(auth);
        });
    }
    getThread(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = this.checkAuth();
            return apis_1.default.threads.getThreadById(auth, id);
        });
    }
    runAppScript(scriptId, functionName, { parameters }) {
        const auth = this.checkAuth();
        return apis_1.default.appscript.run(auth, {
            scriptId,
            functionName,
            parameters
        });
    }
}
exports.default = new GoogleApi();
//# sourceMappingURL=index.js.map