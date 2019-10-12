import { google } from "googleapis";

interface runOptions {
  scriptId: string;
  functionName: string;
  parameters: any[];
}

export function run(
  auth: any,
  { scriptId, functionName, parameters = [] }: runOptions
) {
  const script = google.script({ version: "v1", auth });
  return script.scripts.run({
    scriptId,
    requestBody: {
      function: functionName,
      parameters
    }
  });
}
