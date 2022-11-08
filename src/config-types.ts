
export interface IConfigStore {
  log: boolean;
  modules: { [session: string]: { tokenHeader: string; } };
}

export interface IConfigApi {
  baseUrl: string;
}

export interface IConfigWS {
  chatURL: string;
}

export interface IConfig {
  store: IConfigStore;
  api: IConfigApi;
  ws: IConfigWS;
}
