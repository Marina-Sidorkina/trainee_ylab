import BaseRectangle from "@src/components/canvas-oop/graphics/figures/base-rectangle";

class FillRectangle extends BaseRectangle {
  type: string;

  constructor(value: {x: number; y: number; color: string; type?: string; mod?: number}, index: string, updateFigureStoreData: Function) {
    super(value, index, updateFigureStoreData);
    this.type = 'fillRectangle';
    this.width = 100 * this.pxl;
    this.height = 100 * this.pxl;
    this.bottomOffset =  100 * this.pxl; // height
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
    ctx.fillRect (this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}

export default FillRectangle;
