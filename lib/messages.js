import fs from "fs";
import { google } from "googleapis";

import _auth from "./_auth"

function auth(credentialPath, {
  scope, tokenPath
}) {
  return _auth(credentialPath, { scope, tokenPath })
}

function getMessages(auth, { q, pageToken }) {
  const gmail = google.gmail({ version: "v1", auth });
  return new Promise((resolve, reject) => {
    gmail.users.messages.list(
      {
        userId: "me",
        q,
        pageToken
      },
      (err, res) => {
        if (err) reject(err);
        else {
          resolve(res.data);
        }
      }
    );
  });
}

function getMessage(auth, { id }) {
  const gmail = google.gmail({ version: "v1", auth });
  return new Promise((resolve, reject) => {
    gmail.users.messages.get(
      {
        userId: "me",
        id
      },
      (err, res) => {
        if (err) reject(err);
        else {
          resolve(res.data);
        }
      }
    );
  });
}

function getLabels(auth) {
  const gmail = google.gmail({ version: "v1", auth });
  return new Promise((resolve, reject) => {
    gmail.users.labels.list(
      {
        userId: "me"
      },
      (err, res) => {
        if (err) reject(err);
        else {
          resolve(res.data.labels);
        }
      }
    );
  });
}

export default {
  getMessage,
  getMessages,
  getLabels
};
