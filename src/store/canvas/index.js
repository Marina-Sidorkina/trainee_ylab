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
    const offsetY = 0;
    const offsetX = 0;

    this.setState({
      ...this.getState(),
      objects: [...this.getState().objects, {
        type, rgba, x, y, offsetX, offsetY
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
    }, 'Удаление всех объектов');
  }

  /**
   * Обработка перемещения при прокручивании колесика мыши
   * @param delta {number}
   */
  onWheelMove(delta) {
    if (delta > 0){
      this.addOffset(0, 7);
    } else {
      this.addOffset(0, -7);
    }
  }

  /**
   * Добавление смещения по оси x и y для каждого объекта
   * @param offsetX {number}
   * @param offsetY {number}
   */
  addOffset(offsetX, offsetY) {
    const pxl = window.devicePixelRatio;

    const newObjects = this.getState().objects.slice().map((item) => {
      return {
        ...item,
        offsetX: item.offsetX + (offsetX * pxl),
        offsetY: item.offsetY + (offsetY * pxl),
      }
    })

    this.setState({
      ...this.getState(),
      objects: newObjects
    }, 'Запись смещений по x и y для каждого объекта');
  }
}

export default CanvasState;
