import StateModule from "@src/store/module";
import createCoordinates from "@src/utils/canvas/createCoordinates";
import getRandomColor from "@src/utils/canvas/getRandomColor";

/**
 * Состояние рисунка на canvas
 */
class CanvasState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      objects: []
    };
  }

  createObject(type, canvas) {
    const {x, y} = createCoordinates(canvas);
    const rgba = getRandomColor();

    this.setState({
      ...this.getState(),
      objects: [...this.getState().objects, {
        type, rgba, x, y,
      }],
    }, 'Добавление еще одного объекта для отрисовки');
  }

  deleteObjects() {
    this.setState({
      ...this.getState(),
      objects: [],
    }, 'Удаление всех объектов');
  }
}

export default CanvasState;
