"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const googleapis_1 = require("googleapis");
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentialPath, { scope, tokenPath }) {
    const credentials = fs_1.default.readFileSync(credentialPath);
    const { client_secret, client_id, redirect_uris } = JSON.parse(credentials).installed;
    const oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(tokenPath, (err, token) => {
            if (err) {
                resolve(getNewToken(oAuth2Client, {
                    scope,
                    tokenPath
                }));
            }
            else {
                oAuth2Client.setCredentials(JSON.parse(token));
                resolve(oAuth2Client);
            }
        });
    });
}
exports.authorize = authorize;
/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, { scope, tokenPath }) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, reject) => {
        rl.question("Enter the code from that page here: ", code => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err)
                    reject(err);
                else {
                    oAuth2Client.setCredentials(token);
                    // Store the token to disk for later program executions
                    fs_1.default.writeFile(tokenPath, JSON.stringify(token), err => {
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        else {
                            console.log("Token stored to", tokenPath);
                            resolve(oAuth2Client);
                        }
                    });
                }
            });
        });
    });
}
//# sourceMappingURL=auth.js.map