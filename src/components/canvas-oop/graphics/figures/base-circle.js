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

  /**
   * Проверка, находится ли хотя бы часть фигуры в пределах видимой области
   */
  checkVisibility() {
    const canvas = document.querySelector('canvas');
    const canvasMinY = 0;
    const canvasMinX = 0;
    const canvasMaxY = canvas.clientHeight;
    const canvasMaxX = canvas.clientWidth;

    return (this.x / this.pxl) + (this.radius / this.pxl) < canvasMinX ||
      (this.x / this.pxl) - (this.radius / this.pxl) > canvasMaxX ||
      (this.y / this.pxl) + (this.radius / this.pxl) < canvasMinY ||
      (this.y / this.pxl) - (this.radius / this.pxl) > canvasMaxY;
  }
}

export default BaseCircle;
