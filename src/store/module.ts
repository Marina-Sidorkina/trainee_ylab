import Store from "@src/store/index";
import Services from "@src/services";
import {IModuleConfig} from "@src/store/types";

class StateModule {

  /**
   * @param store {Store}
   * @param config {Object}
   */
  store: Store;
  config: IModuleConfig;
  services: Services;

  constructor(store: Store, config: IModuleConfig) {
    this.store = store;
    this.config = config;
    this.services = store.services;
  }

  defaultConfig(){
    return {};
  }

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {};
  }

  getState() {
    return this.store.getState()[this.config.name];
  }

  setState(newState: any, description = 'setState'){
    this.store.setState({
      ...this.store.getState(),
      [this.config.name]: newState
    }, description)
  }
}

export default StateModule;
