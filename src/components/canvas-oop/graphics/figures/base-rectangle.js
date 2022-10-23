import Base from "@src/components/canvas-oop/graphics/figures/base";

class BaseRectangle extends Base {
  constructor({x, y, color}, index, updateFigureStoreData) {
    super({x, y, color}, index, updateFigureStoreData);
  }

  /**
   * Проверка, находится ли точка курсора внутри фигуры
   * @param x {number}
   * @param y {number}
   */
  checkClick({x, y}) {
    const rightX = this.x + this.width;
    const bottomY = this.y + this.height;
    return x <= rightX && x >= this.x && y >= this.y && y <= bottomY;
  }
}

export default BaseRectangle;
