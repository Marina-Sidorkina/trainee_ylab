import Base from "@src/components/canvas-oop/graphics/figures/base";

class BaseRectangle extends Base {
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
    const newWidth = this.width * metrics.scale;
    const newHeight = this.height * metrics.scale;

    const rightX = newX + newWidth;
    const bottomY = newY + newHeight;
    return x <= rightX && x >= newX && y >= newY && y <= bottomY;
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

    return (this.x / this.pxl) + (this.width / this.pxl) < canvasMinX ||
      (this.x / this.pxl) > canvasMaxX ||
      (this.y / this.pxl) + (this.height / this.pxl) < canvasMinY ||
      (this.y / this.pxl) > canvasMaxY;
  }
}

export default BaseRectangle;
