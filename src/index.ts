import apis from "./apis";

type Label = {
  id: string;
  name: string;
};

interface AuthOptions {
  credentialPath: string;
  scope: string[];
  tokenPath: string;
}

class GoogleApi {
  private token: any;

  private checkAuth() {
    if (this.token) {
      return this.token;
    }

    throw new Error("Need to authorize");
  }

  public appendToSheet(
    app: string,
    {
      spreadsheetId,
      values
    }: {
      spreadsheetId: string;
      values: any;
    }
  ) {
    const auth = this.checkAuth();
    return apis.sheets.append(auth, spreadsheetId, values);
  }

  public async auth(
    { credentialPath, scope, tokenPath }: AuthOptions
  ) {
    console.log(`🔑🔑🔑 trying to authorize 👉🏼 \n`);
    this.token = await apis.auth.authorize(credentialPath, {
      scope,
      tokenPath
    });
  }

  public isAuthorized() {
    return !!this.token;
  }

  public getMessageById(id: string) {
    const auth = this.checkAuth();
    return apis.messages.getById(auth, { id });
  }

  public getMessages(
    queryOptions: {
      q: string;
      pageToken?: string;
    }
  ) {
    const auth = this.checkAuth();
    return apis.messages.fetchMessages(auth, queryOptions);
  }

  public async getLabelByName(
    name: string
  ): Promise<Label | undefined> {
    const auth = this.checkAuth();
    const labels = await apis.messages.fetchLabels(auth);

    if (!labels) {
      return undefined;
    }

    return labels.find(label => label.name === name);
  }

  public async getLabelById(
    id: string
  ): Promise<Label | undefined> {
    const auth = this.checkAuth();
    const labels = await apis.messages.fetchLabels(auth);
    if (!labels) {
      return undefined;
    }
    return labels.find(label => label.id === id);
  }

  public async getLabels(
    id: string
  ): Promise<Label[] | null | undefined> {
    const auth = this.checkAuth();
    return await apis.messages.fetchLabels(auth);
  }

  public async getThread(id: string) {
    const auth = this.checkAuth();
    return apis.threads.getThreadById(auth, id);
  }

  public runAppScript(
    scriptId: string,
    functionName: string,
    {
      parameters
    }: {
      parameters: any[];
    }
  ) {
    const auth = this.checkAuth();
    return apis.appscript.run(auth, {
      scriptId,
      functionName,
      parameters
    });
  }
}

export default new GoogleApi();
