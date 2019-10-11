import path from "path";
import GoogleApi from "./src";

const CREDENTIAL_PATH = path.resolve(__dirname, '.credentials', 'wp.json')
const TOKEN_PATH = path.resolve(__dirname, '.credentials', 'wp-token.json')

const SCOPE = [
  // gmail
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
  // spreadsheets
  "https://www.googleapis.com/auth/spreadsheets"
];


main();

async function main() {
  const app = 'wp';
  await GoogleApi.auth(app, {
    credentialPath: CREDENTIAL_PATH,
    tokenPath: TOKEN_PATH,
    scope: SCOPE
  })

  await testLabel();
  await testMessages();
}

async function testLabel(app, labelName) {
  console.log(`👉🏼 GET Label ID by Label ${labelName}`);
  const id = await GoogleApi.getLabelByName(app, labelName)
  console.log(id);
}