import { google } from "googleapis";

export function getThreadById(auth: any, id: string) {
  const gmail = google.gmail({ version: "v1", auth });
  return new Promise((resolve, reject) => {
    gmail.users.threads.get(
      {
        userId: "me",
        id
      },
      (err, res) => {
        if (err) reject(err);
        else {
          resolve(res ? res.data : null);
        }
      }
    );
  });
}
