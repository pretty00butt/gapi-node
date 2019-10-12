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
const assert_1 = require("assert");
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./index"));
const MESSAGE_CREDENTIAL_PATH = path_1.default.resolve(__dirname, '..', '.credentials', 'guinness-premium.json');
const MESSAGE_TOKEN_PATH = path_1.default.resolve(__dirname, '..', '.credentials', 'guinness-premium-token.json');
const SCOPE = [
    // mail
    "https://mail.google.com/",
    // documents
    "https://www.googleapis.com/auth/documents",
    // gmail
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.send",
    // spreadsheets
    "https://www.googleapis.com/auth/spreadsheets"
];
describe("GoogleApi", () => {
    it("authorize for sample app - guinness", () => __awaiter(void 0, void 0, void 0, function* () {
        const appName = 'guinness-premium';
        yield index_1.default.auth(appName, {
            credentialPath: MESSAGE_CREDENTIAL_PATH,
            scope: SCOPE,
            tokenPath: MESSAGE_TOKEN_PATH,
        });
        assert_1.equal(index_1.default.isAuthorized(appName), true);
    }));
});
//# sourceMappingURL=index.spec.js.map