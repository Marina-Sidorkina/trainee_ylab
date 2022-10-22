import StateModule from "@src/store/module";
import createCoordinates from "@src/utils/canvas/createCoordinates";
import getRandomColor from "@src/utils/canvas/getRandomColor";

/**
 * Состояние рисунка на canvas
 */
class CanvasOOPState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      objects: [],
      input: {
        index: -1,
        x: 0,
        y: 0,
      },
    };
  }

  /**
   * Добавление нового объекта
   * @param type {string} Тип фигуры, которую нужно создать
   * /'fillRectangle', 'strokeRectangle', 'fillCircle', 'strokeCircle', 'fillTriangle', 'strokeTriangle'/
   */
  createObject(type) {
    const color = getRandomColor();
    const canvas = document.querySelector('canvas');
    const {x, y} = createCoordinates(canvas);

    this.setState({
      ...this.getState(),
      objects: [...this.getState().objects, {type, x, y, color}],
    }, 'Добавление еще одного объекта');
  }

  /**
   * Обновление поля с данными
   * @param index {number} Индекс элемента, чьи данные отображаются в инпутах
   * @param x {number} Текущая координата x
   * @param y {number} Текущая координата y
   */
  updateInputStoreData(index, x, y) {
    this.setState({
      ...this.getState(),
      input: {index, x: Math.round(x), y: Math.round(y)}
    }, 'Обновление данных выбранной фигуры');
  }


  /**
   * Сброс всех значений
   */
  reset() {
    this.setState({
      ...this.getState(),
      objects: [],
      input: {
        index: -1,
        x: 0,
        y: 0,
      },
    }, 'Удаление всех объектов и данных о них');
  }
}

export default CanvasOOPState;
