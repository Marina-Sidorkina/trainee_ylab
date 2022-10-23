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
