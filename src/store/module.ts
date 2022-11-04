import Store from "@src/store/index";
import Services from "@src/services";

class StateModule {

  /**
   * @param store {Store}
   * @param config {Object}
   */
  store: Store;
  config: any;
  services: Services;

  constructor(store: Store, config: any) {
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
