import StateModule from "@src/store/module";

/**
 * Управление модальными окнами
 */
class ModalsState extends StateModule{

  initState() {
    return {
      name: null,
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
      name
    }, `Открытие модалки ${name}`);
  }

  /**
   * Закрытие модального окна
   */
  close(){
    this.setState({
      ...this.getState(),
      name: false
    }, `Закрытие модалки`);
  }

  addModalElement(name) {
    this.setState({
      ...this.getState(),
      list: [...this.getState().list, name]
    }, `Добавление элемента в список модалок`);
  }

  deleteModalElement() {
    let newList = [...this.getState().list];
    newList.pop();
    this.setState({
      ...this.getState(),
      list: [...newList]
    }, `Удаление элемента из списка модалок`);
  }
}

export default ModalsState;
