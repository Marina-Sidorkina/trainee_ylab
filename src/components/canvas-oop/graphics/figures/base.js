class Base {
  constructor({x, y, color}) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.a = 9.8;
    this.time = performance.now();
    this.pxl = window.devicePixelRatio;
    this.bottomOffset = 0;
  }

  /**
   * @param time {number}
   * @param bottom {number}
   */
  animate(time, bottom){
    const dt = (time - this.time) / 1000;

    if (this.y < bottom - this.bottomOffset) {
      this.y += this.a * dt * dt / 2;
    } else {
      this.y = bottom - this.bottomOffset;
    }
  }

  /**
   * @param metrics {Object}
   * @param action {Object}
   */
  processAction(action, metrics) {
    if (action.name === 'mouseMove' && action.active) {
      this.x = this.x - action.scrollX * this.pxl;
      this.y = this.y - action.scrollY * this.pxl;
      this.time = performance.now();
    }

    if (action.name === 'scroll') {
      this.y = this.y - metrics.scrollY;
      this.time = performance.now();
    }
  }
}

export default Base;
