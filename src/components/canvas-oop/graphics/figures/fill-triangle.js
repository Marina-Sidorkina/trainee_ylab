import Base from "@src/components/canvas-oop/graphics/figures/base";

class FillTriangle extends Base {

  constructor({x, y, color}){
    super({x, y, color});
    this.side = 50 * this.pxl;
    this.bottomOffset = 0;
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
    ctx.scale(metrics.scale, metrics.scale);
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.side, this.y);
    ctx.lineTo(this.x + this.side, this.y - this.side);
    ctx.fill();
    ctx.restore();
  }
}

export default FillTriangle;
