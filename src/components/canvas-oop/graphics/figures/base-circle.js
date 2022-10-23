import Base from "@src/components/canvas-oop/graphics/figures/base";

class BaseCircle extends Base {
  constructor({x, y, color}, index, updateFigureStoreData) {
    super({x, y, color}, index, updateFigureStoreData);
  }

  /**
   * Проверка, находится ли точка курсора внутри фигуры
   * @param x {number}
   * @param y {number}
   */
  checkClick({x, y}) {
    return (this.x - x)**2 + (this.y - y)**2 <= this.radius**2;
  }
}

export default BaseCircle;
