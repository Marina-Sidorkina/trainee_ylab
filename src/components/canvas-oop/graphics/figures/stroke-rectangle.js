import Base from "@src/components/canvas-oop/graphics/figures/base";

class StrokeRectangle extends Base {

  constructor({x, y, color}, index, updateFigureStoreData){
    super({x, y, color}, index, updateFigureStoreData);
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
    this.processUpdate(action);

    ctx.save();
    ctx.strokeStyle = action.index === this.index ? 'green' : this.color;
    ctx.lineWidth = action.index === this.index ? 5 : 3;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}

export default StrokeRectangle;
