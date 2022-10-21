import Base from "@src/components/canvas-oop/graphics/figures/base";

class StrokeCircle extends Base {

  constructor({x, y, color}, index){
    super({x, y, color}, index);
    this.type = 'strokeCircle';
    this.radius = 90 * this.pxl;
    this.bottomOffset =  90 * this.pxl; //radius
  }

  /**
   * @param ctx {CanvasRenderingContext2D}
   * @param metrics {Object}
   * @param action {Object}
   */
  draw(ctx, metrics, action) {
    this.processAction(action, metrics);

    ctx.save();
    ctx.strokeStyle = action.index === this.index ? 'green' : this.color;
    ctx.lineWidth = action.index === this.index ? 5 : 3;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius,0,Math.PI*2,true);
    ctx.stroke();
    ctx.restore();
  }
}

export default StrokeCircle;
