import Base from "@src/components/canvas-oop/graphics/figures/base";

class BaseCircle extends Base {
  radius: number;

  constructor(value: {x: number; y: number; color: string; type?: string; mod?: number}, index: string, updateFigureStoreData: Function) {
    super(value, index, updateFigureStoreData);
    this.radius = 0;
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
    }) {
    const newX = (this.x * metrics.scale) - metrics.scaleScrollX * this.pxl;
    const newY = (this.y * metrics.scale) - metrics.scaleScrollY  * this.pxl;
    const newRadius = this.radius * metrics.scale;

    return (newX - value.x )**2 + (newY - value.y)**2 <= newRadius**2;
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

    return (this.x / this.pxl) + (this.radius / this.pxl) < canvasMinX ||
      (this.x / this.pxl) - (this.radius / this.pxl) > canvasMaxX ||
      (this.y / this.pxl) + (this.radius / this.pxl) < canvasMinY ||
      (this.y / this.pxl) - (this.radius / this.pxl) > canvasMaxY;
  }
}

export default BaseCircle;
