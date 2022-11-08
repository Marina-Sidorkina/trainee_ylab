import Base from "@src/components/canvas-oop/graphics/figures/base";

class BaseTriangle extends Base {
  side: number;
  constructor(value: {x: number; y: number; color: string; type?: string; mod?: number}, index: string, updateFigureStoreData: Function) {
    super(value, index, updateFigureStoreData);
    this.side = 0;
  }

  /**
   * Проверка, находится ли точка курсора внутри фигуры
   * @param value {object}
   * @param metrics {Object}
   */
  checkClick(
    value: {
      x: number;
      y: number
    },
    metrics: {
      scrollY: number;
      scrollX: number;
      scale: number;
      scaleScrollX: number;
      scaleScrollY: number;
    }
  ) {
    const newX = (this.x * metrics.scale) - metrics.scaleScrollX * this.pxl;
    const newY = (this.y * metrics.scale) - metrics.scaleScrollY  * this.pxl;
    const newSide = this.side * metrics.scale;

    const x1 = newX;
    const y1 = newY;
    const x2 = newX + newSide;
    const y2 = newY;
    const x3 = newX + newSide;
    const y3 = newY - newSide;
    const check1 = (x1-value.x)*(y2-y1)-(x2-x1)*(y1-value.y);
    const check2 = (x2-value.x)*(y3-y2)-(x3-x2)*(y2-value.y);
    const check3 = (x3-value.x)*(y1-y3)-(x1-x3)*(y3-value.y);
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
    const canvasMaxY = (canvas as HTMLCanvasElement).clientHeight;
    const canvasMaxX = (canvas as HTMLCanvasElement).clientWidth;
    const minX = this.x / this.pxl;
    const maxX = (this.x / this.pxl) + (this.side / this.pxl);
    const minY = (this.y / this.pxl) - (this.side / this.pxl);
    const maxY = this.y / this.pxl;

    return maxX < canvasMinX || minX > canvasMaxX || maxY < canvasMinY || minY > canvasMaxY;
  }
}

export default BaseTriangle;
