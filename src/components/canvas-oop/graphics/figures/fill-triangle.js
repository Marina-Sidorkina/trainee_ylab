class FillTriangle {

  constructor({x, y, color}){
    this.x = x;
    this.y = y;
    this.a = 9.8;
    this.color = color;
    this.time = performance.now();
    this.pxl = window.devicePixelRatio;
    this.side = 50 * this.pxl;
  }

  animate(time, bottom){
    const dt = (time - this.time) / 1000;

    if (this.y < bottom) {
      this.y += this.a * dt * dt / 2;
    } else {
      this.y = bottom;
    }
  }

  /**
   * @param ctx {CanvasRenderingContext2D}
   * @param metrics {Object}
   */
  draw(ctx, metrics){
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
