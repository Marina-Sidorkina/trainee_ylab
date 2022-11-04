import * as modules from './exports';
import {IConfigStore, IModules, IState} from "@src/store/types";
import Services from "@src/services";

class Store {

  /**
   * @param services {Services}
   * @param config {Object}
   */
  services:  Services;
  config: IConfigStore;
  modules: IModules;
  state: IState;
  listeners: Function[];

  constructor(services: Services, config: IConfigStore) {
    // Менеджер сервисов
    this.services = services;
    this.config = config as IConfigStore;
    // Состояние приложения (данные)
    this.state = {} as IState;
    // Слушатели изменений state
    this.listeners = [];

    // Модули
    this.modules = {} as IModules;
    const typedModules = modules as { [key: string]: any};

    for (const name of Object.keys(typedModules)) {
      // Экземпляр модуля. Передаём ему ссылку на store и навзание модуля.
      this.modules[name] = new  typedModules[name](this, {name, ...this.config.modules[name] || {}});
      // По названию модля устанавливается свойство с анчальным состоянием от модуля
      this.state[name] = this.modules[name].initState();
    }
  }

  /**
   * Доступ к модулю состояния
   * @param name {String} Название модуля
   */
  get(name: string) {
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
  setState(newState: IState, description: string = 'setState') {
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
  subscribe(callback: Function) {
    this.listeners.push(callback);
    // Возвращаем функцию для удаления слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== callback);
    }
  }

  /**
   * Добавление новго модуля и поля стейта для нового модального окна со списком
   * @param fieldName {string} Имя нового поля стейта
   * @param moduleName {string} Имя модуля, который нужно инициализировать
   */
  addNewModalModuleAndState(fieldName: string, moduleName: string) {
    const typedModules = modules as { [key: string]: any};

    this.modules[fieldName] = new typedModules[moduleName](this, {name: fieldName, ...this.config.modules[fieldName] || {}});
    this.state[fieldName] = this.modules[fieldName].initState();
  }

  /**
   * Удаление новго модуля и поля стейта для нового модального окна со списком
   * @param fieldName {string} Имя поля стейта
   */
  deleteNewModalModuleAndState(fieldName: string) {
    delete this.modules[fieldName];
    delete this.state[fieldName];
  }
}

export default Store;
