import Base from "@src/components/canvas-oop/graphics/figures/base";

class StrokeTriangle extends Base {

  constructor({x, y, color}, index, updateFigureStoreData){
    super({x, y, color}, index, updateFigureStoreData);
    this.type = 'strokeTriangle';
    this.side = 125 * this.pxl;
    this.bottomOffset = 0;
  }

  /**
   * @param ctx {CanvasRenderingContext2D}
   * @param metrics {Object}
   * @param action {Object}
   */
  draw(ctx, metrics, action){
    this.processAction(action, metrics);
    this.processUpdate(action);

    ctx.save();
    ctx.strokeStyle = action.index === this.index ? 'green' : this.color;
    ctx.lineWidth = action.index === this.index ? 5 : 3;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.side, this.y);
    ctx.lineTo(this.x + this.side, this.y - this.side);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.restore();
  }
}

export default StrokeTriangle;
