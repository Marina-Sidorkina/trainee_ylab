import StateModule from "@src/store/module";

/**
 * Управление модальными окнами
 */
class ModalsState extends StateModule{

  initState() {
    return {
      basket: false,
      basketCatalog: false,
      list: []
    };
  }

  /**
   * Открытие модального окна по названию
   * @param name {String} Название модалки
   */
  open(name){
    this.setState({
      ...this.getState(),
      [name]: true,
    }, `Открытие модалки ${name}`);
  }

  /**
   * Закрытие модального окна по названию
   */
  close(name){
    this.setState({
      ...this.getState(),
      [name]: false
    }, `Закрытие модалки`);
  }

  /**
   * Добавить элемент в массив модалок каталога
   */
  addModalElement(name) {
    this.setState({
      ...this.getState(),
      list: [...this.getState().list, name]
    }, `Добавление элемента в список модалок`);
  }

  /**
   * Удалить элемент из массива модалок каталога
   */
  deleteModalElement() {
    let newList = [...this.getState().list];
    newList.pop();
    this.setState({
      ...this.getState(),
      list: [...newList]
    }, `Удаление элемента из списка модалок`);
  }

  /**
   * Сбросить массив модалок каталога
   */
  resetModalList() {
    this.setState({
      ...this.getState(),
      list: []
    }, `Удаление элемента из списка модалок`);
  }
}

export default ModalsState;
