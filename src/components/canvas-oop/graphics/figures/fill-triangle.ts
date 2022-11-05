import BaseTriangle from "@src/components/canvas-oop/graphics/figures/base-triangle";

class FillTriangle extends BaseTriangle {
  type: string;

  constructor(value: {x: number; y: number; color: string; type?: string; mod?: number}, index: string, updateFigureStoreData: Function) {
    super(value, index, updateFigureStoreData);
    this.type = 'fillTriangle';
    this.side = 50 * this.pxl;
    this.bottomOffset = 0;
  }

  /**
   * @param ctx {CanvasRenderingContext2D}
   * @param metrics {Object}
   * @param action {Object}
   */
  draw(
    ctx: any,
    metrics: {
      scrollY: number;
      scrollX: number;
      scale: number;
      scaleScrollX: number;
      scaleScrollY: number;
    },
    action: any,
  ) {
    this.processAction(action, metrics);
    this.processUpdate(action);

    ctx.save();
    ctx.fillStyle = action.index === this.index || action.follow === this.index ? 'green' : this.color;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.side, this.y);
    ctx.lineTo(this.x + this.side, this.y - this.side);
    ctx.fill();
    ctx.restore();
  }
}

export default FillTriangle;
