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

  /**
   * Создание нового объекта
   * @param type {string} Тип фигуры, которую нужно создать
   * ('fillRectangle', 'strokeRectangle', 'fillCircle', 'strokeCircle', 'fillTriangle', 'strokeTriangle')
   * @param canvas {object} Элемент канваса для определения ширины и высоты
   */
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

  /**
   * Удаление всех объектов
   */
  deleteObjects() {
    this.setState({
      ...this.getState(),
      objects: [],
      offsetY: 0,
      offsetX: 0,
    }, 'Удаление всех объектов');
  }

  /**
   * Установка смещения по вертикали
   * @param offsetY {number}
   */
  addOffsetY(offsetY) {
    const pxl = window.devicePixelRatio;

    this.setState({
      ...this.getState(),
      offsetY: this.getState().offsetY + (offsetY * pxl),
    }, 'Запись смещения по Y');
  }

  /**
   * Установка смещения по горизонтали
   * @param offsetX {number}
   */
  addOffsetX(offsetX) {
    const pxl = window.devicePixelRatio;

    this.setState({
      ...this.getState(),
      offsetX: this.getState().offsetX + (offsetX * pxl),
    }, 'Запись смещения по X');
  }

  /**
   * Обработка перемещения при прокручивании колесика мыши
   * @param delta {number}
   */
  onWheelMove(delta) {
    if (delta > 0){
      this.addOffsetY(10);
    } else {
      this.addOffsetY(-10);
    }
  }
}

export default CanvasState;
