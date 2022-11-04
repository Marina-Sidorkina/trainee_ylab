import StateModule from "@src/store/module";
import createCoordinates from "@src/utils/canvas/createCoordinates";
import getRandomColor from "@src/utils/canvas/getRandomColor";
import generateRandomNumber from "@src/utils/generateRandomNumber";
import {ICanvasObject, ICanvasState} from "@src/store/canvas-oop/types";

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
      objects: [] as ICanvasObject[],
      input: {
        index: -1,
        x: 0,
        y: 0,
      },
    } as ICanvasState
  }

  /**
   * Добавление нового объекта
   * @param type {string} Тип фигуры, которую нужно создать
   * /'fillRectangle', 'strokeRectangle', 'fillCircle', 'strokeCircle', 'fillTriangle', 'strokeTriangle'/
   */
  createObject(type: string) {
    const color = getRandomColor();
    const canvas = document.querySelector('canvas');
    const {x, y} = createCoordinates(canvas);

    this.setState({
      ...this.getState(),
      objects: [...this.getState().objects, {type, x, y, color}],
    }, 'Добавление еще одного объекта');
  }

  /**
   * Добавление нового листочка
   * @param mod {number} Модификация для листочка
   */
  createLeaf(mod: number) {
    const x = generateRandomNumber(0, 1004)
    const y = generateRandomNumber(-150, -100);
    const data = {type: 'leaf', x, y, color: 'transparent', mod};

    this.setState({
      ...this.getState(),
      objects: [...this.getState().objects, data],
    }, 'Добавление еще одного листочка');
  }

  /**
   * Обновление поля с данными
   * @param index {number} Индекс элемента, чьи данные отображаются в инпутах
   * @param x {number} Текущая координата x
   * @param y {number} Текущая координата y
   */
  updateInputStoreData(index: number, x: number, y: number) {
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
