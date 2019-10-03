import fs from "fs";
import { google } from "googleapis";

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
