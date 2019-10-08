import fs from "fs";
import { google } from "googleapis";

import _auth from "./_auth"

function auth(credentialPath, {
  scope, tokenPath
}) {
  return _auth(credentialPath, { scope, tokenPath })
}

function run(auth, { scriptId, functionName, parameters = [] } = {}) {
  const script = google.script({ version: "v1", auth });
  return script.scripts.run({
    scriptId,
    requestBody: {
      function: functionName,
      parameters
    }
  });
}

export default {
  run
};
