import { google } from "googleapis";

export function append(
  auth: any,
  spreadsheetId: string,
  values: any,
  {
    range = "A1",
    valueInputOption = "USER_ENTERED",
    insertDataOption = "INSERT_ROWS"
  }: {
    range?: string;
    valueInputOption?: string;
    insertDataOption?: string;
  } = {}
) {
  const sheets = google.sheets({ version: "v4", auth });
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.append(
      {
        spreadsheetId,
        insertDataOption,
        range,
        valueInputOption,
        requestBody: {
          values
        }
      },
      (err: Error, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}
