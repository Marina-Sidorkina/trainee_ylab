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
}

export default CanvasOOPState;
