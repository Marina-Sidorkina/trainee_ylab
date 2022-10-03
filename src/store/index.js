import * as modules from './exports.js';

class Store {

  /**
   * @param services {Services}
   * @param config {Object}
   */
  constructor(services, config = {}) {
    // Менеджер сервисов
    this.services = services;
    this.config = {
      log: false,
      ...config
    }
    // Состояние приложения (данные)
    this.state = {};
    // Слушатели изменений state
    this.listeners = [];

    // Модули
    this.modules = {};
    for (const name of Object.keys(modules)) {
      // Экземпляр модуля. Передаём ему ссылку на store и навзание модуля.
      this.modules[name] = new modules[name](this, {name, ...this.config.modules[name] || {}});
      // По названию модля устанавливается свойство с анчальным состоянием от модуля
      this.state[name] = this.modules[name].initState();
    }
  }

  /**
   * Доступ к модулю состояния
   * @param name {String} Название модуля
   */
  get(name) {
    return this.modules[name];
  }

  /**
   * Выбор state
   * @return {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка state
   * @param newState {Object}
   * @param [description] {String} Описание действия для логирования
   */
  setState(newState, description = 'setState') {
    if (this.config.log) {
      console.group(
        `%c${'store.setState'} %c${description}`,
        `color: ${'#777'}; font-weight: normal`,
        `color: ${'#333'}; font-weight: bold`,
      );
      console.log(`%c${'prev:'}`, `color: ${'#d77332'}`, this.state);
      console.log(`%c${'next:'}`, `color: ${'#2fa827'}`, newState);
      console.groupEnd();
    }
    this.state = newState;
    // Оповещаем всех подписчиков об изменении стейта
    for (const listener of this.listeners) {
      listener();
    }
  }

  /**
   * Подписка на изменение state
   * @param callback {Function}
   * @return {Function} Функция для отписки
   */
  subscribe(callback) {
    this.listeners.push(callback);
    // Возвращаем функцию для удаления слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== callback);
    }
  }

  /**
   * Добавление новго модуля и поля стейта для нового модального окна со списком
   * @param index {number || string} Индекс модального окна каталога
   */
  addNewModalModuleAndState(index) {
    this.modules[`catalog_${index}`] = new modules['catalog'](this, {name: `catalog_${index}`, ...this.config.modules[`catalog_${index}`] || {}});
    this.state[`catalog_${index}`] = this.modules[`catalog_${index}`].initState();
  }

  /**
   * Удаление новго модуля и поля стейта для нового модального окна со списком
   * @param index {number || string} Индекс модального окна каталога
   */
  deleteNewModalModuleAndState(index) {
    delete this.modules[`catalog_${index}`];
    delete this.state[`catalog_${index}`];
  }
}

export default Store;
