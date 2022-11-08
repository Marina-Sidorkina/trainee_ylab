import Store from "./store";
import APIService from "./api";
import WSService from "@src/ws";
import {IConfig} from "@src/config-types";

class Services {

  config: IConfig;
  private _store: Store | undefined;
  private _api: APIService | undefined;
  private _ws: WSService | undefined;

  constructor(config: IConfig) {
    this.config = config;
  }

  /**
   * Сервис Store
   * @returns {Store}
   */
  get store(){
    if (!this._store) {
      this._store = new Store(this, this.config.store);
    }
    return this._store;
  }

  /**
   * Сервис АПИ
   * @returns {APIService}
   */
  get api(){
    if (!this._api) {
      this._api = new APIService(this, this.config.api);
    }
    return this._api;
  }

  /**
   * Сервис для WebSocket
   * @returns {WSService}
   */
  get ws(){
    if (!this._ws) {
      this._ws = new WSService(this, this.config.ws);
    }
    return this._ws;
  }

}

export default Services;
