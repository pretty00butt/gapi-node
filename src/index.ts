import apis from "./apis"

interface Tokens {
  [k: string]: any
}

interface AuthOptions {
  credentialPath: string;
  scope: string[];
  tokenPath?: string;
}

class GoogleApi {
  private tokens: Tokens = {};

  private checkAuth(app: string) {
    if (this.tokens[app]) {
      return this.tokens[app];
    }

    throw new Error("Need to authorize");
  }

  public async auth(app: string, {
    credentialPath,
    scope,
    tokenPath
  }: AuthOptions) {
    console.log(`🔑🔑🔑 trying to authorize 👉🏼 ${app}\n`);
    this.tokens[app] = await apis.auth.authorize(credentialPath, {
      scope,
      tokenPath
    })
  }

  public isAuthorized(app: string) {
    return !!this.tokens[app]
  }

  public getMessageById(app: string, id: string) {
    const auth = this.checkAuth(app);
    return apis.messages.getById(auth, { id });
  }

  public getMessages(app: string, queryOptions: {
    q?: string,
    pageToken?: string,
  } | undefined) {
    this.checkAuth(app);
    return apis.messages.fetchMessages(this.tokens[app], queryOptions)
  }

  public async getLabelByName(app: string, name: string) {
    const auth = this.checkAuth(app);
    const labels = await apis.messages.fetchLabels(auth);
    return labels.find(label => label.name === name).id;
  }

  public async getLabelById(app: string, id: string) {
    const auth = this.checkAuth(app);
    const labels = await apis.messages.fetchLabels(auth);
    return labels.find(label => label.id === id)
  }
}

export default new GoogleApi();