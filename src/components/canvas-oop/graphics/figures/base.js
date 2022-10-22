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
   * Проверка, находится ли точка курсора внутри фигуры
   * @param x {number}
   * @param y {number}
   */
  checkClick({x, y}) {
    if (this.type === 'fillCircle' || this.type === 'strokeCircle') {
      return (this.x - x)**2 + (this.y - y)**2 <= this.radius**2;
    }

    if (this.type === 'fillTriangle' || this.type === 'strokeTriangle') {
      const x1 = this.x;
      const y1 = this.y;
      const x2 = this.x + this.side;
      const y2 = this.y;
      const x3 = this.x + this.side;
      const y3 = this.y - this.side;
      const check1 = (x1-x)*(y2-y1)-(x2-x1)*(y1-y);
      const check2 = (x2-x)*(y3-y2)-(x3-x2)*(y2-y);
      const check3 = (x3-x)*(y1-y3)-(x1-x3)*(y3-y);
      const result1 = check1 >= 0 && check2 >=0 && check3 >= 0;
      const result2 = check1 <= 0 && check2 <=0 && check3 <= 0;
      return result1 || result2;
    }

    if (this.type === 'fillRectangle' || this.type === 'strokeRectangle') {
      const rightX = this.x + this.width;
      const bottomY = this.y + this.height;
      return x <= rightX && x >= this.x && y >= this.y && y <= bottomY;
    }
  }

  /**
   * Обработка действий пользователя в зависимости от типа action
   * @param metrics {Object}
   * @param action {Object}
   */
  processAction(action, metrics) {
    if (action.name === 'mouseMove' && action.active && this.index === action.index) {
      this.x = this.x - action.scrollX * this.pxl;
      this.y = this.y - action.scrollY * this.pxl;
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
