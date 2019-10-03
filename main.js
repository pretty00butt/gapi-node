import fs from "fs";
import { authorize, getNewToken } from "./_auth";
import appScriptApis from "./_appscript";
import messageApis from "./_messages";

const APP_TYPE_APP_SCRIPT = "appscript";
const APP_TYPE_MESSAGES = "messages";
const APP_TYPE_SHEETS = "sheets";

class GoogleApp {
  tokens = {
    [APP_TYPE_APP_SCRIPT]: null,
    [APP_TYPE_MESSAGES]: null,
    [APP_TYPE_SHEETS]: null
  };

  _labels;

  get appTypes() {
    return [APP_TYPE_APP_SCRIPT, APP_TYPE_MESSAGES, APP_TYPE_SHEETS];
  }

  _auth(credentialPath, tokenPath, { SCOPES }) {
    const content = fs.readFileSync(credentialPath);
    return authorize(JSON.parse(content), {
      scope: SCOPES,
      tokenPath
    });
  }

  async auth(type, credential, token, { SCOPES = [] }) {
    switch (type) {
      case APP_TYPE_APP_SCRIPT:
      case APP_TYPE_SHEETS:
        this.tokens[type] = await this._auth(credential, token, {
          SCOPES
        });
        return this.tokens[type];
      case APP_TYPE_MESSAGES:
        this.tokens[type] = await this._auth(credential, token, {
          SCOPES
        });
        this._labels = await messageApis.getLabels(this.tokens[type]);
        return this.tokens[type];
      default:
        throw new Error("잘못된 타입입니다.");
    }
  }

  _getToken(type) {
    if (this.tokens[type] === null) {
      throw new Error("인증 후 시도해주세요.");
    }

    return this.tokens[type];
  }

  getLabelIdByName(name) {
    return this._labels.find(label => label.name === name).id;
  }

  getLabelNameById(id) {
    return this._labels.find(label => label.id === id).name;
  }

  getMessage(id) {
    const auth = this._getToken(APP_TYPE_MESSAGES);
    return messageApis.getMessage(auth, { id });
  }

  async getMessages({ q = "" } = {}) {
    const auth = this._getToken(APP_TYPE_MESSAGES);

    let messages = [];
    let nextPageToken = "";

    const firstPageResult = await messageApis.getMessages(auth, {
      q
    });

    messages = messages.concat(firstPageResult.messages);
    nextPageToken = firstPageResult.nextPageToken;

    while (nextPageToken) {
      const result = await messageApis.getMessages(auth, {
        q,
        pageToken: nextPageToken
      });

      nextPageToken = result.nextPageToken;
      messages = messages.concat(result.messages);
    }

    return messages;
  }

  runAppScript(scriptId, { functionName, parameters = [] } = {}) {
    const auth = this._getToken(APP_TYPE_APP_SCRIPT);
    return appScriptApis.run(auth, {
      scriptId,
      functionName,
      parameters
    });
  }
}

export default new GoogleApp();
