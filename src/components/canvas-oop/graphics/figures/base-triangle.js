import Base from "@src/components/canvas-oop/graphics/figures/base";

class BaseTriangle extends Base {
  constructor({x, y, color}, index, updateFigureStoreData) {
    super({x, y, color}, index, updateFigureStoreData);
  }

  /**
   * Проверка, находится ли точка курсора внутри фигуры
   * @param x {number}
   * @param y {number}
   */
  checkClick({x, y}) {
    const x1 = this.x;
    const y1 = this.y;
    const x2 = this.x + this.side;
    const y2 = this.y;
    const x3 = this.x + this.side;
    const y3 = this.y - this.side;
    const check1 = (x1-x)*(y2-y1)-(x2-x1)*(y1-y);
    const check2 = (x2-x)*(y3-y2)-(x3-x2)*(y2-y);
    const check3 = (x3-x)*(y1-y3)-(x1-x3)*(y3-y);
    const result1 = check1 >= 0 && check2 >=0 && check3 >= 0;
    const result2 = check1 <= 0 && check2 <=0 && check3 <= 0;
    return result1 || result2;
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
    const minX = this.x / this.pxl;
    const maxX = (this.x / this.pxl) + (this.side / this.pxl);
    const minY = (this.y / this.pxl) - (this.side / this.pxl);
    const maxY = this.y / this.pxl;

    return maxX < canvasMinX || minX > canvasMaxX || maxY < canvasMinY || minY > canvasMaxY;
  }
}

export default BaseTriangle;
