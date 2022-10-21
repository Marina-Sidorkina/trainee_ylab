import Base from "@src/components/canvas-oop/graphics/figures/base";

class StrokeRectangle extends Base {

  constructor({x, y, color}, index){
    super({x, y, color}, index);
    this.type = 'strokeRectangle';
    this.width = 150 * this.pxl;
    this.height = 150 * this.pxl;
    this.bottomOffset = 150 * this.pxl; // height
  }

  /**
   * @param ctx {CanvasRenderingContext2D}
   * @param metrics {Object}
   * @param action {Object}
   */
  draw(ctx, metrics, action) {
    this.processAction(action, metrics);

    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}

export default StrokeRectangle;
