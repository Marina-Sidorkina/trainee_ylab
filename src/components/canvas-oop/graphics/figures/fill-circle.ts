import BaseCircle from "@src/components/canvas-oop/graphics/figures/base-circle";

class FillCircle extends BaseCircle {
  type: string;
  constructor(value: {x: number; y: number; color: string; type?: string; mod?: number}, index: string, updateFigureStoreData: Function) {
    super(value, index, updateFigureStoreData);
    this.type = 'fillCircle';
    this.radius = 50 * this.pxl;
    this.bottomOffset =  50 * this.pxl; //radius
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
    ctx.arc(this.x, this.y, this.radius,0,Math.PI*2,true);
    ctx.fill();
    ctx.restore();
  }
}

export default FillCircle;
