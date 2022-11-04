import {IConfig} from "@src/store/types";

/**
 * Настройки сервисов
 */

const config: IConfig = {
  store: {
    log: false,

    modules: {
      session: {
        tokenHeader: 'X-Token'
      }
    }
  },

  api: {
    baseUrl: ''
  },

  ws: {
    chatURL: 'ws://example.front.ylab.io/chat'
  }
}

export default config;
