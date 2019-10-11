import fs from "fs";
import readline from "readline";
import { google } from "googleapis";

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
export function authorize(credentialPath: string, { scope, tokenPath }: { scope: string[], tokenPath: string }) {
  const credentials: any = fs.readFileSync(credentialPath);
  const { client_secret, client_id, redirect_uris } = JSON.parse(credentials).installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  return new Promise((resolve, reject) => {
    fs.readFile(tokenPath, (err: Error, token: string | Buffer) => {
      if (err) {
        resolve(
          getNewToken(oAuth2Client, {
            scope,
            tokenPath
          })
        );
      } else {
        oAuth2Client.setCredentials(JSON.parse(token as string));
        resolve(oAuth2Client);
      }
    });
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client: any, { scope, tokenPath }: { scope: string[], tokenPath: string }) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    rl.question("Enter the code from that page here: ", code => {
      rl.close();
      oAuth2Client.getToken(code, (err: Error, token: Object) => {
        if (err) reject(err);
        else {
          oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(tokenPath, JSON.stringify(token), err => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log("Token stored to", tokenPath);
              resolve(oAuth2Client);
            }
          });
        }
      });
    });
  });
}
