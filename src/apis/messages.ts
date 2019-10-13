import { google } from "googleapis";

interface Label {
  id: string;
  name: string;
}

interface MessagesResult {
  messages?: any[];
  nextPageToken?: string;
}

export interface QueryOptions {
  id?: string;
  q?: string;
  pageToken?: string;
}

async function fetchAllMessages(auth: any, query: QueryOptions) {
  const { q = "" } = query;

  let messages: any[] = [];
  let nextPageToken: string | null | undefined = "";

  const firstPageResult = await fetchMessagesWithPage(auth, {
    q
  });

  if (!firstPageResult) {
    return [];
  }

  messages = messages.concat(firstPageResult.messages);
  nextPageToken = firstPageResult.nextPageToken;

  while (nextPageToken) {
    const result: MessagesResult | null = await fetchMessagesWithPage(auth, {
      q,
      pageToken: nextPageToken
    });

    if (!result) {
      nextPageToken = null;
    } else {
      nextPageToken = result.nextPageToken;
      messages = messages.concat(result.messages);
    }
  }

  return messages;
}

function fetchMessagesWithPage(
  auth: any,
  query: QueryOptions
): Promise<MessagesResult | null> {
  const { q = "", pageToken } = query;
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
          resolve(res ? res.data : null);
        }
      }
    );
  });
}

export function fetchMessages(auth: any, query: QueryOptions) {
  return fetchAllMessages(auth, query);
}

export function getById(auth: any, { id }: QueryOptions): Promise<any> {
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
          resolve(res && res.data);
        }
      }
    );
  });
}

export function fetchLabels(auth: any): Promise<Label[] | null | undefined> {
  const gmail = google.gmail({ version: "v1", auth });
  return new Promise((resolve, reject) => {
    gmail.users.labels.list(
      {
        userId: "me"
      },
      (err, res) => {
        if (err) reject(err);
        else {
          resolve(res && (res.data.labels as Label[]));
        }
      }
    );
  });
}
