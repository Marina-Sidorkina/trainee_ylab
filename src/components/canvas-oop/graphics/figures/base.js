class Base {
  constructor({x, y, color}, index, updateFigureStoreData) {
    this.pxl = window.devicePixelRatio;
    this.x = x * this.pxl;
    this.y = y * this.pxl;
    this.color = color;
    this.a = 9.8;
    this.index = index;
    this.time = performance.now();
    this.bottomOffset = 0;
    this.updateFigureStoreData = updateFigureStoreData;
    this.follow = false;
  }

  /**
   * Изменение координат фигуры
   * @param x {number}
   * @param y {number}
   */
  changeCoordinates({x, y}) {
    this.x = x * this.pxl;
    this.y = y * this.pxl;
  }

  /**
   * Обработка анимации
   * @param time {number}
   * @param bottom {number}
   */
  animate(time, bottom){
    const dt = (time - this.time) / 1000;

    if (this.y < bottom - this.bottomOffset) {
      this.follow = true;
      this.y += this.a * dt * dt / 2;
    } else {
      this.follow = false;
      this.y = bottom - this.bottomOffset;
    }
  }

  /**
   * Обработка действий пользователя в зависимости от типа action
   * @param metrics {Object}
   * @param action {Object}
   */
  processAction(action, metrics) {
    if (action.name === 'mouseMove' && action.active && this.index === action.index) {
      this.x = this.x - (action.scrollX * this.pxl) / metrics.scale;
      this.y = this.y - (action.scrollY * this.pxl) / metrics.scale;
      this.time = performance.now();
    }

    if (action.name === 'scroll') {
      this.y = this.y - metrics.scrollY;
      this.time = performance.now();
    }

    if (action.name === 'scale' || !action.check) this.time = performance.now();
  }

  /**
   * Вызов обновления значений в сторе для инпута
   * @param action {Object}
   */
  processUpdate(action) {
    if (action.index === this.index || action.follow === this.index) {
      this.updateFigureStoreData(this.index, this.x / this.pxl, this.y / this.pxl);
    }
  }
}

export default Base;
