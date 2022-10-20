class StrokeCircle {

  constructor({x, y, color}){
    this.x = x;
    this.y = y;
    this.a = 9.8;
    this.color = color;
    this.time = performance.now();
    this.pxl = window.devicePixelRatio;
    this.radius = 90 * this.pxl;
  }

  animate(time, bottom){
    const dt = (time - this.time) / 1000;

    if (this.y < bottom - this.radius) {
      this.y += this.a * dt * dt / 2;
    } else {
      this.y = bottom - this.radius;
    }
  }

  /**
   * @param ctx {CanvasRenderingContext2D}
   * @param metrics {Object}
   * @param action {Object}
   */
  draw(ctx, metrics, action) {

    if (action.name === 'mouseMove' && action.active) {
      this.x = this.x - action.scrollX * this.pxl;
      this.y = this.y - action.scrollY * this.pxl;
      this.time = performance.now();
    }


    if (action.name === 'scroll') {
      this.y = this.y - metrics.scrollY;
      this.time = performance.now();
    }

    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.scale(metrics.scale, metrics.scale);
    ctx.arc(this.x, this.y, this.radius,0,Math.PI*2,true);
    ctx.stroke();
    ctx.restore();
  }
}

export default StrokeCircle;
