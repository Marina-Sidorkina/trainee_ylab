import Services from "@src/services";

class WSService {

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  services: Services;
  config: {chatUrl: string;};
  _state: any;

  constructor(services: Services, config: {chatURL: string} = {} as {chatURL: string}) {
    this.services = services;
    this.config = {
      chatUrl: config.chatURL
    }
    this._state = null;
  }

  /**
   * Управление соединением WS
   */
  initSocket(token: string, onMessage: Function) {
    this._state = new WebSocket(this.config.chatUrl);

    this._state.onopen = () => {
      this._state.send(JSON.stringify({
        method: 'auth',
        payload: {
          token
        },
      }));
    };

    this._state.onmessage = (evt: {data: string}) => {
      const data = JSON.parse(evt.data);
      onMessage(data);
    };

    this._state.onclose = (evt: {wasClean: boolean}) => {
      if (!evt.wasClean) {
        this.initSocket(token, onMessage)
      } else {
        console.log('Закрыто');
      }
    };
  }

  /**
   * Создание запроса
   * @param method {string} Метод запроса
   * @param payload {object} Дополнительные данные для запроса
   */
  request(method: string, payload: any) {
    this._state.send(JSON.stringify({
      method,
      payload,
    }));
  }
}

export default WSService;
