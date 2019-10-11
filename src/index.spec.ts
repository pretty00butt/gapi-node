import { equal } from "assert";
import path from "path";
import GoogleApi from "./index";

const MESSAGE_CREDENTIAL_PATH = path.resolve(__dirname, '..', '.credentials', 'guinness-premium.json')
const MESSAGE_TOKEN_PATH = path.resolve(__dirname, '..', '.credentials', 'guinness-premium-token.json')

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
  it("authorize for sample app - guinness", async () => {
    const appName = 'guinness-premium';
    await GoogleApi.auth(
      appName, {
        credentialPath: MESSAGE_CREDENTIAL_PATH,
        scope: SCOPE,
        tokenPath: MESSAGE_TOKEN_PATH,
      }
    )

    equal(GoogleApi.isAuthorized(appName), true);
  })
})