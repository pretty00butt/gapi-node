"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
function append(auth, spreadsheetId, values, { range = "A1", valueInputOption = "USER_ENTERED", insertDataOption = "INSERT_ROWS" } = {}) {
    const sheets = googleapis_1.google.sheets({ version: "v4", auth });
    return new Promise((resolve, reject) => {
        sheets.spreadsheets.values.append({
            spreadsheetId,
            insertDataOption,
            range,
            valueInputOption,
            requestBody: {
                values
            }
        }, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
exports.append = append;
//# sourceMappingURL=sheets.js.map