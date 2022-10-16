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
      objects: [],
      offsetY: 0,
      offsetX: 0,
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
      offsetY: 0,
      offsetX: 0,
    }, 'Удаление всех объектов');
  }

  addOffsetY(offsetY) {
    const pxl = window.devicePixelRatio;

    this.setState({
      ...this.getState(),
      offsetY: this.getState().offsetY + (offsetY * pxl),
    }, 'Запись смещения по Y');
  }

  addOffsetX(offsetX) {
    const pxl = window.devicePixelRatio;

    this.setState({
      ...this.getState(),
      offsetX: this.getState().offsetX + (offsetX * pxl),
    }, 'Запись смещения по X');
  }
}

export default CanvasState;
