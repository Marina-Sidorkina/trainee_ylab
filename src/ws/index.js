class WSService {

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = {
      chatUrl: config.chatURL
    }
    this._state = null;
  }

  /**
   * Управление соединением WS
   */
  initSocket(token, onMessage) {
    this._state = new WebSocket(this.config.chatUrl);

    this._state.onopen = () => {
      this._state.send(JSON.stringify({
        method: 'auth',
        payload: {
          token
        },
      }));
    };

    this._state.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      onMessage(data);
    };

    this._state.onclose = (evt) => {
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
  request(method, payload) {
    this._state.send(JSON.stringify({
      method,
      payload,
    }));
  }
}

export default WSService;
