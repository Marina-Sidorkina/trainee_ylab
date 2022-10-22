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
      figure: {
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
   * Удаление всех объектов
   */
  deleteObjects() {
    this.setState({
      ...this.getState(),
      objects: [],
    }, 'Удаление всех объектов');
  }

  /**
   * Обновление данных выбранной фигуры
   */
  updateFigureStoreData(index, x, y) {
    this.setState({
      ...this.getState(),
      figure: {index, x: Math.round(x), y: Math.round(y)}
    }, 'Обновление данных выбранной фигуры');
  }
}

export default CanvasOOPState;
