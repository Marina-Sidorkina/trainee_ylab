import Base from "@src/components/canvas-oop/graphics/figures/base";

class FillCircle extends Base {

  constructor({x, y, color}, index){
    super({x, y, color}, index);
    this.type = 'fillCircle';
    this.radius = 50 * this.pxl;
    this.bottomOffset =  50 * this.pxl; //radius
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
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius,0,Math.PI*2,true);
    ctx.fill();
    ctx.restore();
  }
}

export default FillCircle;
