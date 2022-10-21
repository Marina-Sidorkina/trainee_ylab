import Base from "@src/components/canvas-oop/graphics/figures/base";

class FillRectangle extends Base {

  constructor({x, y, color}){
    super({x, y, color});
    this.width = 100 * this.pxl;
    this.height = 100 * this.pxl;
    this.bottomOffset =  100 * this.pxl; // height
  }

  /**
   * @param ctx {CanvasRenderingContext2D}
   * @param metrics {Object}
   * @param action {Object}
   */
  draw(ctx, metrics, action) {
    this.processAction(action, metrics);

    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect (this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}

export default FillRectangle;
