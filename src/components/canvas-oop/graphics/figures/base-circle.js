import Base from "@src/components/canvas-oop/graphics/figures/base";

class BaseCircle extends Base {
  constructor({x, y, color}, index, updateFigureStoreData) {
    super({x, y, color}, index, updateFigureStoreData);
  }

  /**
   * Проверка, находится ли точка курсора внутри фигуры
   * @param x {number}
   * @param y {number}
   * @param metrics {Object}
   */
  checkClick({x, y}, metrics) {
    const newX = (this.x * metrics.scale) - metrics.scaleScrollX * this.pxl;
    const newY = (this.y * metrics.scale) - metrics.scaleScrollY  * this.pxl;
    const newRadius = this.radius * metrics.scale;

    return (newX - x )**2 + (newY - y)**2 <= newRadius**2;
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
